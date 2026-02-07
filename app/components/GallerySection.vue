<template>
    <section id="gallery" class="gallery-section">
        <div class="gallery-container">
            <div class="section-header">
                <p class="section-label">Portfolio</p>
                <h2 class="section-title">Gallery</h2>
                <div class="filter-buttons">
                    <button
                        v-for="cat in categories"
                        :key="cat"
                        :class="['filter-btn', { active: filter === cat }]"
                        @click="filter = cat"
                    >
                        {{ cat === 'still-life' ? 'Still Life' : cat }}
                    </button>
                </div>
            </div>
            <div class="paintings-grid">
                <PaintingCard
                    v-for="painting in filteredPaintings"
                    :key="painting.id"
                    :painting="painting"
                    :show-price="false"
                    @select="$emit('select', $event)"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['select'])

const { filterByCategory } = usePaintings()
const filter = ref('all')
const categories = ['all', 'landscape', 'still-life', 'study']

const filteredPaintings = computed(() => filterByCategory(filter.value))
</script>

<style scoped>
.gallery-section {
    padding: 120px 40px;
    background: var(--color-cream);
    min-height: 100vh;
}

.gallery-container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.filter-buttons {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
}

.filter-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
    font-weight: 400;
    padding: 8px 4px;
    border-bottom: 1.5px solid transparent;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    color: var(--color-gold);
}

.filter-btn.active {
    color: var(--color-gold);
    font-weight: 500;
    border-bottom-color: var(--color-gold);
}

.paintings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 32px;
}

@media (max-width: 768px) {
    .gallery-section {
        padding: 80px 20px;
    }

    .paintings-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 24px;
    }
}
</style>
