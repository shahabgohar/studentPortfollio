<script lang="ts" setup>
import { Experience } from '../types';
import {PropType} from 'vue'

const props = defineProps({
    experience: {
        type: Object as PropType<Experience>,
        default: null
    },
    isLast: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="flex flex-col gap-10">
        <div class="grid grid-rows-1 grid-cols-3 ">
        <!-- duration -->
        <div class="text-silver">{{experience?.startDate}}-{{ experience?.endDate }}</div>
        <!-- company & designation -->
        <div class="flex flex-col">
            <div class="">{{experience?.companyName}}</div>
            <div class="text-blue">{{experience?.designation}}</div>
        </div>
        <!-- Role Summary -->
        <div class="text-base font-normal leading-5">{{experience?.roleSummary }}</div>
        </div>
        <div v-if="!isLast" class="border border-black border-1"></div>
    </div>
</template>