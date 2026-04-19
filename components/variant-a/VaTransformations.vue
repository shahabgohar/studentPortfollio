<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

interface Transformation {
  title: string
  tier: 'base' | 'super' | 'ultra'
  skills: string[]
  multiplier: string
  borderColor: string
  glowColor: string
}

const transformations: Transformation[] = [
  {
    title: 'BASE FORM',
    tier: 'base',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
    multiplier: 'x1',
    borderColor: '#C0C0C0',
    glowColor: 'rgba(192, 192, 192, 0.3)'
  },
  {
    title: 'SUPER SAIYAN',
    tier: 'super',
    skills: ['Vue.js', 'React', 'Nuxt', 'Laravel', 'Tailwind CSS', 'Alpine.js', 'Bootstrap'],
    multiplier: 'x50',
    borderColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.3)'
  },
  {
    title: 'ULTRA INSTINCT',
    tier: 'ultra',
    skills: ['Gen AI Products', 'System Architecture', 'Cloud Infrastructure', 'Automation'],
    multiplier: '\u221E',
    borderColor: '#00BFFF',
    glowColor: 'rgba(0, 191, 255, 0.3)'
  }
]

let scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  nextTick(() => {
    // Header animation
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

    // Cards animation with screen shake
    if (cardsRef.value && sectionRef.value) {
      const cards = cardsRef.value.querySelectorAll('.va-transformation-card')
      const st = ScrollTrigger.create({
        trigger: cardsRef.value,
        start: 'top 80%',
        onEnter: () => {
          // Screen shake
          gsap.to(sectionRef.value, {
            x: '+=3',
            y: '+=2',
            duration: 0.05,
            repeat: 7,
            yoyo: true,
            ease: 'none',
            onComplete: () => {
              gsap.set(sectionRef.value, { x: 0, y: 0 })
            }
          })

          // Cards fly in
          gsap.fromTo(
            cards,
            { opacity: 0, y: 80, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.2,
              ease: 'back.out(1.2)'
            }
          )
        },
        once: true
      })
      scrollTriggers.push(st)
    }
  })
})

onBeforeUnmount(() => {
  scrollTriggers.forEach(st => st.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full py-20 md:py-32 px-6">
    <!-- Section Header -->
    <div ref="headerRef" class="mb-16 opacity-0">
      <h2 class="font-vt323 text-[#00FF41] text-2xl md:text-3xl tracking-widest mb-2">
        // TRANSFORMATION DATABASE
      </h2>
      <div class="w-32 h-0.5 bg-gradient-to-r from-[#00FF41] to-transparent" />
    </div>

    <!-- Cards Grid -->
    <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div
        v-for="(t, i) in transformations"
        :key="i"
        class="va-transformation-card relative opacity-0 rounded-lg p-6 md:p-8 backdrop-blur-md border transition-all duration-500 group"
        :class="{
          'va-card-base': t.tier === 'base',
          'va-card-super': t.tier === 'super',
          'va-card-ultra': t.tier === 'ultra'
        }"
        :style="{
          backgroundColor: 'rgba(17, 17, 17, 0.7)',
          borderColor: t.borderColor
        }"
      >
        <!-- Aura effect for super saiyan -->
        <div
          v-if="t.tier === 'super'"
          class="absolute inset-0 rounded-lg va-aura-gold pointer-events-none"
        />
        <!-- Rainbow border effect for ultra instinct -->
        <div
          v-if="t.tier === 'ultra'"
          class="absolute inset-0 rounded-lg va-aura-ultra pointer-events-none"
        />

        <!-- Tier label -->
        <div class="relative z-10">
          <h3
            class="font-oswald font-bold italic uppercase text-2xl md:text-3xl mb-4 tracking-wider"
            :style="{ color: t.borderColor }"
          >
            {{ t.title }}
          </h3>

          <!-- Skills -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="(skill, si) in t.skills"
              :key="si"
              class="font-vt323 text-sm px-3 py-1 rounded border"
              :style="{
                color: t.borderColor,
                borderColor: `${t.borderColor}40`,
                backgroundColor: `${t.borderColor}10`
              }"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Power Multiplier -->
          <div class="border-t pt-4" :style="{ borderColor: `${t.borderColor}30` }">
            <span class="font-vt323 text-[#C0C0C0] text-sm tracking-wider">POWER MULTIPLIER: </span>
            <span
              class="font-oswald font-bold text-2xl ml-1"
              :style="{ color: t.borderColor }"
            >
              {{ t.multiplier }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.va-card-base {
  box-shadow: 0 0 15px rgba(192, 192, 192, 0.1), inset 0 0 15px rgba(192, 192, 192, 0.02);
}
.va-card-base:hover {
  box-shadow: 0 0 25px rgba(192, 192, 192, 0.2), inset 0 0 20px rgba(192, 192, 192, 0.05);
}

.va-card-super {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.15), inset 0 0 15px rgba(255, 215, 0, 0.03);
}
.va-card-super:hover {
  box-shadow: 0 0 35px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.05);
}

.va-card-ultra {
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.15), inset 0 0 15px rgba(0, 191, 255, 0.03);
}
.va-card-ultra:hover {
  box-shadow: 0 0 35px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.05);
}

.va-aura-gold {
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
  animation: va-aura-pulse-gold 2s ease-in-out infinite alternate;
}

@keyframes va-aura-pulse-gold {
  0% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.1); }
  100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.25); }
}

.va-aura-ultra {
  animation: va-aura-rainbow 3s linear infinite;
}

@keyframes va-aura-rainbow {
  0% { box-shadow: 0 0 30px rgba(0, 191, 255, 0.2), 0 0 60px rgba(0, 191, 255, 0.1); }
  25% { box-shadow: 0 0 30px rgba(138, 43, 226, 0.2), 0 0 60px rgba(138, 43, 226, 0.1); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.25), 0 0 60px rgba(255, 255, 255, 0.12); }
  75% { box-shadow: 0 0 30px rgba(0, 255, 65, 0.2), 0 0 60px rgba(0, 255, 65, 0.1); }
  100% { box-shadow: 0 0 30px rgba(0, 191, 255, 0.2), 0 0 60px rgba(0, 191, 255, 0.1); }
}
</style>
