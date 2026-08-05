const cartItems = ref([])
const cartOpen = ref(false)

const itemCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

export function useCart() {
    function addToCart(painting, option) {
        const cartId = `${painting.id}_${option.label}`
        const existing = cartItems.value.find((i) => i.cartId === cartId)

        if (existing) {
            if (isOriginalOption(option.label)) return
            existing.quantity++
        } else {
            cartItems.value.push({
                cartId,
                paintingId: painting.id,
                title: painting.title,
                artist: painting.artist,
                image: painting.image,
                optionLabel: option.label,
                price: option.price,
                quantity: 1,
            })
        }
    }

    function removeFromCart(cartId) {
        cartItems.value = cartItems.value.filter((i) => i.cartId !== cartId)
    }

    function updateQuantity(cartId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(cartId)
            return
        }
        const item = cartItems.value.find((i) => i.cartId === cartId)
        if (item) {
            if (isOriginalOption(item.optionLabel)) return
            item.quantity = newQuantity
        }
    }

    function clearCart() {
        cartItems.value = []
    }

    function toggleCart() {
        cartOpen.value = !cartOpen.value
    }

    function openCart() {
        cartOpen.value = true
    }

    function closeCart() {
        cartOpen.value = false
    }

    return {
        cartItems,
        cartOpen,
        itemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
    }
}
