<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  title: 'Shahab Gohar — The Architect',
  layout: false
})

useHead({
  title: 'Shahab Gohar | The Architect — Neural Nexus Portfolio',
  meta: [
    { name: 'description', content: 'Cyberpunk neural-nexus portfolio of Shahab Gohar — Senior Software Engineer, AI Architect. Scroll to awaken the neural network.' },
    { name: 'theme-color', content: '#020208' }
  ],
  bodyAttrs: {
    style: 'background-color: #020208; margin: 0; padding: 0;'
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
  <div class="ve-page relative min-h-screen w-full overflow-x-hidden" style="background-color: #020208; color: #E0F0FF;">
    <!-- Layer 0: Three.js Canvas (neural field + model stage) -->
    <ClientOnly>
      <VeNeuralField />
    </ClientOnly>

    <!-- Layer 1: Cinematic overlay -->
    <ClientOnly>
      <VeSignalNoise />
    </ClientOnly>

    <!-- Layer 2: Scrollable content -->
    <main class="relative" style="z-index: 10;">
      <ClientOnly>
        <VeHero />
      </ClientOnly>
      <ClientOnly>
        <VeSynapses />
      </ClientOnly>
      <ClientOnly>
        <VeMemoryBank />
      </ClientOnly>
      <ClientOnly>
        <VeUplink />
      </ClientOnly>
      <ClientOnly>
        <VeCoreDump />
      </ClientOnly>
    </main>
  </div>
</template>

<style>
.ve-page {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ve-page ::-webkit-scrollbar {
  width: 4px;
}

.ve-page ::-webkit-scrollbar-track {
  background: #020208;
}

.ve-page ::-webkit-scrollbar-thumb {
  background: #00F0FF;
  border-radius: 2px;
}

.ve-page ::-webkit-scrollbar-thumb:hover {
  background: #FF00AA;
}

.ve-page ::selection {
  background-color: rgba(0, 240, 255, 0.2);
  color: #FF00AA;
}
</style>
