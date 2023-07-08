<script setup lang="ts">
import {ref} from 'vue'
const route = useRoute()

const navItems = ref([
  {
    name: 'About'
  },
  {
    name: 'Skills'
  },
  {
    name: 'Education'
  },
  {
    name: 'Experience'
  },
  {
    name: 'Blogs'
  }
])
</script>

<template>
  <div class="w-full px-32">
    <div class="h-screen w-full bg-red-400 flex items-center justify-center relative">
      <!-- navbar -->
      <nav class="w-full absolute top-0 left-0 flex bg-green-400 items-center justify-end" style="height: 100px;">
        <!-- <ul class="grid grid-cols-5 grid-auto-flow-row grid-auto-columns-auto grid-auto-rows-auto gap-4 bg-blue-400">
          <li v-for="(item, index) in navItems" :key="index">
            <a href="">{{item.name }}</a>
          </li>
        </ul> -->
        <ul class="flex space-x-5 items-center justify-end">
          <li v-for="(item, index) in navItems" :key="index">
            <a href="">{{item.name }}</a>
          </li>
        </ul>
      </nav>

      <!-- hero section -->
      <div class="bg-yellow-400 space-y-9">
      <div class="text-3xl">I'm</div>
      <div class="text-8xl">Shahab Gohar</div>
      <div class="flex items-center justify-center">
        <button class="text-4xl h-16 bg-green-500">Download Resume</button>
      </div>
      <div class="flex w-full justify-center items-center">
        <button>
          skype
        </button>
        <button>LinkedIn</button>
        <button>Mail</button>
      </div>
      </div>
    
    </div>
</div>
</template>
