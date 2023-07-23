<script setup lang="ts">

  import {ref} from 'vue'
  import {Experience, Skill} from '../types'
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
      startDate: '2020',
      endDate: 'Present',
      companyName: 'Freelancer on Fiverr',
      designation: 'Full Stack Web Developer',
      roleSummary: `I happened to come across with some amazing personalities on Fiverr, 
      that allowed me to work on their projects. I mostly worked on Fronted, using Vuejs. 
      Using capacitor technology, I also helped small business holders and developed small 
      hybrid applications for mobiles for them `
    },
    {
      startDate: 'July2019',
      endDate: 'Aug2019',
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

  const skills:Ref<Array<Skill>> = ref([
    {
      firstName: 'Frontend',
      lastName: 'Development',
      description: 'Constantly staying updated with the latest trends and best practices in frontend development, I strive to deliver intuitive and user-friendly interfaces that leave a lasting impact.'
    },
    {
      firstName: 'Backend',
      lastName: 'Development',
      description: `
      Backed by extensive experience and a deep understanding of backend development, I am skilled in designing and building robust and scalable server-side applications.
              Leveraging my problem-solving abilities and attention to detail, I thrive in delivering innovative solutions that meet the unique requirements of each project.
      `
    }
  ])

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
    window.location.href = 'https://drive.google.com/uc?export=download&id=1XSKD8gkr81pvtpKGM65QWFgt1VVpH2YF'
  }

  onMounted(main)
</script>

<template>
  
    <div class="w-full flex flex-col max-sm:px-5 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10" >
      <div  v-if="showFloatBtnFlg" class=" max-sm:w-12 max-sm:h-12 animate-bounce fixed right-6 bottom-6 w-16 h-16 border-2 rounded-full flex bg-white drop-shadow-sm items-center justify-center cursor-pointer" @click="scrollToTop">
        <Icon class="max-sm:w-7 max-sm:h-7 w-10 h-10" name="mdi:arrow-up"></Icon>
    </div>
      <div class="relative h-screen" id="parent">
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
              <div class="max-sm:text-5xl max-lg:text-7xl text-8xl capitalize font-normal leading-11" style="word-spacing: -1rem;">Shahab Gohar</div>
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
      <div class="max-md:grid-cols-1 max-md:gap-y-10 max-md:gap-x-0 max-lg:gap-x-24 w-full grid grid-cols-2 auto-rows-auto gap-x-32 h-fit ">
        <!-- topics -->
        <div class="max-md:justify-center max-md:gap-10 flex flex-col justify-between">
          <skill-entry 
          v-for="(skill,index) in skills" 
          :key="index" 
          :skill="skill" 
          :is-last="index + 1 === skills.length">
          </skill-entry>
        </div>
        <!-- tech stack -->
        <div class="max-md:justify-start w-full flex justify-end h-fit">
          <div class="max-md:px-6 max-md:py-2 w-full border-2 border-black flex self-end flex-col px-12 py-4">
            <div class="max-md:gap-3 flex flex-col gap-6">
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Programming Languages</div>
              <div class="max-md:gap-6 flex gap-12">
                <svg-javascript class=""></svg-javascript>
                <svg-php></svg-php>
              </div>
            </div>
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Frameworks</div>
              <div class="max-md:gap-6 flex flex-wrap gap-12">
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
      <div class="max-lg:gap-5 w-full flex flex-col gap-10">
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
          <div class="mt-3">Apart from achademics, I also performed well in other areas:</div>
          <ul class="list-disc ml-6">
            <li>With bunch of friends, we won Hackathon in 2019 hosted at Air University, Islamabad</li>
            <li>Joined Softdesk Society for extra currical activities</li>
            <li>Contributed for hosting many events and workshops, and acquired the position of Head of Graphics</li>
          </ul>
        </div>
        <div class="hidden">
          <img src="/img/education.svg">
        </div>
      </div>

      <!-- About -->
      <page-section title="About"></page-section>
      <div class="flex justify-between items-center gap-8">
        <div class="max-md:w-full max-w-2xl text-base font-normal leading-5">
          I am a highly skilled Full Stack Web Developer with expertise in Vue.js, 
          Laravel, and building interactive web applications. 
          With a strong focus on user experience, 
          I am passionate about creating engaging and intuitive interfaces. 
          My proactive and detail-oriented approach, along with excellent communication skills, 
          allows me to deliver high-quality work that exceeds client expectations.
        </div>
        <div class="max-md:hidden">
          <img class="max-w-max max-h-max" src="/img/about.png"/>
        </div>
      </div>
      <div class="flex w-full justify-center items-center"> 
          <ui-button @click="scrollToTop" :title="'Connect'" :icon-name="'mdi:arrow-up'"></ui-button>
    </div>
    
  </div>
</template>
