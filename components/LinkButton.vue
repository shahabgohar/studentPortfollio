<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

interface Props {
  title: string
  link: string
  icon: any
}
const props = defineProps<Props>()

const linkRef = ref<HTMLElement | null>(null)
let cleanupHover: (() => void) | null = null

onMounted(() => {
  const el = linkRef.value
  if (!el) return

  const onEnter = () => {
    gsap.to(el, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' })
  }
  const onLeave = () => {
    gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
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
    <a
    ref="linkRef"
    :href="props.link"
    target="blank"
    :aria-label="`contact via ${props.title}`"
    class="max-sm:w-12 max-sm:h-12 max-lg:w-16 max-lg:h-16 w-20 h-20 bg-grey flex justify-center items-center  rounded-full">
      <span class="max-sm:w-6 max-sm:h-6 max-lg:w-9 max-lg:h-9 h-11 w-11">
      <component :is="props.icon"></component>
      </span>
    </a>
</template>
