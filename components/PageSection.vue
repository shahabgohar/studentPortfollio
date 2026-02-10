<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
    title: String
})

const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!sectionRef.value || !textRef.value || !lineRef.value) return

    gsap.set(textRef.value, { opacity: 0, x: -40 })
    gsap.set(lineRef.value, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    tl.to(textRef.value, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
      .to(lineRef.value, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === sectionRef.value) t.kill()
  })
})
</script>

<template>
    <section ref="sectionRef" :id="title" class="w-full">
        <span ref="textRef" class="max-lg:text-3xl font-bold text-4xl inline-block">
            {{ title }}
        </span>
        <div ref="lineRef" class="max-lg:border-b-4 w-full border-primary border-b-8"></div>
    </section>
</template>
