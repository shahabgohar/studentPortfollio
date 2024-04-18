<script lang="ts" setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <section :id="title" class="max-lg:text-3xl max-lg:border-b-4 w-full font-bold border-primary text-4xl border-b-8">
        {{ title }}
    </section>
</template>