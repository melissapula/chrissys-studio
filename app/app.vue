<template>
    <NuxtPage />
</template>

<script setup>
onMounted(() => {
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('img')) e.preventDefault()
    })
    document.addEventListener('dragstart', (e) => {
        if (e.target.closest('img')) e.preventDefault()
    })
})
</script>
