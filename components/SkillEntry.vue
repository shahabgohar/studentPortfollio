<script lang="ts" setup>
import {type Skill} from '../types'
interface Props {
  skill?: Skill
  isLast: boolean
}
const props = withDefaults(defineProps<Props>(), {
  skill: null,
  isLast: false
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