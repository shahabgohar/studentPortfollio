<template>
    <div class="parent-hello">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" preserveAspectRatio="xMinYMax meet" ><defs><style>  .welcome{font-size:72px;font-family:Hack-Regular, Hack;}</style></defs><title>  welcome</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><text class="welcome" transform="translate(0 62.24)">  HELLO!</text></g></g></svg>
    </div>
</template>

<script>
export default {
  name: "WelcomeComponent",

}
</script>

<style lang="scss" scoped>


.parent-hello{
  width: 80%;
  height: 50%;
}


@media screen and (max-width: 725px) {
.parent-hello{
  width: 90%;
  height: 10%;

}
}

</style>
