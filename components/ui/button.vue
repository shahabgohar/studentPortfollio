<script lang="ts" setup>
const props = defineProps({
    title: String,
    iconName: String
})
</script>

<template>
    <button class="flex items-center justify-center max-sm:px-3 max-sm:py-1 max-lg:px-6  py-3.5 px-12 rounded-md border border-primary">
            <div class="max-sm:text-xl max-lg:text-2xl text-4xl h-16 flex items-center justify-center space-x-4">
              <div class="">{{ title }}</div>
              <Icon v-if="iconName" class="max-md:w-6 max-md:h-6 max-lg:w-9 max-lg:h-9 w-11 h-11" :name="iconName"></Icon>
            </div>
    </button>
</template>