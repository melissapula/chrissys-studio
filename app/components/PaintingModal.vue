<template>
    <Teleport to="body">
        <div v-if="painting" class="modal-backdrop" @click="$emit('close')">
            <div class="modal-content" @click.stop>
                <div class="modal-image">
                    <img :src="painting.image" :alt="painting.title" />
                </div>
                <div class="modal-details">
                    <h2 class="modal-title">{{ painting.title }}</h2>
                    <p class="modal-year">{{ painting.year }}</p>
                    <div class="gold-line" style="margin: 0 0 32px" />

                    <div class="detail-rows">
                        <div class="detail-row">
                            <span class="detail-label">Medium</span>
                            <span class="detail-value">{{
                                painting.medium
                            }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Dimensions</span>
                            <span class="detail-value">{{
                                painting.dimensions
                            }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status</span>
                            <span class="detail-value">{{
                                painting.sold ? 'Sold' : 'Available'
                            }}</span>
                        </div>
                    </div>

                    <template v-if="!painting.sold">
                        <p class="modal-price">
                            ${{ painting.price.toLocaleString() }}
                        </p>
                        <button
                            class="purchase-btn"
                            :disabled="purchasing"
                            @click="handlePurchase"
                        >
                            {{
                                purchasing
                                    ? 'Redirecting to checkout…'
                                    : 'Purchase This Painting'
                            }}
                        </button>
                        <p class="purchase-note">
                            Free shipping within the US · Secure checkout via
                            Stripe
                        </p>
                    </template>

                    <button class="close-btn" @click="$emit('close')">✕</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    painting: { type: Object, default: null },
})

defineEmits(['close'])

const purchasing = ref(false)

async function handlePurchase() {
    if (!props.painting || purchasing.value) return
    purchasing.value = true

    try {
        const { url } = await $fetch('/api/checkout', {
            method: 'POST',
            body: {
                title: props.painting.title,
                price: props.painting.price,
                image: props.painting.image,
                paintingId: props.painting.id,
            },
        })
        if (url) {
            window.location.href = url
        }
    } catch {
        purchasing.value = false
        alert('Something went wrong. Please try again.')
    }
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(44, 36, 22, 0.88);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    display: flex;
    gap: 48px;
    max-width: 1100px;
    width: 100%;
    max-height: 85vh;
    align-items: center;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
}

.modal-image {
    flex: 1.3;
    max-height: 80vh;
}

.modal-image img {
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
}

.modal-details {
    flex: 0.7;
    color: var(--color-text-light);
    padding: 20px 0;
}

.modal-title {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 300;
    margin: 0 0 8px;
    line-height: 1.2;
}

.modal-year {
    font-family: var(--font-body);
    font-size: 13px;
    letter-spacing: 1.5px;
    color: var(--color-tan-light);
    margin: 0 0 32px;
    text-transform: uppercase;
}

.detail-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
}

.detail-label {
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--color-tan);
}

.detail-value {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-text-light);
}

.modal-price {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 300;
    color: var(--color-text-light);
    margin: 0 0 28px;
}

.purchase-btn {
    width: 100%;
    padding: 16px;
    background: var(--color-gold);
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 500;
    transition: background 0.3s ease;
}

.purchase-btn:hover:not(:disabled) {
    background: var(--color-gold-light);
}

.purchase-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.purchase-note {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-tan);
    text-align: center;
    margin: 12px 0 0;
    line-height: 1.6;
}

.close-btn {
    position: absolute;
    top: -20px;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-tan-light);
    font-size: 28px;
    font-weight: 200;
    font-family: var(--font-display);
    transition: color 0.3s ease;
}

.close-btn:hover {
    color: var(--color-text-light);
}

@media (max-width: 768px) {
    .modal-content {
        flex-direction: column;
        gap: 24px;
        overflow-y: auto;
    }

    .modal-image {
        flex: none;
        width: 100%;
    }

    .modal-details {
        flex: none;
        width: 100%;
    }
}
</style>
