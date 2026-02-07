<template>
    <nav :class="['navbar', { scrolled }]">
        <div class="navbar-brand" @click="$emit('navigate', 'gallery')">
            Christine's Studio
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
    </nav>
</template>

<script setup>
defineProps({
    active: { type: String, default: 'gallery' },
    scrolled: { type: Boolean, default: false },
})

defineEmits(['navigate'])

const navItems = ['Gallery', 'Shop', 'About', 'Contact']
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
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 300;
    letter-spacing: 3px;
    color: var(--color-brown-dark);
    cursor: pointer;
    text-transform: uppercase;
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

@media (max-width: 768px) {
    .navbar {
        padding: 16px 20px;
    }

    .navbar-brand {
        font-size: 20px;
        letter-spacing: 2px;
    }

    .navbar-links {
        gap: 16px;
    }

    .nav-link {
        font-size: 11px;
        letter-spacing: 1px;
    }
}
</style>
