<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
  episodeNumber: string
  episodeTitle: string
  triggerId: string
}>()

const transitionRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const episodeNumRef = ref<HTMLElement | null>(null)
const episodeTitleRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!transitionRef.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    tl.fromTo(overlayRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
    .fromTo(episodeNumRef.value,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      0.3
    )
    .fromTo(episodeTitleRef.value,
      { opacity: 0, scale: 2.5, letterSpacing: '0.5em' },
      { opacity: 1, scale: 1, letterSpacing: '0.15em', duration: 0.7, ease: 'power4.out' },
      0.6
    )
    .to(overlayRef.value,
      { opacity: 0, duration: 0.5 },
      2.0
    )
  }, transitionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="transitionRef" class="vb-episode-transition" :id="triggerId">
    <div ref="overlayRef" class="vb-episode-overlay">
      <div class="vb-episode-content">
        <div ref="episodeNumRef" class="vb-episode-number font-vt323">
          {{ episodeNumber }}
        </div>
        <div class="vb-episode-divider">
          <span class="vb-divider-line"></span>
          <span class="vb-divider-diamond"></span>
          <span class="vb-divider-line"></span>
        </div>
        <div ref="episodeTitleRef" class="vb-episode-title font-oswald">
          {{ episodeTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vb-episode-transition {
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.vb-episode-overlay {
  position: absolute;
  inset: 0;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.vb-episode-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  padding: 0 1rem;
}

.vb-episode-number {
  font-size: 1.2rem;
  color: #FFD700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.vb-episode-divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vb-divider-line {
  display: block;
  width: 60px;
  height: 1px;
  background: #FFD700;
}

.vb-divider-diamond {
  display: block;
  width: 8px;
  height: 8px;
  background: #FFD700;
  transform: rotate(45deg);
}

.vb-episode-title {
  font-size: clamp(1.4rem, 4vw, 2.5rem);
  color: #FFFFFF;
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.15em;
}
</style>
