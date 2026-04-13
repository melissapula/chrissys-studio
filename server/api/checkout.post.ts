import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cfEnv = event.context.cloudflare?.env
    const stripe = new Stripe(config.stripeSecretKey || cfEnv?.STRIPE_SECRET_KEY)

    const body = await readBody(event)
    const { items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cart is empty',
        })
    }

    for (const item of items) {
        if (!item.title || !item.price) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields',
            })
        }
    }

    const requestUrl = getRequestURL(event)
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: items.map((item: { title: string; price: number; image?: string; optionLabel?: string; quantity?: number }) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.optionLabel && item.optionLabel !== 'Original'
                        ? `${item.title} (${item.optionLabel})`
                        : item.title,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity || 1,
        })),
        metadata: {
            cartItems: JSON.stringify(
                items.map((i: { paintingId?: string; title: string; optionLabel?: string }) => ({
                    paintingId: i.paintingId,
                    title: i.title,
                    optionLabel: i.optionLabel || 'Original',
                }))
            ),
        },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#shop`,
    })

    return { url: session.url }
})
