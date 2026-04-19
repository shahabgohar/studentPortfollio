<script setup lang="ts">
defineProps<{
  title: string
  id?: string
}>()
</script>

<template>
  <div :id="id" class="mb-12">
    <h2 class="font-oswald font-bold text-3xl sm:text-4xl uppercase tracking-wider text-[#F5F5F5]">
      {{ title }}
    </h2>
    <div class="mt-3 h-[2px] w-16 bg-gradient-to-r from-[#F59E0B] to-transparent"></div>
  </div>
</template>
