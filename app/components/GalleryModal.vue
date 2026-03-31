<template>
    <Teleport to="body">
        <div v-if="item" class="modal-backdrop" @click="$emit('close')">
            <div class="modal-content" @click.stop>
                <div v-if="item.image" class="modal-image">
                    <img :src="item.image" :alt="item.title" />
                </div>
                <div v-else class="modal-text-body">
                    <div v-if="typeof item.body === 'string'" class="body-plain">
                        {{ item.body }}
                    </div>
                    <SanityContent v-else-if="item.body" :value="item.body" />
                </div>
                <div class="modal-details">
                    <h2 class="modal-title">{{ item.title }}</h2>
                    <p v-if="item.year" class="modal-year">{{ item.year }}</p>
                    <div class="gold-line" style="margin: 0 0 32px" />

                    <div class="detail-rows">
                        <div v-if="item.medium" class="detail-row">
                            <span class="detail-label">Medium</span>
                            <span class="detail-value">{{ item.medium }}</span>
                        </div>
                        <div v-if="item.dimensions" class="detail-row">
                            <span class="detail-label">Dimensions</span>
                            <span class="detail-value">{{ item.dimensions }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Artist</span>
                            <span class="detail-value artist-name">{{ item.artist }}</span>
                        </div>
                        <div v-if="item.price" class="detail-row">
                            <span class="detail-label">Status</span>
                            <span class="detail-value">Available</span>
                        </div>
                    </div>

                    <template v-if="buyingOptions.length > 0">
                        <div v-if="buyingOptions.length > 1" class="option-selector">
                            <label class="option-label" for="purchase-option">Purchase Option</label>
                            <select
                                id="purchase-option"
                                v-model="selectedOptionIndex"
                                class="option-select"
                            >
                                <option
                                    v-for="(opt, i) in buyingOptions"
                                    :key="i"
                                    :value="i"
                                >
                                    {{ opt.label }} — ${{ opt.price.toLocaleString() }}
                                </option>
                            </select>
                        </div>
                        <p class="modal-price">
                            ${{ selectedOption.price.toLocaleString() }}
                        </p>
                        <button
                            class="purchase-btn"
                            :disabled="addedToCart"
                            @click="handleAddToCart"
                        >
                            {{
                                addedToCart
                                    ? 'Added to Cart!'
                                    : `Add ${selectedOption.label} to Cart`
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
    item: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const { addToCart, openCart } = useCart()
const addedToCart = ref(false)
const selectedOptionIndex = ref(0)

const buyingOptions = computed(() => {
    if (!props.item) return []

    if (props.item.purchaseOptions && props.item.purchaseOptions.length > 0) {
        return props.item.purchaseOptions
            .filter((opt) => !(opt.label.toLowerCase() === 'original' && props.item.sold))
            .map((opt) => ({
                label: opt.label,
                price: opt.price,
            }))
    }

    if (props.item.price && !props.item.sold) {
        return [
            {
                label: 'Original',
                price: props.item.price,
            },
        ]
    }

    return []
})

const selectedOption = computed(() => buyingOptions.value[selectedOptionIndex.value] || buyingOptions.value[0])

watch(buyingOptions, () => {
    if (selectedOptionIndex.value >= buyingOptions.value.length) {
        selectedOptionIndex.value = 0
    }
})

function handleAddToCart() {
    if (!props.item || !selectedOption.value || addedToCart.value) return
    addToCart(props.item, selectedOption.value)
    addedToCart.value = true
    setTimeout(() => {
        addedToCart.value = false
        emit('close')
        openCart()
    }, 600)
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

.modal-text-body {
    flex: 1.3;
    max-height: 80vh;
    overflow-y: auto;
    padding: 48px 40px;
    background: var(--color-cream, #faf8f4);
    color: var(--color-brown-dark);
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.9;
    white-space: pre-line;
}

.body-plain {
    white-space: pre-line;
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

.detail-value.artist-name {
    text-transform: capitalize;
}

.option-selector {
    margin-bottom: 20px;
}

.option-label {
    display: block;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin-bottom: 8px;
}

.option-select {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--color-text-light);
    font-family: var(--font-body);
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c4a97d' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    transition: border-color 0.3s ease;
}

.option-select:hover {
    border-color: var(--color-gold);
}

.option-select:focus {
    outline: none;
    border-color: var(--color-gold);
}

.option-select option {
    background: var(--color-brown-dark, #3a3028);
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

    .modal-image,
    .modal-text-body {
        flex: none;
        width: 100%;
    }

    .modal-details {
        flex: none;
        width: 100%;
    }
}
</style>
