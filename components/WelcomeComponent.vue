<template>
    <div class="parent">
<!--  <div class="home-parent-welcome">-->
<!--  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 90" preserveAspectRatio="xMinYMax meet" style="background-color: orangered"><defs><style>  .welcome{font-size:72px;font-family:Hack-Regular, Hack;}</style></defs><title>  welcome</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><text class="welcome" transform="translate(0 62.24)">  HELLO!</text></g></g></svg>-->
<!--  </div>-->
<!--  <div class="home-parent-description">-->
<!--    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 90" preserveAspectRatio="xMinYMax meet" style="background-color: green"><defs><style>  .description{font-size:72px;font-family:Hack-Regular, Hack;}</style></defs><title> Descripiton</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><text class="description" transform="translate(0 62.24)">  HELLO!</text></g></g></svg>-->

<!--  </div>-->
    </div>
</template>

<script>
export default {
  name: "WelcomeComponent",

}
</script>

<style lang="scss">
.welcome{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.parent{
  width: 80%;
  height: 70%;
  background-color: orange;
}


@media screen and (max-width: 995px) {

}

</style>
