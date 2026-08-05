import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const cfEnv = event.context.cloudflare?.env
        const stripeKey = config.stripeSecretKey || cfEnv?.STRIPE_SECRET_KEY

        if (!stripeKey) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Stripe key not configured',
            })
        }

        const stripe = new Stripe(stripeKey)

        const body = await readBody(event)
        const amount = Number(body?.amount)

        if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Amount must be between $1 and $10,000',
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
                            name: 'Support mfp studios',
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
    } catch (err) {
        const { statusCode, message } = err as {
            statusCode?: number
            message?: string
        }

        if (statusCode) throw err

        throw createError({
            statusCode: 502,
            statusMessage: message || 'Payment service error',
        })
    }
})
