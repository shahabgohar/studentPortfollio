<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from '~/types'
import type {Ref} from "vue";

const theme:Ref<Theme> = inject(INJECT_THEME_KEY)
</script>

<template>
  <div class="tooltip cursor-pointer" data-tip="Vuetify">
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
  <g clip-path="url(#clip0_15_245)">
    <template v-if="theme === Theme.LIGHT">
    <path d="M30.0023 0.5H15.9863L30.0023 29.492" fill="black"/>
    <path d="M30.0014 38V60.5L0 9.248H15.7166L30.0014 38ZM30.0014 0.5H44.0174L30.0014 29.492" fill="black"/>
    <path d="M30.502 38.1174L44.5939 9.74805H59.1286L30.502 58.656V38.1174Z" stroke="black"/>
    </template>
    <template v-else>
      <path d="M30.0023 0.5H15.9863L30.0023 29.492" fill="white"/>
      <path d="M30.0014 38V60.5L0 9.248H15.7166L30.0014 38ZM30.0014 0.5H44.0174L30.0014 29.492" fill="white"/>
      <path d="M30.502 38.1174L44.5939 9.74805H59.1286L30.502 58.656V38.1174Z" stroke="white"/>
    </template>
  </g>
  <defs>
    <clipPath id="clip0_15_245">
      <rect width="60" height="60" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
  </defs>
</svg>
</div>
</template>