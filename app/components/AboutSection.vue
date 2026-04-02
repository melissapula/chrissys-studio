<template>
    <section id="about" class="about-section">
        <div class="about-header">
            <p class="section-label">The Artists</p>
            <h2 class="section-title">About</h2>
            <div class="filter-buttons">
                <button
                    v-for="a in artists"
                    :key="a.value"
                    :class="['filter-btn', { active: selectedArtist === a.value }]"
                    @click="selectedArtist = a.value"
                >
                    {{ a.label }}
                </button>
            </div>
        </div>
        <div class="about-container">
            <div v-if="current.image" class="about-image-wrapper">
                <div class="image-shield" />
                <img :src="current.image" :alt="current.name" />
            </div>
            <div class="about-scroll-area">
                <h3 class="about-name">{{ current.name }}</h3>
                <div class="gold-line" style="margin: 24px 0" />
                <p
                    v-for="(paragraph, i) in current.bio"
                    :key="i"
                    class="about-text"
                    :style="i === current.bio.length - 1 ? 'margin-bottom: 32px' : ''"
                >
                    {{ paragraph }}
                </p>
                <div class="about-stats">
                    <div v-for="stat in current.stats" :key="stat.label" class="stat">
                        <p class="stat-label">{{ stat.label }}</p>
                        <p class="stat-value">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedArtist = ref('chrissy')

const artists = [
    { label: 'Chrissy', value: 'chrissy' },
    { label: 'Melissa', value: 'melissa' },
    { label: 'Madison', value: 'madison' },
    { label: 'Elsa', value: 'elsa' },
]

const profiles = {
    chrissy: {
        name: 'Chrissy',
        image: '/images/Chrissy.jpg',
        bio: [
            "I'm a self-taught visual artist with a career in Music Education and a Masters in Special Education — focusing on students with Emotional and Behavioral Disorders (wtf, I know).",
            "My entire life has been focused on understanding the world around me and using that information to help others. I've made it my life's work to help others realize their potential and cheer them on in hopes that they'll go forth in their lives being the best version of themselves and be a fearless and unapologetic positive contributor to the world.",
            'In whatever I do, I strive to improve the world around me. And in 2021, I came to the realization that in order to remain a positive contributor to our young people and the community I live in, I must be fearless and unapologetic myself.',
            'Turning that focus towards myself has been the most wild rollercoaster of my life to date. I am happiest when I am creating and as I create, I not only find strength and solace within myself, but feel that I am becoming who I need to be at this point in my life (an awakening, if you will).',
            'I take inspiration from my present as well as my past. And as I continue to be curious and create different art in my journey to become more fearless and unapologetic, it is my true hope that looking through my art might evoke something within you.',
            'Be fearless. Be unapologetic. Be curious.',
            "Create your journey,\ndon't let your journey create you.",
            '— Chrissy',
        ],
        stats: [
            { label: 'Based in', value: 'Minnesota' },
            { label: 'Medium', value: 'Acrylic & Mixed Media' },
            { label: 'Works', value: '8+ Originals' },
        ],
    },
    melissa: {
        name: 'Melissa',
        bio: [
            "Hi, I'm Missa — a full-stack software engineer by day and a writer by heart.",
            'On the technical side, I build things that live at the intersection of functionality and craft. My work spans front-end architecture, design systems, and data visualization, with a deep focus on creating interfaces that are both powerful and intuitive. I care about writing clean, maintainable code and building tools that genuinely make people\'s lives easier.',
            'But software is only part of the story.',
            "I've always been drawn to words — the kind that don't fit neatly into a code editor. I write poetry, songs, and short stories: sometimes raw and honest, sometimes playful, always personal. Writing is where I slow down, sit with an idea, and let it become something real.",
            "Whether I'm debugging a tricky component or chasing the right line in a poem, the process feels the same to me — a problem worth solving, a thing worth making beautiful.",
            'Thanks for being here.',
        ],
        stats: [],
    },
    madison: {
        name: 'Madison',
        bio: ['Content coming soon.'],
        stats: [],
    },
    elsa: {
        name: 'Elsa',
        bio: ['Content coming soon.'],
        stats: [],
    },
}

const current = computed(() => profiles[selectedArtist.value])
</script>

<style scoped>
.about-section {
    padding: 120px 40px;
    background: var(--color-cream);
}

.about-header {
    text-align: center;
    margin-bottom: 60px;
}

.filter-buttons {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
}

.filter-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
    font-weight: 400;
    padding: 8px 4px;
    border-bottom: 1.5px solid transparent;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    color: var(--color-gold);
}

.filter-btn.active {
    color: var(--color-gold);
    font-weight: 500;
    border-bottom-color: var(--color-gold);
}

.about-container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 60px;
    align-items: start;
}

.about-container:not(:has(.about-image-wrapper)) {
    grid-template-columns: 1fr;
    max-width: 700px;
}

.about-image-wrapper {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(168, 148, 120, 0.3);
    flex-shrink: 0;
}

.about-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.about-scroll-area {
    max-height: 50vh;
    overflow-y: auto;
    padding-right: 16px;
}

.about-scroll-area::-webkit-scrollbar {
    width: 4px;
}

.about-scroll-area::-webkit-scrollbar-track {
    background: transparent;
}

.about-scroll-area::-webkit-scrollbar-thumb {
    background: var(--color-tan-light);
    border-radius: 2px;
}

.about-scroll-area::-webkit-scrollbar-thumb:hover {
    background: var(--color-tan);
}

.about-name {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0;
}

.about-text {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--color-brown-text);
    line-height: 1.8;
    margin: 0 0 20px;
    font-weight: 300;
}

.about-stats {
    padding: 24px 0 0;
    border-top: 1px solid rgba(168, 148, 120, 0.25);
    display: flex;
    gap: 40px;
}

.stat-label {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
    margin: 0 0 4px;
}

.stat-value {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--color-brown-dark);
    margin: 0;
    font-weight: 400;
}

@media (max-width: 768px) {
    .about-section {
        padding: 80px 20px;
    }

    .about-container {
        grid-template-columns: 1fr;
        gap: 32px;
        justify-items: center;
    }

    .filter-buttons {
        flex-wrap: wrap;
        gap: 12px;
    }
}
</style>
