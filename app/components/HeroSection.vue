<template>
    <section class="hero">
        <div class="hero-pattern" />
        <div class="hero-content">
            <p class="hero-label">Original Fine Art</p>
            <h1 class="hero-title">Christine's Studio</h1>
            <div class="gold-line" style="margin: 0 auto 24px" />
            <p class="hero-subtitle">
                One-of-a-kind paintings capturing light, nature, and quiet
                moments
            </p>
            <div class="hero-actions">
                <a
                    href="#gallery"
                    class="btn btn-primary"
                    @click.prevent="$emit('navigate', 'Gallery')"
                >
                    View Gallery
                </a>
                <a
                    href="#shop"
                    class="btn btn-outline"
                    @click.prevent="$emit('navigate', 'Shop')"
                >
                    Shop Originals
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        165deg,
        var(--color-cream) 0%,
        #f0e8d8 40%,
        var(--color-warm-bg) 100%
    );
}

.hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
    text-align: center;
    position: relative;
    animation: fadeIn 1.2s ease;
}

.hero-label {
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin: 0 0 20px;
    font-weight: 400;
}

.hero-title {
    font-family: var(--font-display);
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0 0 20px;
    line-height: 1.05;
    letter-spacing: -1px;
}

.hero-subtitle {
    font-family: var(--font-display);
    font-size: clamp(18px, 2.5vw, 24px);
    font-weight: 300;
    color: var(--color-brown-text);
    margin: 0 0 48px;
    max-width: 500px;
    line-height: 1.6;
}

.hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.btn {
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 16px 36px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
}

.btn-primary {
    color: #fff;
    background: var(--color-brown-dark);
}

.btn-primary:hover {
    background: var(--color-brown-mid);
}

.btn-outline {
    color: var(--color-brown-dark);
    background: transparent;
    border: 1px solid var(--color-tan-light);
}

.btn-outline:hover {
    background: var(--color-brown-dark);
    color: #fff;
}

@media (max-width: 768px) {
    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
}
</style>
