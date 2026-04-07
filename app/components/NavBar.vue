<template>
    <nav :class="['navbar', { scrolled: scrolled || menuOpen, 'menu-open': menuOpen }]">
        <div class="navbar-brand" @click="$emit('navigate', 'Home')">
            mfp studios
        </div>
        <div class="navbar-links">
            <button
                v-for="item in navItems"
                :key="item"
                :class="['nav-link', { active: active === item }]"
                @click="$emit('navigate', item)"
            >
                {{ item }}
            </button>
        </div>
        <div class="navbar-icons">
            <button class="nav-icon" title="Contact" @click="$emit('navigate', 'Contact')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </button>
            <button class="nav-icon cart-icon" title="Cart" @click="toggleCart()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span v-if="itemCount > 0" class="cart-badge">{{ itemCount }}</span>
            </button>
            <a class="nav-icon" href="https://www.instagram.com/christinefreundschula" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
                <span />
                <span />
                <span />
            </button>
        </div>
        <div class="mobile-menu" :class="{ open: menuOpen }">
            <button
                v-for="item in navItems"
                :key="item"
                :class="['mobile-link', { active: active === item }]"
                @click="handleMobileNav(item)"
            >
                {{ item }}
            </button>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    active: { type: String, default: 'gallery' },
    scrolled: { type: Boolean, default: false },
})

const emit = defineEmits(['navigate'])

const { itemCount, toggleCart } = useCart()

const menuOpen = ref(false)

const navItems = ['Gallery', 'Shop', 'About', 'Fuel the Artists', 'Blog', 'Socials', 'Contact']

function handleMobileNav(item) {
    menuOpen.value = false
    emit('navigate', item)
}
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 28px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar.scrolled {
    padding: 16px 40px;
    background: rgba(252, 250, 247, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(168, 148, 120, 0.15);
}

.navbar-brand {
    font-family: var(--font-cursive);
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 1px;
    color: var(--color-brown-dark);
    cursor: pointer;
}

.navbar-links {
    display: flex;
    gap: 36px;
    align-items: center;
}

.nav-link {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-brown-text);
    font-weight: 400;
    padding: 4px 0;
    border-bottom: 1.5px solid transparent;
    transition: all 0.3s ease;
}

.nav-link:hover {
    color: var(--color-gold);
}

.nav-link.active {
    color: var(--color-gold);
    font-weight: 500;
    border-bottom-color: var(--color-gold);
}

.navbar-icons {
    display: flex;
    gap: 20px;
    align-items: center;
}

.nav-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-brown-text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: color 0.3s ease;
    text-decoration: none;
}

.nav-icon:hover {
    color: var(--color-gold);
}

.cart-icon {
    position: relative;
}

.cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--color-gold);
    color: #fff;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--color-brown-dark);
    transition: all 0.3s ease;
    transform-origin: center;
}

.hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
    opacity: 0;
}

.hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
}

.mobile-menu {
    display: none;
}

@media (max-width: 768px) {
    .navbar {
        padding: 16px 20px;
        flex-wrap: wrap;
    }

    .navbar.scrolled {
        padding: 12px 20px;
    }

    .navbar-brand {
        font-size: 20px;
        letter-spacing: 2px;
    }

    .navbar-links {
        display: none;
    }

    .navbar-icons {
        gap: 16px;
    }

    .nav-icon svg {
        width: 18px;
        height: 18px;
    }

    .hamburger {
        display: flex;
    }

    .mobile-menu {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease;
        padding: 0 8px;
        background: rgba(252, 250, 247, 0.98);
        backdrop-filter: blur(12px);
        margin: 0 -20px;
        padding-left: 28px;
        padding-right: 28px;
    }

    .mobile-menu.open {
        max-height: 500px;
        padding-top: 16px;
        padding-bottom: 8px;
        border-top: 1px solid rgba(168, 148, 120, 0.15);
    }

    .mobile-link {
        background: none;
        border: none;
        cursor: pointer;
        font-family: var(--font-body);
        font-size: 14px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--color-brown-text);
        font-weight: 400;
        padding: 12px 0;
        text-align: left;
        border-bottom: 1px solid rgba(168, 148, 120, 0.1);
        transition: color 0.3s ease;
    }

    .mobile-link:last-child {
        border-bottom: none;
    }

    .mobile-link:hover,
    .mobile-link.active {
        color: var(--color-gold);
    }
}
</style>
