<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
let animationId: number | null = null
let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = []

function initParticles(width: number, height: number) {
  particles = []
  const count = Math.floor((width * height) / 15000)
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    })
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    if (p.y < -10) {
      p.y = canvas.height + 10
      p.x = Math.random() * canvas.width
    }
    if (p.x < -10) p.x = canvas.width + 10
    if (p.x > canvas.width + 10) p.x = -10

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
    ctx.fill()
  }

  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas.width, canvas.height)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas.width, canvas.height)
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="bgRef" class="vb-anime-bg">
    <div class="vb-gradient-layer"></div>
    <canvas ref="canvasRef" class="vb-particles-canvas"></canvas>
    <!-- Speed lines on edges -->
    <div class="vb-speed-lines vb-speed-lines--left"></div>
    <div class="vb-speed-lines vb-speed-lines--right"></div>
  </div>
</template>

<style scoped>
.vb-anime-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.vb-gradient-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    #0B0B1A 0%,
    #0f0a2e 35%,
    #1a0a20 65%,
    #1a0a12 100%
  );
  z-index: 0;
}

.vb-particles-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.vb-speed-lines {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.vb-speed-lines--left {
  left: 0;
  background: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 8px,
    rgba(255, 215, 0, 0.04) 8px,
    rgba(255, 215, 0, 0.04) 10px
  );
}

.vb-speed-lines--right {
  right: 0;
  background: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 8px,
    rgba(255, 215, 0, 0.04) 8px,
    rgba(255, 215, 0, 0.04) 10px
  );
}
</style>
