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

interface CartItem {
    paintingId?: string
    title: string
    optionLabel: string
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

        if (session.metadata?.type === 'tip') {
            return { received: true }
        }

        const customerEmail = session.customer_details?.email
        const amountPaid = session.amount_total
            ? `$${(session.amount_total / 100).toFixed(2)}`
            : 'N/A'

        let purchasedItems: CartItem[] = []

        if (session.metadata?.cartItems) {
            purchasedItems = JSON.parse(session.metadata.cartItems)
        } else if (session.metadata?.paintingId) {
            purchasedItems = [
                {
                    paintingId: session.metadata.paintingId,
                    title: session.metadata.paintingTitle || 'a painting',
                    optionLabel: session.metadata.optionLabel || 'Original',
                },
            ]
        }

        const sanity = useSanityWriteClient()
        for (const item of purchasedItems) {
            if (item.paintingId && item.optionLabel.toLowerCase() === 'original') {
                await sanity.patch(item.paintingId).set({ sold: true }).commit()
            }
        }

        const itemListHtml = purchasedItems
            .map((i) => `<li>${i.title} (${i.optionLabel})</li>`)
            .join('')

        const from = "Four Seasons Studio <hello@fourseasonsstudio.com>"

        if (customerEmail) {
            await sendEmail(
                config.resendApiKey,
                from,
                customerEmail,
                `Purchase Confirmation — mfp studios`,
                `
                    <h1>Thank you for your purchase!</h1>
                    <p>You purchased the following for ${amountPaid}:</p>
                    <ul>${itemListHtml}</ul>
                    <p>Christine will be in touch soon with shipping details.</p>
                    <p>— mfp studios</p>
                `
            )
        }

        if (config.sellerEmail) {
            await sendEmail(
                config.resendApiKey,
                from,
                config.sellerEmail,
                `New Sale — ${purchasedItems.map((i) => i.title).join(', ')}`,
                `
                    <h1>You made a sale!</h1>
                    <p>The following items were purchased for ${amountPaid}:</p>
                    <ul>${itemListHtml}</ul>
                    <p>Customer email: ${customerEmail || 'Not provided'}</p>
                `
            )
        }
    }

    return { received: true }
})
