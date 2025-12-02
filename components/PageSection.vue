<script lang="ts" setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <section :id="title" class="max-lg:text-3xl w-full font-bold text-4xl relative pb-4">
        <span class="cosmic-text-glow">{{ title }}</span>
        <div class="cosmic-divider absolute bottom-0 left-0 w-full"></div>
    </section>
</template>