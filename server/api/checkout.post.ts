import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const stripe = new Stripe(config.stripeSecretKey)

    const body = await readBody(event)
    const { title, price, image, paintingId } = body

    if (!title || !price) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    const requestUrl = getRequestURL(event)
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: title,
                        images: image ? [image] : [],
                    },
                    unit_amount: Math.round(price * 100),
                },
                quantity: 1,
            },
        ],
        metadata: {
            paintingId: String(paintingId),
            paintingTitle: String(title),
        },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#shop`,
    })

    return { url: session.url }
})
