<script lang="ts" setup>
import {type Experience } from '../types';
interface Props {
  experience?: Experience
  isLast: boolean
}
const props = withDefaults(defineProps<Props>(), {
  experience: null,
  isLast: false
})
</script>

<template>
    <div class="max-lg:gap-5 flex flex-col gap-10">
        <div class="max-lg:hidden grid grid-rows-1 grid-cols-3 ">
        <!-- duration -->
        <div class="text-silver font-bold">{{experience?.startDate}}-{{ experience?.endDate }}</div>
        <!-- company & designation -->
        <div class="flex flex-col">
            <div class="font-bold text-2xl">{{experience?.companyName}}</div>
            <div class="text-blue">{{experience?.designation}}</div>
        </div>
        <!-- Role Summary -->
        <div class="text-base font-normal leading-5">{{experience?.roleSummary }}</div>
        </div>
        <!-- mobile view -->
        <div class="max-lg:flex flex-col gap-4 hidden">
            <div class="">
                <div class="font-bold text-xl">{{experience?.companyName}}</div>
                <div class="text-blue">{{experience?.designation}}</div>
                <div class="text-silver font-bold">{{experience?.startDate}}-{{ experience?.endDate }}</div>
            </div>
            <div class="text-base font-normal leading-5">{{experience?.roleSummary }}</div>
        </div>
        <div v-if="!isLast" class="border border-black border-1"></div>
    </div>
</template>