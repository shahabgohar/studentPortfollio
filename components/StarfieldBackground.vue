<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
  animationType: 'twinkle' | 'twinkle-slow' | 'twinkle-fast'
}

const stars = ref<Star[]>([])
const shootingStars = ref<{ id: number; delay: number }[]>([])
let animationFrame: number | null = null

const generateStars = () => {
  const starCount = 150
  const newStars: Star[] = []

  for (let i = 0; i < starCount; i++) {
    const animationTypes: Array<'twinkle' | 'twinkle-slow' | 'twinkle-fast'> = ['twinkle', 'twinkle-slow', 'twinkle-fast']
    newStars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 5,
      animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)]
    })
  }

  stars.value = newStars

  // Generate shooting stars
  shootingStars.value = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 7 + Math.random() * 5
  }))
}

onMounted(() => {
  generateStars()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="starfield-container">
    <!-- Static stars layer -->
    <div class="stars-layer">
      <div
        v-for="star in stars"
        :key="star.id"
        class="star"
        :class="[`animate-${star.animationType}`]"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          animationDelay: `${star.animationDelay}s`
        }"
      />
    </div>

    <!-- Shooting stars layer -->
    <div class="shooting-stars-layer">
      <div
        v-for="shootingStar in shootingStars"
        :key="shootingStar.id"
        class="shooting-star"
        :style="{ animationDelay: `${shootingStar.delay}s` }"
      />
    </div>

    <!-- Nebula overlay -->
    <div class="nebula-overlay" />
  </div>
</template>

<style scoped>
.starfield-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(180deg, #0c0c1d 0%, #1a1a3e 50%, #0c0c1d 100%);
}

.stars-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  will-change: opacity, transform;
}

.shooting-stars-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shooting-star {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(233, 30, 99, 0.8) 100%);
  top: 10%;
  left: -100px;
  transform: rotate(-45deg);
  animation: shooting 8s linear infinite;
  opacity: 0;
  will-change: transform, opacity;
}

.shooting-star:nth-child(2) {
  top: 30%;
  animation-delay: 3s;
}

.shooting-star:nth-child(3) {
  top: 60%;
  animation-delay: 6s;
}

.nebula-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(156, 39, 176, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(233, 30, 99, 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(26, 35, 126, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0, 188, 212, 0.1) 0%, transparent 40%);
  animation: nebula-pulse 20s ease-in-out infinite;
  will-change: opacity;
}

@keyframes shooting {
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  15% {
    transform: translateX(calc(100vw + 200px)) translateY(calc(100vw + 200px)) rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: translateX(calc(100vw + 200px)) translateY(calc(100vw + 200px)) rotate(-45deg);
    opacity: 0;
  }
}

@keyframes nebula-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
