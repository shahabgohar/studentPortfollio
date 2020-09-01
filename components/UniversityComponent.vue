<template>
  <education-slot v-bind:name="image" v-bind:inst-name="name">
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

</style>
