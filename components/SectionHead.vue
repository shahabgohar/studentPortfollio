<script setup lang="ts">
// Shared section opener: a marginal label (kicker) in the left rail,
// the poster headline and intro in the wide column. Every homepage section
// hangs off this same 3/9 split, which is what makes the page read as one
// ruled document instead of a stack of unrelated blocks.
defineProps<{
  kicker: string
  title: string
}>()
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
    <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-4">
      <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
      {{ kicker }}
    </p>
    <div>
      <h2 class="display text-balance text-[clamp(2.6rem,6.4vw,5.5rem)]">{{ title }}</h2>
      <div v-if="$slots.default" class="mt-6 max-w-2xl text-lg leading-8 text-primary/75">
        <slot />
      </div>
    </div>
  </div>
</template>
