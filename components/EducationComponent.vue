<template>
  <div class="parent-education" v-if="this.$store.state.education.current !== null">
    <university-component v-if="this.$store.state.education.current === 'university' || this.$store.state.education.current === 'college' || this.$store.state.education.current === 'school'"></university-component>
    <college-component v-if=" this.$store.state.education.current === 'college' || this.$store.state.education.current === 'school'"></college-component>
    <school-component v-if=" this.$store.state.education.current === 'school'"></school-component>
  </div>
</template>

<script>

import UniversityComponent from "@/components/UniversityComponent";
import CollegeComponent from "@/components/CollegeComponent";
import SchoolComponent from "@/components/schoolComponent";
export default {
name: "EducationComponent",
  components:{SchoolComponent, CollegeComponent, UniversityComponent},
  data(){
  return {
    counter:1,
    timeHandler:null,
    comp:[false,false,false]
  }
  },
  mounted() {
    this.timeHandler = setInterval(()=>{

      switch (this.counter){
        case 1:{
          this.$store.commit('education/changeCurrent','university')
          break
        }
        case 2:{
          this.$store.commit('education/changeCurrent','college')
          break
        }
        case 3:{
          this.$store.commit('education/changeCurrent','school')
          break
        }
      }
      ++this.counter
      if(this.counter >3){
        clearInterval(this.timeHandler)
      }

    },1000)
  },
  beforeDestroy() {
  this.$store.commit('education/changeCurrent',null)
  }

}
</script>
<style lang="scss" scoped>
.parent-education{
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
