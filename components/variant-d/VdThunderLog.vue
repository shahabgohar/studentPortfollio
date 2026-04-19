<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const entryRefs = ref<HTMLElement[]>([])
const triggers: ScrollTrigger[] = []

const entries = [
  {
    company: 'ESPER SOLUTIONS',
    period: '2023 \u2013 Present',
    role: 'Senior Software Engineer',
    desc: 'Architecting AI-powered enterprise storms',
    current: true
  },
  {
    company: 'CTO GMBH',
    period: '2022 \u2013 2023',
    role: 'Software Engineer',
    desc: 'Engineering enterprise-grade lightning',
    current: false
  },
  {
    company: 'MOTOCLE',
    period: '2021 \u2013 2022',
    role: 'Full Stack Developer',
    desc: 'Channeling full-stack energy',
    current: false
  },
  {
    company: 'FIVERR',
    period: '2020 \u2013 2021',
    role: 'Freelancer',
    desc: 'Freelance thunderbolts across 50+ projects',
    current: false
  },
  {
    company: 'FATIMA SUGAR MILLS',
    period: '2019 \u2013 2020',
    role: 'IT Support',
    desc: 'The first spark',
    current: false
  }
]

function setEntryRef(el: any, index: number) {
  if (el) entryRefs.value[index] = el
}

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

  // Timeline line draw
  if (timelineLineRef.value) {
    gsap.set(timelineLineRef.value, { scaleY: 0, transformOrigin: 'top center' })
    const lineTrigger = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 70%',
      end: 'bottom 30%',
      onUpdate: (self) => {
        gsap.to(timelineLineRef.value, {
          scaleY: self.progress,
          duration: 0.1,
          ease: 'none'
        })
      }
    })
    triggers.push(lineTrigger)
  }

  // Entry cards
  entryRefs.value.forEach((el, i) => {
    if (!el) return
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
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
    <div class="max-w-4xl mx-auto">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #00B4FF;">
          // DISCHARGE HISTORY
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E8E8E8;">
          <span style="color: #FFE066;">&#9889;</span> THUNDER LOG
        </h2>
        <div class="vd-electric-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Electric current line -->
        <div
          ref="timelineLineRef"
          class="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
          style="background: linear-gradient(180deg, #00B4FF, #7B68EE, #00B4FF); box-shadow: 0 0 8px rgba(0,180,255,0.5), 0 0 16px rgba(0,180,255,0.2);"
        />

        <!-- Entries -->
        <div class="space-y-12 md:space-y-16">
          <div
            v-for="(entry, index) in entries"
            :key="entry.company"
            :ref="(el) => setEntryRef(el, index)"
            class="relative flex opacity-0"
            :class="index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'"
          >
            <!-- Connector dot -->
            <div
              class="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
              :style="{
                background: entry.current ? '#FFE066' : '#00B4FF',
                boxShadow: entry.current
                  ? '0 0 10px #FFE066, 0 0 20px rgba(255,224,102,0.4)'
                  : '0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.3)'
              }"
            />

            <!-- Lightning bolt connector -->
            <div
              class="absolute top-6 hidden md:block"
              :class="index % 2 === 0 ? 'left-1/2 w-8' : 'right-1/2 w-8'"
              style="height: 2px;"
            >
              <div
                class="h-full"
                style="background: rgba(0,180,255,0.3); box-shadow: 0 0 4px rgba(0,180,255,0.2);"
              />
            </div>

            <!-- Card -->
            <div
              class="ml-10 md:ml-0 md:w-[45%] vd-thunder-card"
              :class="entry.current ? 'vd-thunder-card-active' : ''"
            >
              <div class="p-5">
                <div class="flex items-center gap-2 mb-1">
                  <span style="color: #FFE066;">&#9889;</span>
                  <h3 class="font-oswald font-bold uppercase tracking-wider text-base" style="color: #E8E8E8;">
                    {{ entry.company }}
                  </h3>
                </div>
                <div class="font-vt323 text-xs tracking-wider mb-2" style="color: #00B4FF;">
                  {{ entry.period }}
                </div>
                <div class="font-oswald text-sm font-bold uppercase tracking-wide mb-2" style="color: #888888;">
                  {{ entry.role }}
                </div>
                <p class="font-sans text-xs" style="color: #666666;">
                  {{ entry.desc }}
                </p>
                <div v-if="entry.current" class="mt-3">
                  <span class="vd-status-badge">ACTIVE DISCHARGE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vd-electric-line {
  background: #00B4FF;
  box-shadow: 0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.4);
}

.vd-thunder-card {
  background: rgba(10, 10, 26, 0.7);
  border: 1px solid rgba(0, 180, 255, 0.15);
  position: relative;
  transition: border-color 0.3s ease;
}

.vd-thunder-card:hover {
  border-color: rgba(0, 180, 255, 0.35);
}

.vd-thunder-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  pointer-events: none;
  animation: vd-shimmer 4s ease-in-out infinite;
}

@keyframes vd-shimmer {
  0%, 100% { border-color: transparent; }
  50% { border-color: rgba(0, 180, 255, 0.1); }
}

.vd-thunder-card-active {
  border-color: rgba(255, 224, 102, 0.3);
  box-shadow: 0 0 20px rgba(255, 224, 102, 0.08);
}

.vd-thunder-card-active::after {
  animation: vd-shimmer-active 3s ease-in-out infinite;
}

@keyframes vd-shimmer-active {
  0%, 100% { border-color: transparent; }
  50% { border-color: rgba(255, 224, 102, 0.15); }
}

.vd-status-badge {
  font-family: 'VT323', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.5rem;
  color: #FFE066;
  border: 1px solid rgba(255, 224, 102, 0.3);
  background: rgba(255, 224, 102, 0.05);
  animation: vd-badge-pulse 2s ease-in-out infinite;
}

@keyframes vd-badge-pulse {
  0%, 100% { box-shadow: 0 0 4px rgba(255,224,102,0.2); }
  50% { box-shadow: 0 0 10px rgba(255,224,102,0.4); }
}
</style>
