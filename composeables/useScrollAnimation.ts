import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

export interface ScrollAnimationOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  start?: string
  end?: string
  stagger?: number
  childSelector?: string
  duration?: number
  delay?: number
  ease?: string
}

export function useScrollAnimation(
  elementRef: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
) {
  const tweens: gsap.core.Tween[] = []
  const triggers: ScrollTrigger[] = []

  const initAnimation = () => {
    if (!elementRef.value) return

    const {
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      start = 'top 80%',
      end,
      stagger = 0,
      childSelector,
      duration = 0.8,
      delay = 0,
      ease = 'power2.out'
    } = options

    const target = childSelector
      ? elementRef.value.querySelectorAll(childSelector)
      : elementRef.value

    gsap.set(target, from)

    const tween = gsap.to(target, {
      ...to,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: elementRef.value,
        start,
        toggleActions: 'play none none none',
        ...(end && { end })
      }
    })

    tweens.push(tween)
    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }
  }

  const cleanup = () => {
    tweens.forEach(t => t.kill())
    triggers.forEach(t => t.kill())
    tweens.length = 0
    triggers.length = 0
  }

  onMounted(() => {
    nextTick(initAnimation)
  })

  onBeforeUnmount(cleanup)

  return { initAnimation, cleanup }
}
