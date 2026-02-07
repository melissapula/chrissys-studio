<template>
    <section id="contact" class="contact-section">
        <div class="contact-container">
            <div class="section-header">
                <p class="section-label">Get in Touch</p>
                <h2 class="section-title">Contact &amp; Commissions</h2>
                <p class="contact-subtitle">
                    Interested in a painting or a custom commission? I'd love to
                    hear from you.
                </p>
            </div>

            <div v-if="submitted" class="success-message">
                <div class="success-icon">✓</div>
                <h3 class="success-title">Thank you!</h3>
                <p class="success-text">
                    I'll get back to you within 48 hours.
                </p>
            </div>

            <div v-else>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Your name"
                            class="form-input"
                        />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="your@email.com"
                            class="form-input"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Inquiry Type</label>
                    <div class="type-buttons">
                        <button
                            v-for="option in inquiryTypes"
                            :key="option.value"
                            :class="[
                                'type-btn',
                                { active: form.type === option.value },
                            ]"
                            @click="form.type = option.value"
                        >
                            {{ option.label }}
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea
                        v-model="form.message"
                        placeholder="Tell me about what you're looking for..."
                        rows="5"
                        class="form-input form-textarea"
                    />
                </div>

                <p v-if="error" class="error-message">
                    Something went wrong. Please try again.
                </p>

                <button
                    class="submit-btn"
                    :disabled="sending"
                    @click="handleSubmit"
                >
                    {{ sending ? 'Sending...' : 'Send Message' }}
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    type: 'general',
    message: '',
})

const submitted = ref(false)

const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'purchase', label: 'Purchase Question' },
    { value: 'commission', label: 'Custom Commission' },
]

const sending = ref(false)
const error = ref(false)

async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return

    sending.value = true
    error.value = false

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                name: form.name,
                email: form.email,
                type: form.type,
                message: form.message,
            },
        })
        submitted.value = true
        form.name = ''
        form.email = ''
        form.type = 'general'
        form.message = ''
    } catch {
        error.value = true
    } finally {
        sending.value = false
    }
}
</script>

<style scoped>
.contact-section {
    padding: 120px 40px;
    background: var(--color-cream-dark);
}

.contact-container {
    max-width: 680px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.contact-subtitle {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--color-brown-text);
    font-weight: 300;
    margin: 0;
    line-height: 1.6;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 32px;
}

.form-group {
    margin-bottom: 32px;
}

.form-label {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-tan);
    display: block;
    margin-bottom: 8px;
}

.form-input {
    width: 100%;
    padding: 14px 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-tan-light);
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-dark);
    outline: none;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    border-bottom-color: var(--color-gold);
}

.form-textarea {
    resize: vertical;
    font-family: var(--font-body);
}

.type-buttons {
    display: flex;
    gap: 16px;
}

.type-btn {
    padding: 10px 20px;
    background: transparent;
    color: var(--color-brown-text);
    border: 1px solid var(--color-tan-light);
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.type-btn.active {
    background: var(--color-brown-dark);
    color: var(--color-text-light);
    border-color: var(--color-brown-dark);
}

.type-btn:hover:not(.active) {
    border-color: var(--color-brown-text);
}

.submit-btn {
    width: 100%;
    padding: 18px;
    background: var(--color-brown-dark);
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--color-text-light);
    font-weight: 500;
    transition: background 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
    background: var(--color-brown-mid);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    font-family: var(--font-body);
    font-size: 13px;
    color: #b44;
    margin: 0 0 16px;
    text-align: center;
}

.success-message {
    text-align: center;
    padding: 60px 20px;
    animation: fadeIn 0.4s ease;
}

.success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 24px;
    color: #fff;
}

.success-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0 0 8px;
}

.success-text {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
}

@media (max-width: 768px) {
    .contact-section {
        padding: 80px 20px;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .type-buttons {
        flex-direction: column;
    }
}
</style>
