<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Demo footage that costs nothing until it is about to be seen: the page ships
// a small lazy poster, and the MP4 is only requested when the frame nears the
// viewport. It then plays while visible and pauses when scrolled away.
const props = defineProps<{
  src: string
  poster: string
  width: number
  height: number
  label: string
}>()

const video = ref<HTMLVideoElement | null>(null)
const active = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const el = video.value
  if (!el) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!active.value) {
          el.src = props.src
          active.value = true
        }
        // Reduced motion: load it, show controls, but never autoplay.
        if (!reduceMotion) el.play().catch(() => { el.controls = true })
      } else if (active.value) {
        el.pause()
      }
    },
    { rootMargin: '240px 0px' },
  )
  observer.observe(el)
  if (reduceMotion) el.controls = true
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="relative" :style="{ aspectRatio: `${width} / ${height}` }">
    <img
      :src="poster"
      :width="width"
      :height="height"
      :alt="label"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <video
      ref="video"
      :width="width"
      :height="height"
      :aria-label="active ? label : undefined"
      :aria-hidden="active ? undefined : 'true'"
      muted
      loop
      playsinline
      preload="none"
      class="absolute inset-0 h-full w-full object-cover"
    ></video>
  </div>
</template>
