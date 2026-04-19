<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

interface SagaArc {
  arcNumber: string
  sagaName: string
  company: string
  role: string
  period: string
  description: string
  powerGained: string
}

const arcs: SagaArc[] = [
  {
    arcNumber: 'ARC 05',
    sagaName: 'THE GEN-AI ARCHITECTURE SAGA',
    company: 'Esper Solutions',
    role: 'Senior Software Engineer',
    period: '2023 - Present',
    description: 'Architecting Gen AI products, customizing open-source systems, and building AI-powered solutions at enterprise scale.',
    powerGained: 'Gen AI & System Architecture'
  },
  {
    arcNumber: 'ARC 04',
    sagaName: 'THE ENTERPRISE SYSTEMS ARC',
    company: 'CTO GmbH',
    role: 'Software Engineer',
    period: '2022 - 2023',
    description: 'Built enterprise web projects and hybrid mobile applications using Nuxt, Tailwind, TypeScript, and Ionic.',
    powerGained: 'Enterprise & Mobile Development'
  },
  {
    arcNumber: 'ARC 03',
    sagaName: 'THE FULL-STACK TRAINING ARC',
    company: 'Motocle',
    role: 'Full Stack Developer',
    period: '2021 - 2022',
    description: 'Frontend development, Laravel API architecture, API integration, and delivering creative solutions to client problems.',
    powerGained: 'Full-Stack Mastery'
  },
  {
    arcNumber: 'ARC 02',
    sagaName: 'THE FREELANCE WARRIOR SAGA',
    company: 'Fiverr',
    role: 'Freelancer',
    period: '2020 - 2021',
    description: 'Took on diverse client projects, building frontends with Vue.js and hybrid mobile apps with Capacitor.',
    powerGained: 'Client Management & Versatility'
  },
  {
    arcNumber: 'ARC 01',
    sagaName: 'THE ORIGIN STORY',
    company: 'Fatima Sugar Mills',
    role: 'IT Support',
    period: '2019 - 2020',
    description: 'Learned Oracle tools, SQL, PL/SQL. The spark that ignited the journey into software engineering.',
    powerGained: 'Database & SQL Foundations'
  }
]

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Timeline line growth
    gsap.fromTo(timelineLineRef.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        }
      }
    )

    // Cards entrance
    const cards = sectionRef.value?.querySelectorAll('.vb-arc-card')
    if (cards) {
      cards.forEach((card, index) => {
        const isLeft = index % 2 === 0
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        })

        // Impact flash on the dot
        const dot = card.closest('.vb-arc-row')?.querySelector('.vb-arc-dot')
        if (dot) {
          tl.fromTo(dot,
            { scale: 0, opacity: 0 },
            { scale: 1.5, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
          )
          .to(dot, { scale: 1, duration: 0.2 })
        }

        // Card flies in
        tl.fromTo(card,
          { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          0.1
        )
      })
    }
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="vb-saga-arcs" id="vb-experience">
    <div class="vb-saga-timeline-container">
      <!-- Vertical timeline line -->
      <div class="vb-timeline-track">
        <div ref="timelineLineRef" class="vb-timeline-line"></div>
      </div>

      <!-- Arc rows -->
      <div
        v-for="(arc, index) in arcs"
        :key="arc.arcNumber"
        class="vb-arc-row"
        :class="{ 'vb-arc-row--right': index % 2 !== 0 }"
      >
        <!-- Timeline dot -->
        <div class="vb-arc-dot-wrapper">
          <div class="vb-arc-dot"></div>
        </div>

        <!-- Card -->
        <div class="vb-arc-card">
          <!-- Arc number -->
          <div class="vb-arc-number font-vt323">{{ arc.arcNumber }}</div>

          <!-- Saga name -->
          <h3 class="vb-arc-saga-name font-oswald">{{ arc.sagaName }}</h3>

          <!-- Company + Role -->
          <div class="vb-arc-meta font-mono">
            <span class="vb-arc-company">{{ arc.company }}</span>
            <span class="vb-arc-separator">//</span>
            <span class="vb-arc-role">{{ arc.role }}</span>
          </div>

          <!-- Period -->
          <div class="vb-arc-period font-vt323">{{ arc.period }}</div>

          <!-- Description -->
          <p class="vb-arc-description font-mono">{{ arc.description }}</p>

          <!-- Power gained -->
          <div class="vb-arc-power">
            <span class="vb-arc-power-label font-vt323">POWER GAINED:</span>
            <span class="vb-arc-power-value font-oswald">{{ arc.powerGained }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vb-saga-arcs {
  position: relative;
  z-index: 1;
  padding: 40px 0;
  min-height: 80vh;
}

.vb-saga-timeline-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  padding: 0 2rem;
}

/* Timeline track */
.vb-timeline-track {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .vb-timeline-track {
    left: 20px;
    transform: none;
  }
}

.vb-timeline-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #FFD700, #DC143C, #4169E1);
  transform-origin: top;
}

/* Arc row */
.vb-arc-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 60px;
  position: relative;
  padding-left: calc(50% + 30px);
}

.vb-arc-row--right {
  padding-left: 0;
  padding-right: calc(50% + 30px);
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  .vb-arc-row,
  .vb-arc-row--right {
    padding-left: 50px;
    padding-right: 0;
    flex-direction: row;
  }
}

/* Dot */
.vb-arc-dot-wrapper {
  position: absolute;
  left: 50%;
  top: 16px;
  transform: translateX(-50%);
  z-index: 3;
}

@media (max-width: 768px) {
  .vb-arc-dot-wrapper {
    left: 20px;
    transform: translateX(-50%);
  }
}

.vb-arc-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #FFD700;
  border: 2px solid #0B0B1A;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
}

/* Card */
.vb-arc-card {
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
  width: 100%;
  backdrop-filter: blur(4px);
}

.vb-arc-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, #FFD700, #DC143C);
}

.vb-arc-row--right .vb-arc-card::before {
  left: auto;
  right: 0;
}

.vb-arc-number {
  font-size: 0.85rem;
  color: #FFD700;
  letter-spacing: 0.3em;
}

.vb-arc-saga-name {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  font-style: italic;
  line-height: 1.2;
}

.vb-arc-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  flex-wrap: wrap;
}

.vb-arc-company {
  color: #4169E1;
  font-weight: 600;
}

.vb-arc-separator {
  color: rgba(255, 255, 255, 0.2);
}

.vb-arc-role {
  color: rgba(255, 255, 255, 0.6);
}

.vb-arc-period {
  font-size: 0.8rem;
  color: rgba(255, 215, 0, 0.6);
  letter-spacing: 0.15em;
}

.vb-arc-description {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-top: 4px;
}

.vb-arc-power {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  flex-wrap: wrap;
}

.vb-arc-power-label {
  font-size: 0.75rem;
  color: #DC143C;
  letter-spacing: 0.15em;
}

.vb-arc-power-value {
  font-size: 0.9rem;
  color: #FFD700;
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
}
</style>
