import Stripe from 'stripe'

async function sendEmail(
    apiKey: string,
    from: string,
    to: string,
    subject: string,
    html: string
) {
    await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: { from, to, subject, html },
    })
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const stripe = new Stripe(config.stripeSecretKey)

    const rawBody = await readRawBody(event)
    const signature = getHeader(event, 'stripe-signature')

    if (!rawBody || !signature) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing body or signature',
        })
    }

    let stripeEvent: Stripe.Event

    try {
        stripeEvent = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            config.stripeWebhookSecret
        )
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid webhook signature',
        })
    }

    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session
        const paintingId = session.metadata?.paintingId
        const customerEmail = session.customer_details?.email
        const paintingTitle = session.metadata?.paintingTitle || 'a painting'
        const amountPaid = session.amount_total
            ? `$${(session.amount_total / 100).toFixed(2)}`
            : 'N/A'

        if (paintingId) {
            const sanity = useSanityWriteClient()
            await sanity.patch(paintingId).set({ sold: true }).commit()
        }

        const from = "Christine's Studio <onboarding@resend.dev>"

        if (customerEmail) {
            await sendEmail(
                config.resendApiKey,
                from,
                customerEmail,
                `Purchase Confirmation — Christine's Studio`,
                `
                    <h1>Thank you for your purchase!</h1>
                    <p>You've purchased <strong>${paintingTitle}</strong> for ${amountPaid}.</p>
                    <p>Christine will be in touch soon with shipping details.</p>
                    <p>— Christine's Studio</p>
                `
            )
        }

        if (config.sellerEmail) {
            await sendEmail(
                config.resendApiKey,
                from,
                config.sellerEmail,
                `New Sale — ${paintingTitle}`,
                `
                    <h1>You made a sale!</h1>
                    <p><strong>${paintingTitle}</strong> was purchased for ${amountPaid}.</p>
                    <p>Customer email: ${customerEmail || 'Not provided'}</p>
                    <p>Painting ID: ${paintingId || 'Unknown'}</p>
                `
            )
        }
    }

    return { received: true }
})
