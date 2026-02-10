<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { type Experience } from '../types'
import { useScrollAnimation } from '~/composeables/useScrollAnimation'

interface Props {
  experience?: Experience
  isLast: boolean
}
const props = withDefaults(defineProps<Props>(), {
  experience: null,
  isLast: false
})

const entryRef = ref<HTMLElement | null>(null)

useScrollAnimation(entryRef, {
  from: { opacity: 0, x: -30 },
  to: { opacity: 1, x: 0 },
  duration: 0.7,
  start: 'top 85%'
})

let cleanupHover: (() => void) | null = null

onMounted(() => {
  const el = entryRef.value
  if (!el) return

  const onEnter = () => {
    gsap.to(el, {
      backgroundColor: 'rgba(86, 91, 207, 0.08)',
      x: 4,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
  const onLeave = () => {
    gsap.to(el, {
      backgroundColor: 'transparent',
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mouseleave', onLeave)

  cleanupHover = () => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }
})

onBeforeUnmount(() => {
  cleanupHover?.()
})
</script>

<template>
    <div ref="entryRef" class="max-lg:gap-5 flex flex-col gap-10 rounded-md px-2 py-1 -mx-2 -my-1">
        <div class="max-lg:hidden grid grid-rows-1 grid-cols-3 ">
        <!-- duration -->
        <div class="text-silver font-bold">{{experience?.startDate}}-{{ experience?.endDate }}</div>
        <!-- company & designation -->
        <div class="flex flex-col">
            <div class="font-bold text-2xl">{{experience?.companyName}}</div>
            <div class="text-info">{{experience?.designation}}</div>
        </div>
        <!-- Role Summary -->
        <div class="text-base font-normal leading-5">{{experience?.roleSummary }}</div>
        </div>
        <!-- mobile view -->
        <div class="max-lg:flex flex-col gap-4 hidden">
            <div class="">
                <div class="font-bold text-xl">{{experience?.companyName}}</div>
                <div class="text-info">{{experience?.designation}}</div>
                <div class="text-silver font-bold">{{experience?.startDate}}-{{ experience?.endDate }}</div>
            </div>
            <div class="text-base font-normal leading-5">{{experience?.roleSummary }}</div>
        </div>
        <div v-if="!isLast" class="border border-primary border-1"></div>
    </div>
</template>
