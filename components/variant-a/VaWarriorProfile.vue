<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const headerRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const abilitiesRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)

interface Stat {
  label: string
  value: number
  color: string
}

const stats: Stat[] = [
  { label: 'FRONTEND', value: 95, color: '#00FF41' },
  { label: 'BACKEND', value: 90, color: '#FFD700' },
  { label: 'AI / ML', value: 85, color: '#00BFFF' },
  { label: 'DEVOPS', value: 80, color: '#FF4444' },
]

const animatedStats = ref<number[]>(stats.map(() => 0))

const bioFields = [
  { label: 'NAME', value: 'Shahab Gohar', color: '#FFD700' },
  { label: 'CLASS', value: 'Full-Stack Engineer', color: '#00BFFF' },
  { label: 'RANK', value: 'S-Rank', color: '#FF4444' },
  { label: 'LOCATION', value: 'Pakistan', color: '#00FF41' },
  { label: 'SPECIALIZATION', value: 'Gen AI / System Architecture', color: '#FFD700' },
]

const abilities = [
  { name: 'Rapid Prototyping', icon: '\u26A1' },
  { name: 'API Architecture', icon: '\uD83D\uDD17' },
  { name: 'AI Integration', icon: '\uD83E\uDDE0' },
  { name: 'Performance Tuning', icon: '\uD83D\uDE80' },
  { name: 'System Design', icon: '\uD83C\uDFD7\uFE0F' },
  { name: 'Team Leadership', icon: '\uD83D\uDC51' },
]

const contacts = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shahabgohar/',
    color: '#0077B5',
    icon: 'LNKD'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/engineershahabgohar',
    color: '#C0C0C0',
    icon: 'GHUB'
  },
  {
    name: 'Email',
    url: 'mailto:shahab.developer.work@gmail.com',
    color: '#FF4444',
    icon: 'MAIL'
  },
]

let scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  nextTick(() => {
    // Header
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

    // Bio card
    if (bioRef.value) {
      const st = ScrollTrigger.create({
        trigger: bioRef.value,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            bioRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          )
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    // Stats with animated fill
    if (statsRef.value) {
      const st = ScrollTrigger.create({
        trigger: statsRef.value,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            statsRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )

          stats.forEach((stat, i) => {
            gsap.to(animatedStats.value, {
              [i]: stat.value,
              duration: 1.5,
              delay: i * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                animatedStats.value[i] = Math.round(animatedStats.value[i])
              }
            })
          })
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    // Abilities
    if (abilitiesRef.value) {
      const st = ScrollTrigger.create({
        trigger: abilitiesRef.value,
        start: 'top 80%',
        onEnter: () => {
          const items = abilitiesRef.value?.querySelectorAll('.va-ability-item')
          if (items) {
            gsap.fromTo(
              items,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
            )
          }
        },
        once: true
      })
      scrollTriggers.push(st)
    }

    // Contact
    if (contactRef.value) {
      const st = ScrollTrigger.create({
        trigger: contactRef.value,
        start: 'top 85%',
        onEnter: () => {
          const links = contactRef.value?.querySelectorAll('.va-contact-link')
          if (links) {
            gsap.fromTo(
              links,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' }
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
  scrollTriggers.forEach(st => st.kill())
})
</script>

<template>
  <section class="relative w-full py-20 md:py-32 px-6">
    <!-- Section Header -->
    <div ref="headerRef" class="mb-16 opacity-0">
      <h2 class="font-vt323 text-[#00FF41] text-2xl md:text-3xl tracking-widest mb-2">
        // WARRIOR PROFILE
      </h2>
      <div class="w-32 h-0.5 bg-gradient-to-r from-[#00FF41] to-transparent" />
    </div>

    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column: Bio + Stats -->
      <div class="flex flex-col gap-8">
        <!-- Bio Card -->
        <div
          ref="bioRef"
          class="opacity-0 rounded-lg border border-[#00FF41]/20 backdrop-blur-md p-6"
          style="background-color: rgba(10, 10, 10, 0.85);"
        >
          <div class="font-vt323 text-[#00FF41] text-lg tracking-wider mb-4 pb-2 border-b border-[#00FF41]/20">
            SUBJECT DATA
          </div>

          <div class="space-y-3">
            <div
              v-for="(field, i) in bioFields"
              :key="i"
              class="flex gap-3 items-start"
            >
              <span class="font-vt323 text-[#666] text-sm w-32 flex-shrink-0 tracking-wider">
                {{ field.label }}:
              </span>
              <span class="font-oswald uppercase tracking-wider text-sm" :style="{ color: field.color }">
                {{ field.value }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Bars -->
        <div
          ref="statsRef"
          class="opacity-0 rounded-lg border border-[#FFD700]/20 backdrop-blur-md p-6"
          style="background-color: rgba(10, 10, 10, 0.85);"
        >
          <div class="font-vt323 text-[#FFD700] text-lg tracking-wider mb-4 pb-2 border-b border-[#FFD700]/20">
            COMBAT STATS
          </div>

          <div class="space-y-4">
            <div v-for="(stat, i) in stats" :key="i">
              <div class="flex justify-between mb-1">
                <span class="font-vt323 text-[#C0C0C0] text-sm tracking-wider">
                  {{ stat.label }}
                </span>
                <span class="font-vt323 text-sm" :style="{ color: stat.color }">
                  {{ animatedStats[i] }}%
                </span>
              </div>
              <div class="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :style="{
                    width: `${animatedStats[i]}%`,
                    backgroundColor: stat.color,
                    boxShadow: `0 0 8px ${stat.color}50`
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Abilities + Contact -->
      <div class="flex flex-col gap-8">
        <!-- Abilities -->
        <div
          ref="abilitiesRef"
          class="rounded-lg border border-[#00BFFF]/20 backdrop-blur-md p-6"
          style="background-color: rgba(10, 10, 10, 0.85);"
        >
          <div class="font-vt323 text-[#00BFFF] text-lg tracking-wider mb-4 pb-2 border-b border-[#00BFFF]/20">
            ABILITIES
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(ability, i) in abilities"
              :key="i"
              class="va-ability-item opacity-0 flex items-center gap-3 p-3 rounded border border-[#222] transition-all duration-300 hover:border-[#00BFFF]/40"
              style="background-color: rgba(17, 17, 17, 0.5);"
            >
              <span class="text-lg">{{ ability.icon }}</span>
              <span class="font-vt323 text-[#C0C0C0] text-sm tracking-wider">
                {{ ability.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Links -->
        <div
          ref="contactRef"
          class="rounded-lg border border-[#FF4444]/20 backdrop-blur-md p-6"
          style="background-color: rgba(10, 10, 10, 0.85);"
        >
          <div class="font-vt323 text-[#FF4444] text-lg tracking-wider mb-4 pb-2 border-b border-[#FF4444]/20">
            COMMUNICATION CHANNELS
          </div>

          <div class="flex flex-col gap-3">
            <a
              v-for="(contact, i) in contacts"
              :key="i"
              :href="contact.url"
              target="_blank"
              rel="noopener noreferrer"
              class="va-contact-link opacity-0 flex items-center gap-4 p-4 rounded border border-[#222] transition-all duration-300 hover:scale-[1.02] group"
              :style="{
                backgroundColor: 'rgba(17, 17, 17, 0.5)',
              }"
            >
              <div
                class="w-10 h-10 rounded flex items-center justify-center font-vt323 text-xs font-bold tracking-wider transition-all duration-300"
                :style="{
                  backgroundColor: `${contact.color}15`,
                  color: contact.color,
                  border: `1px solid ${contact.color}40`
                }"
              >
                {{ contact.icon }}
              </div>
              <div>
                <div class="font-oswald uppercase text-sm tracking-wider text-[#C0C0C0] group-hover:text-white transition-colors">
                  {{ contact.name }}
                </div>
                <div class="font-vt323 text-[#666] text-xs tracking-wider">
                  OPEN CHANNEL &gt;&gt;
                </div>
              </div>
              <div class="ml-auto font-vt323 text-[#333] group-hover:text-[#666] transition-colors">
                &gt;
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
