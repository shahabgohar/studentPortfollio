<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, watch, type Ref } from 'vue'
import { INJECT_THEME_KEY, Theme } from '~/types'

const theme = inject<Ref<Theme>>(INJECT_THEME_KEY)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number = 0
let columns: number[] = []

const FONT_SIZE = 14
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>?/~`'

function getColors() {
  const isDark = theme?.value === Theme.DARK
  return {
    char: isDark ? '#00ff41' : '#2d2d2d',
    bg: isDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'
  }
}

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const colCount = Math.floor(canvas.width / FONT_SIZE)
  columns = Array(colCount).fill(1)
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const colors = getColors()

  ctx.fillStyle = colors.bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = colors.char
  ctx.font = `${FONT_SIZE}px 'Roboto Mono', monospace`

  for (let i = 0; i < columns.length; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]
    ctx.fillText(char, i * FONT_SIZE, columns[i] * FONT_SIZE)

    if (columns[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
      columns[i] = 0
    }
    columns[i]++
  }

  animationId = requestAnimationFrame(draw)
}

function handleResize() {
  initCanvas()
}

watch(() => theme?.value, () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

onMounted(() => {
  initCanvas()
  draw()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    :style="{ opacity: theme === Theme.DARK ? 0.15 : 0.08 }"
  />
</template>
