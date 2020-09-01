<template>
  <div class="parent-github" @mouseover="displayHoverElement" @mouseleave="removeHoverElement">
    <img src="~/assets/svgs/SVG/github.svg" class="img-git" alt="">
    <div class="hover-element-git" ref="hover" style="display: none">
      <a href="https://github.com/shahabgohar" class="img-git" ref="append-child" >@shahabgohar</a>
    </div>
  </div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
name: "githubComponent",
  mixins:[shareGlobalMixin]
}
</script>

<style lang="scss" scoped>

.img-git{
  width: 100%;
  height: 100%;
}
.parent-github{
  position: relative;
  width: 20%;
  height: 10%;
  background-color: #FFFFFF;
  border: 5px solid black;
  border-radius: 20px;

}
.parent-github:hover{
  cursor: pointer;
}
.hover-element-git{
  position: absolute;
  width: 98%;
  height: 0%;
  top: 0;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: 5px solid black;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
a{
  font-family: Hack-Regular, Hack;
  font-size: 27px;
}
a:hover{
  cursor: pointer;
}
@media screen and (max-width: 725px) and (max-width: 1200px) {
  a{
    font-family: Hack-Regular, Hack;
    font-size: 10px;
  }
  .parent-github{
    position: relative;
    width: 80%;
    height: 10%;
    background-color: #FFFFFF;
    border: 5px solid black;
    border-radius: 20px;

  }

}
</style>
