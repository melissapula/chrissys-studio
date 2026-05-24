<template>
    <div>
        <NavBar
            :active="activeSection"
            :scrolled="scrolled"
            @navigate="handleNavigate"
        />
        <HeroSection @navigate="handleNavigate" />
        <GallerySection @select="selectedItem = $event" />
        <ShopSection @select="selectedItem = $event" />
        <AboutSection />
        <SupportSection />
        <SocialsSection />
        <ContactSection />
        <FooterSection />
        <GalleryModal :item="selectedItem" @close="selectedItem = null" />
        <CartDrawer />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import GallerySection from '../components/GallerySection.vue'
import ShopSection from '../components/ShopSection.vue'
import GalleryModal from '../components/GalleryModal.vue'
import AboutSection from '~/components/AboutSection.vue'
import SupportSection from '~/components/SupportSection.vue'
import SocialsSection from '~/components/SocialsSection.vue'
import ContactSection from '~/components/ContactSection.vue'
import FooterSection from '~/components/FooterSection.vue'
import CartDrawer from '~/components/CartDrawer.vue'

const activeSection = ref('Gallery')
const scrolled = ref(false)
const selectedItem = ref(null)

function handleScroll() {
    scrolled.value = window.scrollY > 60
}

function handleNavigate(section) {
    if (section === 'Blog') {
        navigateTo('/blog')
        return
    }
    activeSection.value = section
    const el = document.getElementById(
        section.toLowerCase().replace(/\s+/g, '-')
    )
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'mfp studios',
                url: 'https://fourseasonsstudio.com',
                logo: 'https://fourseasonsstudio.com/og-image.png',
                description:
                    'Original paintings, poetry, songs, and digital art from four creative voices. Art, writing, and digital creations from mfp studios.',
                sameAs: [],
            }),
        },
    ],
})

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
