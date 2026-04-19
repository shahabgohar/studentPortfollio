<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let particles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
}> = []

let scrollVelocity = 0
let lastScrollY = 0
let scrollCheckInterval: ReturnType<typeof setInterval> | null = null

const PARTICLE_COUNT = 80
const colors = ['#00FF41', '#FFD700', '#00BFFF', '#FF4444']

function initParticles(width: number, height: number) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005
    })
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  const speedMultiplier = 1 + Math.min(scrollVelocity * 0.05, 4)

  for (const p of particles) {
    p.x += p.vx * speedMultiplier
    p.y += p.vy * speedMultiplier
    p.pulse += p.pulseSpeed

    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.globalAlpha = currentAlpha
    ctx.fill()

    // Glow effect
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
    gradient.addColorStop(0, p.color)
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.globalAlpha = currentAlpha * 0.3
    ctx.fill()
  }

  ctx.globalAlpha = 1
  scrollVelocity *= 0.95

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

  scrollCheckInterval = setInterval(() => {
    const currentScrollY = window.scrollY
    scrollVelocity = Math.abs(currentScrollY - lastScrollY)
    lastScrollY = currentScrollY
  }, 50)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (scrollCheckInterval) clearInterval(scrollCheckInterval)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 w-full h-full pointer-events-none"
    style="z-index: 0;"
  />
</template>
