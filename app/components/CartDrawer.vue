<template>
    <Teleport to="body">
        <div v-if="cartOpen" class="cart-backdrop" @click="closeCart">
            <div class="cart-drawer" @click.stop>
                <div class="cart-header">
                    <h2 class="cart-title">Your Cart</h2>
                    <button class="cart-close" @click="closeCart">
                        &#10005;
                    </button>
                </div>

                <div v-if="cartItems.length === 0" class="cart-empty">
                    <p class="cart-empty-text">Your cart is empty</p>
                    <button class="continue-btn" @click="closeCart">
                        Continue Shopping
                    </button>
                </div>

                <template v-else>
                    <div class="cart-items">
                        <div
                            v-for="item in cartItems"
                            :key="item.cartId"
                            class="cart-item"
                        >
                            <div v-if="item.image" class="cart-item-image">
                                <NuxtImg
                                    :src="item.image"
                                    :alt="item.title"
                                    width="72"
                                    height="90"
                                />
                            </div>
                            <div class="cart-item-details">
                                <h3 class="cart-item-title">
                                    {{ item.title }}
                                </h3>
                                <p class="cart-item-option">
                                    {{ item.optionLabel }}
                                </p>
                                <p class="cart-item-price">
                                    ${{ item.price.toLocaleString() }}
                                </p>
                                <div
                                    v-if="!isOriginalOption(item.optionLabel)"
                                    class="quantity-controls"
                                >
                                    <button
                                        class="qty-btn"
                                        @click="
                                            updateQuantity(
                                                item.cartId,
                                                item.quantity - 1
                                            )
                                        "
                                    >
                                        &minus;
                                    </button>
                                    <span class="qty-value">{{
                                        item.quantity
                                    }}</span>
                                    <button
                                        class="qty-btn"
                                        @click="
                                            updateQuantity(
                                                item.cartId,
                                                item.quantity + 1
                                            )
                                        "
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                class="cart-item-remove"
                                @click="removeFromCart(item.cartId)"
                            >
                                &#10005;
                            </button>
                        </div>
                    </div>

                    <div class="cart-footer">
                        <div class="cart-subtotal">
                            <span class="subtotal-label">Subtotal</span>
                            <span class="subtotal-value">
                                ${{ cartTotal.toLocaleString() }}
                            </span>
                        </div>
                        <button
                            class="checkout-btn"
                            :disabled="checkingOut"
                            @click="handleCheckout"
                        >
                            {{
                                checkingOut
                                    ? 'Redirecting to checkout\u2026'
                                    : 'Checkout'
                            }}
                        </button>
                        <p class="checkout-note">
                            Free shipping within the US &middot; Secure checkout
                            via Stripe
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const {
    cartItems,
    cartOpen,
    cartTotal,
    removeFromCart,
    updateQuantity,
    closeCart,
} = useCart()

const checkingOut = ref(false)

async function handleCheckout() {
    if (checkingOut.value) return
    checkingOut.value = true

    try {
        const { url } = await $fetch('/api/checkout', {
            method: 'POST',
            body: {
                items: cartItems.value.map((item) => ({
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    paintingId: item.paintingId,
                    optionLabel: item.optionLabel,
                    quantity: item.quantity,
                })),
            },
        })
        if (url) {
            window.location.href = url
        }
    } catch {
        checkingOut.value = false
        alert('Something went wrong. Please try again.')
    }
}
</script>

<style scoped>
.cart-backdrop {
    position: fixed;
    inset: 0;
    z-index: 300;
    background: rgba(44, 36, 22, 0.6);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
}

.cart-drawer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 420px;
    max-width: 100vw;
    background: var(--color-cream, #faf8f4);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px;
    border-bottom: 1px solid rgba(168, 148, 120, 0.2);
}

.cart-title {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 0;
}

.cart-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: var(--color-tan);
    transition: color 0.3s ease;
}

.cart-close:hover {
    color: var(--color-brown-dark);
}

.cart-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 40px;
}

.cart-empty-text {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 300;
    color: var(--color-tan);
    font-style: italic;
    margin: 0;
}

.continue-btn {
    background: none;
    border: 1px solid var(--color-tan);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-brown-text);
    padding: 12px 24px;
    transition: all 0.3s ease;
}

.continue-btn:hover {
    border-color: var(--color-gold);
    color: var(--color-gold);
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 16px 28px;
}

.cart-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(168, 148, 120, 0.15);
    position: relative;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 72px;
    height: 90px;
    flex-shrink: 0;
    background: #e8e2d8;
}

.cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cart-item-details {
    flex: 1;
    min-width: 0;
}

.cart-item-title {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 0 20px 4px 0;
}

.cart-item-option {
    font-family: var(--font-body);
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin: 0 0 8px;
}

.cart-item-price {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
    margin: 0;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

.qty-btn {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(168, 148, 120, 0.3);
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--color-brown-text);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.qty-btn:hover {
    border-color: var(--color-gold);
    color: var(--color-gold);
}

.qty-value {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-dark);
    min-width: 20px;
    text-align: center;
}

.cart-item-remove {
    position: absolute;
    top: 16px;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    color: var(--color-tan);
    transition: color 0.3s ease;
}

.cart-item-remove:hover {
    color: var(--color-brown-dark);
}

.cart-footer {
    padding: 24px 28px;
    border-top: 1px solid rgba(168, 148, 120, 0.2);
}

.cart-subtotal {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.subtotal-label {
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--color-tan);
}

.subtotal-value {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 300;
    color: var(--color-brown-dark);
}

.checkout-btn {
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

.checkout-btn:hover:not(:disabled) {
    background: var(--color-gold-light);
}

.checkout-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.checkout-note {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-tan);
    text-align: center;
    margin: 12px 0 0;
    line-height: 1.6;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

@media (max-width: 768px) {
    .cart-drawer {
        width: 100vw;
    }
}
</style>
