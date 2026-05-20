<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from "~/types";

const defaultTheme = ref(Theme.DARK)
provide(INJECT_THEME_KEY, defaultTheme)

useHead({
  htmlAttrs: { 'data-theme': Theme.DARK }
})
</script>

<template>

  <NuxtPage />
  <CookieConsent />

</template>
<style lang="css">
body {
  background-color: var(--secondary);
}
</style>
