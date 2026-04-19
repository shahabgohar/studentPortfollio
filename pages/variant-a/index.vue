<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { definePageMeta } from '#imports'

definePageMeta({
  title: 'Shahab Gohar — The Scouter',
  layout: false
})

useHead({
  title: 'Shahab Gohar | The Scouter — S-Rank Software Engineer',
  meta: [
    { name: 'description', content: 'DBZ Scouter HUD-themed portfolio of Shahab Gohar — Full-Stack Engineer, Gen AI Architect.' },
    { name: 'theme-color', content: '#0a0a0a' }
  ],
  bodyAttrs: {
    style: 'background-color: #0a0a0a; margin: 0; padding: 0;'
  }
})

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="va-page relative min-h-screen w-full overflow-x-hidden" style="background-color: #0a0a0a; color: #C0C0C0;">
    <!-- Energy particle background -->
    <ClientOnly>
      <VaEnergyBackground />
    </ClientOnly>

    <!-- Fixed HUD overlay -->
    <ClientOnly>
      <VaScouterHud />
    </ClientOnly>

    <!-- Main content -->
    <main class="relative" style="z-index: 10;">
      <!-- Hero Section -->
      <ClientOnly>
        <VaHero />
      </ClientOnly>

      <!-- Transformations / Skills -->
      <ClientOnly>
        <VaTransformations />
      </ClientOnly>

      <!-- Battle History / Experience -->
      <ClientOnly>
        <VaBattleHistory />
      </ClientOnly>

      <!-- Time Chamber / Education -->
      <ClientOnly>
        <VaTimeChamber />
      </ClientOnly>

      <!-- Warrior Profile / About -->
      <ClientOnly>
        <VaWarriorProfile />
      </ClientOnly>

      <!-- Footer -->
      <footer class="relative w-full py-16 px-6 text-center border-t border-[#222]">
        <div class="font-vt323 text-[#00FF41] text-sm tracking-[0.3em] mb-2">
          // END OF TRANSMISSION
        </div>
        <div class="font-vt323 text-[#666] text-xs tracking-wider mb-4">
          SCOUTER v3.0 // CAPSULE CORP TECHNOLOGY
        </div>
        <div class="font-sans text-[#444] text-xs">
          &copy; {{ new Date().getFullYear() }} Shahab Gohar. All power levels reserved.
        </div>

        <!-- Scroll to top -->
        <button
          class="mt-8 mx-auto flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:opacity-80"
          @click="scrollToTop"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="transform rotate-180">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#00FF41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-vt323 text-[#00FF41] text-xs tracking-widest">RETURN TO TOP</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<style>
/* Global styles scoped to the variant-a page */
.va-page {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.va-page ::-webkit-scrollbar {
  width: 4px;
}

.va-page ::-webkit-scrollbar-track {
  background: #0a0a0a;
}

.va-page ::-webkit-scrollbar-thumb {
  background: #00FF41;
  border-radius: 2px;
}

.va-page ::-webkit-scrollbar-thumb:hover {
  background: #FFD700;
}

/* Selection color */
.va-page ::selection {
  background-color: rgba(0, 255, 65, 0.2);
  color: #FFD700;
}
</style>
