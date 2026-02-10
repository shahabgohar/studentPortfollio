<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, watch, nextTick, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INJECT_THEME_KEY, Theme } from '~/types'

const props = defineProps<{
  src: string
  alt?: string
}>()

const theme = inject<Ref<Theme>>(INJECT_THEME_KEY)
const containerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const asciiRef = ref<HTMLPreElement | null>(null)
const asciiText = ref('')

const ASCII_RAMP = ' .:-=+*#%@'

function getCharForBrightness(brightness: number): string {
  const isDark = theme?.value === Theme.DARK
  const index = isDark
    ? Math.floor((brightness / 255) * (ASCII_RAMP.length - 1))
    : Math.floor(((255 - brightness) / 255) * (ASCII_RAMP.length - 1))
  return ASCII_RAMP[index]
}

function generateAscii() {
  const img = imageRef.value
  if (!img || !img.complete) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cols = 80
  const aspect = img.naturalHeight / img.naturalWidth
  const rows = Math.floor(cols * aspect * 0.5)

  canvas.width = cols
  canvas.height = rows
  ctx.drawImage(img, 0, 0, cols, rows)

  const imageData = ctx.getImageData(0, 0, cols, rows)
  let result = ''
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const offset = (y * cols + x) * 4
      const r = imageData.data[offset]
      const g = imageData.data[offset + 1]
      const b = imageData.data[offset + 2]
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b
      result += getCharForBrightness(brightness)
    }
    result += '\n'
  }

  asciiText.value = result
}

function morphToAscii() {
  if (!imageRef.value || !asciiRef.value) return
  gsap.to(imageRef.value, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
  gsap.to(asciiRef.value, { opacity: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
}

function morphToImage() {
  if (!imageRef.value || !asciiRef.value) return
  gsap.to(asciiRef.value, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
  gsap.to(imageRef.value, { opacity: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
}

let scrollTriggerInstance: ScrollTrigger | null = null

function setupScrollMorph() {
  if (!containerRef.value) return

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => morphToAscii(),
    onLeaveBack: () => morphToImage()
  })
}

watch(() => theme?.value, () => {
  generateAscii()
})

onMounted(() => {
  const img = imageRef.value
  if (img) {
    if (img.complete) {
      generateAscii()
    } else {
      img.addEventListener('load', generateAscii, { once: true })
    }
  }
  nextTick(setupScrollMorph)
})

onBeforeUnmount(() => {
  scrollTriggerInstance?.kill()
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <img
      ref="imageRef"
      :src="src"
      :alt="alt || 'Profile'"
      class="max-w-max max-h-max"
    />
    <pre
      ref="asciiRef"
      class="absolute inset-0 opacity-0 text-primary font-mono leading-none overflow-hidden whitespace-pre"
      :style="{ fontSize: '6px', lineHeight: '7px' }"
    >{{ asciiText }}</pre>
  </div>
</template>
