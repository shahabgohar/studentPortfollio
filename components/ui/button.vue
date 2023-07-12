<script lang="ts" setup>
const props = defineProps({
    title: String,
    iconName: String
})
</script>

<template>
    <button class="flex items-center justify-center py-3.5 px-12 rounded-md border border-black">
            <div class="text-4xl h-16 flex items-center justify-center space-x-4">
              <div class="">{{ title }}</div>
              <Icon v-if="iconName" :name="iconName"></Icon>
            </div>
    </button>
</template>