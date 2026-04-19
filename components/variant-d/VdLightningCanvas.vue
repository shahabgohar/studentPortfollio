<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const flashOverlay = ref<HTMLDivElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animFrameId: number = 0
let isDestroyed = false
let scrollProgress = 0
let displayedProgress = 0

// The one big lightning path — generated once, revealed by scroll
interface BoltPath {
  main: { x: number; y: number }[]
  branches: { startIndex: number; points: { x: number; y: number }[] }[]
}

let boltPath: BoltPath | null = null

function generateMainBolt(w: number, totalHeight: number): BoltPath {
  const segments = 80
  const points: { x: number; y: number }[] = []
  const centerX = w * 0.5

  // Start from top-center area
  let x = centerX + (Math.random() - 0.5) * w * 0.3
  let y = 0

  points.push({ x, y })

  for (let i = 1; i <= segments; i++) {
    const t = i / segments
    y = t * totalHeight
    // Jagged horizontal movement — wanders left/right
    const jitter = (Math.random() - 0.5) * 60
    // Gradually drift toward center then away
    const drift = Math.sin(t * Math.PI * 3) * w * 0.15
    x = centerX + drift + jitter
    // Clamp to canvas
    x = Math.max(40, Math.min(w - 40, x))
    points.push({ x, y })
  }

  // Generate branches at ~20% of points
  const branches: BoltPath['branches'] = []
  for (let i = 4; i < points.length - 2; i++) {
    if (Math.random() < 0.18) {
      const p = points[i]
      const side = Math.random() > 0.5 ? 1 : -1
      const angle = side * (0.3 + Math.random() * 0.8)
      const branchLen = 30 + Math.random() * 100
      const branchSegments = 3 + Math.floor(Math.random() * 4)
      const branchPoints: { x: number; y: number }[] = [{ x: p.x, y: p.y }]

      for (let j = 1; j <= branchSegments; j++) {
        const bt = j / branchSegments
        branchPoints.push({
          x: p.x + Math.cos(angle) * branchLen * bt + (Math.random() - 0.5) * 20,
          y: p.y + Math.sin(angle) * branchLen * bt * 0.5 + bt * 30 + (Math.random() - 0.5) * 10
        })
      }
      branches.push({ startIndex: i, points: branchPoints })
    }
  }

  return { main: points, branches }
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  endIndex: number,
  alpha: number,
  coreWidth: number,
  glowWidth: number
) {
  if (endIndex < 1) return
  const drawTo = Math.min(endIndex, points.length - 1)

  // Outer glow
  ctx.save()
  ctx.globalAlpha = alpha * 0.12
  ctx.strokeStyle = '#00B4FF'
  ctx.lineWidth = glowWidth + 10
  ctx.shadowColor = '#00B4FF'
  ctx.shadowBlur = 35
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i <= drawTo; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.stroke()
  ctx.restore()

  // Inner glow
  ctx.save()
  ctx.globalAlpha = alpha * 0.4
  ctx.strokeStyle = '#00B4FF'
  ctx.lineWidth = glowWidth
  ctx.shadowColor = '#00B4FF'
  ctx.shadowBlur = 15
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i <= drawTo; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.stroke()
  ctx.restore()

  // White core
  ctx.save()
  ctx.globalAlpha = alpha * 0.85
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = coreWidth
  ctx.shadowColor = '#FFFFFF'
  ctx.shadowBlur = 8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i <= drawTo; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.stroke()
  ctx.restore()

  // Bright tip at the leading edge
  if (drawTo > 0) {
    const tip = points[drawTo]
    ctx.save()
    ctx.globalAlpha = alpha * 0.6
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = '#00B4FF'
    ctx.shadowBlur = 25
    ctx.beginPath()
    ctx.arc(tip.x, tip.y, coreWidth + 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function handleScroll() {
  if (isDestroyed) return
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0
}

function animate() {
  if (isDestroyed) return
  if (!ctx || !canvasRef.value || !boltPath) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  // Smooth lerp toward target scroll progress
  displayedProgress += (scrollProgress - displayedProgress) * 0.08

  const w = canvasRef.value.width
  const h = canvasRef.value.height
  ctx.clearRect(0, 0, w, h)

  const totalPoints = boltPath.main.length
  const currentEndIndex = Math.floor(displayedProgress * totalPoints)

  if (currentEndIndex > 0) {
    // Draw main bolt up to current scroll progress
    drawPath(ctx, boltPath.main, currentEndIndex, 1, 3, 10)

    // Draw branches that have been reached
    for (const branch of boltPath.branches) {
      if (branch.startIndex <= currentEndIndex) {
        // Branch fades in as scroll passes it
        const branchProgress = Math.min(1, (currentEndIndex - branch.startIndex) / 5)
        const branchEndIndex = Math.floor(branchProgress * (branch.points.length - 1))
        drawPath(ctx, branch.points, branchEndIndex, 0.5, 1.5, 6)
      }
    }

    // Flash overlay intensity based on how fast we're drawing
    const delta = Math.abs(scrollProgress - displayedProgress)
    if (flashOverlay.value && delta > 0.005) {
      const flashIntensity = Math.min(delta * 3, 0.1)
      flashOverlay.value.style.opacity = String(flashIntensity)
    } else if (flashOverlay.value) {
      flashOverlay.value.style.opacity = '0'
    }
  }

  animFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  // Canvas height = full document height so bolt maps to scroll
  canvasRef.value.height = window.innerHeight
  // Regenerate bolt path for new dimensions
  const docHeight = document.documentElement.scrollHeight
  boltPath = generateMainBolt(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight

  const docHeight = document.documentElement.scrollHeight
  boltPath = generateMainBolt(window.innerWidth, window.innerHeight)

  scrollProgress = 0
  displayedProgress = 0

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })

  animate()
})

onBeforeUnmount(() => {
  isDestroyed = true
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="vd-lightning-wrapper">
    <canvas
      ref="canvasRef"
      class="fixed inset-0 w-full h-full pointer-events-none"
      style="z-index: 2;"
    />
    <div
      ref="flashOverlay"
      class="fixed inset-0 pointer-events-none"
      style="z-index: 3; background: radial-gradient(ellipse at center, rgba(0,180,255,0.15), transparent 70%); opacity: 0; transition: opacity 0.2s ease-out;"
    />
  </div>
</template>
