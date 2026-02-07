<template>
    <footer class="footer">
        <p class="footer-brand">Christine's Studio</p>
        <p class="footer-copy">
            © {{ currentYear }} All rights reserved · Original fine art from
            Minnesota
        </p>
        <p class="footer-credit">
            Built by Melissa Freundschuh-Pula with Claude Code ·
            <a
                href="https://www.linkedin.com/in/melissa-freundschuh-pula-833748172"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn</a
            >
        </p>
    </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
    padding: 48px 40px;
    background: var(--color-brown-dark);
    text-align: center;
}

.footer-brand {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 2px;
    color: var(--color-tan-light);
    margin: 0 0 16px;
    text-transform: uppercase;
}

.footer-copy {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--color-muted);
    margin: 0;
    letter-spacing: 1px;
}

.footer-credit {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-muted);
    margin: 24px 0 0;
    letter-spacing: 0.5px;
    opacity: 0.7;
}

.footer-credit a {
    color: var(--color-tan-light);
    text-decoration: none;
}

.footer-credit a:hover {
    text-decoration: underline;
}
</style>
