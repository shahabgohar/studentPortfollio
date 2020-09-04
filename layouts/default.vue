<template>
  <div>
    <navbar-component v-if="!this.$store.state.splash.isSplash"></navbar-component>
    <selector-component v-if="!this.$store.state.splash.isSplash"></selector-component>
    <Nuxt />
  </div>
</template>
<scrip>
export default {


}
</scrip>

<script>
import NavbarComponent from "~/components/navbarComponent";
import SelectorComponent from "~/components/selectorComponent";
import SplashScreen from "@/components/SplashScreen";
export default {
  components: {SplashScreen, SelectorComponent, NavbarComponent},
  mounted() {
    console.log(this.$store.state.splash.isSplash)
  }
}
</script>
