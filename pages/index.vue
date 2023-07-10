<script setup lang="ts">
import {ref} from 'vue'
import {Experience} from '../types'
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

const experiences:Ref<Array<Experience>> = ref([
  {
    startDate: 'Nov2021',
    endDate: 'May2023',
    companyName: 'Motocle',
    designation: 'Full Stack Web Developer',
    roleSummary: `I was presented with a great opportunity to work with Moto and his team. 
        I worked on frontend development where i put my best efforts to develop UI according 
        to the requirements, api development using Laravel, api integration, bug fixing and 
        providing creative solutions that solves client problems. Feedback from Moto and his 
        team also helped me to improve alot.`
  },
  {
    startDate: 'Nov2021',
    endDate: 'May2023',
    companyName: 'Motocle',
    designation: 'Full Stack Web Developer',
    roleSummary: `I was presented with a great opportunity to work with Moto and his team. 
        I worked on frontend development where i put my best efforts to develop UI according 
        to the requirements, api development using Laravel, api integration, bug fixing and 
        providing creative solutions that solves client problems. Feedback from Moto and his 
        team also helped me to improve alot.`
  },
  {
    startDate: 'Nov2021',
    endDate: 'May2023',
    companyName: 'Motocle',
    designation: 'Full Stack Web Developer',
    roleSummary: `I was presented with a great opportunity to work with Moto and his team. 
        I worked on frontend development where i put my best efforts to develop UI according 
        to the requirements, api development using Laravel, api integration, bug fixing and 
        providing creative solutions that solves client problems. Feedback from Moto and his 
        team also helped me to improve alot.`
  }
])

function scrollToTop() {
  window.scrollTo({
    top:0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="w-full flex flex-col px-28 pb-20 gap-y-10">
    <div class="relative " style="height: 800px;">
      <div class="w-full h-full top-0 left-0 flex items-center justify-center absolute">
        <!-- navbar -->
        <nav class="w-full absolute top-8 left-0 flex items-center justify-end">
          <ul class="flex space-x-12 items-center justify-end">
            <li v-for="(item, index) in navItems" :key="index">
              <a href="">{{item.name }}</a>
            </li>
          </ul>
        </nav>

        <!-- hero section -->
        <div class="space-y-9">
        <div class="text-3xl">I'm</div>
        <div class="text-8xl">Shahab Gohar</div>
        <div class="w-full flex items-center justify-center">
          <ui-button :title="'Download Resume'" :icon-name="'download'"></ui-button>
        </div>
        <div class="flex w-full space-x-9 justify-center items-center">
          <link-button title="skype">
          <svg-skype></svg-skype>
          </link-button>
          <link-button title="skype">
          <svg-skype></svg-skype>
          </link-button>
          <link-button title="skype">
          <svg-skype></svg-skype>
        </link-button>
        </div>
        </div>
      
      </div>
    </div>

    <!-- skills section -->
    <page-section title="Skills"></page-section>
    <div class="w-full grid grid-cols-2 grid-rows-1 gap-x-32">
      <!-- topics -->
      <div class="flex flex-col self-start h-full justify-between">
        <div class="flex flex-col gap-y-2.5">
          <div class="text-3xl">Frontend<br>Development</div>
          <div class="max-w-lg text-base font-normal leading-5">
            Constantly staying updated with the latest trends and best practices in frontend development, I strive to deliver intuitive and user-friendly interfaces that leave a lasting impact.
          </div>
          <div class="border border-black"></div>
        </div>
        <div class="flex flex-col gap-y-2.5">
          <div class="text-3xl">Frontend<br>Development</div>
          <div class="max-w-lg text-base font-normal leading-5">
            Constantly staying updated with the latest trends and best practices in frontend development, I strive to deliver intuitive and user-friendly interfaces that leave a lasting impact.
          </div>
          <div class="border border-black"></div>
        </div>
      </div>
      <!-- tech stack -->
      <div class="w-full flex justify-end">
        <div class="border-2 border-black flex self-end flex-col max-w-lg px-12 py-4">
          <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-6">
            <div class="text-3xl">Programming Languages</div>
            <div class="flex gap-12">
              <svg-javascript></svg-javascript>
              <svg-php></svg-php>
            </div>
          </div>
          <div class="flex flex-col gap-6">
            <div class="text-3xl">Frameworks</div>
            <div class="flex flex-wrap gap-12">
              <svg-vue></svg-vue>
              <svg-nuxt></svg-nuxt>
              <svg-laravel></svg-laravel>
              <svg-sql></svg-sql>
              <svg-vuetify></svg-vuetify>
              <svg-quasar></svg-quasar>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!-- Experience -->
    <page-section title="Experience"></page-section>
    <div class="w-full flex flex-col gap-10">
      <experience-entry 
      v-for="(experience, index) in experiences" 
      :key="index" 
      :experience="experience" 
      :is-last="index+1 === experiences.length"></experience-entry>
      <!-- <div class="w-full border border-black rounded-md">

      </div> -->
    </div>
    <!-- education -->
    <page-section title="Education"></page-section>
    <div class="flex justify-between items-start">
      <div class="flex gap-1 flex-col">
        <div class="uppercase">University of engineering and Technology, Taxila</div>
        <div class="uppercase">Software Engineering <span class="ml-5"><i>(2017-2021)</i></span></div>
      </div>
      <div class="">
        <img src="/static/img/education.svg">
      </div>
    </div>

    <!-- About -->
    <page-section title="About"></page-section>
    <div class="flex justify-between items-start">
      <div class="max-w-lg text-base font-normal leading-5">
        I am a highly skilled Full Stack Web Developer with expertise in Vue.js, 
        Laravel, and building interactive web applications. 
        With a strong focus on user experience, 
        I am passionate about creating engaging and intuitive interfaces. 
        My proactive and detail-oriented approach, along with excellent communication skills, 
        allows me to deliver high-quality work that exceeds client expectations. Currently pursuing a B.S. in Software Engineering,
        I am dedicated to continuous learning and growth in the ever-evolving field of web development.
      </div>
      <div class="">
        <img src="/static/img/about.png"/>
      </div>
    </div>
    <div class="flex w-full justify-center items-center"> 
        <ui-button @click="scrollToTop" :title="'Connect'" :icon-name="'mdi:arrow-up'"></ui-button>
  </div>
   
</div>
</template>
