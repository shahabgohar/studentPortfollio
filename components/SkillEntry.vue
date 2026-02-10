<script lang="ts" setup>
import { ref } from 'vue'
import { type Skill } from '../types'
import { useScrollAnimation } from '~/composeables/useScrollAnimation'

interface Props {
  skill?: Skill
  isLast: boolean
}
const props = withDefaults(defineProps<Props>(), {
  skill: null,
  isLast: false
})

const entryRef = ref<HTMLElement | null>(null)

useScrollAnimation(entryRef, {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.7,
  start: 'top 85%'
})
</script>

<template>
          <div ref="entryRef" class="flex flex-col gap-y-2.5">
            <div class="max-lg:text-xl text-3xl font-bold">{{ skill?.firstName }}<br>{{ skill?.lastName }}</div>
            <div class="max-w-lg text-base font-normal leading-5">
              {{ skill?.description }}
            </div>
            <div v-if="!isLast" class="border border-primary"></div>
          </div>
</template>
