<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from '~/types'
import type {Ref} from "vue";

const theme:Ref<Theme> = inject(INJECT_THEME_KEY)
</script>

<template>
  <svg width="54" height="43" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <template v-if="theme === Theme.LIGHT">
    <path d="M5.66602 7.5332L26.9993 23.2665L48.3327 7.5332" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45.6667 3H8.33333C5.38781 3 3 5.38781 3 8.33333V35C3 37.9455 5.38781 40.3333 8.33333 40.3333H45.6667C48.6122 40.3333 51 37.9455 51 35V8.33333C51 5.38781 48.6122 3 45.6667 3Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </template>
    <template v-else>
      <path d="M5.66602 7.5332L26.9993 23.2665L48.3327 7.5332" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M45.6667 3H8.33333C5.38781 3 3 5.38781 3 8.33333V35C3 37.9455 5.38781 40.3333 8.33333 40.3333H45.6667C48.6122 40.3333 51 37.9455 51 35V8.33333C51 5.38781 48.6122 3 45.6667 3Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </template>
  </svg>
</template>

<style scoped>

</style>