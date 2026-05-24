<template>
    <div class="post-page">
        <header class="post-header">
            <NuxtLink to="/blog" class="back-link"
                >&larr; Back to Blog</NuxtLink
            >
        </header>
        <template v-if="post">
            <div v-if="post.coverImage" class="cover-image-wrapper">
                <div class="image-shield" />
                <NuxtImg
                    :src="post.coverImage"
                    :alt="post.title"
                    class="cover-image"
                    sizes="100vw md:80vw"
                />
            </div>
            <article class="post-article">
                <time class="post-date">{{
                    formatDate(post.publishedAt)
                }}</time>
                <h1 class="post-title">{{ post.title }}</h1>
                <div class="gold-line" />
                <div class="post-body">
                    <SanityContent :value="post.body" />
                </div>
            </article>
        </template>
        <div v-else class="not-found">
            <p>Post not found.</p>
            <NuxtLink to="/blog" class="back-link"
                >Browse all posts &rarr;</NuxtLink
            >
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const { posts } = useBlogPosts()

const post = computed(() => {
    return posts.value.find((p) => p.slug === route.params.slug) || null
})

useHead(
    computed(() => ({
        title: post.value
            ? `${post.value.title} — mfp studios`
            : 'Post Not Found',
        meta: post.value
            ? [
                  {
                      name: 'description',
                      content: post.value.excerpt || post.value.title,
                  },
                  { property: 'og:type', content: 'article' },
                  { property: 'og:title', content: post.value.title },
                  {
                      property: 'og:description',
                      content: post.value.excerpt || post.value.title,
                  },
                  ...(post.value.coverImage
                      ? [
                            {
                                property: 'og:image',
                                content: post.value.coverImage,
                            },
                        ]
                      : []),
                  {
                      property: 'og:url',
                      content: `https://fourseasonsstudio.com/blog/${post.value.slug}`,
                  },
                  { name: 'twitter:card', content: 'summary_large_image' },
                  { name: 'twitter:title', content: post.value.title },
                  {
                      name: 'twitter:description',
                      content: post.value.excerpt || post.value.title,
                  },
                  ...(post.value.coverImage
                      ? [
                            {
                                name: 'twitter:image',
                                content: post.value.coverImage,
                            },
                        ]
                      : []),
              ]
            : [],
        link: post.value
            ? [
                  {
                      rel: 'canonical',
                      href: `https://fourseasonsstudio.com/blog/${post.value.slug}`,
                  },
              ]
            : [],
    }))
)

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
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

.post-date {
    font-family: var(--font-body);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
}

.post-title {
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 12px 0 16px;
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

.post-body :deep(img) {
    max-width: 100%;
    border-radius: 4px;
    margin: 2em 0;
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
