import { gsap } from 'gsap'
import type { Ref } from 'vue'

export interface HeroRefs {
  greeting: Ref<HTMLElement | null>
  name: Ref<HTMLElement | null>
  button: Ref<HTMLElement | null>
  socials: Ref<HTMLElement | null>
  scrollArrow: Ref<HTMLElement | null>
}

export function useHeroAnimation(refs: HeroRefs) {
  let timeline: gsap.core.Timeline | null = null

  const play = () => {
    timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (refs.greeting.value) {
      gsap.set(refs.greeting.value, { opacity: 0, x: -30 })
      timeline.to(refs.greeting.value, { opacity: 1, x: 0, duration: 0.6 })
    }

    if (refs.name.value) {
      gsap.set(refs.name.value, { opacity: 0, y: 40 })
      timeline.to(refs.name.value, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
    }

    if (refs.button.value) {
      gsap.set(refs.button.value, { opacity: 0, y: 20 })
      timeline.to(refs.button.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    }

    if (refs.socials.value) {
      const links = refs.socials.value.children
      gsap.set(links, { opacity: 0, scale: 0.5 })
      timeline.to(links, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      }, '-=0.2')
    }

    if (refs.scrollArrow.value) {
      gsap.set(refs.scrollArrow.value, { opacity: 0 })
      timeline.to(refs.scrollArrow.value, { opacity: 1, duration: 0.5 }, '-=0.1')
      // Add a continuous bounce after the entrance
      timeline.to(refs.scrollArrow.value, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut'
      })
    }
  }

  onMounted(() => {
    nextTick(play)
  })

  onBeforeUnmount(() => {
    timeline?.kill()
  })

  return { play, timeline }
}
