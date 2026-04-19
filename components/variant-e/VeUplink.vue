<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const badgesRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

const signalWidth = ref(0)

interface Credential {
  label: string
  tag: string
}

const credentials: Credential[] = [
  { label: 'BS Computer Science', tag: 'VERIFIED' },
  { label: 'COMSATS University', tag: 'AUTHENTICATED' },
  { label: "Dean's List", tag: 'CONFIRMED' },
  { label: 'Research Projects', tag: 'CATALOGUED' }
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

  // Content + signal bar
  const contentTrigger = ScrollTrigger.create({
    trigger: contentRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(contentRef.value,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      // Animate signal bar
      gsap.to({}, {
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate: function () {
          signalWidth.value = Math.round(98 * this.progress())
        }
      })
    },
    once: true
  })
  triggers.push(contentTrigger)

  // Badges
  const badgesTrigger = ScrollTrigger.create({
    trigger: badgesRef.value,
    start: 'top 85%',
    onEnter: () => {
      if (!badgesRef.value) return
      const badges = badgesRef.value.querySelectorAll('.ve-credential')
      gsap.fromTo(badges,
        { opacity: 0, rotateX: 90 },
        { opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
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
    <!-- Scan line sweep -->
    <div class="ve-scan-sweep absolute inset-0 pointer-events-none" />

    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FF00AA;">
          // UPLINK TRANSFER
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          DATA UPLINK
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Uplink data -->
      <div ref="contentRef" class="ve-uplink-card p-8 mb-10 opacity-0">
        <div class="space-y-4 font-vt323 text-sm tracking-wider">
          <div class="flex items-center gap-3">
            <span style="color: #607080;">UPLINK SOURCE:</span>
            <span class="font-oswald font-bold uppercase text-base" style="color: #E0F0FF;">COMSATS UNIVERSITY</span>
          </div>
          <div class="flex items-center gap-3">
            <span style="color: #607080;">PAYLOAD:</span>
            <span style="color: #00F0FF;">BS Computer Science</span>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span style="color: #607080;">SIGNAL STRENGTH:</span>
              <span style="color: #39FF14;">{{ signalWidth }}%</span>
            </div>
            <div class="ve-signal-track">
              <div
                class="ve-signal-fill"
                :style="{ width: signalWidth + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Credentials -->
      <div ref="badgesRef" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="cred in credentials"
          :key="cred.label"
          class="ve-credential opacity-0"
          style="perspective: 600px;"
        >
          <div class="flex items-center justify-between">
            <span class="font-sans text-sm" style="color: #E0F0FF;">{{ cred.label }}</span>
            <span class="font-vt323 text-xs tracking-wider" style="color: #39FF14;">[{{ cred.tag }}]</span>
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

.ve-scan-sweep {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 240, 255, 0.02) 50%,
    transparent 100%
  );
  background-size: 100% 200%;
  animation: ve-sweep 4s ease-in-out infinite;
}

@keyframes ve-sweep {
  0% { background-position: 0 -100%; }
  100% { background-position: 0 200%; }
}

.ve-uplink-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.1);
}

.ve-signal-track {
  height: 6px;
  background: rgba(57, 255, 20, 0.08);
  border: 1px solid rgba(57, 255, 20, 0.1);
  overflow: hidden;
}

.ve-signal-fill {
  height: 100%;
  background: linear-gradient(90deg, #39FF1488, #39FF14);
  box-shadow: 0 0 8px rgba(57, 255, 20, 0.4);
  transition: width 0.05s linear;
}

.ve-credential {
  padding: 0.875rem 1.25rem;
  background: rgba(2, 2, 8, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.ve-credential:hover {
  border-color: rgba(57, 255, 20, 0.2);
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .ve-scan-sweep {
    animation: none;
    opacity: 0;
  }
}
</style>
