// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/sanity'],
    runtimeConfig: {
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        resendApiKey: process.env.RESEND_API_KEY,
        sellerEmail: process.env.SELLER_EMAIL,
        sanityApiToken: process.env.SANITY_API_TOKEN,
    },
    eslint: {
        checker: true,
    },
    sanity: {
        projectId: '3i77cmnf',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: true,
    },
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            title: "Christine's Studio — Original Fine Art",
            meta: [
                {
                    name: 'description',
                    content:
                        'One-of-a-kind original paintings by Christine. Oil and acrylic works capturing light, nature, and quiet moments. Based in Minnesota.',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
})
