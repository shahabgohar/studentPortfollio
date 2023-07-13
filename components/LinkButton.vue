<script lang="ts" setup>
const props = defineProps({
    title: String,
    link: String,
    icon: String
})
</script>

<template>
    <a 
    :href="link" 
    target="blank" 
    class="max-sm:w-12 max-sm:h-12 max-lg:w-16 max-lg:h-16 w-20 h-20 bg-grey flex justify-center items-center drop-shadow-md  rounded-full bg-grey-600">
    <img class="max-sm:w-6 max-sm:h-6 max-lg:w-9 max-lg:h-9 h-12 w-12" :src="icon"/>
    </a>
</template>