<script lang="ts" setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <a href="" class="bg-grey flex justify-center items-center drop-shadow-md w-20 h-20 rounded-full bg-grey-600">
        <slot></slot>
    </a>
</template>