<script lang="ts" setup>
import { INJECT_THEME_KEY, Theme } from "~/types";
import { useTheme } from "~/composeables/useTheme";

const { theme, syncFromDocument } = useTheme();

// Adopt a saved theme the boot script already applied to <html>, before the
// head manager hydrates and would otherwise reset it to the prerendered value.
if (import.meta.client) syncFromDocument();

provide(INJECT_THEME_KEY, theme);

// Browser chrome (mobile address bar) matches the paper or ink background.
const themeColor = computed(() => (theme.value === Theme.DARK ? "#0C0C0C" : "#E8E9E9"));

useHead({
  htmlAttrs: { "data-theme": theme },
  meta: [{ name: "theme-color", content: themeColor }],
});
</script>

<template>
  <SiteHeader />
  <NuxtPage />
  <SiteFooter />
  <CookieConsent />
</template>
