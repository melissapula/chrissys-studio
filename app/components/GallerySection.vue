<template>
    <section id="gallery" class="gallery-section">
        <div class="gallery-container">
            <div class="section-header">
                <p class="section-label">Portfolio</p>
                <h2 class="section-title">Gallery</h2>
                <div class="filter-buttons artist-filters">
                    <button
                        v-for="a in artists"
                        :key="a.value"
                        :class="['filter-btn', { active: selectedArtist === a.value }]"
                        @click="selectArtist(a.value)"
                    >
                        {{ a.label }}
                    </button>
                </div>
                <div class="filter-buttons category-filters">
                    <button
                        v-for="cat in categoryOptions"
                        :key="cat.value"
                        :class="['filter-btn', { active: selectedCategory === cat.value }]"
                        @click="selectedCategory = cat.value"
                    >
                        {{ cat.label }}
                    </button>
                </div>
            </div>
            <div v-if="filteredItems.length > 0" class="gallery-grid">
                <GalleryCard
                    v-for="item in filteredItems"
                    :key="item.id"
                    :item="item"
                    :show-price="false"
                    @select="$emit('select', $event)"
                />
            </div>
            <p v-else class="empty-message">Content coming soon.</p>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['select'])

const { filterItems } = useGalleryItems()
const selectedArtist = ref('all')
const selectedCategory = ref('all')

const artists = [
    { label: 'All', value: 'all' },
    { label: 'Chrissy', value: 'chrissy' },
    { label: 'Melissa', value: 'melissa' },
    { label: 'Madison', value: 'madison' },
    { label: 'Elsa', value: 'elsa' },
]

const categoryMap = {
    all: [
        { label: 'All', value: 'all' },
        { label: 'Originals', value: 'originals' },
        { label: 'Prints', value: 'prints' },
        { label: 'Cosplay', value: 'cosplay' },
        { label: 'Commissions', value: 'commissions' },
        { label: 'Poems', value: 'poems' },
        { label: 'Songs', value: 'songs' },
        { label: 'Short Stories', value: 'short-stories' },
        { label: 'Digital Art', value: 'digital-art' },
    ],
    chrissy: [
        { label: 'All', value: 'all' },
        { label: 'Originals', value: 'originals' },
        { label: 'Prints', value: 'prints' },
        { label: 'Cosplay', value: 'cosplay' },
        { label: 'Commissions', value: 'commissions' },
    ],
    melissa: [
        { label: 'All', value: 'all' },
        { label: 'Poems', value: 'poems' },
        { label: 'Songs', value: 'songs' },
        { label: 'Short Stories', value: 'short-stories' },
    ],
    madison: [
        { label: 'All', value: 'all' },
        { label: 'Digital Art', value: 'digital-art' },
        { label: 'Prints', value: 'prints' },
    ],
    elsa: [
        { label: 'All', value: 'all' },
        { label: 'Originals', value: 'originals' },
        { label: 'Prints', value: 'prints' },
    ],
}

const categoryOptions = computed(() => {
    return categoryMap[selectedArtist.value] || []
})

function selectArtist(artist) {
    selectedArtist.value = artist
    selectedCategory.value = 'all'
}

const filteredItems = computed(() =>
    filterItems(selectedArtist.value, selectedCategory.value)
)
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

.category-filters {
    margin-top: 16px;
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

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 32px;
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
    .gallery-section {
        padding: 80px 20px;
    }

    .filter-buttons {
        flex-wrap: wrap;
        gap: 12px;
    }

    .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 24px;
    }
}
</style>
