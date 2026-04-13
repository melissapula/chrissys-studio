<template>
    <div class="post-page">
        <header class="post-header">
            <NuxtLink to="/#gallery" class="back-link">&larr; Back to Gallery</NuxtLink>
        </header>
        <template v-if="item">
            <div v-if="item.image" class="cover-image-wrapper">
                <div class="image-shield" />
                <NuxtImg :src="item.image" :alt="item.title" class="cover-image" sizes="100vw md:80vw" />
            </div>
            <article class="post-article">
                <p v-if="item.artist" class="post-artist">{{ item.artist }}</p>
                <h1 class="post-title">{{ item.title }}</h1>
                <div class="gold-line" />
                <div class="post-body">
                    <div v-if="typeof item.body === 'string'" class="body-plain">
                        {{ item.body }}
                    </div>
                    <SanityContent v-else-if="item.body" :value="item.body" />
                </div>
            </article>
        </template>
        <div v-else class="not-found">
            <p>Item not found.</p>
            <NuxtLink to="/#gallery" class="back-link">Browse the gallery &rarr;</NuxtLink>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const { items } = useGalleryItems()

const item = computed(() => {
    return items.value.find((i) => i.slug === route.params.slug) || null
})

const itemDescription = computed(() => {
    if (!item.value) return ''
    const parts = [item.value.title]
    if (item.value.medium) parts.push(item.value.medium)
    if (item.value.dimensions) parts.push(item.value.dimensions)
    if (item.value.artist) parts.push(`by ${item.value.artist}`)
    return parts.join(' — ')
})

useHead(
    computed(() => ({
        title: item.value ? `${item.value.title} — mfp studios` : 'Not Found',
        meta: item.value
            ? [
                  { name: 'description', content: itemDescription.value },
                  { property: 'og:type', content: 'article' },
                  { property: 'og:title', content: item.value.title },
                  { property: 'og:description', content: itemDescription.value },
                  ...(item.value.image ? [{ property: 'og:image', content: item.value.image }] : []),
                  { property: 'og:url', content: `https://fourseasonsstudio.com/gallery/${item.value.slug}` },
                  { name: 'twitter:card', content: 'summary_large_image' },
                  { name: 'twitter:title', content: item.value.title },
                  { name: 'twitter:description', content: itemDescription.value },
                  ...(item.value.image ? [{ name: 'twitter:image', content: item.value.image }] : []),
              ]
            : [],
        link: item.value
            ? [{ rel: 'canonical', href: `https://fourseasonsstudio.com/gallery/${item.value.slug}` }]
            : [],
        script: item.value && item.value.price
            ? [
                  {
                      type: 'application/ld+json',
                      innerHTML: JSON.stringify({
                          '@context': 'https://schema.org',
                          '@type': 'Product',
                          name: item.value.title,
                          description: itemDescription.value,
                          ...(item.value.image ? { image: item.value.image } : {}),
                          offers: {
                              '@type': 'Offer',
                              price: item.value.price,
                              priceCurrency: 'USD',
                              availability: item.value.sold
                                  ? 'https://schema.org/SoldOut'
                                  : 'https://schema.org/InStock',
                              url: `https://fourseasonsstudio.com/gallery/${item.value.slug}`,
                          },
                          brand: {
                              '@type': 'Organization',
                              name: 'mfp studios',
                          },
                      }),
                  },
              ]
            : [],
    }))
)
</script>

<style scoped>
.post-page {
    padding: 140px 40px 120px;
    background: var(--color-cream);
    min-height: 100vh;
    max-width: 800px;
    margin: 0 auto;
}

.post-header {
    margin-bottom: 32px;
}

.back-link {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 13px;
    letter-spacing: 1px;
    color: var(--color-tan);
    text-decoration: none;
    transition: color 0.3s ease;
}

.back-link:hover {
    color: var(--color-gold);
}

.cover-image-wrapper {
    position: relative;
    width: 100%;
    max-height: 480px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 40px;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.post-article {
    animation: fadeIn 0.5s ease;
}

.post-artist {
    font-family: var(--font-body);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin: 0 0 8px;
}

.post-title {
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0 0 16px;
    line-height: 1.2;
}

.post-article .gold-line {
    margin-bottom: 40px;
}

.post-body {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.8;
    color: var(--color-brown-text);
}

.body-plain {
    white-space: pre-line;
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.9;
}

.post-body :deep(p) {
    margin-bottom: 1.5em;
}

.post-body :deep(h2) {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 2em 0 0.5em;
}

.post-body :deep(h3) {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 1.5em 0 0.5em;
}

.post-body :deep(blockquote) {
    border-left: 3px solid var(--color-gold);
    padding-left: 20px;
    margin: 1.5em 0;
    font-style: italic;
    color: var(--color-muted);
}

.post-body :deep(a) {
    color: var(--color-gold);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.post-body :deep(a:hover) {
    color: var(--color-gold-light);
}

.not-found {
    text-align: center;
    padding: 80px 0;
    font-family: var(--font-body);
    color: var(--color-brown-text);
}

@media (max-width: 768px) {
    .post-page {
        padding: 120px 20px 80px;
    }

    .post-title {
        font-size: 32px;
    }

    .cover-image-wrapper {
        max-height: 300px;
    }
}
</style>
