<script setup lang="ts">
  import {ref} from 'vue'
  import {type Experience, type Skill} from '../types'
  import helper from '../utils/helper'
  import {definePageMeta} from "#imports";
  import Navbar from "~/components/Navbar.vue";
  import {useMetaTags} from "~/composeables/useMetaTags";
  import LinkedIn from "~/components/svg/LinkedIn.vue";
  import Skype from "~/components/svg/Skype.vue";
  import Mail from "~/components/svg/Mail.vue";

  definePageMeta({
    title: 'Portfolio'
  })
  const { gtag } = useGtag()

  // SSR-ready
  gtag('event', 'screen_view', {
    app_name: 'Shahab Portfolio',
    screen_name: 'Home'
  })
  useMetaTags()
  const router = useRouter()
  const {scrollToTop} = helper

  const experiences:Ref<Array<Experience>> = ref([
    {
      startDate: 'Jul2024',
      endDate: 'Present',
      companyName: 'Esper Solutions',
      designation: 'Software Engineer',
      roleSummary: `Working on customising open-source packages according to client needs. Developed Gen AI products for my company.`
    },
    {
      startDate: 'May2023',
      endDate: 'Feb2024',
      companyName: 'CTO Gmbh',
      designation: 'Freelance frontend Developer',
      roleSummary: `Worked on 2 web projects and 1 hybrid mobile App. I worked on nuxt, tailwindcss, typescript and ionic`
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
      icon: Skype,
    },
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/shahabgohar/',
      icon: LinkedIn
    },
    {
      title: 'Mail',
      link: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com',
      icon: Mail
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



  function downloadResume() {
    window.location.href = 'https://drive.google.com/uc?export=download&id=1pUIfIs_9DQdnjHNHx6SplDCkdvGT8jo9'
  }

  onMounted(main)
</script>

<template>

    <div class="w-full flex flex-col max-sm:px-5 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10 bg-secondary text-primary max-w-[1440px] mx-auto" >
      <div  v-if="showFloatBtnFlg" class=" max-sm:w-12 max-sm:h-12 bg-secondary animate-bounce fixed right-6 bottom-6 w-16 h-16 border-2  rounded-full flex drop-shadow-sm items-center justify-center cursor-pointer" @click="scrollToTop">
        <Icon class="max-sm:w-7 max-sm:h-7 w-10 h-10 bg-secondary" color="text-primary" name="mdi:arrow-up"></Icon>
    </div>
      <div class="relative h-screen  relative" id="parent">
        <div class="w-full h-full top-0 left-0 flex items-center justify-center absolute">
          <!-- navbar -->
          <Navbar></Navbar>
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
          <div class="w-full absolute bottom-5  flex items-center justify-center flex-col mt-3">
            <Icon name="solar:double-alt-arrow-down-line-duotone" class="animate-bounce" size="60px"></Icon>
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
          <div class="max-md:px-6 max-md:py-2 w-full border-2 border-primary flex self-end flex-col px-12 py-4">
            <div class="max-md:gap-3 flex flex-col gap-6">
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Programming Languages</div>
              <div class="max-md:gap-6 flex gap-12">
                <svg-javascript class=""></svg-javascript>
                <svg-php></svg-php>
                <svg-sql></svg-sql>
              </div>
            </div>
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Frameworks</div>
              <div class="max-md:gap-6 flex flex-wrap gap-12">
                <svg-vue></svg-vue>
                <svg-react></svg-react>
                <svg-alpine></svg-alpine>
                <svg-nuxt></svg-nuxt>
                <svg-laravel></svg-laravel>
                <svg-code-ignitor></svg-code-ignitor>
                <svg-vuetify></svg-vuetify>
                <svg-quasar></svg-quasar>
                <svg-tailwind></svg-tailwind>
                <svg-bootstrap></svg-bootstrap>
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
          <img alt="studying" src="/img/education.svg">
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
