<template>
    <div class="error-page">
        <p class="error-code">{{ error?.statusCode || 500 }}</p>
        <h1 class="error-title">
            {{
                error?.statusCode === 404
                    ? 'Page Not Found'
                    : 'Something Went Wrong'
            }}
        </h1>
        <p class="error-message">
            {{
                error?.statusCode === 404
                    ? "The page you're looking for doesn't exist or has been moved."
                    : 'An unexpected error occurred. Please try again.'
            }}
        </p>
        <div class="error-actions">
            <button class="error-btn" @click="handleError">
                Back to Gallery
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    error: { type: Object, default: null },
})

function handleError() {
    clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: var(--color-cream, #fcfaf7);
    text-align: center;
}

.error-code {
    font-family: 'Cormorant Garamond', serif;
    font-size: 120px;
    font-weight: 300;
    color: rgba(168, 148, 120, 0.2);
    line-height: 1;
    margin: 0 0 -20px;
}

.error-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #2c2416;
    margin: 0 0 16px;
}

.error-message {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #6b5d4f;
    max-width: 400px;
    line-height: 1.6;
    margin: 0 0 40px;
}

.error-btn {
    padding: 16px 40px;
    background: #8b6914;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 500;
    transition: background 0.3s ease;
}

.error-btn:hover {
    background: #a37d1a;
}

@media (max-width: 768px) {
    .error-code {
        font-size: 80px;
    }

    .error-title {
        font-size: 28px;
    }
}
</style>
