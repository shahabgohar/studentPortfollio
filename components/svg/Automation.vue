<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from '~/types'
import type {Ref} from "vue";
const theme:Ref<Theme | undefined> | undefined = inject(INJECT_THEME_KEY)
</script>

<template>
  <div class="tooltip cursor-pointer" data-tip="Automation">
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 24 24" fill="none">
      <template v-if="theme === Theme.LIGHT">
        <path d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19 11v1h1a1 1 0 1 1 0 2h-1v1a7.002 7.002 0 0 1-6 6.93V23a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 5 15v-1H4a1 1 0 1 1 0-2h1v-1a7.002 7.002 0 0 1 6-6.93V3a1 1 0 0 1 1-1zm0 4a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0v-4a5 5 0 0 0-5-5zm-1 4a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H12a1 1 0 0 1-1-1zm-2 3a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1zm1 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1z" fill="black"/>
      </template>
      <template v-else>
        <path d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19 11v1h1a1 1 0 1 1 0 2h-1v1a7.002 7.002 0 0 1-6 6.93V23a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 5 15v-1H4a1 1 0 1 1 0-2h1v-1a7.002 7.002 0 0 1 6-6.93V3a1 1 0 0 1 1-1zm0 4a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0v-4a5 5 0 0 0-5-5zm-1 4a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H12a1 1 0 0 1-1-1zm-2 3a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1zm1 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1z" fill="white"/>
      </template>
    </svg>
  </div>
</template>
