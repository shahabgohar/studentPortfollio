<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

const scanText = ref('')
const scanComplete = ref(false)
const showName = ref(false)
const showRank = ref(false)
const showTechLevel = ref(false)
const powerCounter = ref(0)
const showPowerCounter = ref(false)
const techLevelBlink = ref(true)
const showScrollIndicator = ref(false)

const fullScanText = 'SCANNING TARGET...'
let blinkInterval: ReturnType<typeof setInterval> | null = null
let powerInterval: ReturnType<typeof setInterval> | null = null
let timeline: gsap.core.Timeline | null = null

const nameRef = ref<HTMLElement | null>(null)
const rankRef = ref<HTMLElement | null>(null)
const techLevelRef = ref<HTMLElement | null>(null)
const powerRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

function typeText() {
  return new Promise<void>((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullScanText.length) {
        scanText.value += fullScanText[i]
        i++
      } else {
        clearInterval(interval)
        scanComplete.value = true
        resolve()
      }
    }, 60)
  })
}

function startPowerCounter() {
  showPowerCounter.value = true
  let current = 0
  const target = 9001
  const duration = 2500
  const startTime = Date.now()

  powerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    current = Math.floor(eased * target)
    powerCounter.value = current

    if (progress >= 1) {
      powerCounter.value = target
      if (powerInterval) clearInterval(powerInterval)
    }
  }, 16)
}

onMounted(async () => {
  await typeText()

  await new Promise(r => setTimeout(r, 400))

  showName.value = true
  showRank.value = true
  showTechLevel.value = true
  showPowerCounter.value = true
  showScrollIndicator.value = true
  await nextTick()

  timeline = gsap.timeline()

  if (nameRef.value) {
    timeline.fromTo(
      nameRef.value,
      { opacity: 0, scale: 1.3, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }

  if (rankRef.value) {
    timeline.fromTo(
      rankRef.value,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
  }

  if (techLevelRef.value) {
    timeline.fromTo(
      techLevelRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.1'
    )
  }

  blinkInterval = setInterval(() => {
    techLevelBlink.value = !techLevelBlink.value
  }, 700)

  if (powerRef.value) {
    timeline.fromTo(
      powerRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
  }

  startPowerCounter()

  if (scrollRef.value) {
    timeline.fromTo(
      scrollRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '+=0.3'
    )
  }
})

onBeforeUnmount(() => {
  if (blinkInterval) clearInterval(blinkInterval)
  if (powerInterval) clearInterval(powerInterval)
  if (timeline) timeline.kill()
})
</script>

<template>
  <section class="relative w-full h-screen flex flex-col items-center justify-center px-6">
    <!-- Scan text -->
    <div class="mb-8">
      <span class="font-vt323 text-[#00FF41] text-2xl md:text-3xl tracking-[0.3em]">
        {{ scanText }}<span class="va-cursor-blink" v-if="!scanComplete">_</span>
      </span>
    </div>

    <!-- Name reveal -->
    <div v-show="showName" ref="nameRef" class="text-center opacity-0">
      <h1
        class="font-oswald font-bold italic uppercase text-[#FFD700] text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider va-name-glow leading-tight"
      >
        SHAHAB GOHAR
      </h1>
    </div>

    <!-- Rank -->
    <div v-show="showRank" ref="rankRef" class="mt-4 opacity-0">
      <p class="font-oswald uppercase text-[#C0C0C0] text-xl md:text-2xl tracking-[0.5em]">
        S-RANK SOFTWARE ENGINEER
      </p>
    </div>

    <!-- Tech Level -->
    <div v-show="showTechLevel" ref="techLevelRef" class="mt-4 opacity-0">
      <p
        class="font-vt323 text-[#FF4444] text-lg md:text-xl tracking-widest transition-opacity duration-300"
        :class="techLevelBlink ? 'opacity-100' : 'opacity-30'"
      >
        TECH LEVEL: UNMEASURABLE
      </p>
    </div>

    <!-- Power Counter -->
    <div v-show="showPowerCounter" ref="powerRef" class="mt-8 text-center opacity-0">
      <div class="font-vt323 text-[#C0C0C0] text-sm tracking-wider mb-1">INITIAL READING</div>
      <div class="font-vt323 text-[#FFD700] text-5xl md:text-6xl va-power-glow tracking-wider">
        {{ powerCounter.toLocaleString() }}
      </div>
      <div v-if="powerCounter >= 9001" class="font-vt323 text-[#FF4444] text-lg mt-1 va-warning-blink">
        !! IT'S OVER 9000 !!
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      v-show="showScrollIndicator"
      ref="scrollRef"
      class="absolute bottom-10 flex flex-col items-center opacity-0"
    >
      <span class="font-vt323 text-[#00FF41] text-sm tracking-widest mb-2">SCROLL TO ANALYZE</span>
      <div class="va-scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="animate-bounce">
          <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#00FF41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- Decorative crosshair -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none opacity-[0.05]">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#00FF41]" />
      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-[#00FF41]" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#00FF41]" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full border border-[#00FF41] opacity-50" />
    </div>
  </section>
</template>

<style scoped>
.va-name-glow {
  text-shadow:
    0 0 20px rgba(255, 215, 0, 0.5),
    0 0 40px rgba(255, 215, 0, 0.3),
    0 0 80px rgba(255, 215, 0, 0.15);
  animation: va-glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes va-glow-pulse {
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.15); }
  100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.4), 0 0 100px rgba(255, 215, 0, 0.2); }
}

.va-cursor-blink {
  animation: va-blink 0.6s infinite;
}

@keyframes va-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.va-power-glow {
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
}

.va-warning-blink {
  animation: va-warning 0.5s ease-in-out infinite alternate;
}

@keyframes va-warning {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
