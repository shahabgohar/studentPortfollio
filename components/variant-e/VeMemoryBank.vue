<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const entriesRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface MemoryEntry {
  address: string
  company: string
  period: string
  role: string
  description: string
  status: 'ACTIVE_PROCESS' | 'ARCHIVED'
}

const entries: MemoryEntry[] = [
  {
    address: '0x00',
    company: 'ESPER SOLUTIONS',
    period: '2023 — Present',
    role: 'Senior Software Engineer',
    description: 'Architecting AI-powered enterprise systems',
    status: 'ACTIVE_PROCESS'
  },
  {
    address: '0x01',
    company: 'CTO GMBH',
    period: '2022 — 2023',
    role: 'Software Engineer',
    description: 'Engineering enterprise-grade platforms',
    status: 'ARCHIVED'
  },
  {
    address: '0x02',
    company: 'MOTOCLE',
    period: '2021 — 2022',
    role: 'Full Stack Developer',
    description: 'Channeling full-stack development',
    status: 'ARCHIVED'
  },
  {
    address: '0x03',
    company: 'FIVERR',
    period: '2020 — 2021',
    role: 'Freelancer',
    description: 'Freelance engineering across 50+ projects',
    status: 'ARCHIVED'
  },
  {
    address: '0x04',
    company: 'FATIMA SUGAR MILLS',
    period: '2019 — 2020',
    role: 'IT Support',
    description: 'The first spark — system initialization',
    status: 'ARCHIVED'
  }
]

const downloadProgress = ref<number[]>(entries.map(() => 0))

onMounted(() => {
  // Header
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

  // Entries stagger + progress bar fill
  const entriesTrigger = ScrollTrigger.create({
    trigger: entriesRef.value,
    start: 'top 80%',
    onEnter: () => {
      if (!entriesRef.value) return
      const cards = entriesRef.value.querySelectorAll('.ve-memory-entry')

      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }
      )

      // Animate progress bars
      entries.forEach((_, i) => {
        gsap.to({}, {
          duration: 0.8,
          delay: 0.3 + i * 0.12,
          onUpdate: function () {
            downloadProgress.value[i] = Math.round(100 * this.progress())
          }
        })
      })
    },
    once: true
  })
  triggers.push(entriesTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FFAA00;">
          // DATA RETRIEVAL
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          MEMORY BANK
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Entries -->
      <div ref="entriesRef" class="space-y-4">
        <div
          v-for="(entry, index) in entries"
          :key="entry.address"
          class="ve-memory-entry opacity-0"
          :class="{ 've-entry-active': entry.status === 'ACTIVE_PROCESS' }"
        >
          <!-- Address + Company -->
          <div class="flex items-start justify-between mb-2 flex-wrap gap-2">
            <div class="flex items-center gap-3">
              <span class="font-vt323 text-sm" style="color: #39FF14;">[{{ entry.address }}]</span>
              <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #E0F0FF;">
                {{ entry.company }}
              </h3>
            </div>
            <span class="font-vt323 text-xs tracking-wider" style="color: #607080;">{{ entry.period }}</span>
          </div>

          <!-- Role -->
          <p class="font-vt323 text-sm tracking-wider mb-1" style="color: #00F0FF;">
            {{ entry.role }}
          </p>

          <!-- Description -->
          <p class="font-sans text-sm mb-3" style="color: #607080;">
            "{{ entry.description }}"
          </p>

          <!-- Progress bar + status -->
          <div class="flex items-center gap-3">
            <div class="ve-progress-track flex-1">
              <div
                class="ve-progress-fill"
                :style="{
                  width: downloadProgress[index] + '%',
                  background: entry.status === 'ACTIVE_PROCESS'
                    ? 'linear-gradient(90deg, #00F0FF88, #00F0FF)'
                    : 'linear-gradient(90deg, #60708088, #607080)'
                }"
              />
            </div>
            <span
              class="font-vt323 text-xs tracking-wider whitespace-nowrap"
              :class="{ 've-status-pulse': entry.status === 'ACTIVE_PROCESS' }"
              :style="{ color: entry.status === 'ACTIVE_PROCESS' ? '#00F0FF' : '#444444' }"
            >
              {{ entry.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-memory-entry {
  padding: 1.25rem 1.5rem;
  background: rgba(2, 2, 8, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 3px solid #333;
  transition: all 0.3s ease;
}

.ve-memory-entry:hover {
  background: rgba(2, 2, 8, 0.9);
  border-left-color: #607080;
}

.ve-entry-active {
  border-left-color: #00F0FF;
  box-shadow: -2px 0 15px rgba(0, 240, 255, 0.08);
}

.ve-entry-active:hover {
  border-left-color: #00F0FF;
}

.ve-progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.ve-progress-fill {
  height: 100%;
  transition: width 0.05s linear;
}

.ve-status-pulse {
  animation: ve-pulse-status 2s ease-in-out infinite;
}

@keyframes ve-pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-status-pulse {
    animation: none;
  }
}
</style>
