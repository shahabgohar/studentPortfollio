<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const entriesRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

interface BattleEntry {
  company: string
  period: string
  role: string
  description: string
  tag?: string
  powerLevel: string
}

const entries: BattleEntry[] = [
  {
    company: 'Esper Solutions',
    period: '2023 - Present',
    role: 'Senior Software Engineer',
    description: 'Leading AI-powered enterprise solutions. Developing Gen AI products and customizing open-source packages for client needs.',
    tag: 'CURRENT ARC',
    powerLevel: '9,001',
  },
  {
    company: 'CTO GmbH',
    period: '2022 - 2023',
    role: 'Software Engineer',
    description: 'Built scalable B2B platforms. Worked on 2 web projects and 1 hybrid mobile app using Nuxt, Tailwind, TypeScript, and Ionic.',
    powerLevel: '7,800',
  },
  {
    company: 'Motocle',
    period: '2021 - 2022',
    role: 'Full Stack Developer',
    description: 'Full-stack mastery. Frontend development, Laravel API development, API integration, and delivering creative client solutions.',
    powerLevel: '5,500',
  },
  {
    company: 'Fiverr',
    period: '2020 - 2021',
    role: 'Freelancer',
    description: '50+ successful missions. Worked with global clients on frontend projects using Vue.js and hybrid mobile applications.',
    powerLevel: '3,200',
  },
  {
    company: 'Fatima Sugar Mills',
    period: '2019 - 2020',
    role: 'IT Support',
    description: 'Origin story. Worked with Oracle tools, SQL, PL/SQL. Built confidence for real-world project delivery.',
    powerLevel: '1,000',
  },
]

onMounted(() => {
  ctx = gsap.context(() => {
    // Timeline line draws itself
    if (timelineLineRef.value) {
      gsap.from(timelineLineRef.value, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value!,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Cards slide in
    if (entriesRef.value) {
      const cards = entriesRef.value.querySelectorAll('.vc-battle-card')
      gsap.from(cards, {
        opacity: 0,
        x: -40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value!,
          start: 'top 65%',
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
  <section ref="sectionRef" id="vc-experience" class="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
    <VcSectionHeader title="Battle Log" />

    <div ref="entriesRef" class="relative">
      <!-- Timeline line -->
      <div
        ref="timelineLineRef"
        class="absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F59E0B]/60 via-[#F59E0B]/30 to-transparent"
      ></div>

      <!-- Entries -->
      <div class="flex flex-col gap-6 lg:gap-8">
        <div
          v-for="(entry, index) in entries"
          :key="entry.company"
          class="vc-battle-card relative pl-10 sm:pl-14"
        >
          <!-- Timeline dot -->
          <div
            class="absolute left-1.5 sm:left-2.5 top-6 w-3 h-3 rounded-full border-2 border-[#F59E0B] bg-[#0D0D0D]"
            :class="index === 0 ? 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''"
          ></div>

          <!-- Card -->
          <div class="bg-[#1A1A1A]/80 backdrop-blur-sm border-l-2 border-[#F59E0B]/30 rounded-sm p-5 sm:p-6 transition-all duration-300 hover:border-l-[#F59E0B] hover:bg-[#1A1A1A]">
            <!-- Header row -->
            <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 class="font-oswald font-bold text-lg sm:text-xl text-[#F5F5F5] uppercase tracking-wide">
                  {{ entry.company }}
                </h3>
                <p class="font-sans text-sm text-[#9CA3AF] mt-0.5">
                  {{ entry.role }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <span v-if="entry.tag" class="font-vt323 text-xs px-2 py-0.5 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 rounded-sm">
                  {{ entry.tag }}
                </span>
                <span class="font-vt323 text-xs text-[#F59E0B]/50">
                  PWR {{ entry.powerLevel }}
                </span>
              </div>
            </div>

            <!-- Period -->
            <span class="font-sans text-xs text-[#9CA3AF]/60 tracking-wider uppercase">
              {{ entry.period }}
            </span>

            <!-- Description -->
            <p class="mt-3 font-sans text-sm text-[#9CA3AF]/80 leading-relaxed">
              {{ entry.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
