<script setup lang="ts">

  import {ref} from 'vue'
  import {Experience} from '../types'
  import helper from '../utils/helper'

  const router = useRouter()
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
      name: 'Blogs',
      icon: 'mdi:arrow-top-right-bold-box-outline'
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
      icon: `/img/skype.svg`,
    },
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/shahabgohar/',
      icon: `/img/linkedin.svg`
    },
    {
      title: 'Mail',
      link: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com',
      icon: `/img/mail.svg`
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
    
    }, 500)
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
  
    <div class="w-full flex flex-col max-sm:px-2 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10" >
      <div  v-if="showFloatBtnFlg" class="fixed right-6 bottom-6 w-16 h-16 border-2 rounded-full flex items-center justify-center cursor-pointer" @click="scrollToTop">
        <Icon name="mdi:arrow-up"></Icon>
    </div>
      <div class="relative " id="parent" style="height: 800px;">
        <div class="w-full h-full top-0 left-0 flex items-center justify-center absolute">
          <!-- navbar -->
          <nav class="max-md:hidden w-full absolute top-8 left-0 flex items-center justify-end">
            <ul class="flex space-x-12 items-center justify-end">
              <li v-for="(item, index) in navItems" :key="index" class="flex items-center justify-center">
                <a v-if="item.name === 'Blogs'" class="cursor-pointer"  @click.prevent="router.push('/blogs')">{{item.name }}</a>
                <a v-else class="cursor-pointer"  @click.prevent="scrollToElement(item.name)">{{item.name }}</a>
                <Icon v-if="item.icon" size="1.2em" :name="item.icon"></Icon>
              </li>
            </ul>
          </nav>
          <nav class="max-md:flex hidden h-10 w-full absolute top-4 left-0 items-center justify-end">
            <button class="">
              <Icon name="mdi:format-list-bulleted"></Icon>
            </button>
          </nav>
          <!-- hero section -->
          <div class="flex flex-col gap-y-9">
            <div class="flex flex-col gap-2.5">
              <div class="max-lg:text-2xl text-3xl font-ibmMono capitalize font-thin">I'm</div>
              <div class="max-lg:text-7xl text-8xl capitalize font-normal leading-11" style="word-spacing: -1rem;">Shahab Gohar</div>
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
              Backed by extensive experience and a deep understanding of backend development, I am skilled in designing and building robust and scalable server-side applications.
              Leveraging my problem-solving abilities and attention to detail, I thrive in delivering innovative solutions that meet the unique requirements of each project.
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
          <img src="/img/education.svg">
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
          allows me to deliver high-quality work that exceeds client expectations.
        </div>
        <div class="">
          <img src="/img/about.png"/>
        </div>
      </div>
      <div class="flex w-full justify-center items-center"> 
          <ui-button @click="scrollToTop" :title="'Connect'" :icon-name="'mdi:arrow-up'"></ui-button>
    </div>
    
  </div>
</template>
