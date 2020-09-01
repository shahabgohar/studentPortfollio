<template>
  <div class="home-parent">
  <welcome-component></welcome-component>
  <discription-component></discription-component>
  </div>
</template>

<script>
import WelcomeComponent from "@/components/WelcomeComponent";
import discriptionComponent from "@/components/discriptionComponent"
export default {

  name: "HelloComponent",
  components:{WelcomeComponent,discriptionComponent},
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.home-parent{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>
