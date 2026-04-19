<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const stage1Ref = ref<HTMLElement | null>(null)
const stage2Ref = ref<HTMLElement | null>(null)
const stage3Ref = ref<HTMLElement | null>(null)
const powerBarRef = ref<HTMLElement | null>(null)
const powerFillRef = ref<HTMLElement | null>(null)
const flashOverlay = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

const stages = {
  base: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
  superSaiyan: ['Vue', 'React', 'Nuxt', 'Laravel', 'Tailwind', 'Alpine.js', 'Bootstrap'],
  ultraInstinct: ['Gen AI Products', 'System Architecture', 'Cloud', 'Automation']
}

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Power bar fill animation based on scroll
    gsap.to(powerFillRef.value, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    })

    // Stage 1 — Base Form
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: stage1Ref.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    tl1.fromTo(stage1Ref.value,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Stage 1 skill items
    const stage1Items = stage1Ref.value?.querySelectorAll('.vb-skill-item')
    if (stage1Items) {
      tl1.fromTo(stage1Items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        0.4
      )
    }

    // Stage 2 — Super Saiyan with screen shake and gold flash
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: stage2Ref.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    // Gold flash
    tl2.fromTo(flashOverlay.value,
      { opacity: 0, background: 'rgba(255, 215, 0, 0.4)' },
      { opacity: 1, duration: 0.15 }
    )
    .to(flashOverlay.value, { opacity: 0, duration: 0.4 })

    // Screen shake
    tl2.fromTo(sectionRef.value,
      { x: 0 },
      {
        x: 4, duration: 0.05, repeat: 8, yoyo: true,
        ease: 'none',
        onComplete: () => { if (sectionRef.value) sectionRef.value.style.transform = '' }
      },
      0
    )

    // Stage 2 entrance
    tl2.fromTo(stage2Ref.value,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      0.3
    )

    const stage2Items = stage2Ref.value?.querySelectorAll('.vb-skill-item')
    if (stage2Items) {
      tl2.fromTo(stage2Items,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)' },
        0.6
      )
    }

    // Stage 3 — Ultra Instinct with white flash and float
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: stage3Ref.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    // White flash
    tl3.fromTo(flashOverlay.value,
      { opacity: 0, background: 'rgba(255, 255, 255, 0.5)' },
      { opacity: 1, duration: 0.2 }
    )
    .to(flashOverlay.value, { opacity: 0, duration: 0.6 })

    // Smooth zoom-in
    tl3.fromTo(stage3Ref.value,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      0.3
    )

    const stage3Items = stage3Ref.value?.querySelectorAll('.vb-skill-item')
    if (stage3Items) {
      tl3.fromTo(stage3Items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        0.6
      )
    }

    // Float animation for ultra instinct stage (continuous)
    gsap.to(stage3Ref.value, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="vb-powerup" id="vb-skills">
    <!-- Flash overlay -->
    <div ref="flashOverlay" class="vb-flash-overlay"></div>

    <!-- Power bar on the side -->
    <div ref="powerBarRef" class="vb-power-bar">
      <div class="vb-power-bar-track">
        <div ref="powerFillRef" class="vb-power-bar-fill"></div>
      </div>
      <span class="vb-power-label font-vt323">POWER</span>
    </div>

    <div class="vb-powerup-content">
      <!-- STAGE 1: BASE FORM -->
      <div ref="stage1Ref" class="vb-stage vb-stage--base">
        <div class="vb-stage-header">
          <span class="vb-stage-label font-vt323">STAGE 1</span>
          <h3 class="vb-stage-title font-oswald">BASE FORM</h3>
          <div class="vb-stage-line vb-stage-line--white"></div>
        </div>
        <div class="vb-stage-skills">
          <div v-for="skill in stages.base" :key="skill" class="vb-skill-item vb-skill--base font-mono">
            {{ skill }}
          </div>
        </div>
      </div>

      <!-- STAGE 2: SUPER SAIYAN -->
      <div ref="stage2Ref" class="vb-stage vb-stage--saiyan">
        <div class="vb-stage-header">
          <span class="vb-stage-label font-vt323 vb-text-gold">STAGE 2</span>
          <h3 class="vb-stage-title font-oswald vb-text-gold">SUPER SAIYAN</h3>
          <div class="vb-stage-line vb-stage-line--gold"></div>
        </div>
        <div class="vb-saiyan-aura">
          <div class="vb-stage-skills">
            <div v-for="skill in stages.superSaiyan" :key="skill" class="vb-skill-item vb-skill--saiyan font-mono">
              {{ skill }}
            </div>
          </div>
        </div>
      </div>

      <!-- STAGE 3: ULTRA INSTINCT -->
      <div ref="stage3Ref" class="vb-stage vb-stage--ultra">
        <div class="vb-stage-header">
          <span class="vb-stage-label font-vt323 vb-text-silver">STAGE 3</span>
          <h3 class="vb-stage-title font-oswald vb-text-silver">ULTRA INSTINCT</h3>
          <div class="vb-stage-line vb-stage-line--silver"></div>
        </div>
        <div class="vb-stage-skills">
          <div v-for="skill in stages.ultraInstinct" :key="skill" class="vb-skill-item vb-skill--ultra font-mono">
            {{ skill }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vb-powerup {
  position: relative;
  z-index: 1;
  padding: 40px 0;
  min-height: 100vh;
}

.vb-flash-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0;
}

/* Power bar */
.vb-power-bar {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 5;
}

@media (max-width: 768px) {
  .vb-power-bar {
    display: none;
  }
}

.vb-power-bar-track {
  width: 6px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.vb-power-bar-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(to top, #DC143C, #FFD700, #FFFFFF);
  border-radius: 3px;
  transition: background 0.3s;
}

.vb-power-label {
  font-size: 0.65rem;
  color: #FFD700;
  letter-spacing: 0.15em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Content layout */
.vb-powerup-content {
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Stage shared */
.vb-stage {
  opacity: 0;
}

.vb-stage-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.vb-stage-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.3em;
}

.vb-stage-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  color: #FFFFFF;
}

.vb-text-gold { color: #FFD700 !important; }
.vb-text-silver { color: #E8E8E8 !important; }

.vb-stage-line {
  width: 100%;
  height: 2px;
  margin-top: 8px;
}
.vb-stage-line--white { background: linear-gradient(90deg, rgba(255,255,255,0.4), transparent); }
.vb-stage-line--gold { background: linear-gradient(90deg, rgba(255,215,0,0.6), transparent); }
.vb-stage-line--silver { background: linear-gradient(90deg, rgba(255,255,255,0.6), transparent); }

/* Skills grid */
.vb-stage-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.vb-skill-item {
  padding: 8px 20px;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  opacity: 0;
}

/* Base form — clean white border */
.vb-skill--base {
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.03);
}

/* Super Saiyan — gold glow */
.vb-skill--saiyan {
  border: 1px solid rgba(255, 215, 0, 0.5);
  color: #FFD700;
  font-weight: 700;
  background: rgba(255, 215, 0, 0.05);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1), inset 0 0 15px rgba(255, 215, 0, 0.05);
}

.vb-saiyan-aura {
  position: relative;
}

.vb-saiyan-aura::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

/* Ultra Instinct — silver shimmer */
.vb-skill--ultra {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #E8E8E8;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.03);
  animation: vb-shimmer 3s ease-in-out infinite alternate;
}

@keyframes vb-shimmer {
  0% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.03); }
  100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.06); }
}

.vb-stage--ultra {
  position: relative;
}
</style>
