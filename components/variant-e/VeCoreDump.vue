<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const metersRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface DiagnosticMeter {
  label: string
  value: number
  color: string
}

const meters: DiagnosticMeter[] = [
  { label: 'FRONTEND', value: 92, color: '#00F0FF' },
  { label: 'BACKEND', value: 88, color: '#FF00AA' },
  { label: 'AI / ML', value: 78, color: '#FFAA00' },
  { label: 'DEVOPS', value: 72, color: '#39FF14' },
  { label: 'ARCHITECT', value: 85, color: '#00F0FF' }
]

const meterWidths = ref<number[]>(meters.map(() => 0))

function generateBar(current: number, total: number): string {
  const filled = Math.round((current / 100) * total)
  return '\u2588'.repeat(filled) + '\u2591'.repeat(total - filled)
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

  // About
  const aboutTrigger = ScrollTrigger.create({
    trigger: aboutRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(aboutRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(aboutTrigger)

  // Meters
  const metersTrigger = ScrollTrigger.create({
    trigger: metersRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(metersRef.value,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
      meters.forEach((meter, i) => {
        gsap.to({}, {
          duration: 1,
          delay: i * 0.12,
          onUpdate: function () {
            meterWidths.value[i] = Math.round(meter.value * this.progress())
          }
        })
      })
    },
    once: true
  })
  triggers.push(metersTrigger)

  // Contact
  const contactTrigger = ScrollTrigger.create({
    trigger: contactRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(contactRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(contactTrigger)

  // Footer
  const footerTrigger = ScrollTrigger.create({
    trigger: footerRef.value,
    start: 'top 95%',
    onEnter: () => {
      gsap.fromTo(footerRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
    },
    once: true
  })
  triggers.push(footerTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FF00AA;">
          // SYSTEM REPORT
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          CORE DUMP
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Two column -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <!-- About -->
        <div ref="aboutRef" class="ve-dump-card p-6 opacity-0">
          <div class="font-vt323 text-xs tracking-[0.4em] mb-4" style="color: #FFAA00;">
            === ENGINEER PROFILE ===
          </div>
          <p class="font-sans text-sm leading-relaxed mb-6" style="color: #607080;">
            Senior Software Engineer with expertise in building AI-powered products,
            scalable architectures, and modern web applications. Passionate about turning
            complex problems into elegant solutions through clean code and innovative technology.
          </p>
          <div class="space-y-3 font-vt323 text-sm tracking-wider">
            <div class="flex items-center gap-3">
              <span style="color: #607080;">LOCATION:</span>
              <span style="color: #E0F0FF;">Pakistan</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="color: #607080;">STATUS:</span>
              <span class="ve-online-dot" style="color: #39FF14;">ONLINE</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="color: #607080;">AVAILABILITY:</span>
              <span style="color: #E0F0FF;">Open to opportunities</span>
            </div>
          </div>
        </div>

        <!-- Diagnostics -->
        <div ref="metersRef" class="ve-dump-card p-6 opacity-0">
          <div class="font-vt323 text-xs tracking-[0.4em] mb-6" style="color: #FFAA00;">
            === SYSTEM DIAGNOSTICS ===
          </div>
          <div class="space-y-3">
            <div v-for="(meter, i) in meters" :key="meter.label" class="font-vt323 text-sm">
              <div class="flex items-center justify-between mb-1">
                <span style="color: #607080;">{{ meter.label }}</span>
                <span :style="{ color: meter.color }">{{ meterWidths[i] }}%</span>
              </div>
              <div class="ve-ascii-bar" :style="{ color: meter.color }">
                {{ generateBar(meterWidths[i], 22) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div ref="contactRef" class="text-center opacity-0">
        <div class="font-vt323 text-xs tracking-[0.4em] mb-6" style="color: #FFAA00;">
          === NETWORK ENDPOINTS ===
        </div>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://www.linkedin.com/in/shahabgohar/"
            target="_blank"
            rel="noopener noreferrer"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">SSH</span>
              <span style="color: #607080;"> &rarr; </span>
              LINKEDIN
            </span>
          </a>
          <a
            href="https://github.com/engineershahabgohar"
            target="_blank"
            rel="noopener noreferrer"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">GIT</span>
              <span style="color: #607080;"> &rarr; </span>
              GITHUB
            </span>
          </a>
          <a
            href="mailto:shahab@example.com"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">SMTP</span>
              <span style="color: #607080;"> &rarr; </span>
              EMAIL
            </span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <footer ref="footerRef" class="mt-24 pt-8 border-t text-center opacity-0" style="border-color: rgba(0,240,255,0.08);">
        <div class="font-vt323 text-sm tracking-[0.3em] mb-2" style="color: #00F0FF;">
          // PROCESS COMPLETE — NEURAL LINK TERMINATED
        </div>
        <div class="ve-hum font-vt323 text-xs tracking-wider mb-4" style="color: #333333;">
          &copy; 2026 SHAHAB GOHAR — ALL SYSTEMS NOMINAL
        </div>

        <button
          class="mt-4 mx-auto flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80"
          @click="() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="transform rotate-180">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#00F0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-vt323 text-xs tracking-widest" style="color: #00F0FF;">RETURN TO NEXUS</span>
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-dump-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.08);
  height: 100%;
}

.ve-online-dot {
  position: relative;
  padding-left: 1rem;
}

.ve-online-dot::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #39FF14;
  box-shadow: 0 0 6px #39FF14;
  animation: ve-blink-dot 2s ease-in-out infinite;
}

@keyframes ve-blink-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.ve-ascii-bar {
  font-size: 0.7rem;
  line-height: 1;
  letter-spacing: 0.5px;
}

.ve-endpoint-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border: 1px solid rgba(0, 240, 255, 0.15);
  color: #00F0FF;
  text-decoration: none;
  background: rgba(0, 240, 255, 0.02);
  transition: all 0.3s ease;
}

.ve-endpoint-btn:hover {
  border-color: #00F0FF;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  color: #FFFFFF;
}

.ve-hum {
  animation: ve-hum-anim 4s ease-in-out infinite;
}

@keyframes ve-hum-anim {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-online-dot::before,
  .ve-hum {
    animation: none;
  }
}
</style>
