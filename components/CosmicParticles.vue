<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

const particles = ref<Particle[]>([])

const colors = [
  'rgba(233, 30, 99, 0.6)',
  'rgba(156, 39, 176, 0.6)',
  'rgba(0, 188, 212, 0.5)',
  'rgba(255, 255, 255, 0.4)',
]

const generateParticles = () => {
  const particleCount = 30
  const newParticles: Particle[] = []

  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  particles.value = newParticles
}

onMounted(() => {
  generateParticles()
})
</script>

<template>
  <div class="cosmic-particles-container">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: particle.color,
        animationDuration: `${particle.duration}s`,
        animationDelay: `${particle.delay}s`
      }"
    />
  </div>
</template>

<style scoped>
.cosmic-particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  animation: float-particle linear infinite;
  will-change: transform, opacity;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
    opacity: 0;
  }
}
</style>
