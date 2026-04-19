<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const profileRef = ref<HTMLElement | null>(null)
const chartRef = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)
const continuedRef = ref<HTMLElement | null>(null)
const creditsRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

interface StatBar {
  label: string
  value: number
  color: string
}

const stats: StatBar[] = [
  { label: 'Frontend', value: 95, color: '#FFD700' },
  { label: 'Backend', value: 85, color: '#4169E1' },
  { label: 'AI / ML', value: 80, color: '#DC143C' },
  { label: 'Architecture', value: 85, color: '#FFD700' },
  { label: 'DevOps', value: 70, color: '#4169E1' },
  { label: 'Communication', value: 90, color: '#DC143C' },
]

const contactLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shahabgohar/' },
  { label: 'Skype', url: 'https://join.skype.com/invite/ve8oN0kKdvXQ' },
  { label: 'Email', url: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com' },
]

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Profile card entrance
    gsap.fromTo(profileRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: profileRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Stats chart
    gsap.fromTo(chartRef.value,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: chartRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Animate stat bars
    const bars = chartRef.value?.querySelectorAll('.vb-stat-bar-fill')
    if (bars) {
      bars.forEach((bar) => {
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: (bar as HTMLElement).dataset.width || '0%',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })
    }

    // Next season preview
    gsap.fromTo(previewRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: previewRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Credits scroll
    gsap.fromTo(creditsRef.value,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.5,
        scrollTrigger: {
          trigger: creditsRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // To be continued
    gsap.fromTo(continuedRef.value,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: continuedRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="vb-credits" id="vb-about">
    <div class="vb-credits-content">
      <!-- Character profile grid -->
      <div class="vb-profile-grid">
        <!-- Left: Character profile -->
        <div ref="profileRef" class="vb-profile-card">
          <div class="vb-profile-header">
            <div class="vb-profile-badge font-vt323">CHARACTER PROFILE</div>
          </div>
          <div class="vb-profile-body">
            <div class="vb-profile-row">
              <span class="vb-profile-key font-vt323">NAME</span>
              <span class="vb-profile-val font-oswald">SHAHAB GOHAR</span>
            </div>
            <div class="vb-profile-row">
              <span class="vb-profile-key font-vt323">CLASS</span>
              <span class="vb-profile-val font-oswald">SOFTWARE ENGINEER</span>
            </div>
            <div class="vb-profile-row">
              <span class="vb-profile-key font-vt323">ORIGIN</span>
              <span class="vb-profile-val font-oswald">PAKISTAN</span>
            </div>
            <div class="vb-profile-row">
              <span class="vb-profile-key font-vt323">SPECIALIZATION</span>
              <span class="vb-profile-val font-oswald">FULL-STACK & GEN AI</span>
            </div>
            <div class="vb-profile-row">
              <span class="vb-profile-key font-vt323">STATUS</span>
              <span class="vb-profile-val vb-profile-val--active font-oswald">ACTIVE</span>
            </div>
            <div class="vb-profile-bio font-mono">
              A highly skilled Full Stack Web Developer with expertise in Vue.js,
              Laravel, and building interactive web applications. Passionate about
              creating engaging interfaces and delivering high-quality solutions
              that exceed expectations.
            </div>
          </div>
        </div>

        <!-- Right: Power stats -->
        <div ref="chartRef" class="vb-stats-card">
          <div class="vb-stats-header font-vt323">POWER ANALYSIS</div>
          <div class="vb-stats-bars">
            <div v-for="stat in stats" :key="stat.label" class="vb-stat-row">
              <div class="vb-stat-label font-vt323">{{ stat.label }}</div>
              <div class="vb-stat-bar-track">
                <div
                  class="vb-stat-bar-fill"
                  :data-width="`${stat.value}%`"
                  :style="{ background: stat.color }"
                ></div>
              </div>
              <div class="vb-stat-value font-vt323">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next season preview -->
      <div ref="previewRef" class="vb-next-season">
        <div class="vb-next-season-label font-vt323">NEXT SEASON PREVIEW:</div>
        <div class="vb-next-season-links">
          <a
            v-for="link in contactLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="vb-season-link"
          >
            <span class="vb-season-link-text font-oswald">{{ link.label }}</span>
            <span class="vb-season-link-arrow">&#x25B6;</span>
          </a>
        </div>
      </div>

      <!-- End credits scroll -->
      <div ref="creditsRef" class="vb-end-credits">
        <div class="vb-credits-scroll font-vt323">
          <div class="vb-credit-line">DIRECTED BY — SHAHAB GOHAR</div>
          <div class="vb-credit-line">WRITTEN BY — SHAHAB GOHAR</div>
          <div class="vb-credit-line">PRODUCED BY — YEARS OF HARD WORK</div>
          <div class="vb-credit-line">SPECIAL THANKS — FAMILY, MENTORS, OPEN SOURCE</div>
          <div class="vb-credit-line">TECH STACK — NUXT 3 / VUE 3 / TAILWIND / GSAP</div>
        </div>
      </div>

      <!-- To be continued -->
      <div ref="continuedRef" class="vb-continued">
        <span class="vb-continued-text font-oswald">TO BE CONTINUED...</span>
        <span class="vb-continued-arrow">&#x25B6;</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vb-credits {
  position: relative;
  z-index: 1;
  padding: 40px 0 80px;
  min-height: 80vh;
}

.vb-credits-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Profile grid */
.vb-profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .vb-profile-grid {
    grid-template-columns: 1fr;
  }
}

/* Profile card */
.vb-profile-card {
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  overflow: hidden;
  opacity: 0;
  backdrop-filter: blur(4px);
}

.vb-profile-header {
  padding: 12px 20px;
  background: rgba(255, 215, 0, 0.1);
  border-bottom: 1px solid rgba(255, 215, 0, 0.15);
}

.vb-profile-badge {
  font-size: 0.8rem;
  color: #FFD700;
  letter-spacing: 0.3em;
}

.vb-profile-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vb-profile-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.vb-profile-key {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.2em;
  min-width: 100px;
  flex-shrink: 0;
}

.vb-profile-val {
  font-size: 0.95rem;
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
}

.vb-profile-val--active {
  color: #00FF00;
  text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
}

.vb-profile-bio {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Stats card */
.vb-stats-card {
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(65, 105, 225, 0.2);
  padding: 20px;
  opacity: 0;
  backdrop-filter: blur(4px);
}

.vb-stats-header {
  font-size: 0.8rem;
  color: #4169E1;
  letter-spacing: 0.3em;
  margin-bottom: 20px;
}

.vb-stats-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vb-stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vb-stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.1em;
  min-width: 90px;
  flex-shrink: 0;
}

.vb-stat-bar-track {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.vb-stat-bar-fill {
  height: 100%;
  width: 0%;
  border-radius: 4px;
  box-shadow: 0 0 10px currentColor;
  transition: width 0.3s;
}

.vb-stat-value {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  min-width: 28px;
  text-align: right;
}

/* Next season */
.vb-next-season {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
}

.vb-next-season-label {
  font-size: 1rem;
  color: #DC143C;
  letter-spacing: 0.3em;
}

.vb-next-season-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.vb-season-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border: 1px solid rgba(220, 20, 60, 0.3);
  background: rgba(220, 20, 60, 0.05);
  text-decoration: none;
  transition: all 0.3s ease;
}

.vb-season-link:hover {
  border-color: #DC143C;
  background: rgba(220, 20, 60, 0.1);
  box-shadow: 0 0 20px rgba(220, 20, 60, 0.15);
}

.vb-season-link-text {
  font-size: 0.9rem;
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.vb-season-link-arrow {
  color: #DC143C;
  font-size: 0.7rem;
}

/* End credits */
.vb-end-credits {
  text-align: center;
  padding: 40px 0;
  opacity: 0;
}

.vb-credits-scroll {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vb-credit-line {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.2em;
}

/* To be continued */
.vb-continued {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 40px 0 20px;
  opacity: 0;
}

.vb-continued-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.05em;
}

.vb-continued-arrow {
  font-size: 1.5rem;
  color: #FFD700;
  animation: vb-arrow-pulse 1.5s ease-in-out infinite;
}

@keyframes vb-arrow-pulse {
  0%, 100% { opacity: 1; transform: translateX(0); }
  50% { opacity: 0.5; transform: translateX(8px); }
}
</style>
