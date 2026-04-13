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
                <NuxtImg :src="current.image" :alt="current.name" loading="lazy" sizes="sm:100vw md:50vw" />
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
        image: '/images/Melissa.jpg',
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
        image: '/images/Madison.png',
        bio: [
            "Heyooo!! I'm Madison, but I go by Starlight on all my socials. I started drawing in about February of 2024, after my parents divorced. Both of them are much happier now, by the way. :3",
            "I started drawing to cope with everything, but I was much less than perfect. I started by tracing other artwork, and improving with that by tracing different styles and positions.",
            "After that, I started just drawing any pictures that I saw. Most of the time I got at least ten things wrong, but like I said, no one is perfect. Usually it was the hands, or some weird position of the legs.",
            "After that, I started developing my own designs of some characters, and practicing on my own without tracing or looking at much of a base. I soon got a drawing app on my tablet, and got experience with that, then moved to PC and a tablet specifically for drawing.",
            "I would draw in school, when I was bored, in waiting rooms, on paper, on tablet— least to say, I drew in a lot of places and on different things, including homework. A H E M. ANYWAY—",
            "I slowly got better and better, and I'm definitely still improving, but I'm at least confident enough to post my art now. :3",
            "I started voice acting—or just doing impressions—about a year after that, starting with FNaF (Five Nights at Freddy's) roleplay, because that's what I like at the moment. I mainly focused on trying to voice Moon, because he was my favorite. He still is, lol.",
            "Anyways, I would make these tiny little animations on paper, and record my lines on the computer. That soon developed into me, quite literally, A N N O Y I N G my parents for like six months until I got this neat little game called VRChat (which almost breaks my PC every time I use it).",
            "Soon after, some other members of my mom's side of the family got VRChat too, and we made videos with it. Then I realized I would have to edit those videos, and that's where the suffering began. /j",
            "Those videos soon started getting somewhat popular (aka like 50 views), and we started making videos more often, as it was still the middle of summer break. The videos slowly got more popular, but then summer break ended, and we didn't really have time for videos.",
            "We took a short (ahem— three months) break, and then got back to it in about mid-January to mid-February of this year. We ended up restarting the channel, setting (most) of the old videos to private, and starting a whole new storyline.",
            "With, may I add, W A Y better writing, lmao.",
            "In late 2024, I started reading fanfics to cope with... well... everything, basically. It wasn't too long after that I started writing fanfics, but I don't know the exact date. I started on AO3 with FNaF (specifically TSAMS) AUs that I had, most of which involved Ruin, because he was my favorite. ;-;",
            "Anygays— I looked at others' writing and fanfics, and basically went from there. Most (all) of my old fanfics are deleted now, but I'm planning to write new ones. :3",
            "I started (attempting) 3D modeling exactly a week and one day (as I'm writing this, 4/2/26) ago, just starting with some texture painting for my YT channels and converting them for VRC. It really hasn't improved that much since, lol. (Except for VRChat SDK MAKING ME MAD.)",
            "ANYWAYS, that's all about me! Hope you enjoyed, and that this helps you know a little more of... whatever you were hoping to know, lol.",
        ],
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
    object-position: top;
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

    .about-image-wrapper {
        width: 160px;
        height: 160px;
    }

    .about-name {
        font-size: 24px;
    }

    .about-text {
        font-size: 16px;
    }
}
</style>
