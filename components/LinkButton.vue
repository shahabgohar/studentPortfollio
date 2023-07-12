<script lang="ts" setup>
const props = defineProps({
    title: String,
    link: String,
    icon: String
})
</script>

<template>
    <a :href="link" target="blank" v-html="icon" class="bg-grey flex justify-center items-center drop-shadow-md w-20 h-20 rounded-full bg-grey-600">
    </a>
</template>