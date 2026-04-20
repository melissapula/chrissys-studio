function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const { name, email, type, message } = body as {
        name?: string
        email?: string
        type?: string
        message?: string
    }

    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    if (name.length > 200 || email.length > 200 || message.length > 5000) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Field too long',
        })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email',
        })
    }

    const inquiryLabels: Record<string, string> = {
        general: 'General Inquiry',
        purchase: 'Purchase Question',
        commission: 'Custom Commission',
    }

    const typeLabel = inquiryLabels[type || ''] || 'Inquiry'
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeType = escapeHtml(typeLabel)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: {
            from: 'Four Seasons Studio <hello@fourseasonsstudio.com>',
            to: config.sellerEmail,
            subject: `New ${typeLabel} from ${name.replace(/[\r\n]+/g, ' ')}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Type:</strong> ${safeType}</p>
                <p><strong>Message:</strong></p>
                <p>${safeMessage}</p>
            `,
            reply_to: email,
        },
    })

    return { success: true }
})
