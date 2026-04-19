<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const powerLabel = ref<HTMLElement | null>(null)
const heroName = ref<HTMLElement | null>(null)
const heroRole = ref<HTMLElement | null>(null)
const heroTagline = ref<HTMLElement | null>(null)
const heroCtas = ref<HTMLElement | null>(null)
const heroSocials = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(powerLabel.value!, { opacity: 0, y: -20, duration: 0.6, delay: 0.3 })
      .from(heroName.value!, { opacity: 0, y: 40, duration: 0.8 }, '-=0.2')
      .from(heroRole.value!, { opacity: 0, y: 30, duration: 0.6 }, '-=0.3')
      .from(heroTagline.value!, { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from(heroCtas.value!, { opacity: 0, y: 20, duration: 0.5 }, '-=0.1')
      .from(heroSocials.value!, { opacity: 0, y: 15, duration: 0.5 }, '-=0.2')
      .from(scrollIndicator.value!, { opacity: 0, duration: 0.8 }, '-=0.1')

    // Subtle pulsing amber text-shadow on the name
    gsap.to(heroName.value!, {
      textShadow: '0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.1)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}

function downloadResume() {
  window.location.href = 'https://drive.google.com/uc?export=download&id=1opWa3so3SMCEhrpaf1toeKijugCIYlpY'
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <!-- Power level label -->
    <div ref="powerLabel" class="mb-6">
      <span class="font-vt323 text-sm tracking-[0.3em] text-[#F59E0B]/70 uppercase">
        Power Level: Over 9000
      </span>
    </div>

    <!-- Name -->
    <h1
      ref="heroName"
      class="font-oswald font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-[#F5F5F5] leading-none"
      style="text-shadow: 0 0 20px rgba(245,158,11,0.15), 0 0 60px rgba(245,158,11,0.05);"
    >
      Shahab Gohar
    </h1>

    <!-- Role -->
    <p ref="heroRole" class="mt-4 font-sans text-lg sm:text-xl text-[#9CA3AF] tracking-wide">
      Senior Software Engineer
    </p>

    <!-- Tagline -->
    <p ref="heroTagline" class="mt-3 font-sans text-sm sm:text-base text-[#9CA3AF]/70 max-w-lg">
      Building AI-powered solutions &amp; scalable architectures
    </p>

    <!-- CTA Buttons -->
    <div ref="heroCtas" class="mt-10 flex flex-wrap gap-4 justify-center">
      <button
        class="vc-btn-primary group relative px-8 py-3 font-oswald text-sm uppercase tracking-widest text-[#F5F5F5] bg-transparent border border-[#F59E0B]/40 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#F59E0B] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        @click="downloadResume"
      >
        <span class="relative z-10">Download Resume</span>
        <div class="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-[#FF6B35]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      <button
        class="vc-btn-secondary group relative px-8 py-3 font-oswald text-sm uppercase tracking-widest text-[#F59E0B] bg-transparent border border-[#F59E0B]/20 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#F59E0B]/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        @click="scrollToSection('vc-contact')"
      >
        <span class="relative z-10">Get In Touch</span>
      </button>
    </div>

    <!-- Social Links -->
    <div ref="heroSocials" class="mt-10 flex gap-6 items-center">
      <a
        href="https://www.linkedin.com/in/shahabgohar/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#9CA3AF] hover:text-[#F59E0B] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
        aria-label="LinkedIn"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a
        href="https://github.com/shahabgohar"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#9CA3AF] hover:text-[#F59E0B] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
        aria-label="GitHub"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
      <a
        href="mailto:shahab.developer.work@gmail.com"
        class="text-[#9CA3AF] hover:text-[#F59E0B] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
        aria-label="Email"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollIndicator" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="font-sans text-xs text-[#9CA3AF]/50 tracking-wider uppercase">Scroll</span>
      <svg class="w-5 h-5 text-[#F59E0B]/40 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>
