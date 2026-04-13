import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const stripe = new Stripe(config.stripeSecretKey)

    const body = await readBody(event)
    const { amount } = body

    if (!amount || amount < 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Amount must be at least $1',
        })
    }

    const requestUrl = getRequestURL(event)
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "Support Christine's Art",
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                type: 'tip',
            },
            success_url: `${baseUrl}/thank-you`,
            cancel_url: `${baseUrl}/#fuel-the-artists`,
        })

        return { url: session.url }
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            statusMessage: err.message || 'Payment service error',
        })
    }
})
