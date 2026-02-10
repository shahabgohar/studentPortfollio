<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from '~/types'
import type {Ref} from "vue";
const theme:Ref<Theme | undefined> | undefined = inject(INJECT_THEME_KEY)
</script>

<template>
  <div class="tooltip cursor-pointer" data-tip="Python">
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
      <template v-if="theme === Theme.LIGHT">
        <path d="M29.7 1.5C14.6 1.5 15.5 7.9 15.5 7.9L15.52 14.52H30.02V16.5H10.08S1.5 15.58 1.5 30.78s7.48 14.66 7.48 14.66h4.47v-7.06s-.24-7.48 7.36-7.48h12.68s7.13.12 7.13-6.88V11.26s1.08-9.76-10.92-9.76zM21.94 7.06a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z" fill="black"/>
        <path d="M30.3 59.5c15.1 0 14.2-6.4 14.2-6.4l-.02-6.62H30.98V44.5h18.94s8.58.92 8.58-14.28-7.48-14.66-7.48-14.66h-4.47v7.06s.24 7.48-7.36 7.48H26.51s-7.13-.12-7.13 6.88v12.76s-1.08 9.76 10.92 9.76zm7.76-5.56a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z" fill="black"/>
      </template>
      <template v-else>
        <path d="M29.7 1.5C14.6 1.5 15.5 7.9 15.5 7.9l.02 6.62H30.02V16.5H10.08S1.5 15.58 1.5 30.78s7.48 14.66 7.48 14.66h4.47v-7.06s-.24-7.48 7.36-7.48h12.68s7.13.12 7.13-6.88V11.26s1.08-9.76-10.92-9.76zM21.94 7.06a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z" fill="white"/>
        <path d="M30.3 59.5c15.1 0 14.2-6.4 14.2-6.4l-.02-6.62H30.98V44.5h18.94s8.58.92 8.58-14.28-7.48-14.66-7.48-14.66h-4.47v7.06s.24 7.48-7.36 7.48H26.51s-7.13-.12-7.13 6.88v12.76s-1.08 9.76 10.92 9.76zm7.76-5.56a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z" fill="white"/>
      </template>
    </svg>
  </div>
</template>
