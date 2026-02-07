<template>
    <section id="shop" class="shop-section">
        <div class="shop-container">
            <div class="section-header">
                <p class="section-label">Original Works</p>
                <h2 class="section-title">Shop</h2>
                <p class="shop-count">
                    {{ availableCount }} original
                    {{ availableCount === 1 ? 'painting' : 'paintings' }}
                    available
                </p>
            </div>
            <div class="paintings-grid">
                <PaintingCard
                    v-for="painting in paintings"
                    :key="painting.id"
                    :painting="painting"
                    :show-price="true"
                    @select="$emit('select', $event)"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
defineEmits(['select'])

const { paintings, availableCount } = usePaintings()
</script>

<style scoped>
.shop-section {
    padding: 120px 40px;
    background: var(--color-cream-dark);
}

.shop-container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.shop-count {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--color-brown-text);
    font-weight: 300;
    margin: 0;
}

.paintings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 32px;
}

@media (max-width: 768px) {
    .shop-section {
        padding: 80px 20px;
    }

    .paintings-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 24px;
    }
}
</style>
