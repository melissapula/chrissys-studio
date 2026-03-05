<template>
    <section id="shop" class="shop-section">
        <div class="shop-container">
            <div class="section-header">
                <p class="section-label">Original Works</p>
                <h2 class="section-title">Shop</h2>
                <p class="shop-count">
                    {{ displayedAvailableCount }} original
                    {{ displayedAvailableCount === 1 ? 'piece' : 'pieces' }}
                    available
                </p>
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
                <div class="filter-buttons availability-filters">
                    <button
                        v-for="opt in availabilityOptions"
                        :key="opt.value"
                        :class="['filter-btn', { active: selectedAvailability === opt.value }]"
                        @click="selectedAvailability = opt.value"
                    >
                        {{ opt.label }}
                    </button>
                </div>
            </div>
            <div v-if="filteredShopItems.length > 0" class="gallery-grid">
                <GalleryCard
                    v-for="item in filteredShopItems"
                    :key="item.id"
                    :item="item"
                    :show-price="true"
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

const { items } = useGalleryItems()
const selectedArtist = ref('all')
const selectedCategory = ref('all')
const selectedAvailability = ref('available')

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

const availabilityOptions = [
    { label: 'Available', value: 'available' },
    { label: 'Sold', value: 'sold' },
    { label: 'All', value: 'all' },
]

const categoryOptions = computed(() => {
    return categoryMap[selectedArtist.value] || []
})

function selectArtist(artist) {
    selectedArtist.value = artist
    selectedCategory.value = 'all'
}

const filteredShopItems = computed(() => {
    let result = items.value.filter((item) => item.price)

    if (selectedArtist.value !== 'all') {
        result = result.filter((item) => item.artist === selectedArtist.value)
    }
    if (selectedCategory.value !== 'all') {
        result = result.filter((item) => item.categories.includes(selectedCategory.value))
    }
    if (selectedAvailability.value === 'available') {
        result = result.filter((item) => !item.sold)
    } else if (selectedAvailability.value === 'sold') {
        result = result.filter((item) => item.sold)
    }

    return result
})

const displayedAvailableCount = computed(() =>
    filteredShopItems.value.filter((item) => !item.sold).length
)
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

.filter-buttons {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
}

.category-filters,
.availability-filters {
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
    .shop-section {
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
