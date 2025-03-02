<script lang="ts" setup>
import {INJECT_THEME_KEY, Theme} from '~/types'
import type {Ref} from "vue";
const theme:Ref<Theme | undefined> | undefined = inject(INJECT_THEME_KEY)
</script>

<template>
    <div class="tooltip cursor-pointer" data-tip="Alpine">
        <svg width="60" height="61" viewBox="0 0 124 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.5973 27.435L96.4437 0.705562L123.291 27.435L96.4437 54.1644L69.5973 27.435Z" :stroke="theme === Theme.LIGHT ? 'black' : 'white'"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.556 0L84.682 56.876H29.571L0 27.435L27.556 0Z" :fill="theme === Theme.LIGHT ? 'black' : 'white'"/>
        </svg>

    </div>

</template>