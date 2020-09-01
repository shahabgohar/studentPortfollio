<template>
  <education-slot v-bind:name="logo" v-bind:inst-name="name" class="anim">
    <div slot="instDetails">
      <p><b>Subject: </b> Matric with Bio</p>
      <p><b>Status: </b> Passed</p>
      <p><b>year: </b>2016</p>
      <p><b>percentage: </b> 90.4%</p>
    </div>
  </education-slot>
</template>

<script>
import EducationSlot from "@/slots/EducationSlot";
export default {
  name: "schoolComponent",
  components:{EducationSlot},
  data(){
    return{
      name:"Nishat High School for Boys",
      logo:"http://"+window.location.hostname+"/svgs/nishat.svg"
    }
  }
}
</script>

<style scoped lang="scss">
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
