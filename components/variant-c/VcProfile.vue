<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const barsRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

interface SkillBar {
  name: string
  level: number
}

const skillBars: SkillBar[] = [
  { name: 'Frontend', level: 95 },
  { name: 'Backend', level: 85 },
  { name: 'AI / Gen AI', level: 80 },
  { name: 'System Design', level: 75 },
  { name: 'Cloud / DevOps', level: 70 },
]

onMounted(() => {
  ctx = gsap.context(() => {
    // Fade in content
    if (contentRef.value) {
      gsap.from(contentRef.value, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value!,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Animate skill bars
    if (barsRef.value) {
      const fills = barsRef.value.querySelectorAll('.vc-bar-fill')
      gsap.from(fills, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: barsRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }

    // CTA
    if (ctaRef.value) {
      gsap.from(ctaRef.value, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" id="vc-contact" class="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
    <VcSectionHeader title="Warrior Profile" />

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <!-- Left: About -->
      <div ref="contentRef">
        <p class="font-sans text-sm sm:text-base text-[#9CA3AF]/90 leading-relaxed mb-6">
          Full-stack engineer with a deep love for building things that matter. From enterprise AI products to scalable web platforms, I bring a relentless drive for clean architecture and pixel-perfect interfaces.
        </p>
        <p class="font-sans text-sm sm:text-base text-[#9CA3AF]/90 leading-relaxed mb-8">
          Currently pushing boundaries at Esper Solutions, leading AI-powered enterprise solutions and developing Gen AI products that transform how businesses operate.
        </p>

        <!-- Info chips -->
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#F59E0B]/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span class="font-sans text-xs text-[#9CA3AF]/60">Pakistan</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="font-sans text-xs text-[#9CA3AF]/60">Available for opportunities</span>
          </div>
        </div>
      </div>

      <!-- Right: Skill bars -->
      <div ref="barsRef" class="flex flex-col gap-5">
        <div v-for="bar in skillBars" :key="bar.name" class="flex flex-col gap-1.5">
          <div class="flex justify-between items-center">
            <span class="font-sans text-xs text-[#F5F5F5]/70 uppercase tracking-wider">{{ bar.name }}</span>
            <span class="font-vt323 text-xs text-[#F59E0B]/50">{{ bar.level }}%</span>
          </div>
          <div class="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              class="vc-bar-fill h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FF6B35]"
              :style="{ width: bar.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div ref="ctaRef" class="mt-20 sm:mt-24 text-center">
      <h3 class="font-oswald font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-[#F5F5F5] mb-8">
        Let's Build Something Legendary
      </h3>

      <div class="flex flex-wrap justify-center gap-6">
        <a
          href="mailto:shahab.developer.work@gmail.com"
          class="group relative inline-flex items-center gap-3 px-8 py-3 font-oswald text-sm uppercase tracking-widest text-[#F5F5F5] bg-transparent border border-[#F59E0B]/40 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#F59E0B] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span class="relative z-10">Email Me</span>
          <div class="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-[#FF6B35]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
        <a
          href="https://www.linkedin.com/in/shahabgohar/"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center gap-3 px-8 py-3 font-oswald text-sm uppercase tracking-widest text-[#F59E0B] bg-transparent border border-[#F59E0B]/20 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#F59E0B]/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span class="relative z-10">LinkedIn</span>
        </a>
        <a
          href="https://github.com/shahabgohar"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center gap-3 px-8 py-3 font-oswald text-sm uppercase tracking-widest text-[#9CA3AF] bg-transparent border border-[#9CA3AF]/20 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#9CA3AF]/50 hover:text-[#F5F5F5]"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          <span class="relative z-10">GitHub</span>
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-24 pt-8 border-t border-[#9CA3AF]/10 text-center">
      <p class="font-sans text-xs text-[#9CA3AF]/40">
        &copy; 2024 Shahab Gohar // All rights reserved
      </p>
      <p class="font-vt323 text-xs text-[#F59E0B]/20 mt-2 tracking-wider">
        POWER LEVEL: MAXIMUM
      </p>
    </div>
  </section>
</template>
