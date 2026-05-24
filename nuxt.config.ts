// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/sanity',
        'nitro-cloudflare-dev',
        '@nuxtjs/sitemap',
        '@nuxt/image',
    ],
    image: {
        domains: ['cdn.sanity.io'],
        quality: 80,
        format: ['webp'],
    },
    site: {
        url: 'https://fourseasonsstudio.com',
    },
    nitro: {
        preset: 'cloudflare_module',

        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
        },
    },
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
            title: 'mfp studios — Original Fine Art',
            meta: [
                {
                    name: 'description',
                    content:
                        'Original paintings, poetry, songs, and digital art from four creative voices. Art, writing, and digital creations from mfp studios.',
                },
                { property: 'og:type', content: 'website' },
                {
                    property: 'og:title',
                    content: 'mfp studios — Original Fine Art',
                },
                {
                    property: 'og:description',
                    content:
                        'Original paintings, poetry, songs, and digital art from four creative voices. Art, writing, and digital creations from mfp studios.',
                },
                {
                    property: 'og:url',
                    content: 'https://fourseasonsstudio.com',
                },
                { property: 'og:site_name', content: 'mfp studios' },
                {
                    property: 'og:image',
                    content: 'https://fourseasonsstudio.com/og-image.png',
                },
                { name: 'twitter:card', content: 'summary_large_image' },
                {
                    name: 'twitter:title',
                    content: 'mfp studios — Original Fine Art',
                },
                {
                    name: 'twitter:description',
                    content:
                        'Original paintings, poetry, songs, and digital art from four creative voices. Art, writing, and digital creations from mfp studios.',
                },
                {
                    name: 'twitter:image',
                    content: 'https://fourseasonsstudio.com/og-image.png',
                },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Dancing+Script:wght@400;500;600;700&display=swap',
                },
            ],
        },
    },
})
