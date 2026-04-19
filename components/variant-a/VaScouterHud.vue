<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const powerLevel = ref(0)
const scrollPercent = ref(0)
const showSpeedLines = ref(false)
const recBlink = ref(true)

let scrollVelocity = 0
let lastScrollY = 0
let scrollCheckInterval: ReturnType<typeof setInterval> | null = null
let recBlinkInterval: ReturnType<typeof setInterval> | null = null
let speedLineTimeout: ReturnType<typeof setTimeout> | null = null

const displayPowerLevel = computed(() => {
  const val = powerLevel.value
  if (val >= 9999) return '9999+'
  return val.toString().padStart(4, '0')
})

const systemTime = ref('')
let timeInterval: ReturnType<typeof setInterval> | null = null

function updateTime() {
  const now = new Date()
  systemTime.value = now.toLocaleTimeString('en-US', { hour12: false })
}

function handleScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const percent = docHeight > 0 ? scrollTop / docHeight : 0
  scrollPercent.value = percent

  powerLevel.value = Math.min(Math.floor(percent * 10500), 9999)

  const velocity = Math.abs(scrollTop - lastScrollY)
  scrollVelocity = velocity
  lastScrollY = scrollTop

  if (velocity > 30) {
    showSpeedLines.value = true
    if (speedLineTimeout) clearTimeout(speedLineTimeout)
    speedLineTimeout = setTimeout(() => {
      showSpeedLines.value = false
    }, 200)
  }
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  window.addEventListener('scroll', handleScroll, { passive: true })
  recBlinkInterval = setInterval(() => {
    recBlink.value = !recBlink.value
  }, 800)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (timeInterval) clearInterval(timeInterval)
  if (recBlinkInterval) clearInterval(recBlinkInterval)
  if (speedLineTimeout) clearTimeout(speedLineTimeout)
  if (scrollCheckInterval) clearInterval(scrollCheckInterval)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none" style="z-index: 50;">
    <!-- Scanline overlay -->
    <div class="absolute inset-0 va-scanlines" />

    <!-- Corner brackets -->
    <div class="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00FF41] opacity-60" />
    <div class="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#00FF41] opacity-60" />
    <div class="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#00FF41] opacity-60" />
    <div class="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00FF41] opacity-60" />

    <!-- REC indicator top-left -->
    <div class="absolute top-8 left-8 flex items-center gap-2">
      <span
        class="inline-block w-3 h-3 rounded-full bg-[#FF4444] transition-opacity duration-300"
        :class="recBlink ? 'opacity-100' : 'opacity-20'"
      />
      <span class="font-vt323 text-[#FF4444] text-lg tracking-wider">REC</span>
    </div>

    <!-- Scouter version top-right -->
    <div class="absolute top-8 right-8 text-right">
      <div class="font-vt323 text-[#00FF41] text-sm tracking-wider">SCOUTER v3.0 // CAPSULE CORP</div>
      <div class="font-vt323 text-[#00FF41] text-xs opacity-60 mt-1">SYS TIME: {{ systemTime }}</div>
    </div>

    <!-- Power level bottom-right -->
    <div class="absolute bottom-8 right-8 text-right">
      <div class="font-vt323 text-[#C0C0C0] text-xs tracking-wider opacity-70">POWER LEVEL</div>
      <div class="font-vt323 text-[#FFD700] text-4xl tracking-widest va-power-glow">
        {{ displayPowerLevel }}
      </div>
      <!-- Power bar -->
      <div class="w-36 h-1.5 bg-[#333] mt-1 ml-auto rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-[#00FF41] via-[#FFD700] to-[#FF4444] transition-all duration-300 rounded-full"
          :style="{ width: `${scrollPercent * 100}%` }"
        />
      </div>
    </div>

    <!-- Scroll indicator bottom-left -->
    <div class="absolute bottom-8 left-8">
      <div class="font-vt323 text-[#C0C0C0] text-xs tracking-wider opacity-70">SCAN DEPTH</div>
      <div class="font-vt323 text-[#00FF41] text-lg">{{ Math.floor(scrollPercent * 100) }}%</div>
    </div>

    <!-- Speed lines on fast scroll -->
    <Transition name="va-speed">
      <div v-if="showSpeedLines" class="absolute inset-0 va-speed-lines" />
    </Transition>
  </div>
</template>

<style scoped>
.va-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.015) 2px,
    rgba(0, 255, 65, 0.015) 4px
  );
  pointer-events: none;
}

.va-power-glow {
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
}

.va-speed-lines {
  background:
    linear-gradient(90deg, rgba(0, 255, 65, 0.1) 0%, transparent 5%),
    linear-gradient(270deg, rgba(0, 255, 65, 0.1) 0%, transparent 5%),
    linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, transparent 3%),
    linear-gradient(0deg, rgba(255, 215, 0, 0.05) 0%, transparent 3%);
  animation: va-speed-pulse 0.15s ease-out;
}

@keyframes va-speed-pulse {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.va-speed-enter-active { transition: opacity 0.1s ease; }
.va-speed-leave-active { transition: opacity 0.3s ease; }
.va-speed-enter-from,
.va-speed-leave-to { opacity: 0; }
</style>
