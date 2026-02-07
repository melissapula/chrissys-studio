export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { name, email, type, message } = await readBody(event)

    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    const inquiryLabels: Record<string, string> = {
        general: 'General Inquiry',
        purchase: 'Purchase Question',
        commission: 'Custom Commission',
    }

    await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: {
            from: 'Four Seasons Studio <hello@fourseasonsstudio.com>',
            to: config.sellerEmail,
            subject: `New ${inquiryLabels[type] || 'Inquiry'} from ${name}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type:</strong> ${inquiryLabels[type] || type}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
            reply_to: email,
        },
    })

    return { success: true }
})
