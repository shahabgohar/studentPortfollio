<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const headerRef = ref<HTMLElement | null>(null)
const cardsContainerRef = ref<HTMLElement | null>(null)

interface BattleSaga {
  title: string
  company: string
  period: string
  role: string
  description: string
  powerColor: string
}

const sagas: BattleSaga[] = [
  {
    title: 'THE GEN-AI ARCHITECTURE SAGA',
    company: 'Esper Solutions',
    period: '2023 \u2014 Present',
    role: 'Senior Software Engineer',
    description: 'Led development of AI-powered enterprise solutions. Pushed power levels beyond measurable limits.',
    powerColor: '#FF4444'
  },
  {
    title: 'THE ENTERPRISE SYSTEMS ARC',
    company: 'CTO GmbH',
    period: '2022 \u2014 2023',
    role: 'Software Engineer',
    description: 'Built scalable B2B platforms. Mastered the art of enterprise-grade combat systems.',
    powerColor: '#FFD700'
  },
  {
    title: 'THE FULL-STACK TRAINING ARC',
    company: 'Motocle',
    period: '2021 \u2014 2022',
    role: 'Full Stack Developer',
    description: 'Mastered full-stack development. Trained under elite mentors in the art of code.',
    powerColor: '#00BFFF'
  },
  {
    title: 'THE FREELANCE WARRIOR SAGA',
    company: 'Fiverr',
    period: '2020 \u2014 2021',
    role: 'Freelancer',
    description: 'Survived 50+ client battles. Forged in the fires of real-world combat.',
    powerColor: '#00FF41'
  },
  {
    title: 'THE ORIGIN STORY',
    company: 'Fatima Sugar Mills',
    period: '2019 \u2014 2020',
    role: 'IT Support',
    description: 'Where the journey began. The first spark of power awakened.',
    powerColor: '#C0C0C0'
  }
]

let scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  nextTick(() => {
    if (headerRef.value) {
      const st = ScrollTrigger.create({
        trigger: headerRef.value,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.value,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
          )
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    if (cardsContainerRef.value) {
      const cards = cardsContainerRef.value.querySelectorAll('.va-battle-card')
      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                x: fromLeft ? -80 : 80,
                skewY: fromLeft ? 3 : -3
              },
              {
                opacity: 1,
                x: 0,
                skewY: -2,
                duration: 0.7,
                ease: 'power2.out'
              }
            )
          },
          once: true
        })
        scrollTriggers.push(st)
      })
    }
  })
})

onBeforeUnmount(() => {
  scrollTriggers.forEach(st => st.kill())
})
</script>

<template>
  <section class="relative w-full py-20 md:py-32 px-6">
    <!-- Section Header -->
    <div ref="headerRef" class="mb-16 opacity-0">
      <h2 class="font-vt323 text-[#00FF41] text-2xl md:text-3xl tracking-widest mb-2">
        // BATTLE HISTORY &mdash; SAGAS FOUGHT
      </h2>
      <div class="w-32 h-0.5 bg-gradient-to-r from-[#00FF41] to-transparent" />
    </div>

    <!-- Battle Cards -->
    <div ref="cardsContainerRef" class="max-w-4xl mx-auto flex flex-col gap-6">
      <div
        v-for="(saga, i) in sagas"
        :key="i"
        class="va-battle-card opacity-0 relative rounded-lg p-6 md:p-8 backdrop-blur-md border border-[#222] transition-all duration-500 group hover:border-opacity-80"
        style="
          background-color: rgba(17, 17, 17, 0.7);
          transform: skewY(-2deg);
        "
      >
        <!-- Left power border -->
        <div
          class="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
          :style="{ backgroundColor: saga.powerColor }"
        />

        <div style="transform: skewY(2deg);">
          <!-- Top row -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
            <h3
              class="font-oswald font-bold italic uppercase text-lg md:text-xl tracking-wider"
              :style="{ color: saga.powerColor }"
            >
              {{ saga.title }}
            </h3>
            <span class="font-vt323 text-[#C0C0C0] text-sm tracking-wider">
              {{ saga.period }}
            </span>
          </div>

          <!-- Company + Role -->
          <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-3">
            <span class="font-oswald uppercase text-[#FFD700] text-sm tracking-wider">
              {{ saga.company }}
            </span>
            <span class="hidden md:inline text-[#333]">//</span>
            <span class="font-vt323 text-[#00FF41] text-sm tracking-wider">
              {{ saga.role }}
            </span>
          </div>

          <!-- Description -->
          <p class="font-sans text-[#888] text-sm leading-relaxed">
            {{ saga.description }}
          </p>

          <!-- Power indicator dots -->
          <div class="flex gap-1 mt-4">
            <div
              v-for="j in (5 - i)"
              :key="j"
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: saga.powerColor }"
            />
            <div
              v-for="j in i"
              :key="'empty-' + j"
              class="w-2 h-2 rounded-full bg-[#333]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.va-battle-card:hover {
  background-color: rgba(25, 25, 25, 0.8) !important;
}
</style>
