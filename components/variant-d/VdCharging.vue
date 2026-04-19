<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const stationRef = ref<HTMLElement | null>(null)
const batteryFillRef = ref<HTMLElement | null>(null)
const chargePercentRef = ref<HTMLElement | null>(null)
const statusRef = ref<HTMLElement | null>(null)
const badgesRef = ref<HTMLElement | null>(null)
const chargePercent = ref(0)
const isFullyCharged = ref(false)
const triggers: ScrollTrigger[] = []

const achievements = [
  { label: 'BS Computer Science', icon: '\uD83C\uDF93' },
  { label: 'COMSATS University', icon: '\uD83C\uDFDB\uFE0F' },
  { label: 'Dean\'s List', icon: '\u2B50' },
  { label: 'Research Projects', icon: '\uD83D\uDD2C' },
]

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

  // Station entrance
  const stationTrigger = ScrollTrigger.create({
    trigger: stationRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(stationRef.value,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(stationTrigger)

  // Battery charge animation
  const chargeTrigger = ScrollTrigger.create({
    trigger: stationRef.value,
    start: 'top 70%',
    end: 'bottom 30%',
    onUpdate: (self) => {
      const p = Math.min(Math.round(self.progress * 100), 100)
      chargePercent.value = p
      if (batteryFillRef.value) {
        batteryFillRef.value.style.width = `${p}%`
      }
      if (p >= 100 && !isFullyCharged.value) {
        isFullyCharged.value = true
      }
    }
  })
  triggers.push(chargeTrigger)

  // Badges
  const badgesTrigger = ScrollTrigger.create({
    trigger: badgesRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(badgesRef.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(badgesTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-3xl mx-auto">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #00B4FF;">
          // ENERGY SOURCE
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E8E8E8;">
          <span style="color: #FFE066;">&#9889;</span> CHARGING STATION
        </h2>
        <div class="vd-electric-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Charging Station Readout -->
      <div ref="stationRef" class="vd-station-card opacity-0">
        <div class="p-6 md:p-8">
          <!-- Institution -->
          <div class="text-center mb-8">
            <div class="font-vt323 text-xs tracking-[0.3em] mb-2" style="color: #888888;">
              CHARGING SOURCE
            </div>
            <h3 class="font-oswald font-bold uppercase text-2xl md:text-3xl tracking-tight mb-2" style="color: #E8E8E8;">
              COMSATS UNIVERSITY
            </h3>
            <p class="font-oswald uppercase text-sm tracking-wider" style="color: #00B4FF;">
              BS Computer Science
            </p>
          </div>

          <!-- Battery Visualization -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="font-vt323 text-xs tracking-wider" style="color: #888888;">CHARGE LEVEL</span>
              <span ref="chargePercentRef" class="font-vt323 text-lg" :style="{ color: isFullyCharged ? '#FFE066' : '#00B4FF' }">
                {{ chargePercent }}%
              </span>
            </div>
            <!-- Battery container -->
            <div class="vd-battery-container">
              <div class="vd-battery-body">
                <div
                  ref="batteryFillRef"
                  class="vd-battery-fill"
                  :class="{ 'vd-battery-full': isFullyCharged }"
                  style="width: 0%;"
                />
                <!-- Segment lines -->
                <div class="absolute inset-0 flex">
                  <div v-for="i in 4" :key="i" class="flex-1 border-r" style="border-color: rgba(5,5,16,0.5);" />
                </div>
              </div>
              <div class="vd-battery-tip" />
            </div>
          </div>

          <!-- Status -->
          <div ref="statusRef" class="text-center">
            <div
              class="font-vt323 text-lg tracking-[0.3em] uppercase"
              :style="{ color: isFullyCharged ? '#FFE066' : '#00B4FF' }"
              :class="{ 'vd-fully-charged': isFullyCharged }"
            >
              {{ isFullyCharged ? 'FULLY CHARGED' : 'CHARGING...' }}
            </div>
            <div v-if="!isFullyCharged" class="vd-charge-dots font-vt323 text-sm" style="color: #00B4FF;">
              &#9608;&#9608;&#9608;
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement Badges -->
      <div ref="badgesRef" class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0">
        <div
          v-for="badge in achievements"
          :key="badge.label"
          class="vd-badge-card text-center p-4"
        >
          <div class="text-2xl mb-2">{{ badge.icon }}</div>
          <div class="font-vt323 text-xs tracking-wider" style="color: #00B4FF;">
            {{ badge.label }}
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

.vd-station-card {
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(0, 180, 255, 0.2);
  position: relative;
}

.vd-station-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border: 1px solid rgba(0, 180, 255, 0.1);
  pointer-events: none;
  animation: vd-station-border 3s ease-in-out infinite;
}

@keyframes vd-station-border {
  0%, 100% { border-color: rgba(0, 180, 255, 0.1); }
  50% { border-color: rgba(0, 180, 255, 0.25); }
}

.vd-battery-container {
  display: flex;
  align-items: center;
  gap: 2px;
}

.vd-battery-body {
  flex: 1;
  height: 32px;
  border: 2px solid rgba(0, 180, 255, 0.4);
  position: relative;
  overflow: hidden;
  background: rgba(0, 180, 255, 0.03);
}

.vd-battery-fill {
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  background: linear-gradient(90deg, #00B4FF, #7B68EE);
  box-shadow: 0 0 10px rgba(0, 180, 255, 0.4);
  transition: width 0.1s linear;
}

.vd-battery-full {
  background: linear-gradient(90deg, #FFE066, #FFA500) !important;
  box-shadow: 0 0 15px rgba(255, 224, 102, 0.5) !important;
  animation: vd-charge-glow 1.5s ease-in-out infinite;
}

@keyframes vd-charge-glow {
  0%, 100% { box-shadow: 0 0 15px rgba(255, 224, 102, 0.5); }
  50% { box-shadow: 0 0 25px rgba(255, 224, 102, 0.8), 0 0 40px rgba(255, 224, 102, 0.3); }
}

.vd-battery-tip {
  width: 6px;
  height: 14px;
  background: rgba(0, 180, 255, 0.4);
  border-radius: 0 2px 2px 0;
}

.vd-fully-charged {
  animation: vd-charged-pulse 1s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 224, 102, 0.5);
}

@keyframes vd-charged-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.vd-charge-dots {
  animation: vd-dots-blink 1s step-end infinite;
}

@keyframes vd-dots-blink {
  0% { opacity: 1; }
  33% { opacity: 0.3; }
  66% { opacity: 0.7; }
}

.vd-badge-card {
  background: rgba(10, 10, 26, 0.6);
  border: 1px solid rgba(0, 180, 255, 0.12);
  transition: all 0.3s ease;
}

.vd-badge-card:hover {
  border-color: rgba(0, 180, 255, 0.35);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.1);
}
</style>
