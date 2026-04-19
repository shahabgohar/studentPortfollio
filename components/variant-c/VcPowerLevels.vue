<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

interface SkillTier {
  tier: string
  label: string
  borderClass: string
  glowClass: string
  skills: string[]
  powerLevel: string
}

const tiers: SkillTier[] = [
  {
    tier: 'BASE',
    label: 'Foundation',
    borderClass: 'border-[#9CA3AF]/30',
    glowClass: 'hover:border-[#9CA3AF]/60 hover:shadow-[0_0_20px_rgba(156,163,175,0.1)]',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
    powerLevel: '1,200',
  },
  {
    tier: 'SUPER SAIYAN',
    label: 'Primary Arsenal',
    borderClass: 'border-[#F59E0B]/30',
    glowClass: 'hover:border-[#F59E0B]/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    skills: ['Vue', 'React', 'Nuxt', 'Laravel', 'Tailwind', 'Alpine.js', 'Bootstrap'],
    powerLevel: '8,500',
  },
  {
    tier: 'ULTRA INSTINCT',
    label: 'Transcendent',
    borderClass: 'vc-gradient-border',
    glowClass: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    skills: ['Gen AI Products', 'System Architecture', 'Cloud', 'Automation'],
    powerLevel: '∞',
  },
]

onMounted(() => {
  ctx = gsap.context(() => {
    if (!cardsRef.value) return
    const cards = cardsRef.value.querySelectorAll('.vc-tier-card')
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value!,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" id="vc-skills" class="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
    <VcSectionHeader title="Power Levels" />

    <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="(tier, index) in tiers"
        :key="tier.tier"
        class="vc-tier-card group relative bg-[#1A1A1A]/80 backdrop-blur-sm rounded-sm p-6 lg:p-8 border transition-all duration-300 transform hover:scale-[1.02]"
        :class="[tier.borderClass, tier.glowClass]"
      >
        <!-- Gradient border overlay for Ultra Instinct -->
        <div
          v-if="index === 2"
          class="absolute inset-0 rounded-sm pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style="background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(245,158,11,0.3)); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; -webkit-mask-composite: xor; padding: 1px;"
        ></div>

        <!-- Tier name -->
        <div class="flex items-center justify-between mb-1">
          <span
            class="font-oswald font-bold text-lg uppercase tracking-wider"
            :class="index === 0 ? 'text-[#9CA3AF]' : index === 1 ? 'text-[#F59E0B]' : 'text-[#7C3AED]'"
          >
            {{ tier.tier }}
          </span>
          <span class="font-vt323 text-xs text-[#F59E0B]/50">PWR {{ tier.powerLevel }}</span>
        </div>

        <!-- Label -->
        <span class="font-sans text-xs text-[#9CA3AF]/60 tracking-wider uppercase">
          {{ tier.label }}
        </span>

        <!-- Skills grid -->
        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="skill in tier.skills"
            :key="skill"
            class="px-3 py-1.5 text-xs font-sans text-[#F5F5F5]/80 bg-[#0D0D0D]/60 border border-[#9CA3AF]/10 rounded-sm transition-colors duration-200 hover:border-[#F59E0B]/30 hover:text-[#F5F5F5]"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
