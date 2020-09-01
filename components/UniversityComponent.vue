<template>
  <education-slot v-bind:name="image" v-bind:inst-name="name" class="anim">
    <div slot="instDetails">
      <p><b>Status: </b>Currently enrolled</p>
      <p><b>Semester: </b>6</p>
      <p><b>CGPA: </b>3.34/4</p>
    </div>
  </education-slot>
</template>

<script>
import EducationSlot from "@/slots/EducationSlot";
export default {
  name: "UniversityComponent",
  components:{EducationSlot},
  data(){
    return{
      name:"University of Engineering and Technology Taxila",
      image:"http://"+window.location.hostname+"/images/uet-taxila.png"
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
