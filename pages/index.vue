<template>
<div class="">
  <div class="home-parent" v-if="!this.$store.state.splash.isSplash">
    <Nuxt />
  <hello-component v-if="this.$store.state.locator.path === 'Home'"></hello-component>
    <technology-component v-if="this.$store.state.locator.path === 'Expertise'"></technology-component>
   <social-contact-component v-if="this.$store.state.locator.path === 'Contact'"></social-contact-component>
   <education-component v-if="this.$store.state.locator.path === 'Education'"></education-component>

  </div>
<splash-screen  v-if="this.$store.state.splash.isSplash"></splash-screen>
</div>
</template>

<script>


import HelloComponent from "@/components/HelloComponent";
import TechnologyComponent from "@/components/TechnologyComponent";
import SocialContactComponent from "@/components/socialContactComponent";
import EducationComponent from "@/components/EducationComponent";
import {mapGetters} from 'vuex';
import {mapState} from 'vuex';
import SplashScreen from "@/components/SplashScreen";
export default {
  components:{SplashScreen, EducationComponent, SocialContactComponent, TechnologyComponent, HelloComponent},
  mounted() {
    console.log(this.$store.state.splash.isSplash)
  } ,

 ...mapState(
  {
    path:state => state.locator.path
  }
)

}
</script>
<style lang="scss">

.home-parent{
  width: 90%;
  height: 90vh;
}
@media screen and (max-width:725px) and (max-width: 1200px){

  .home-parent{
    width: 80%;
    height: 90vh;
  }
}
</style>

