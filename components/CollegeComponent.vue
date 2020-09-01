<template>
<education-slot v-bind:name="logo" v-bind:inst-name="name" class="anim">
  <div slot="instDetails">
          <p><b>Subject: </b> Fsc Pre-Medical</p>
          <p><b>Status: </b> Passed</p>
          <p><b>year: </b>2016</p>
          <p><b>percentage: </b> 83.8%</p>
  </div>
</education-slot>
</template>

<script>
import EducationSlot from "@/slots/EducationSlot";
export default {
name: "CollegeComponent",
  components: {EducationSlot},
  data(){
  return{
    name:"Nishat College of Science Multan",
    logo:"https://"+window.location.hostname+"/svgs/nishat.svg"
  }
  }
}
</script>
<style lang="scss" scoped>
.anim{
  animation: animate-slot;
  animation-iteration-count: 1;
  animation-duration: 1s;
}
@keyframes animate-slot{
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform:translateX(0%);
  }
}
</style>

