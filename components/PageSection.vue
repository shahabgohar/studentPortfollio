<script lang="ts" setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <section class="w-full border-black text-4xl border-b-8">
        {{ title }}
    </section>
</template>