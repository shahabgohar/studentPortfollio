<script setup lang="ts">
import { computed, ref } from 'vue'

// "Do the math" with the visitor's own numbers. Defaults reproduce the typical
// small-team example quoted on the site: 2 h/day at $25/h is $13,000 a year,
// which pays back a sprint at its $1,900 starting price in under two months.
//
// Keep this honest: it is plain arithmetic on the visitor's inputs. It states
// its one assumption, quotes the sprint's STARTING price (pricing is "from"),
// and offers no verdicts in the owner's voice.
const SPRINT_FROM = 1900
const WORK_DAYS = 260

const hours = ref(2)
const rate = ref(25)
const people = ref(1)

const yearly = computed(() => hours.value * rate.value * people.value * WORK_DAYS)
const hoursPerYear = computed(() => hours.value * people.value * WORK_DAYS)
const paybackMonths = computed(() => SPRINT_FROM / (yearly.value / 12))

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const peopleLabel = computed(() => (people.value === 1 ? '1 person' : `${people.value} people`))

const paybackLabel = computed(() => {
  const m = paybackMonths.value
  if (m < 1) return 'Under a month'
  const rounded = m.toFixed(1)
  return rounded === '1.0' ? '1 month' : `${rounded} months`
})
</script>

<template>
  <div class="grid border border-primary lg:grid-cols-[1.05fr_1fr]">
    <form class="grid gap-7 p-6 sm:p-8" @submit.prevent>
      <div>
        <div class="flex items-baseline justify-between gap-4">
          <label for="roi-hours" class="label text-primary/70">Hours a day on copy-paste</label>
          <span class="display tabular shrink-0 whitespace-nowrap text-3xl" aria-hidden="true">{{ hours }} h</span>
        </div>
        <input
          id="roi-hours"
          v-model.number="hours"
          type="range"
          min="0.5"
          max="8"
          step="0.5"
          class="range mt-3"
          :aria-valuetext="`${hours} hours a day`"
        />
        <p class="mt-2 text-sm leading-6 text-primary/70">
          Typical manual work between inbox, sheets, and CRM.
        </p>
      </div>

      <div>
        <div class="flex items-baseline justify-between gap-4">
          <label for="roi-rate" class="label text-primary/70">What an hour costs you</label>
          <span class="display tabular shrink-0 whitespace-nowrap text-3xl" aria-hidden="true">${{ rate }}</span>
        </div>
        <input
          id="roi-rate"
          v-model.number="rate"
          type="range"
          min="10"
          max="100"
          step="5"
          class="range mt-3"
          :aria-valuetext="`${rate} dollars an hour`"
        />
      </div>

      <div>
        <div class="flex items-baseline justify-between gap-4">
          <label for="roi-people" class="label text-primary/70">People doing it</label>
          <span class="display tabular shrink-0 whitespace-nowrap text-3xl" aria-hidden="true">{{ people }}</span>
        </div>
        <input
          id="roi-people"
          v-model.number="people"
          type="range"
          min="1"
          max="10"
          step="1"
          class="range mt-3"
          :aria-valuetext="peopleLabel"
        />
      </div>
    </form>

    <!-- One polite, atomic live region: a screen reader hears the whole result
         once per change instead of fragments from several regions. -->
    <div
      class="flex flex-col justify-between gap-8 border-t border-primary bg-primary p-6 text-secondary sm:p-8 lg:border-l lg:border-t-0"
      aria-live="polite"
      aria-atomic="true"
    >
      <div>
        <p class="label text-secondary/70">That work costs you</p>
        <p class="display tabular mt-3 text-[clamp(3.25rem,9vw,6rem)]">
          {{ money(yearly) }}<span class="wd-100 ml-2 align-baseline text-base font-medium normal-case tracking-normal text-secondary/70">a year</span>
        </p>
        <p class="mono mt-3 text-secondary/70">
          {{ hours }} h × ${{ rate }} × {{ peopleLabel }} × {{ WORK_DAYS }} working days.
          That is {{ hoursPerYear.toLocaleString('en-US') }} hours a year.
        </p>
      </div>

      <div class="border-t border-secondary/20 pt-6">
        <p class="label text-secondary/70">Payback at the {{ money(SPRINT_FROM) }} starting price</p>
        <p class="display tabular mt-3 text-5xl text-hot">{{ paybackLabel }}</p>
        <p class="mt-3 text-sm leading-6 text-secondary/75">
          Assumes the automation removes this work completely. Sprints start
          at {{ money(SPRINT_FROM) }}; your exact quote comes after the first call.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.range {
  width: 100%;
  height: 1.75rem;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.range::-webkit-slider-runnable-track {
  height: 2px;
  background: rgb(var(--c-ink));
}

.range::-moz-range-track {
  height: 2px;
  background: rgb(var(--c-ink));
}

.range::-webkit-slider-thumb {
  appearance: none;
  width: 1.375rem;
  height: 1.375rem;
  margin-top: -0.625rem;
  border: 2px solid rgb(var(--c-ink));
  border-radius: 0;
  background: rgb(var(--c-hot));
  transition: transform 140ms ease;
}

.range::-moz-range-thumb {
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid rgb(var(--c-ink));
  border-radius: 0;
  background: rgb(var(--c-hot));
}

.range:hover::-webkit-slider-thumb,
.range:focus-visible::-webkit-slider-thumb {
  transform: scale(1.15) rotate(45deg);
}

.range:focus-visible {
  outline: 2px solid rgb(var(--c-signal));
  outline-offset: 4px;
}
</style>
