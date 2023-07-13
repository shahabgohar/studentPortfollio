<script lang="ts" setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <section :id="title" class="w-full font-bold border-black text-4xl border-b-8">
        {{ title }}
    </section>
</template>