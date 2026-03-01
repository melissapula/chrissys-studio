<template>
    <div class="blog-page">
        <header class="blog-header">
            <NuxtLink to="/" class="back-link">&larr; Back to Home</NuxtLink>
            <p class="section-label">Stories & Updates</p>
            <h1 class="section-title">Blog</h1>
            <div class="gold-line" />
        </header>
        <div v-if="posts && posts.length > 0" class="posts-grid">
            <NuxtLink
                v-for="post in posts"
                :key="post.id"
                :to="`/blog/${post.slug}`"
                class="post-card"
            >
                <div class="post-image-wrapper">
                    <img
                        v-if="post.coverImage"
                        :src="post.coverImage"
                        :alt="post.title"
                        class="post-image"
                    />
                </div>
                <div class="post-content">
                    <time class="post-date">{{ formatDate(post.publishedAt) }}</time>
                    <h2 class="post-title">{{ post.title }}</h2>
                    <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
                    <span class="read-more">Read More &rarr;</span>
                </div>
            </NuxtLink>
        </div>
        <p v-else class="empty-message">Content coming soon.</p>
    </div>
</template>

<script setup>
const { posts } = useBlogPosts()

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
</script>

<style scoped>
.blog-page {
    padding: 140px 40px 120px;
    background: var(--color-cream);
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
}

.blog-header {
    text-align: center;
    margin-bottom: 60px;
}

.blog-header .gold-line {
    margin: 16px auto 0;
}

.back-link {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 13px;
    letter-spacing: 1px;
    color: var(--color-tan);
    text-decoration: none;
    margin-bottom: 32px;
    transition: color 0.3s ease;
}

.back-link:hover {
    color: var(--color-gold);
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 40px;
}

.post-card {
    text-decoration: none;
    color: inherit;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(44, 36, 22, 0.1);
}

.post-image-wrapper {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--color-cream-dark);
}

.post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.post-card:hover .post-image {
    transform: scale(1.03);
}

.post-content {
    padding: 28px 24px;
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
    font-size: 26px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 8px 0 12px;
    line-height: 1.3;
}

.post-excerpt {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
    line-height: 1.7;
    margin-bottom: 16px;
}

.read-more {
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-gold);
    font-weight: 500;
}

.empty-message {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 300;
    color: var(--color-tan);
    text-align: center;
    padding: 80px 0;
}

@media (max-width: 768px) {
    .blog-page {
        padding: 120px 20px 80px;
    }

    .posts-grid {
        grid-template-columns: 1fr;
        gap: 32px;
    }
}
</style>
