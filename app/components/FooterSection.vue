<template>
    <footer class="footer">
        <p class="footer-brand">mfp studios</p>
        <p class="footer-copy">
            © {{ currentYear }} All rights reserved · Original fine art from
            Minnesota
        </p>
        <p class="footer-disclaimer">
            All rights reserved © {{ currentYear }} mfp studios and the
            respective artists. The artist retains full ownership of all works,
            including after sale. No part of any artwork may be reproduced,
            distributed, or transmitted in any form without prior written
            permission from the artist.
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
    font-family: var(--font-cursive);
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 1px;
    color: var(--color-tan-light);
    margin: 0 0 16px;
}

.footer-copy {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--color-muted);
    margin: 0;
    letter-spacing: 1px;
}

.footer-disclaimer {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-muted);
    margin: 20px auto 0;
    max-width: 560px;
    line-height: 1.7;
    letter-spacing: 0.5px;
    opacity: 0.7;
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
