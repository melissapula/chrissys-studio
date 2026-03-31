<template>
    <div
        class="gallery-card"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @click="handleClick"
    >
        <div v-if="item.image" class="card-image-wrapper">
            <img
                :src="item.image"
                :alt="item.title"
                class="card-image"
                :class="{ hovered }"
            />
            <div v-if="item.sold" class="sold-badge">Sold</div>
            <div class="card-overlay" :class="{ visible: hovered }">
                <p v-if="item.medium" class="card-meta">
                    {{ item.medium }}
                    <template v-if="item.dimensions">
                        · {{ item.dimensions }}
                    </template>
                </p>
            </div>
        </div>
        <div v-else class="card-text-wrapper" :class="{ hovered }">
            <span class="card-category-label">{{ (item.categories || [])[0] }}</span>
            <p class="card-body-excerpt">
                {{ bodyExcerpt }}
            </p>
        </div>
        <div class="card-info">
            <h3 class="card-title">{{ item.title }}</h3>
            <p
                v-if="showPrice && lowestPrice"
                class="card-price"
                :class="{ sold: item.sold && !hasNonOriginalOptions }"
            >
                {{
                    item.sold && !hasNonOriginalOptions
                        ? 'Sold'
                        : hasMultipleOptions
                          ? `From $${lowestPrice.toLocaleString()}`
                          : `$${lowestPrice.toLocaleString()}`
                }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    item: { type: Object, required: true },
    showPrice: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])

const hovered = ref(false)

const TEXT_CATEGORIES = ['poems', 'songs', 'short-stories']

function handleClick() {
    const isTextContent = (props.item.categories || []).some((c) =>
        TEXT_CATEGORIES.includes(c)
    )
    if (isTextContent && props.item.slug) {
        navigateTo(`/gallery/${props.item.slug}`)
    } else {
        emit('select', props.item)
    }
}

const hasMultipleOptions = computed(
    () => props.item.purchaseOptions && props.item.purchaseOptions.length > 1
)

const hasNonOriginalOptions = computed(
    () =>
        props.item.purchaseOptions &&
        props.item.purchaseOptions.some(
            (o) => o.label.toLowerCase() !== 'original'
        )
)

const lowestPrice = computed(() => {
    if (props.item.purchaseOptions && props.item.purchaseOptions.length > 0) {
        return Math.min(...props.item.purchaseOptions.map((o) => o.price))
    }
    return props.item.price
})

const bodyExcerpt = computed(() => {
    if (!props.item.body) return ''
    const text =
        typeof props.item.body === 'string'
            ? props.item.body
            : props.item.body
                  .filter((b) => b._type === 'block')
                  .map((b) => b.children?.map((c) => c.text).join(''))
                  .join(' ')
    return text.length > 120 ? text.slice(0, 120) + '…' : text
})
</script>

<style scoped>
.gallery-card {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(44, 36, 22, 0.15);
    transition:
        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(44, 36, 22, 0.25);
}

.card-image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/5;
    background: #e8e2d8;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.4s ease;
}

.card-image.hovered {
    transform: scale(1.05);
    opacity: 0.92;
}

.sold-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: var(--color-brown-dark);
    color: var(--color-text-light);
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    font-weight: 500;
}

.card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(44, 36, 22, 0.7));
    padding: 40px 20px 20px;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.4s ease;
}

.card-overlay.visible {
    opacity: 1;
    transform: translateY(0);
}

.card-meta {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--color-text-light);
    letter-spacing: 1px;
    margin: 0;
    opacity: 0.85;
}

.card-text-wrapper {
    aspect-ratio: 4/5;
    background: var(--color-cream-dark, #e8e2d8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 24px;
    text-align: center;
    transition: background 0.4s ease;
}

.card-text-wrapper.hovered {
    background: var(--color-brown-dark, #3a3028);
}

.card-text-wrapper.hovered .card-category-label,
.card-text-wrapper.hovered .card-body-excerpt {
    color: var(--color-text-light, #faf8f4);
}

.card-category-label {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin-bottom: 16px;
    transition: color 0.4s ease;
}

.card-body-excerpt {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    line-height: 1.7;
    color: var(--color-brown-text);
    margin: 0;
    transition: color 0.4s ease;
}

.card-info {
    padding: 16px 4px 8px;
}

.card-title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 0 0 4px;
}

.card-price {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
    margin: 0;
    font-weight: 400;
}

.card-price.sold {
    color: var(--color-tan);
}
</style>
