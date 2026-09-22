<script setup lang="ts">
import { computed } from 'vue'
import { iconPaths } from '~/utils/icons'

// Drop-in replacement for the nuxt-icon <Icon>: same `name` / `size` props, but
// the SVG is inlined at build time instead of fetched from the Iconify API in
// the browser. Legacy mdi:/ic: names used across older pages are mapped onto
// the Phosphor set so those templates keep working unchanged.
const props = withDefaults(
  defineProps<{
    name: string
    size?: string | number
  }>(),
  { size: '1em' },
)

const ALIASES: Record<string, string> = {
  'mdi:arrow-left': 'arrow-left',
  'mdi:arrow-right': 'arrow-right',
  'mdi:arrow-top-right': 'arrow-up-right',
  'mdi:arrow-top-right-bold-box-outline': 'arrow-square-out',
  'mdi:email-outline': 'envelope-simple',
  'mdi:check-circle-outline': 'check-circle',
  'mdi:printer-outline': 'printer',
  'mdi:format-list-bulleted': 'list-bullets',
  'mdi:file-document-outline': 'file-text',
  'mdi:download-outline': 'download-simple',
  'mdi:cookie-outline': 'cookie',
  'mdi:calendar-check': 'calendar-check',
  'mdi:calendar-arrow-right': 'calendar-check',
  'ic:outline-cancel': 'x-circle',
}

const path = computed(() => {
  const key = ALIASES[props.name] ?? props.name.replace(/^ph:/, '')
  return iconPaths[key]
})

const dimension = computed(() =>
  typeof props.size === 'number' || /^\d+(\.\d+)?$/.test(String(props.size))
    ? `${props.size}px`
    : String(props.size),
)
</script>

<template>
  <svg
    v-if="path"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    :width="dimension"
    :height="dimension"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    class="icon inline-block shrink-0 align-[-0.125em]"
  >
    <path :d="path" />
  </svg>
</template>
