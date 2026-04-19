<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { definePageMeta } from '#imports'

definePageMeta({
  title: 'Shahab Gohar — The Storm',
  layout: false
})

useHead({
  title: 'Shahab Gohar | The Storm — Lightning-Charged Software Engineer',
  meta: [
    { name: 'description', content: 'Lightning-themed portfolio of Shahab Gohar — Senior Software Engineer, Gen AI Architect. Every scroll conducts electricity.' },
    { name: 'theme-color', content: '#050510' }
  ],
  bodyAttrs: {
    style: 'background-color: #050510; margin: 0; padding: 0;'
  }
})

onMounted(() => {
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="vd-page relative min-h-screen w-full overflow-x-hidden" style="background-color: #050510; color: #E8E8E8;">
    <!-- Storm background -->
    <ClientOnly>
      <VdStormBackground />
    </ClientOnly>

    <!-- Lightning canvas overlay -->
    <ClientOnly>
      <VdLightningCanvas />
    </ClientOnly>

    <!-- Main content -->
    <main class="relative" style="z-index: 10;">
      <!-- Hero Section -->
      <ClientOnly>
        <VdHero />
      </ClientOnly>

      <!-- Skills / Power Grid -->
      <ClientOnly>
        <VdPowerGrid />
      </ClientOnly>

      <!-- Experience / Thunder Log -->
      <ClientOnly>
        <VdThunderLog />
      </ClientOnly>

      <!-- Education / Charging Station -->
      <ClientOnly>
        <VdCharging />
      </ClientOnly>

      <!-- About & Contact / Circuit Board -->
      <ClientOnly>
        <VdCircuitBoard />
      </ClientOnly>
    </main>
  </div>
</template>

<style>
/* Global styles scoped to the variant-d page */
.vd-page {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vd-page ::-webkit-scrollbar {
  width: 4px;
}

.vd-page ::-webkit-scrollbar-track {
  background: #050510;
}

.vd-page ::-webkit-scrollbar-thumb {
  background: #00B4FF;
  border-radius: 2px;
}

.vd-page ::-webkit-scrollbar-thumb:hover {
  background: #FFE066;
}

/* Selection color */
.vd-page ::selection {
  background-color: rgba(0, 180, 255, 0.2);
  color: #FFE066;
}
</style>
