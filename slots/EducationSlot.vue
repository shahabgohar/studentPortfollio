<template>
  <div class="slot-parent">
    <div class="universityEducation">

      <img v-bind:src="name" alt="University Logo" class="uni-logo">
      <div class="logo-divider"></div>
      <div class="uni-details">
        <p class="uni-name">{{instName}}</p>
        <slot name="instDetails"></slot>
<!--        <p><b>Status: </b></p>-->
<!--        <p><b>Semester: </b>6</p>-->
<!--        <p><b>CGPA: </b>3.34/4</p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationSlot",
  props:['name','instName']
}
</script>

<style lang="scss" >
.slot-parent{
  width: 60%;
  height: 28%;
}
.uni-logo{
  max-width: 25%;
  max-height: 90%;
  padding: 3% ;
}
.universityEducation{
  width: 100%;
  height: 100%;
  background-color: blue;
  display: flex;
  flex-direction: row;
  align-items: center;


}
.logo-divider{
  height: 90%;
  border: 5px solid #43496e;
  border-radius: 20px;
}
.uni-details{
  width: 70%;
  height: 100%;
  background-color: #F7F8FB;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;

}
p{
  font-family: Hack-Regular, Hack;
  font-size: 20px;
}
@media screen and (max-width: 725px) and (max-width: 1200px) {
  .slot-parent{
    width: 100%;
    height: 28%;
  }
  p{
    font-family: Hack-Regular, Hack;
    font-size: 15px;
  }
}
</style>
