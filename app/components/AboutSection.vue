<template>
    <section id="about" class="about-section">
        <div class="about-container">
            <div class="about-image-col">
                <div class="about-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80"
                        alt="Artist at work"
                    />
                    <div class="image-border" />
                </div>
            </div>
            <div class="about-text-col">
                <p class="section-label">The Artist</p>
                <h2 class="section-title">About Christine</h2>
                <div class="gold-line" style="margin: 24px 0" />
                <p class="about-text">
                    Christine is a painter based in Minnesota whose work
                    explores the intersection of light, landscape, and memory.
                    Working primarily in oils, each piece is a meditation on the
                    quiet beauty found in everyday moments.
                </p>
                <p class="about-text">
                    With over twenty years of creative practice, her paintings
                    capture the shifting quality of northern light — the way it
                    transforms familiar places into something luminous and new.
                </p>
                <p class="about-text" style="margin-bottom: 32px">
                    Every painting is an original, one-of-a-kind work. When it's
                    gone, it's gone — making each piece a unique addition to
                    your collection.
                </p>
                <div class="about-stats">
                    <div v-for="stat in stats" :key="stat.label" class="stat">
                        <p class="stat-label">{{ stat.label }}</p>
                        <p class="stat-value">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const stats = [
    { label: 'Based in', value: 'Minnesota' },
    { label: 'Medium', value: 'Oil & Acrylic' },
    { label: 'Works', value: '8+ Originals' },
]
</script>

<style scoped>
.about-section {
    padding: 120px 40px;
    background: var(--color-cream);
}

.about-container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: center;
}

.about-image-wrapper {
    aspect-ratio: 3/4;
    position: relative;
    overflow: hidden;
}

.about-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-border {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(168, 148, 120, 0.3);
    margin: 12px;
    pointer-events: none;
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
    .about-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .about-section {
        padding: 80px 20px;
    }
}
</style>
