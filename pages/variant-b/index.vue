<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  title: 'The Saga — Shahab Gohar',
  layout: false
})

useHead({
  title: 'The Saga — Shahab Gohar | Software Engineer',
  meta: [
    { name: 'description', content: 'The saga of a software engineer who surpassed his limits. Portfolio of Shahab Gohar.' },
    { name: 'theme-color', content: '#0B0B1A' }
  ],
  bodyAttrs: {
    class: 'vb-body-dark'
  }
})

onMounted(() => {
  // Force dark background on body
  document.documentElement.style.backgroundColor = '#0B0B1A'
  document.body.style.backgroundColor = '#0B0B1A'
})

onBeforeUnmount(() => {
  // Clean up all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  // Reset body styles
  document.documentElement.style.backgroundColor = ''
  document.body.style.backgroundColor = ''
})
</script>

<template>
  <div class="vb-page">
    <!-- Fixed anime background with particles -->
    <ClientOnly>
      <VbAnimeBackground />
    </ClientOnly>

    <!-- Main scrollable content -->
    <div class="vb-main-scroll">
      <!-- EPISODE 01: Cold Open / Hero -->
      <ClientOnly>
        <VbColdOpen />
      </ClientOnly>

      <!-- Transition to Episode 02 -->
      <ClientOnly>
        <VbEpisodeTransition
          episode-number="EPISODE 02"
          episode-title="POWER-UP SEQUENCE"
          trigger-id="vb-trans-skills"
        />
      </ClientOnly>

      <!-- EPISODE 02: Skills / Power Up -->
      <ClientOnly>
        <VbPowerUp />
      </ClientOnly>

      <!-- Transition to Episode 03 -->
      <ClientOnly>
        <VbEpisodeTransition
          episode-number="EPISODE 03"
          episode-title="THE BATTLES FOUGHT"
          trigger-id="vb-trans-experience"
        />
      </ClientOnly>

      <!-- EPISODE 03: Experience / Saga Arcs -->
      <ClientOnly>
        <VbSagaArcs />
      </ClientOnly>

      <!-- Transition to Episode 04 -->
      <ClientOnly>
        <VbEpisodeTransition
          episode-number="EPISODE 04"
          episode-title="THE TRAINING ARC"
          trigger-id="vb-trans-education"
        />
      </ClientOnly>

      <!-- EPISODE 04: Education / Training Arc -->
      <ClientOnly>
        <VbTrainingArc />
      </ClientOnly>

      <!-- Transition to Final Episode -->
      <ClientOnly>
        <VbEpisodeTransition
          episode-number="FINAL EPISODE"
          episode-title="THE WARRIOR'S PATH"
          trigger-id="vb-trans-about"
        />
      </ClientOnly>

      <!-- FINAL EPISODE: About / Credits -->
      <ClientOnly>
        <VbCredits />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
/* Global styles for variant-b page — unscoped so body overrides work */
.vb-body-dark {
  background-color: #0B0B1A !important;
  overflow-x: hidden;
}
</style>

<style scoped>
.vb-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #0B0B1A;
  color: #FFFFFF;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.vb-main-scroll {
  position: relative;
  z-index: 1;
  width: 100%;
}
</style>
