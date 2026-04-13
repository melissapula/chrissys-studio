import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const cfEnv = event.context.cloudflare?.env

        const hasConfig = !!config.stripeSecretKey
        const hasCfEnv = !!cfEnv
        const cfEnvKeys = cfEnv ? Object.keys(cfEnv) : []
        const hasCfStripe = !!cfEnv?.STRIPE_SECRET_KEY
        const contextKeys = Object.keys(event.context)

        const stripeKey = config.stripeSecretKey || cfEnv?.STRIPE_SECRET_KEY

        if (!stripeKey) {
            throw createError({
                statusCode: 500,
                statusMessage: `Stripe key not configured. runtimeConfig: ${hasConfig}, cfEnv exists: ${hasCfEnv}, cfEnv keys: [${cfEnvKeys.join(',')}], cfStripe: ${hasCfStripe}, context keys: [${contextKeys.join(',')}]`,
            })
        }

        const stripe = new Stripe(stripeKey)

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
        if (err.statusCode) throw err

        throw createError({
            statusCode: 502,
            statusMessage: err.message || 'Payment service error',
        })
    }
})
