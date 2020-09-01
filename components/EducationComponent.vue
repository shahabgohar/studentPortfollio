<template>
  <div class="parent-education">
    <university-component></university-component>
    <college-component></college-component>
    <school-component></school-component>
  </div>
</template>

<script>

import UniversityComponent from "@/components/UniversityComponent";
import CollegeComponent from "@/components/CollegeComponent";
import SchoolComponent from "@/components/schoolComponent";
export default {
name: "EducationComponent",
  components:{SchoolComponent, CollegeComponent, UniversityComponent}
}
</script>
<style lang="scss" scoped>
.parent-education{
  width: 100%;
  height: 100%;
  background-color: #7f828b;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
