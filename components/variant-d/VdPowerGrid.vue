<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const card2Ref = ref<HTMLElement | null>(null)
const card3Ref = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

const tiers = [
  {
    title: 'CORE SYSTEMS',
    voltage: 'Voltage: 220V',
    tier: 'base',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
  },
  {
    title: 'HIGH VOLTAGE',
    voltage: 'Voltage: 10,000V',
    tier: 'high',
    skills: ['Vue', 'React', 'Nuxt', 'Laravel', 'Tailwind', 'Alpine.js', 'Bootstrap'],
  },
  {
    title: 'UNLIMITED POWER',
    voltage: 'Voltage: \u221E',
    tier: 'max',
    skills: ['Gen AI Products', 'System Architecture', 'Cloud', 'Automation'],
  }
]

onMounted(() => {
  const cards = [card1Ref.value, card2Ref.value, card3Ref.value]

  // Header animation
  const headerTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(headerRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(headerTrigger)

  // Card animations
  cards.forEach((card, i) => {
    if (!card) return
    const trigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.15, ease: 'power2.out' }
        )
      },
      once: true
    })
    triggers.push(trigger)
  })
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #00B4FF;">
          // SYSTEM DIAGNOSTICS
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E8E8E8;">
          <span style="color: #FFE066;">&#9889;</span> POWER GRID
        </h2>
        <div class="vd-electric-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Tier Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Core Systems -->
        <div ref="card1Ref" class="vd-power-card vd-tier-base opacity-0">
          <div class="vd-card-inner">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #00B4FF;">
                {{ tiers[0].title }}
              </h3>
              <div class="vd-tier-indicator vd-tier-base-indicator" />
            </div>
            <div class="font-vt323 text-xs tracking-wider mb-5" style="color: #888888;">
              {{ tiers[0].voltage }}
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in tiers[0].skills"
                :key="skill"
                class="vd-skill-chip vd-chip-base"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- High Voltage -->
        <div ref="card2Ref" class="vd-power-card vd-tier-high opacity-0">
          <div class="vd-card-inner">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #00B4FF;">
                {{ tiers[1].title }}
              </h3>
              <div class="vd-tier-indicator vd-tier-high-indicator" />
            </div>
            <div class="font-vt323 text-xs tracking-wider mb-5" style="color: #888888;">
              {{ tiers[1].voltage }}
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in tiers[1].skills"
                :key="skill"
                class="vd-skill-chip vd-chip-high"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- Unlimited Power -->
        <div ref="card3Ref" class="vd-power-card vd-tier-max opacity-0">
          <div class="vd-card-inner">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #FFE066;">
                {{ tiers[2].title }}
              </h3>
              <div class="vd-tier-indicator vd-tier-max-indicator" />
            </div>
            <div class="font-vt323 text-xs tracking-wider mb-5" style="color: #FFE066;">
              {{ tiers[2].voltage }}
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in tiers[2].skills"
                :key="skill"
                class="vd-skill-chip vd-chip-max"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Electric arc connectors (visible on md+) -->
      <div class="hidden md:block absolute top-1/2 left-0 right-0 pointer-events-none" style="z-index: -1;">
        <svg class="w-full h-4 overflow-visible" style="position: absolute; top: 0;">
          <line x1="33%" y1="0" x2="50%" y2="0" class="vd-arc-line" />
          <line x1="50%" y1="0" x2="67%" y2="0" class="vd-arc-line" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vd-electric-line {
  background: #00B4FF;
  box-shadow: 0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.4);
}

.vd-power-card {
  position: relative;
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(0, 180, 255, 0.15);
  overflow: hidden;
}

.vd-power-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px dashed transparent;
  pointer-events: none;
}

.vd-tier-base::before {
  border-color: rgba(0, 180, 255, 0.2);
  animation: vd-border-flow 8s linear infinite;
}

.vd-tier-high {
  border-color: rgba(0, 180, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.08);
}

.vd-tier-high::before {
  border-color: rgba(0, 180, 255, 0.35);
  animation: vd-border-flow 5s linear infinite;
}

.vd-tier-max {
  border-color: rgba(255, 224, 102, 0.3);
  box-shadow: 0 0 30px rgba(255, 224, 102, 0.1), 0 0 60px rgba(255, 224, 102, 0.05);
}

.vd-tier-max::before {
  border-color: rgba(255, 224, 102, 0.4);
  animation: vd-border-flow 3s linear infinite;
}

@keyframes vd-border-flow {
  0% { border-style: dashed; border-dash-offset: 0; }
  100% { border-style: dashed; border-dash-offset: 100px; }
}

.vd-card-inner {
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}

.vd-tier-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: vd-pulse-dot 2s ease-in-out infinite;
}

.vd-tier-base-indicator {
  background: #00B4FF;
  box-shadow: 0 0 6px #00B4FF;
}

.vd-tier-high-indicator {
  background: #00B4FF;
  box-shadow: 0 0 10px #00B4FF, 0 0 20px rgba(0,180,255,0.4);
}

.vd-tier-max-indicator {
  background: #FFE066;
  box-shadow: 0 0 10px #FFE066, 0 0 25px rgba(255,224,102,0.5);
}

@keyframes vd-pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.vd-skill-chip {
  font-family: 'VT323', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.625rem;
  border: 1px solid;
  background: transparent;
}

.vd-chip-base {
  color: #00B4FF;
  border-color: rgba(0,180,255,0.25);
  background: rgba(0,180,255,0.05);
}

.vd-chip-high {
  color: #00B4FF;
  border-color: rgba(0,180,255,0.35);
  background: rgba(0,180,255,0.08);
  text-shadow: 0 0 6px rgba(0,180,255,0.3);
}

.vd-chip-max {
  color: #FFE066;
  border-color: rgba(255,224,102,0.35);
  background: rgba(255,224,102,0.08);
  text-shadow: 0 0 8px rgba(255,224,102,0.4);
}

.vd-arc-line {
  stroke: rgba(0, 180, 255, 0.2);
  stroke-width: 1;
  stroke-dasharray: 6 4;
  animation: vd-dash-flow 2s linear infinite;
}

@keyframes vd-dash-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}
</style>
