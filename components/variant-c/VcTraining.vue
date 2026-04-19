<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

const achievements = [
  'Hackathon Winner 2019 — Air University',
  'Head of Graphics — Softdesk Society',
  'Workshop Organizer & Event Host',
]

onMounted(() => {
  ctx = gsap.context(() => {
    if (cardRef.value) {
      gsap.from(cardRef.value, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value!,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" id="vc-education" class="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
    <VcSectionHeader title="Training Grounds" />

    <div ref="cardRef" class="max-w-2xl">
      <div class="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#9CA3AF]/15 rounded-sm p-6 sm:p-8 transition-all duration-300 hover:border-[#F59E0B]/30">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 class="font-oswald font-bold text-xl sm:text-2xl text-[#F5F5F5] uppercase tracking-wide">
              COMSATS University
            </h3>
            <p class="font-sans text-sm text-[#9CA3AF] mt-1">
              BS Computer Science
            </p>
          </div>
          <span class="font-vt323 text-sm text-[#7C3AED]/70 bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-sm">
            TIME CHAMBER: 4 YEARS
          </span>
        </div>

        <!-- Period -->
        <span class="font-sans text-xs text-[#9CA3AF]/50 tracking-wider uppercase">
          2017 - 2021
        </span>

        <!-- Achievements -->
        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="achievement in achievements"
            :key="achievement"
            class="px-3 py-1.5 text-xs font-sans text-[#F5F5F5]/70 bg-[#0D0D0D]/60 border border-[#F59E0B]/15 rounded-sm hover:border-[#F59E0B]/40 hover:text-[#F5F5F5] transition-colors duration-200"
          >
            {{ achievement }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
