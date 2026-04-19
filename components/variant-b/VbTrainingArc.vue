<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const completeRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const skillsUnlocked = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management (SQL)',
  'Web Development Fundamentals',
  'Software Engineering Principles',
  'Team Collaboration',
  'Problem Solving',
  'Hackathon Champion (2019)'
]

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Left panel slides in
    gsap.fromTo(leftRef.value,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Right panel slides in
    gsap.fromTo(rightRef.value,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Badge reveals
    const badges = sectionRef.value?.querySelectorAll('.vb-badge')
    if (badges) {
      badges.forEach((badge, index) => {
        gsap.fromTo(badge,
          { opacity: 0, rotationY: 90, scale: 0.8 },
          {
            opacity: 1, rotationY: 0, scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: badge,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })
    }

    // Training complete text
    gsap.fromTo(completeRef.value,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: completeRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="vb-training-arc" id="vb-education">
    <div class="vb-training-content">
      <!-- Split screen layout -->
      <div class="vb-training-split">
        <!-- Left: University info -->
        <div ref="leftRef" class="vb-training-left">
          <div class="vb-training-montage-label font-vt323">TRAINING GROUNDS</div>
          <h3 class="vb-training-university font-oswald">
            COMSATS UNIVERSITY
          </h3>
          <div class="vb-training-degree font-mono">
            BS Computer Science
          </div>
          <div class="vb-training-period font-vt323">2017 - 2021</div>

          <div class="vb-training-details font-mono">
            <p>Intensive four-year training arc at one of Pakistan's premier technical institutions.</p>
            <ul class="vb-training-list">
              <li>Won Hackathon 2019 at Air University, Islamabad</li>
              <li>Head of Graphics — Softdesk Society</li>
              <li>Organized workshops and technical events</li>
            </ul>
          </div>
        </div>

        <!-- Right: Skills unlocked -->
        <div ref="rightRef" class="vb-training-right">
          <div class="vb-training-montage-label font-vt323">SKILLS UNLOCKED</div>
          <div class="vb-badges-grid">
            <div
              v-for="skill in skillsUnlocked"
              :key="skill"
              class="vb-badge"
            >
              <div class="vb-badge-inner">
                <span class="vb-badge-icon font-vt323">&#x2726;</span>
                <span class="vb-badge-text font-mono">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Training complete -->
      <div ref="completeRef" class="vb-training-complete">
        <div class="vb-complete-line"></div>
        <div class="vb-complete-text font-oswald">
          TRAINING COMPLETE. POWER LEVEL: MAXIMUM.
        </div>
        <div class="vb-complete-line"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vb-training-arc {
  position: relative;
  z-index: 1;
  padding: 40px 0;
  min-height: 60vh;
}

.vb-training-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.vb-training-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .vb-training-split {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* Left side */
.vb-training-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
}

.vb-training-montage-label {
  font-size: 0.8rem;
  color: #DC143C;
  letter-spacing: 0.3em;
}

.vb-training-university {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  font-style: italic;
  line-height: 1.2;
}

.vb-training-degree {
  font-size: 1rem;
  color: #4169E1;
  font-weight: 600;
}

.vb-training-period {
  font-size: 0.9rem;
  color: rgba(255, 215, 0, 0.7);
  letter-spacing: 0.15em;
}

.vb-training-details {
  margin-top: 16px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.vb-training-list {
  margin-top: 12px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vb-training-list li {
  position: relative;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.6);
}

.vb-training-list li::before {
  content: '\25B8';
  position: absolute;
  left: 0;
  color: #FFD700;
}

/* Right side */
.vb-training-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
}

.vb-badges-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vb-badge {
  perspective: 600px;
  opacity: 0;
}

.vb-badge-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(26, 26, 46, 0.6);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-left: 3px solid #FFD700;
  backdrop-filter: blur(4px);
}

.vb-badge-icon {
  color: #FFD700;
  font-size: 1rem;
}

.vb-badge-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
}

/* Training complete */
.vb-training-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px 0;
  opacity: 0;
}

.vb-complete-line {
  height: 2px;
  flex: 1;
  max-width: 100px;
  background: linear-gradient(90deg, transparent, #FFD700);
}

.vb-complete-line:last-child {
  background: linear-gradient(90deg, #FFD700, transparent);
}

.vb-complete-text {
  font-size: clamp(0.9rem, 2.5vw, 1.3rem);
  color: #FFD700;
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.1em;
  text-align: center;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}
</style>
