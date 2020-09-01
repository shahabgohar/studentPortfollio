<template>
  <education-slot v-bind:name="logo" v-bind:inst-name="name">
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

<style scoped>

</style>
