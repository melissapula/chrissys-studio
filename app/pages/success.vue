<template>
    <div class="success-page">
        <div class="success-content">
            <div class="gold-line" />
            <h1 class="success-title">Thank You</h1>
            <p class="success-message">
                Your purchase is confirmed. We'll be in touch shortly with
                shipping details.
            </p>
            <NuxtLink to="/#shop" class="back-link"> Back to Gallery</NuxtLink>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Purchase Confirmed — Christine's Studio",
})
</script>

<style scoped>
.success-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-cream);
    padding: 40px 20px;
}

.success-content {
    text-align: center;
    max-width: 480px;
}

.gold-line {
    width: 48px;
    height: 1px;
    background: var(--color-gold);
    margin: 0 auto 32px;
}

.success-title {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0 0 16px;
}

.success-message {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--color-brown-text);
    line-height: 1.7;
    margin: 0 0 40px;
}

.back-link {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--color-gold);
    text-decoration: none;
    padding: 14px 32px;
    border: 1px solid var(--color-gold);
    transition: all 0.3s ease;
}

.back-link:hover {
    background: var(--color-gold);
    color: #fff;
}
</style>
