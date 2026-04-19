<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const clustersRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface Cluster {
  id: string
  label: string
  skills: string[]
  color: string
  glowColor: string
}

const clusters: Cluster[] = [
  {
    id: 'CLUSTER::01',
    label: 'CORE PROTOCOLS',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.3)'
  },
  {
    id: 'CLUSTER::02',
    label: 'FRAMEWORKS',
    skills: ['Vue', 'React', 'Nuxt', 'Laravel', 'Tailwind', 'Alpine.js', 'Bootstrap'],
    color: '#FF00AA',
    glowColor: 'rgba(255, 0, 170, 0.3)'
  },
  {
    id: 'CLUSTER::03',
    label: 'ARCHITECT TIER',
    skills: ['Gen AI Products', 'System Architecture', 'Cloud', 'Automation'],
    color: '#39FF14',
    glowColor: 'rgba(57, 255, 20, 0.3)'
  }
]

onMounted(() => {
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

  // Cluster cards stagger
  const clusterTrigger = ScrollTrigger.create({
    trigger: clustersRef.value,
    start: 'top 80%',
    onEnter: () => {
      if (!clustersRef.value) return
      const cards = clustersRef.value.querySelectorAll('.ve-cluster-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      )
      // Stagger skill nodes inside each card
      cards.forEach((card, cardIdx) => {
        const nodes = card.querySelectorAll('.ve-skill-node')
        gsap.fromTo(nodes,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, delay: 0.3 + cardIdx * 0.15, ease: 'back.out(1.7)' }
        )
      })
    },
    once: true
  })
  triggers.push(clusterTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #39FF14;">
          // NEURAL MAPPING
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          SYNAPSES
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Cluster grid -->
      <div ref="clustersRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="cluster in clusters"
          :key="cluster.id"
          class="ve-cluster-card opacity-0"
          :style="{ borderColor: cluster.color + '22' }"
        >
          <!-- Cluster header -->
          <div class="px-6 pt-6 pb-3 border-b" :style="{ borderColor: cluster.color + '15' }">
            <div class="font-vt323 text-xs tracking-[0.4em] mb-1" :style="{ color: cluster.color }">
              {{ cluster.id }}
            </div>
            <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #E0F0FF;">
              {{ cluster.label }}
            </h3>
          </div>

          <!-- Skill nodes -->
          <div class="p-6 flex flex-wrap gap-3">
            <div
              v-for="skill in cluster.skills"
              :key="skill"
              class="ve-skill-node opacity-0"
              :style="{
                '--node-color': cluster.color,
                '--node-glow': cluster.glowColor
              } as any"
            >
              <div class="ve-node-dot" :style="{ background: cluster.color }" />
              <span class="font-vt323 text-sm tracking-wider" style="color: #E0F0FF;">{{ skill }}</span>
            </div>
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

.ve-cluster-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.ve-cluster-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 30px rgba(0, 240, 255, 0.08);
}

.ve-skill-node {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;
}

.ve-skill-node:hover {
  border-color: var(--node-color);
  box-shadow: 0 0 12px var(--node-glow);
  background: rgba(255, 255, 255, 0.04);
}

.ve-node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ve-node-pulse 2s ease-in-out infinite;
}

@keyframes ve-node-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px currentColor; }
  50% { opacity: 0.5; box-shadow: 0 0 8px currentColor; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-node-dot {
    animation: none;
  }
}
</style>
