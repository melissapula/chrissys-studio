import Stripe from 'stripe'

interface IncomingItem {
    paintingId?: string
    optionLabel?: string
    quantity?: number
    image?: string
}

interface ValidatedItem {
    paintingId: string
    title: string
    optionLabel: string
    price: number
    quantity: number
    image?: string
}

interface SanityPainting {
    _id: string
    title: string
    price?: number
    sold?: boolean
    purchaseOptions?: Array<{ label: string; price: number }>
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cfEnv = event.context.cloudflare?.env
    const stripe = new Stripe(
        config.stripeSecretKey || cfEnv?.STRIPE_SECRET_KEY
    )

    const body = await readBody(event)
    const { items } = body as { items?: IncomingItem[] }

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cart is empty',
        })
    }

    for (const item of items) {
        if (!item.paintingId || !item.optionLabel) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields',
            })
        }
    }

    const sanity = useSanityReadClient()
    const ids = [...new Set(items.map((i) => i.paintingId!))]

    const paintings = await sanity.fetch<SanityPainting[]>(
        `*[_type == "galleryItem" && _id in $ids]{ _id, title, price, sold, purchaseOptions }`,
        { ids }
    )

    const paintingsById = new Map(paintings.map((p) => [p._id, p]))
    const validated: ValidatedItem[] = []

    for (const item of items) {
        const painting = paintingsById.get(item.paintingId!)

        if (!painting) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Painting not found',
            })
        }

        const isOriginal = item.optionLabel!.toLowerCase() === 'original'
        let price: number | undefined

        if (isOriginal) {
            if (painting.sold) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `"${painting.title}" is no longer available`,
                })
            }
            price = painting.price
        } else {
            const option = painting.purchaseOptions?.find(
                (o) => o.label === item.optionLabel
            )
            if (!option) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `Invalid purchase option for "${painting.title}"`,
                })
            }
            price = option.price
        }

        if (!price || price <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: `"${painting.title}" is not currently for sale`,
            })
        }

        const rawQuantity = Number(item.quantity) || 1
        const quantity = isOriginal
            ? 1
            : Math.max(1, Math.min(99, Math.floor(rawQuantity)))

        validated.push({
            paintingId: painting._id,
            title: painting.title,
            optionLabel: item.optionLabel!,
            price,
            quantity,
            image: item.image,
        })
    }

    const requestUrl = getRequestURL(event)
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: validated.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name:
                        item.optionLabel.toLowerCase() !== 'original'
                            ? `${item.title} (${item.optionLabel})`
                            : item.title,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        })),
        metadata: {
            cartItems: JSON.stringify(
                validated.map((i) => ({
                    paintingId: i.paintingId,
                    title: i.title,
                    optionLabel: i.optionLabel,
                }))
            ),
        },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#shop`,
    })

    return { url: session.url }
})
