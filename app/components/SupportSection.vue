<template>
    <section id="fuel-the-artists" class="support-section">
        <div class="support-container">
            <div class="section-header">
                <p class="section-label">Fuel the Artists</p>
                <h2 class="section-title">Help Support Our Coffee Addiction</h2>
            </div>

            <div class="support-grid">
                <div class="support-card">
                    <h3 class="card-title">Buy Us a Coffee</h3>
                    <p class="card-description">
                        Love the art, but can't commit? Buy us a coffee to help
                        keep us going, or send a donation to show your
                        appreciation for our work.
                    </p>

                    <div class="amount-buttons">
                        <button
                            v-for="preset in presetAmounts"
                            :key="preset"
                            :class="[
                                'amount-btn',
                                { active: selectedAmount === preset },
                            ]"
                            @click="selectPreset(preset)"
                        >
                            ${{ preset }}
                        </button>
                    </div>

                    <div class="custom-amount">
                        <label class="form-label">Custom Amount</label>
                        <div class="input-wrapper">
                            <span class="dollar-prefix">$</span>
                            <input
                                v-model="customAmount"
                                type="number"
                                min="1"
                                placeholder="Other amount"
                                class="form-input amount-input"
                                @input="selectedAmount = null"
                            />
                        </div>
                    </div>

                    <p v-if="error" class="error-message">{{ error }}</p>

                    <button
                        class="tip-btn"
                        :disabled="sending"
                        @click="handleTip"
                    >
                        {{ sending ? 'Redirecting...' : 'Send Tip' }}
                    </button>

                    <p class="stripe-note">Secure checkout via Stripe</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const presetAmounts = [5, 15, 25]
const selectedAmount = ref(null)
const customAmount = ref('')
const sending = ref(false)
const error = ref('')

function selectPreset(amount) {
    selectedAmount.value = amount
    customAmount.value = ''
    error.value = ''
}

async function handleTip() {
    const amount = selectedAmount.value || Number(customAmount.value)

    if (!amount || amount < 1) {
        error.value = 'Please select or enter an amount of at least $1.'
        return
    }

    sending.value = true
    error.value = ''

    try {
        const { url } = await $fetch('/api/tip', {
            method: 'POST',
            body: { amount },
        })
        if (url) {
            window.location.href = url
        }
    } catch {
        error.value = 'Something went wrong. Please try again.'
        sending.value = false
    }
}
</script>

<style scoped>
.support-section {
    padding: 120px 40px;
    background: var(--color-cream);
}

.support-container {
    max-width: 900px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.support-grid {
    max-width: 480px;
    margin: 0 auto;
}

.support-card {
    padding: 48px 40px;
    border: 1px solid rgba(168, 148, 120, 0.2);
}

.card-title {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 300;
    color: var(--color-brown-dark);
    margin: 0 0 12px;
}

.card-description {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-brown-text);
    margin: 0 0 32px;
    line-height: 1.6;
}

.amount-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 28px;
}

.amount-btn {
    flex: 1;
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

.amount-btn.active {
    background: var(--color-brown-dark);
    color: var(--color-text-light);
    border-color: var(--color-brown-dark);
}

.amount-btn:hover:not(.active) {
    border-color: var(--color-brown-text);
}

.custom-amount {
    margin-bottom: 28px;
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

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.dollar-prefix {
    position: absolute;
    left: 0;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--color-tan);
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

.amount-input {
    padding-left: 14px;
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.amount-input[type='number'] {
    -moz-appearance: textfield;
}

.error-message {
    font-family: var(--font-body);
    font-size: 13px;
    color: #b44;
    margin: 0 0 16px;
    text-align: center;
}

.tip-btn {
    width: 100%;
    padding: 18px;
    background: var(--color-gold);
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 500;
    transition: background 0.3s ease;
    margin-bottom: 12px;
}

.tip-btn:hover:not(:disabled) {
    background: var(--color-gold-light);
}

.tip-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.stripe-note {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-tan);
    text-align: center;
    margin: 0;
    letter-spacing: 0.5px;
}

@media (max-width: 768px) {
    .support-section {
        padding: 80px 20px;
    }

    .support-card {
        padding: 36px 28px;
    }

    .card-title {
        font-size: 22px;
    }

    .amount-buttons {
        flex-wrap: wrap;
    }
}
</style>
