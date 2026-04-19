<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  title: 'Shahab Gohar — Portfolio',
  layout: false,
})

useHead({
  title: 'Shahab Gohar — Senior Software Engineer',
  meta: [
    { name: 'description', content: 'Full-stack engineer building AI-powered solutions and scalable architectures. Vue, Nuxt, Laravel, React, Gen AI.' },
    { name: 'theme-color', content: '#0D0D0D' },
  ],
  bodyAttrs: {
    class: 'vc-page-body',
  },
})

onMounted(() => {
  // Smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth'
})

onBeforeUnmount(() => {
  // Kill all ScrollTrigger instances created by child components
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  document.documentElement.style.scrollBehavior = ''
})
</script>

<template>
  <div class="vc-page relative min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#F59E0B]/30 selection:text-white overflow-x-hidden">
    <!-- Aura background -->
    <ClientOnly>
      <VcAuraBackground />
    </ClientOnly>

    <!-- Content -->
    <main class="relative z-10">
      <ClientOnly>
        <VcHero />
      </ClientOnly>
      <ClientOnly>
        <VcPowerLevels />
      </ClientOnly>
      <ClientOnly>
        <VcBattleLog />
      </ClientOnly>
      <ClientOnly>
        <VcTraining />
      </ClientOnly>
      <ClientOnly>
        <VcProfile />
      </ClientOnly>
    </main>
  </div>
</template>

<style>
/* Page-level styles scoped to vc-page */
.vc-page-body {
  background-color: #0D0D0D;
}

.vc-page {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
.vc-page::-webkit-scrollbar {
  width: 6px;
}

.vc-page::-webkit-scrollbar-track {
  background: #0D0D0D;
}

.vc-page::-webkit-scrollbar-thumb {
  background: #F59E0B33;
  border-radius: 3px;
}

.vc-page::-webkit-scrollbar-thumb:hover {
  background: #F59E0B55;
}
</style>
