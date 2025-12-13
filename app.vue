<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from "~/types";

const defaultTheme = ref(Theme.LIGHT)
provide(INJECT_THEME_KEY, defaultTheme)
const main = () => {
  const watchMedia = window.matchMedia("(prefers-color-scheme: dark)")
  if(watchMedia.matches) {
    defaultTheme.value = Theme.DARK
  }
  watchMedia.addEventListener('change',themeEventHandler)
}

watch(defaultTheme, (val: Theme) => {
  document?.querySelector('html')?.setAttribute('data-theme', defaultTheme.value)
}, {
  immediate: true
})

const themeEventHandler = (e:MediaQueryListEvent) => {
  if(e.currentTarget?.matches) {
    defaultTheme.value = Theme.DARK

  } else {
    defaultTheme.value = Theme.LIGHT
  }
}

onMounted(main)
</script>

<template>

  <NuxtPage />

</template>
<style lang="css">
body {
  background-color: var(--secondary);
}
</style>
