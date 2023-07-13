<script lang="ts" setup>
const props = defineProps({
    title: String,
    iconName: String
})
</script>

<template>
    <button class="flex items-center justify-center max-sm:px-3 max-sm:py-1 max-lg:px-6  py-3.5 px-12 rounded-md border border-black">
            <div class="max-sm:text-xl max-lg:text-3xl text-4xl h-16 flex items-center justify-center space-x-4">
              <div class="">{{ title }}</div>
              <Icon v-if="iconName" :name="iconName"></Icon>
            </div>
    </button>
</template>