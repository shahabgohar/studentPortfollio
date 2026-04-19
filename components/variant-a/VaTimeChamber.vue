<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const headerRef = ref<HTMLElement | null>(null)
const terminalRef = ref<HTMLElement | null>(null)
const achievementsRef = ref<HTMLElement | null>(null)

const terminalLines = [
  { label: 'INSTITUTION', value: 'COMSATS University Islamabad', color: '#FFD700' },
  { label: 'PROGRAM', value: 'BS Computer Science', color: '#00BFFF' },
  { label: 'DURATION', value: '2017 \u2014 2021', color: '#00FF41' },
  { label: 'STATUS', value: 'COMPLETED', color: '#00FF41' },
  { label: 'CHAMBER TIME', value: '4 EARTH YEARS (4000 CHAMBER YEARS)', color: '#FF4444' },
]

const achievements = [
  { icon: '\uD83C\uDFC6', text: 'Won Hackathon 2019 at Air University, Islamabad', color: '#FFD700' },
  { icon: '\u2699\uFE0F', text: 'Head of Graphics — Softdesk Society', color: '#00BFFF' },
  { icon: '\uD83C\uDF1F', text: 'Organized tech events and workshops', color: '#00FF41' },
  { icon: '\uD83D\uDCBB', text: 'Mastered Oracle, SQL, PL/SQL during training', color: '#C0C0C0' },
]

const visibleLines = ref<number>(0)
let lineInterval: ReturnType<typeof setInterval> | null = null
let scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  nextTick(() => {
    if (headerRef.value) {
      const st = ScrollTrigger.create({
        trigger: headerRef.value,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.value,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
          )
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    if (terminalRef.value) {
      const st = ScrollTrigger.create({
        trigger: terminalRef.value,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            terminalRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )

          lineInterval = setInterval(() => {
            if (visibleLines.value < terminalLines.length) {
              visibleLines.value++
            } else {
              if (lineInterval) clearInterval(lineInterval)
            }
          }, 300)
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    if (achievementsRef.value) {
      const st = ScrollTrigger.create({
        trigger: achievementsRef.value,
        start: 'top 80%',
        onEnter: () => {
          const badges = achievementsRef.value?.querySelectorAll('.va-achievement-badge')
          if (badges) {
            gsap.fromTo(
              badges,
              { opacity: 0, scale: 0.8, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' }
            )
          }
        },
        once: true
      })
      scrollTriggers.push(st)
    }
  })
})

onBeforeUnmount(() => {
  if (lineInterval) clearInterval(lineInterval)
  scrollTriggers.forEach(st => st.kill())
})
</script>

<template>
  <section class="relative w-full py-20 md:py-32 px-6">
    <!-- Section Header -->
    <div ref="headerRef" class="mb-16 opacity-0">
      <h2 class="font-vt323 text-[#00FF41] text-2xl md:text-3xl tracking-widest mb-2">
        // HYPERBOLIC TIME CHAMBER &mdash; TRAINING RECORDS
      </h2>
      <div class="w-32 h-0.5 bg-gradient-to-r from-[#00FF41] to-transparent" />
    </div>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Terminal Output -->
      <div
        ref="terminalRef"
        class="opacity-0 rounded-lg border border-[#00FF41]/30 backdrop-blur-md overflow-hidden"
        style="background-color: rgba(10, 10, 10, 0.9);"
      >
        <!-- Terminal header bar -->
        <div class="flex items-center gap-2 px-4 py-2 border-b border-[#00FF41]/20 bg-[#0a0a0a]">
          <div class="w-3 h-3 rounded-full bg-[#FF4444]" />
          <div class="w-3 h-3 rounded-full bg-[#FFD700]" />
          <div class="w-3 h-3 rounded-full bg-[#00FF41]" />
          <span class="ml-3 font-vt323 text-[#666] text-sm">training_records.log</span>
        </div>

        <!-- Terminal content -->
        <div class="p-5 font-vt323 text-sm md:text-base space-y-2">
          <div class="text-[#00FF41] mb-3">&gt; cat /training/records.log</div>
          <div class="text-[#666] mb-4">---</div>

          <template v-for="(line, i) in terminalLines" :key="i">
            <div v-if="i < visibleLines" class="flex gap-2 items-start">
              <span class="text-[#666] whitespace-nowrap">{{ line.label }}:</span>
              <span :style="{ color: line.color }">{{ line.value }}</span>
            </div>
          </template>

          <div v-if="visibleLines >= terminalLines.length" class="mt-4 text-[#00FF41]">
            &gt; <span class="va-cursor-blink">_</span>
          </div>
        </div>
      </div>

      <!-- Achievement Badges -->
      <div ref="achievementsRef" class="flex flex-col gap-4">
        <div class="font-vt323 text-[#C0C0C0] text-lg tracking-wider mb-2">
          ACHIEVEMENTS UNLOCKED
        </div>

        <div
          v-for="(achievement, i) in achievements"
          :key="i"
          class="va-achievement-badge opacity-0 flex items-center gap-4 p-4 rounded-lg border border-[#222] backdrop-blur-md transition-all duration-300 hover:border-opacity-60"
          :style="{
            backgroundColor: 'rgba(17, 17, 17, 0.6)',
            borderColor: `${achievement.color}30`
          }"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 va-badge-glow"
            :style="{
              backgroundColor: `${achievement.color}15`,
              boxShadow: `0 0 15px ${achievement.color}30`
            }"
          >
            {{ achievement.icon }}
          </div>
          <span class="font-sans text-[#C0C0C0] text-sm leading-relaxed">
            {{ achievement.text }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.va-cursor-blink {
  animation: va-blink 0.6s infinite;
}

@keyframes va-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.va-badge-glow {
  animation: va-badge-pulse 2s ease-in-out infinite alternate;
}

@keyframes va-badge-pulse {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
