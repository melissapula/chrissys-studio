<template>
    <div
        class="painting-card"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @click="$emit('select', painting)"
    >
        <div class="painting-image-wrapper">
            <img
                :src="painting.image"
                :alt="painting.title"
                class="painting-image"
                :class="{ hovered }"
            />
            <div v-if="painting.sold" class="sold-badge">Sold</div>
            <div class="painting-overlay" :class="{ visible: hovered }">
                <p class="painting-meta">
                    {{ painting.medium }} · {{ painting.dimensions }}
                </p>
            </div>
        </div>
        <div class="painting-info">
            <h3 class="painting-title">{{ painting.title }}</h3>
            <p
                v-if="showPrice"
                class="painting-price"
                :class="{ sold: painting.sold }"
            >
                {{
                    painting.sold
                        ? 'Sold'
                        : `$${painting.price.toLocaleString()}`
                }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    painting: { type: Object, required: true },
    showPrice: { type: Boolean, default: false },
})

defineEmits(['select'])

const hovered = ref(false)
</script>

<style scoped>
.painting-card {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.painting-card:hover {
    transform: translateY(-4px);
}

.painting-image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/5;
    background: #e8e2d8;
}

.painting-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.4s ease;
}

.painting-image.hovered {
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

.painting-overlay {
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

.painting-overlay.visible {
    opacity: 1;
    transform: translateY(0);
}

.painting-meta {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--color-text-light);
    letter-spacing: 1px;
    margin: 0;
    opacity: 0.85;
}

.painting-info {
    padding: 16px 4px 8px;
}

.painting-title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 0 0 4px;
}

.painting-price {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
    margin: 0;
    font-weight: 400;
}

.painting-price.sold {
    color: var(--color-tan);
}
</style>
