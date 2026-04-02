<template>
    <section id="socials" class="socials-section">
        <div class="socials-container">
            <div class="section-header">
                <p class="section-label">Connect</p>
                <h2 class="section-title">Socials</h2>
            </div>
            <div class="artists-grid">
                <div v-for="artist in artists" :key="artist.name" class="artist-socials">
                    <h3 class="artist-name">{{ artist.name }}</h3>
                    <div class="social-links">
                        <a
                            v-for="link in artist.links"
                            :key="link.url"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link"
                        >
                            {{ link.platform }}
                        </a>
                    </div>
                    <p v-if="artist.links.length === 0" class="coming-soon">Coming soon</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const artists = [
    {
        name: 'Chrissy',
        links: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/christine-freundschuh-pula-a8a044292/' },
            { platform: 'Instagram', url: 'https://www.instagram.com/christinefreundschula' },
        ],
    },
    {
        name: 'Melissa',
        links: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/melissa-freundschuh-pula-833748172' },
            { platform: 'Portfolio', url: 'https://melissapula.github.io/#/' },
            { platform: 'GitHub', url: 'https://github.com/melissapula' },
        ],
    },
    {
        name: 'Madison',
        links: [
            { platform: 'Tumblr', url: 'https://starlight-is-silly117.tumblr.com/?source=share' },
            { platform: 'YouTube (FNaF)', url: 'https://youtube.com/@starlight-is-silly117?si=Bjgs5r9Hr5ZSbGO7' },
            { platform: 'YouTube (Poppy Playtime)', url: 'https://youtube.com/@starlight_is_silly11707?si=NTczkWfYKKqDyd9N' },
            { platform: 'Discord', url: 'https://discord.com/users/1360336777700708574' },
        ],
    },
    {
        name: 'Elsa',
        links: [],
    },
]
</script>

<style scoped>
.socials-section {
    padding: 120px 40px;
    background: var(--color-cream);
}

.socials-container {
    max-width: 1000px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.artists-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    text-align: center;
}

.artist-name {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--color-brown-dark);
    margin: 0 0 16px;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.social-link {
    font-family: var(--font-body);
    font-size: 13px;
    letter-spacing: 1px;
    color: var(--color-gold);
    text-decoration: none;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: var(--color-gold-light);
}

.coming-soon {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 300;
    color: var(--color-tan);
    margin: 0;
    font-style: italic;
}

@media (max-width: 768px) {
    .socials-section {
        padding: 80px 20px;
    }

    .artists-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
    }
}
</style>
