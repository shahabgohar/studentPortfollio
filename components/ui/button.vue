<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
    title: String,
    iconName: String
})

const btnRef = ref<HTMLElement | null>(null)
let cleanupHover: (() => void) | null = null

onMounted(() => {
  const el = btnRef.value
  if (!el) return

  const onEnter = () => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 4px 20px rgba(86,91,207,0.3)', duration: 0.25, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.25, ease: 'power2.out' })
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
    <button ref="btnRef" class="flex items-center justify-center max-sm:px-3 max-sm:py-1 max-lg:px-6  py-3.5 px-12 rounded-md border border-primary">
            <div class="max-sm:text-xl max-lg:text-2xl text-4xl h-16 flex items-center justify-center space-x-4">
              <div class="">{{ title }}</div>
              <Icon v-if="iconName" class="max-md:w-6 max-md:h-6 max-lg:w-9 max-lg:h-9 w-11 h-11" :name="iconName"></Icon>
            </div>
    </button>
</template>
