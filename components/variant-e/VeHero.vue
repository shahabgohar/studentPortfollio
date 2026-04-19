<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const heroRef = ref<HTMLElement | null>(null)
const bootRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

const bootText = ref('')
const showCursor = ref(true)
let tl: gsap.core.Timeline | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

const bootMessages = [
  'INITIALIZING NEURAL LINK...',
  'CONNECTING TO NEXUS...',
  'LINK ESTABLISHED.'
]

function typeText(text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      bootText.value = text.slice(0, i + 1)
      i++
      if (i >= text.length) {
        clearInterval(interval)
        resolve()
      }
    }, speed)
  })
}

async function runBootSequence(): Promise<void> {
  for (const msg of bootMessages) {
    bootText.value = ''
    await typeText(msg, 35)
    await new Promise(r => setTimeout(r, 400))
  }
}

onMounted(async () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)

  // Run boot sequence first
  await runBootSequence()

  // Then animate in the main content
  tl = gsap.timeline({ delay: 0.2 })

  tl.to(bootRef.value, { opacity: 0, duration: 0.3 })
    .fromTo(
      nameRef.value,
      { opacity: 0, scale: 1.1, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(
      titleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      taglineRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    )
    .fromTo(
      linksRef.value!.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      scrollRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    )
})

onBeforeUnmount(() => {
  if (tl) tl.kill()
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <section ref="heroRef" class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02]" style="
      background-image:
        linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px);
      background-size: 80px 80px;
    " />

    <div class="relative text-center max-w-4xl mx-auto">
      <!-- Boot sequence text -->
      <div ref="bootRef" class="mb-4 h-8">
        <span class="font-vt323 text-sm tracking-[0.3em]" style="color: #39FF14;">
          {{ bootText }}<span :class="{ 'opacity-0': !showCursor }">_</span>
        </span>
      </div>

      <!-- Name with glitch -->
      <h1
        ref="nameRef"
        class="ve-glitch font-oswald font-[900] uppercase leading-none tracking-tight mb-6 opacity-0"
        style="font-size: clamp(3rem, 10vw, 7rem); color: #E0F0FF;"
        data-text="SHAHAB GOHAR"
      >
        SHAHAB GOHAR
      </h1>

      <!-- Title with electric line -->
      <div ref="titleRef" class="mb-8 opacity-0">
        <p class="font-oswald font-bold uppercase tracking-[0.3em] text-sm md:text-base" style="color: #00F0FF;">
          SENIOR SOFTWARE ENGINEER
        </p>
        <div class="ve-neural-line mx-auto mt-2" style="width: 200px; height: 2px;" />
      </div>

      <!-- Tagline -->
      <p ref="taglineRef" class="font-sans text-base md:text-lg mb-10 opacity-0" style="color: #607080;">
        Architect of intelligent systems. Builder of digital futures.
      </p>

      <!-- Links -->
      <div ref="linksRef" class="flex items-center justify-center gap-4 flex-wrap">
        <a
          href="https://www.linkedin.com/in/shahabgohar/"
          target="_blank"
          rel="noopener noreferrer"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::LINKEDIN]</span>
        </a>
        <a
          href="https://github.com/engineershahabgohar"
          target="_blank"
          rel="noopener noreferrer"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::GITHUB]</span>
        </a>
        <a
          href="mailto:shahab@example.com"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::EMAIL]</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollRef" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
      <span class="font-vt323 text-xs tracking-[0.3em] animate-pulse" style="color: #00F0FF;">SCROLL TO AWAKEN</span>
      <svg class="w-5 h-5 animate-bounce" style="color: #00F0FF;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Glitch effect */
.ve-glitch {
  position: relative;
  animation: ve-glitch-skew 6s ease-in-out infinite alternate;
}

.ve-glitch::before,
.ve-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.ve-glitch::before {
  color: #00F0FF;
  animation: ve-glitch-1 5s ease-in-out infinite alternate;
  clip-path: inset(0 0 60% 0);
}

.ve-glitch::after {
  color: #FF00AA;
  animation: ve-glitch-2 5s ease-in-out infinite alternate;
  clip-path: inset(60% 0 0 0);
}

@keyframes ve-glitch-skew {
  0%, 90%, 100% { transform: skewX(0deg); }
  93% { transform: skewX(-0.5deg); }
  95% { transform: skewX(0.5deg); }
  97% { transform: skewX(0deg); }
}

@keyframes ve-glitch-1 {
  0%, 85%, 100% { opacity: 0; transform: translate(0); }
  87% { opacity: 0.8; transform: translate(-2px, 1px); }
  89% { opacity: 0; transform: translate(2px, -1px); }
  91% { opacity: 0.5; transform: translate(-1px, 0px); }
  93% { opacity: 0; }
}

@keyframes ve-glitch-2 {
  0%, 88%, 100% { opacity: 0; transform: translate(0); }
  90% { opacity: 0.6; transform: translate(2px, -1px); }
  92% { opacity: 0; transform: translate(-2px, 1px); }
  94% { opacity: 0.4; transform: translate(1px, 0px); }
  96% { opacity: 0; }
}

/* Neural line */
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
  animation: ve-line-pulse 2.5s ease-in-out infinite;
}

@keyframes ve-line-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 4px #00F0FF, 0 0 10px rgba(0,240,255,0.2); }
}

/* Link buttons */
.ve-link-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 240, 255, 0.2);
  color: #00F0FF;
  text-decoration: none;
  background: rgba(0, 240, 255, 0.03);
  transition: all 0.3s ease;
}

.ve-link-btn:hover {
  border-color: #00F0FF;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(0, 240, 255, 0.05);
  color: #FFFFFF;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  .ve-glitch::before,
  .ve-glitch::after {
    display: none;
  }
  .ve-glitch {
    animation: none;
  }
}
</style>
