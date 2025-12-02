<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from "~/types";
import StarfieldBackground from "~/components/StarfieldBackground.vue";
import CosmicParticles from "~/components/CosmicParticles.vue";

// Set cosmic theme as default for immersive space experience
const defaultTheme = ref(Theme.COSMOS)
provide(INJECT_THEME_KEY, defaultTheme)

const main = () => {
  // Always use cosmos theme for authentic space feel
  defaultTheme.value = Theme.COSMOS
}

watch(defaultTheme, (val: Theme) => {
  document?.querySelector('html')?.setAttribute('data-theme', defaultTheme.value)
}, {
  immediate: true
})

onMounted(main)
</script>

<template>
  <StarfieldBackground />
  <CosmicParticles />
  <NuxtPage />
</template>

<style lang="css">
body {
  background-color: var(--secondary);
  min-height: 100vh;
}
</style>
