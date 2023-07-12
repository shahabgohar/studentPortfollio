<script setup lang="ts">
import {ref} from 'vue'
import {Experience} from '../types'
import helper from '../utils/helper'

const {scrollToTop} = helper

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
    companyName: 'Freelancer on Fiverr',
    designation: 'Full Stack Web Developer',
    roleSummary: `I happened to come across with some amazing personalities on Fiverr, 
    that allowed me to work on their projects. I mostly worked on Fronted, using Vuejs. 
    Using capacitor technology, I also helped small business holders and developed small 
    hybrid applications for mobiles for them `
  },
  {
    startDate: 'Nov2021',
    endDate: 'May2023',
    companyName: 'Fatima Sugar Mills',
    designation: 'Database Developer Internee',
    roleSummary: `I had the opportunity to work with Oracle tools such as Oracle Report builder,
     Bi publisher. I learned about SQL, PL/SQL. Mr, Muhammad Ajmal helped me a lot. 
     After that internship, I felt confident enough to work on real world projects.`
  }
])

const contactOptions = [
  {
    title: 'Skype',
    link: 'https://join.skype.com/invite/ve8oN0kKdvXQ',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54545 12.5C4.54545 8.10682 8.10682 4.54545 12.5 4.54545C14.6854 4.54545 16.6613 5.42377 18.1013 6.85198L19.028 7.77109L20.2889 7.43389C21.7889 7.03273 23.3677 6.81818 25 6.81818C35.0416 6.81818 43.1818 14.9585 43.1818 25C43.1818 26.6323 42.9673 28.2111 42.5661 29.7111L42.2289 30.972L43.148 31.8986C44.5761 33.3386 45.4545 35.3145 45.4545 37.5C45.4545 41.8932 41.8932 45.4545 37.5 45.4545C35.3145 45.4545 33.3386 44.5761 31.8986 43.148L30.972 42.2289L29.7111 42.5661C28.2111 42.9673 26.6323 43.1818 25 43.1818C14.9585 43.1818 6.81818 35.0416 6.81818 25C6.81818 23.3677 7.03273 21.7889 7.43389 20.2889L7.77109 19.028L6.85198 18.1013C5.42377 16.6613 4.54545 14.6854 4.54545 12.5ZM12.5 0C5.59643 0 0 5.59643 0 12.5C0 15.4621 1.03257 18.1864 2.75395 20.3277C2.43834 21.8373 2.27273 23.4005 2.27273 25C2.27273 37.5518 12.4481 47.7273 25 47.7273C26.5995 47.7273 28.1627 47.5616 29.6723 47.2461C31.8136 48.9675 34.538 50 37.5 50C44.4036 50 50 44.4036 50 37.5C50 34.538 48.9675 31.8136 47.2461 29.6723C47.5616 28.1627 47.7273 26.5995 47.7273 25C47.7273 12.4481 37.5518 2.27273 25 2.27273C23.4005 2.27273 21.8373 2.43834 20.3277 2.75395C18.1864 1.03257 15.4621 0 12.5 0ZM21.9136 18.9323C22.215 18.3574 23.2466 17.6136 24.8466 17.6136C27.5884 17.6136 29.1009 18.6867 29.7964 19.2175C30.7941 19.9789 32.2205 19.7873 32.9818 18.7895C33.7434 17.7917 33.5518 16.3655 32.5539 15.604C31.4414 14.7549 28.9714 13.0682 24.8466 13.0682C21.9625 13.0682 19.1478 14.4181 17.7823 17.0232C16.7955 18.9058 16.9553 20.9602 17.9578 22.6277C18.9312 24.2468 20.6207 25.4039 22.6114 25.94L26.1423 26.8911C27.5023 27.2573 29.568 28.5211 28.8241 30.2239C28.3757 31.2507 26.7861 32.3864 24.445 32.3864C22.4214 32.3864 20.6357 32.0366 18.9925 30.7825C17.9947 30.0211 16.5685 30.2127 15.807 31.2105C15.0455 32.2084 15.2372 33.6345 16.235 34.3959C18.4365 36.0761 20.7284 36.9318 23.9425 36.9318C27.5314 36.9318 31.4475 35.5736 32.9895 32.0434C33.8973 29.9655 33.598 27.7873 32.4639 26.0382C30.7189 23.3466 27.713 22.5689 24.8025 21.8157C24.4643 21.7282 24.127 21.6409 23.7934 21.5509C22.598 21.2289 21.2002 20.2934 21.9136 18.9323Z" fill="#040404"/>
          </svg>`,
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/shahabgohar/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M42 42H33.6V27.302C33.6 23.27 31.8213 21.0205 28.6314 21.0205C25.1601 21.0205 23.1 23.3645 23.1 27.302V42H14.7V14.7H23.1V17.77C23.1 17.77 25.7355 13.1455 31.6743 13.1455C37.6152 13.1455 42 16.7708 42 24.272V42ZM5.1282 10.3339C2.2953 10.3339 0 8.01982 0 5.16592C0 2.31412 2.2953 0 5.1282 0C7.959 0 10.2543 2.31412 10.2543 5.16592C10.2564 8.01982 7.959 10.3339 5.1282 10.3339ZM0 42H10.5V14.7H0V42Z" fill="black"/>
          </svg>`
  },
  {
    title: 'Mail',
    link: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com',
    icon: `<svg width="54" height="43" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.66602 7.5332L26.9993 23.2665L48.3327 7.5332" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M45.6667 3H8.33333C5.38781 3 3 5.38781 3 8.33333V35C3 37.9455 5.38781 40.3333 8.33333 40.3333H45.6667C48.6122 40.3333 51 37.9455 51 35V8.33333C51 5.38781 48.6122 3 45.6667 3Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
  }
]

const showFloatBtnFlg:any = ref(false)
function main() {
  documentScroll()
  document.onscroll = documentScroll
}

let scrollTimeout:any = null
function documentScroll() {

  if(!scrollTimeout) {
    scrollTimeout = null
  }

  scrollTimeout = setTimeout(() => {
    const element = document.getElementById('Skills')
    const clientRect:DOMRect | undefined = element?.getBoundingClientRect()
    if((clientRect?.top || 0) < 252) {
      showFloatBtnFlg.value = true
    } else {
        showFloatBtnFlg.value = false
    }
  
  }, 2000)
}

function scrollToElement(elementId: string) {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

function downloadResume() {
  window.location.href = 'https://drive.google.com/uc?export=download&id=1yiCaKytbzcMC9JOLt1FWAJfepXLPypoW'
}

onMounted(main)
</script>

<template>
  
  <div class="w-full flex flex-col px-28 pb-20 gap-y-10" >
    <div  v-if="showFloatBtnFlg" class="fixed right-6 bottom-6 w-16 h-16 border-2 rounded-full flex items-center justify-center cursor-pointer" @click="scrollToTop">
      <Icon name="mdi:arrow-up"></Icon>
   </div>
    <div class="relative " id="parent" style="height: 800px;">
      <div class="w-full h-full top-0 left-0 flex items-center justify-center absolute">
        <!-- navbar -->
        <nav class="w-full absolute top-8 left-0 flex items-center justify-end">
          <ul class="flex space-x-12 items-center justify-end">
            <li v-for="(item, index) in navItems" :key="index">
              <a class="cursor-pointer"  @click.prevent="scrollToElement(item.name)">{{item.name }}</a>
            </li>
          </ul>
        </nav>

        <!-- hero section -->
        <div class="flex flex-col gap-y-9">
          <div class="flex flex-col gap-2.5">
            <div class="text-3xl font-ibmMono capitalize font-thin">I'm</div>
            <div class="text-8xl capitalize font-normal leading-11" style="word-spacing: -1rem;">Shahab Gohar</div>
          </div>
        <div class="w-full flex items-center justify-center">
          <ui-button :title="'Download Resume'" @click="downloadResume" :icon-name="'download'"></ui-button>
        </div>
        <div class="flex w-full space-x-9 justify-center items-center">
          <link-button v-for="(contactOption, index) in contactOptions" :key="index" v-bind="contactOption"></link-button>
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
          <div class="text-3xl font-bold">Frontend<br>Development</div>
          <div class="max-w-lg text-base font-normal leading-5">
            Constantly staying updated with the latest trends and best practices in frontend development, I strive to deliver intuitive and user-friendly interfaces that leave a lasting impact.
          </div>
          <div class="border border-black"></div>
        </div>
        <div class="flex flex-col gap-y-2.5">
          <div class="text-3xl font-bold">Backend<br>Development</div>
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
            <div class="text-3xl font-bold">Programming Languages</div>
            <div class="flex gap-12">
              <svg-javascript></svg-javascript>
              <svg-php></svg-php>
            </div>
          </div>
          <div class="flex flex-col gap-6">
            <div class="text-3xl font-bold">Frameworks</div>
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
