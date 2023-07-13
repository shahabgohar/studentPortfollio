<script lang="ts" setup>
import { PropType } from 'vue'
import {Skill} from '../types'
const props = defineProps({
    skill: Object as PropType<Skill>,
    isLast: Boolean
})
</script>

<template>
          <div class="flex flex-col gap-y-2.5">
            <div class="max-lg:text-xl text-3xl font-bold">{{ skill?.firstName }}<br>{{ skill?.lastName }}</div>
            <div class="max-w-lg text-base font-normal leading-5">
              {{ skill?.description }}
            </div>
            <div v-if="!isLast" class="border border-black"></div>
          </div>
</template>