<template>
    <footer class="footer">
        <p class="footer-brand">Christine's Studio</p>
        <p class="footer-copy">
            © {{ currentYear }} All rights reserved · Original fine art from
            Minnesota
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
</style>
