<template>
<div class="selector">
<lcoator-component name="Home"></lcoator-component>
  <lcoator-component name="Expertise"></lcoator-component>
  <lcoator-component name="Contact"></lcoator-component>
  <lcoator-component name="Education"></lcoator-component>
</div>


</template>

<script>
import lcoatorComponent from "~/components/lcoatorComponent";
export default {
  name: "selectorComponent",
  components:{ lcoatorComponent}
}
</script>

<style lang="scss" scoped>
.selector{
  background-color: orangered;
  width: 10%;
  height: 90vh;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

@media screen and (max-width: 725px)  and (max-width: 1200px) {
  .selector{
    background-color: orangered;
    width: 20%;
    height: 90vh;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}


</style>
