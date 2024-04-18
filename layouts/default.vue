<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="w-full flex flex-col max-sm:px-5 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10 bg-secondary" >
    <div class="relative " id="parent">
      <div class="w-full h-full top-0 left-0  absolute">
        <!-- navbar -->
        <Navbar></Navbar>
        <!-- hero section -->
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>