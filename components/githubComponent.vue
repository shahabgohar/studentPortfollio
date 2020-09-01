<template>
  <div  ref="parent" class="parent-github" @mouseover="displayHoverElement" @mouseleave="removeHoverElement">
    <img src="~/assets/svgs/SVG/github.svg" class="img-git" alt="">
    <div class="hover-element-git" ref="hover" style="display: none">
      <a href="https://github.com/shahabgohar" target="_blank">
        <img src="~/assets/svgs/SVG/username.svg" ref="append-child" class="img-git" alt="">
      </a>
    </div>
  </div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
name: "githubComponent",
  mixins:[shareGlobalMixin],
  mounted() {
  this.animate(1400)
  },
  data(){
    return {
      borderColor:"black"
    }
  },
}
</script>

<style lang="scss" scoped>
@keyframes animate-fb{
  0%{
    transform:  translateY(100%);
  }
  30%{
    transform:  translateY(0%);
  }
  68%{
    transform: translateY(-100%);
  }
  100%{
    transform:translateY(0%);
  }
}
.animate-comp{
  animation: animate-fb;
  animation-duration: 1s;
  animation-iteration-count: 1;
}

.img-git{
  width: 80%;
  height: 100%;
}
.parent-github{
  position: relative;
  width: 30%;
  height: 30%;
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
