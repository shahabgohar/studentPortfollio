<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const containerRef = ref<HTMLElement | null>(null)
const blackScreenRef = ref<HTMLElement | null>(null)
const episodeRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const roleRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement | null>(null)
const burstRef = ref<HTMLElement | null>(null)

const roleText = ref('')
const fullRoleText = 'SOFTWARE ENGINEER'

let ctx: gsap.Context | null = null

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shahabgohar/', icon: 'LI' },
  { label: 'Skype', url: 'https://join.skype.com/invite/ve8oN0kKdvXQ', icon: 'SK' },
  { label: 'Email', url: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com', icon: 'EM' },
]

onMounted(() => {
  if (!containerRef.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Phase 1: Black screen hold
    tl.to(blackScreenRef.value, { opacity: 1, duration: 0.01 })

    // Phase 2: Episode number fades in
    .fromTo(episodeRef.value,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      1.0
    )

    // Phase 3: Radial burst appears
    .fromTo(burstRef.value,
      { opacity: 0, scale: 0 },
      { opacity: 0.6, scale: 1, duration: 0.6, ease: 'power2.out' },
      1.8
    )

    // Phase 4: Name SLAMS in
    .fromTo(nameRef.value,
      { opacity: 0, scale: 3, rotationX: 15 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 0.8, ease: 'back.out(1.4)' },
      2.0
    )

    // Phase 5: Role types out
    .call(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i <= fullRoleText.length) {
          roleText.value = fullRoleText.substring(0, i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }, [], 3.0)

    .fromTo(roleRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      3.0
    )

    // Phase 6: Tagline fades in
    .fromTo(taglineRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      4.2
    )

    // Phase 7: Buttons fade in
    .fromTo(linksRef.value,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      5.0
    )

    // Phase 8: Black screen fades
    .to(blackScreenRef.value,
      { opacity: 0, duration: 0.01 },
      1.7
    )
  }, containerRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="containerRef" class="vb-cold-open">
    <!-- Black screen overlay -->
    <div ref="blackScreenRef" class="vb-black-screen"></div>

    <!-- Radial burst -->
    <div ref="burstRef" class="vb-radial-burst"></div>

    <!-- Content -->
    <div class="vb-cold-content">
      <!-- Episode number -->
      <div ref="episodeRef" class="vb-cold-episode font-vt323">
        EPISODE 01
      </div>

      <!-- Decoration line -->
      <div class="vb-cold-deco-line">
        <span class="vb-deco-dash"></span>
        <span class="vb-deco-kanji">&#x6226;&#x58EB;</span>
        <span class="vb-deco-dash"></span>
      </div>

      <!-- Main name -->
      <h1 ref="nameRef" class="vb-cold-name font-oswald">
        SHAHAB GOHAR
      </h1>

      <!-- Role typewriter -->
      <div ref="roleRef" class="vb-cold-role font-vt323">
        {{ roleText }}<span class="vb-cursor">_</span>
      </div>

      <!-- Tagline -->
      <div ref="taglineRef" class="vb-cold-tagline font-oswald">
        <span class="vb-deco-dash-sm"></span>
        <em>"The Developer Who Surpassed His Limits"</em>
        <span class="vb-deco-dash-sm"></span>
      </div>

      <!-- Social / Next episode links -->
      <div ref="linksRef" class="vb-cold-links">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="vb-next-ep-btn"
        >
          <span class="vb-btn-label font-vt323">{{ link.icon }}</span>
          <span class="vb-btn-text font-oswald">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vb-cold-open {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.vb-black-screen {
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 10;
  pointer-events: none;
}

.vb-radial-burst {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 40%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}

.vb-cold-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 0 1rem;
}

.vb-cold-episode {
  font-size: 1.3rem;
  color: #FFD700;
  letter-spacing: 0.4em;
  opacity: 0;
}

.vb-cold-deco-line {
  display: flex;
  align-items: center;
  gap: 16px;
}

.vb-deco-dash {
  display: block;
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}

.vb-deco-kanji {
  color: rgba(255, 215, 0, 0.3);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
}

.vb-cold-name {
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  color: #FFFFFF;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.05em;
  line-height: 1;
  text-shadow: 0 0 60px rgba(255, 215, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.5);
  opacity: 0;
}

.vb-cold-role {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #4169E1;
  letter-spacing: 0.3em;
  opacity: 0;
  min-height: 2rem;
}

.vb-cursor {
  animation: vb-blink 0.7s step-end infinite;
  color: #4169E1;
}

@keyframes vb-blink {
  50% { opacity: 0; }
}

.vb-cold-tagline {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  opacity: 0;
}

.vb-deco-dash-sm {
  display: block;
  width: 40px;
  height: 1px;
  background: rgba(255, 215, 0, 0.5);
}

.vb-cold-links {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
}

.vb-next-ep-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.05);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.vb-next-ep-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  transition: left 0.5s;
}

.vb-next-ep-btn:hover::before {
  left: 100%;
}

.vb-next-ep-btn:hover {
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
}

.vb-btn-label {
  font-size: 0.7rem;
  color: #FFD700;
  letter-spacing: 0.2em;
}

.vb-btn-text {
  font-size: 0.85rem;
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
}
</style>
