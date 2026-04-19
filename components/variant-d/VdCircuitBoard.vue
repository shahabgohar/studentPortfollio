<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const metersRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

const skillMeters = [
  { label: 'FRONTEND', value: 92, color: '#00B4FF' },
  { label: 'BACKEND', value: 88, color: '#7B68EE' },
  { label: 'AI / ML', value: 78, color: '#FFE066' },
  { label: 'DEVOPS', value: 72, color: '#00B4FF' },
  { label: 'ARCHITECTURE', value: 85, color: '#7B68EE' },
]

const meterWidths = ref<number[]>(skillMeters.map(() => 0))

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

  // Content
  const contentTrigger = ScrollTrigger.create({
    trigger: contentRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(contentRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(contentTrigger)

  // Meters
  const meterTrigger = ScrollTrigger.create({
    trigger: metersRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(metersRef.value,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
      // Animate meter fills
      skillMeters.forEach((meter, i) => {
        gsap.to({}, {
          duration: 1,
          delay: i * 0.15,
          onUpdate: function() {
            meterWidths.value[i] = Math.round(meter.value * this.progress())
          }
        })
      })
    },
    once: true
  })
  triggers.push(meterTrigger)

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
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Section Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #00B4FF;">
          // SYSTEM INFO
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E8E8E8;">
          <span style="color: #FFE066;">&#9889;</span> CIRCUIT BOARD
        </h2>
        <div class="vd-electric-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <!-- Left: About -->
        <div ref="contentRef" class="opacity-0">
          <div class="vd-about-card p-6">
            <h3 class="font-oswald font-bold uppercase text-lg tracking-wider mb-4" style="color: #E8E8E8;">
              ABOUT THE ENGINEER
            </h3>
            <p class="font-sans text-sm leading-relaxed mb-4" style="color: #888888;">
              Senior Software Engineer with expertise in building AI-powered products,
              scalable architectures, and modern web applications. Passionate about
              turning complex problems into elegant solutions through clean code and
              innovative technology.
            </p>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="font-vt323 text-xs tracking-wider" style="color: #00B4FF;">LOCATION:</span>
                <span class="font-sans text-sm" style="color: #888888;">Pakistan</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-vt323 text-xs tracking-wider" style="color: #00B4FF;">STATUS:</span>
                <span class="vd-status-online font-vt323 text-sm" style="color: #FFE066;">ONLINE</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-vt323 text-xs tracking-wider" style="color: #00B4FF;">AVAILABILITY:</span>
                <span class="font-sans text-sm" style="color: #888888;">Open to opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Skill Meters -->
        <div ref="metersRef" class="opacity-0">
          <div class="vd-about-card p-6">
            <h3 class="font-oswald font-bold uppercase text-lg tracking-wider mb-6" style="color: #E8E8E8;">
              VOLTAGE METERS
            </h3>
            <div class="space-y-4">
              <div v-for="(meter, index) in skillMeters" :key="meter.label">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-vt323 text-xs tracking-wider" style="color: #888888;">{{ meter.label }}</span>
                  <span class="font-vt323 text-sm" :style="{ color: meter.color }">{{ meterWidths[index] }}%</span>
                </div>
                <div class="vd-meter-track">
                  <div
                    class="vd-meter-fill"
                    :style="{
                      width: meterWidths[index] + '%',
                      background: `linear-gradient(90deg, ${meter.color}88, ${meter.color})`,
                      boxShadow: `0 0 8px ${meter.color}66, 0 0 16px ${meter.color}33`
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div ref="contactRef" class="text-center opacity-0">
        <h3 class="font-oswald font-bold uppercase text-2xl md:text-3xl tracking-tight mb-2" style="color: #E8E8E8;">
          ESTABLISH CONNECTION
        </h3>
        <p class="font-vt323 text-sm tracking-wider mb-8" style="color: #888888;">
          INITIATE CONTACT PROTOCOL
        </p>

        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://www.linkedin.com/in/shahabgohar/"
            target="_blank"
            rel="noopener noreferrer"
            class="vd-power-switch"
          >
            <div class="vd-switch-indicator" />
            <span class="font-vt323 text-sm tracking-wider">LINKEDIN</span>
          </a>
          <a
            href="https://github.com/engineershahabgohar"
            target="_blank"
            rel="noopener noreferrer"
            class="vd-power-switch"
          >
            <div class="vd-switch-indicator" />
            <span class="font-vt323 text-sm tracking-wider">GITHUB</span>
          </a>
          <a
            href="mailto:shahab@example.com"
            class="vd-power-switch"
          >
            <div class="vd-switch-indicator vd-switch-active" />
            <span class="font-vt323 text-sm tracking-wider">EMAIL</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-24 pt-8 border-t text-center" style="border-color: rgba(0,180,255,0.1);">
        <div class="font-vt323 text-sm tracking-[0.3em] mb-2" style="color: #00B4FF;">
          // END TRANSMISSION
        </div>
        <div class="vd-hum-text font-vt323 text-xs tracking-wider mb-4" style="color: #444444;">
          &copy; 2026 // ALL CIRCUITS OPERATIONAL
        </div>

        <!-- Scroll to top -->
        <button
          class="mt-4 mx-auto flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:opacity-80"
          @click="() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="transform rotate-180">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#00B4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-vt323 text-xs tracking-widest" style="color: #00B4FF;">RETURN TO TOP</span>
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.vd-electric-line {
  background: #00B4FF;
  box-shadow: 0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.4);
}

.vd-about-card {
  background: rgba(10, 10, 26, 0.7);
  border: 1px solid rgba(0, 180, 255, 0.15);
  height: 100%;
}

.vd-status-online {
  animation: vd-online-blink 2s step-end infinite;
}

@keyframes vd-online-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.vd-meter-track {
  height: 6px;
  background: rgba(0, 180, 255, 0.08);
  border: 1px solid rgba(0, 180, 255, 0.1);
  overflow: hidden;
}

.vd-meter-fill {
  height: 100%;
  transition: width 0.05s linear;
}

.vd-power-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(0, 180, 255, 0.25);
  color: #00B4FF;
  text-decoration: none;
  background: rgba(0, 180, 255, 0.03);
  transition: all 0.3s ease;
  cursor: pointer;
}

.vd-power-switch:hover {
  border-color: #00B4FF;
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.2);
  color: #FFFFFF;
  background: rgba(0, 180, 255, 0.08);
}

.vd-switch-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #888888;
  transition: all 0.3s ease;
}

.vd-power-switch:hover .vd-switch-indicator {
  background: #00B4FF;
  box-shadow: 0 0 8px #00B4FF;
}

.vd-switch-active {
  background: #FFE066 !important;
  box-shadow: 0 0 8px rgba(255, 224, 102, 0.5) !important;
}

.vd-hum-text {
  animation: vd-hum 4s ease-in-out infinite;
}

@keyframes vd-hum {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}
</style>
