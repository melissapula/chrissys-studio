<template>
    <div>
        <NavBar
            :active="activeSection"
            :scrolled="scrolled"
            @navigate="handleNavigate"
        />
        <HeroSection @navigate="handleNavigate" />
        <GallerySection @select="selectedPainting = $event" />
        <ShopSection @select="selectedPainting = $event" />
        <AboutSection />
        <ContactSection />
        <FooterSection />
        <PaintingModal
            :painting="selectedPainting"
            @close="selectedPainting = null"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import GallerySection from '../components/GallerySection.vue'
import ShopSection from '../components/ShopSection.vue'
import PaintingModal from '../components/PaintingModal.vue'
import AboutSection from '~/components/AboutSection.vue'
import ContactSection from '~/components/ContactSection.vue'
import FooterSection from '~/components/FooterSection.vue'

const activeSection = ref('Gallery')
const scrolled = ref(false)
const selectedPainting = ref(null)

function handleScroll() {
    scrolled.value = window.scrollY > 60
}

function handleNavigate(section) {
    activeSection.value = section
    const el = document.getElementById(section.toLowerCase())
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
