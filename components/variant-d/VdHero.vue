<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const heroRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const voltageRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  tl = gsap.timeline({ delay: 0.3 })

  tl.fromTo(
    nameRef.value,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
  )
  .fromTo(
    subtitleRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  )
  .fromTo(
    taglineRef.value,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.2'
  )
  .fromTo(
    voltageRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.4 },
    '-=0.1'
  )
  .fromTo(
    linksRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.2'
  )
})

onBeforeUnmount(() => {
  if (tl) tl.kill()
})
</script>

<template>
  <section ref="heroRef" class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    <!-- Electric grid lines behind hero -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="
      background-image:
        linear-gradient(rgba(0,180,255,0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,180,255,0.3) 1px, transparent 1px);
      background-size: 60px 60px;
    " />

    <div class="relative text-center max-w-4xl mx-auto">
      <!-- Name with glitch effect -->
      <h1
        ref="nameRef"
        class="vd-glitch-text font-oswald font-[900] uppercase leading-none tracking-tight mb-6 opacity-0"
        style="font-size: clamp(3rem, 10vw, 7rem); color: #E8E8E8;"
        data-text="SHAHAB GOHAR"
      >
        SHAHAB GOHAR
      </h1>

      <!-- Subtitle with electric underline -->
      <div ref="subtitleRef" class="mb-8 opacity-0">
        <p class="font-oswald font-bold uppercase tracking-[0.3em] text-sm md:text-base" style="color: #00B4FF;">
          SENIOR SOFTWARE ENGINEER
        </p>
        <div class="vd-electric-line mx-auto mt-2" style="width: 200px; height: 2px;" />
      </div>

      <!-- Tagline -->
      <p ref="taglineRef" class="font-sans text-base md:text-lg mb-6 opacity-0" style="color: #888888;">
        <span style="color: #FFE066;">&#9889;</span> Charged by innovation. Powered by code.
      </p>

      <!-- Voltage indicator -->
      <div ref="voltageRef" class="vd-voltage-blink font-vt323 text-sm tracking-[0.4em] uppercase mb-10 opacity-0" style="color: #FFE066;">
        VOLTAGE: MAXIMUM
      </div>

      <!-- Social Links -->
      <div ref="linksRef" class="flex items-center justify-center gap-4 flex-wrap opacity-0">
        <a
          href="https://www.linkedin.com/in/shahabgohar/"
          target="_blank"
          rel="noopener noreferrer"
          class="vd-circuit-btn"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span class="font-vt323 text-sm tracking-wider">LINKEDIN</span>
        </a>
        <a
          href="https://github.com/engineershahabgohar"
          target="_blank"
          rel="noopener noreferrer"
          class="vd-circuit-btn"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span class="font-vt323 text-sm tracking-wider">GITHUB</span>
        </a>
        <a
          href="mailto:shahab@example.com"
          class="vd-circuit-btn"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span class="font-vt323 text-sm tracking-wider">EMAIL</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="font-vt323 text-xs tracking-[0.3em] animate-pulse" style="color: #00B4FF;">SCROLL TO DISCHARGE</span>
      <svg class="w-5 h-5 animate-bounce" style="color: #00B4FF;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Glitch effect on name */
.vd-glitch-text {
  position: relative;
  animation: vd-glitch-skew 5s ease-in-out infinite alternate;
}

.vd-glitch-text::before,
.vd-glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.vd-glitch-text::before {
  color: #00B4FF;
  animation: vd-glitch-1 4s ease-in-out infinite alternate;
  clip-path: inset(0 0 60% 0);
}

.vd-glitch-text::after {
  color: #7B68EE;
  animation: vd-glitch-2 4s ease-in-out infinite alternate;
  clip-path: inset(60% 0 0 0);
}

@keyframes vd-glitch-skew {
  0%, 90%, 100% { transform: skewX(0deg); }
  93% { transform: skewX(-1deg); }
  95% { transform: skewX(1deg); }
  97% { transform: skewX(0deg); }
}

@keyframes vd-glitch-1 {
  0%, 85%, 100% { opacity: 0; transform: translate(0); }
  87% { opacity: 0.8; transform: translate(-3px, 1px); }
  89% { opacity: 0; transform: translate(3px, -1px); }
  91% { opacity: 0.6; transform: translate(-2px, 0px); }
  93% { opacity: 0; }
}

@keyframes vd-glitch-2 {
  0%, 88%, 100% { opacity: 0; transform: translate(0); }
  90% { opacity: 0.7; transform: translate(3px, -1px); }
  92% { opacity: 0; transform: translate(-3px, 1px); }
  94% { opacity: 0.5; transform: translate(2px, 0px); }
  96% { opacity: 0; }
}

/* Electric underline */
.vd-electric-line {
  background: #00B4FF;
  box-shadow: 0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.4);
  animation: vd-crackle-line 2s ease-in-out infinite;
}

@keyframes vd-crackle-line {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px #00B4FF, 0 0 16px rgba(0,180,255,0.4); }
  30% { opacity: 0.7; box-shadow: 0 0 4px #00B4FF, 0 0 8px rgba(0,180,255,0.2); }
  50% { opacity: 1; box-shadow: 0 0 12px #00B4FF, 0 0 24px rgba(0,180,255,0.6); }
  70% { opacity: 0.8; }
}

/* Voltage blink */
.vd-voltage-blink {
  animation: vd-blink 2.5s step-end infinite;
}

@keyframes vd-blink {
  0%, 100% { opacity: 1; }
  40% { opacity: 1; }
  42% { opacity: 0; }
  44% { opacity: 1; }
  46% { opacity: 0; }
  48% { opacity: 1; }
}

/* Circuit buttons */
.vd-circuit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid rgba(0,180,255,0.3);
  color: #00B4FF;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(0,180,255,0.03);
}

.vd-circuit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,180,255,0.1), transparent);
  transition: left 0.5s ease;
}

.vd-circuit-btn:hover {
  border-color: #00B4FF;
  box-shadow: 0 0 15px rgba(0,180,255,0.3), inset 0 0 15px rgba(0,180,255,0.05);
  color: #FFFFFF;
}

.vd-circuit-btn:hover::before {
  left: 100%;
}
</style>
