<script setup lang="ts">
</script>

<template>
  <div class="ve-signal-noise fixed inset-0 pointer-events-none" style="z-index: 5;">
    <!-- Scanlines -->
    <div class="absolute inset-0 ve-scanlines" />
    <!-- Film grain -->
    <div class="absolute inset-0 ve-grain" />
  </div>
</template>

<style scoped>
.ve-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.03) 1px,
    rgba(0, 0, 0, 0.03) 2px
  );
  opacity: 0.6;
}

.ve-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  animation: ve-grain-shift 0.5s steps(4) infinite;
  opacity: 0.5;
}

@keyframes ve-grain-shift {
  0% { background-position: 0 0; }
  25% { background-position: 128px 0; }
  50% { background-position: 0 128px; }
  75% { background-position: 128px 128px; }
  100% { background-position: 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-scanlines,
  .ve-grain {
    display: none;
  }
}
</style>
