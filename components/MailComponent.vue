<template>
<div  ref="parent" class="parent-facebook"@mouseover="displayHoverElement" @mouseleave="removeHoverElement">
  <img class="img-fb" src="~/assets/svgs/SVG/facebook_svg.svg" alt="">
<div class="hover-element-fb" ref="hover" style="display: none">
<a href="" target="_blank" ref="append-child" style="display: none">fb.com/shahab.gohar/</a>
</div>
</div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
name: "MailComponent",
  mixins:[shareGlobalMixin],
  data(){
    return {
      borderColor:"#1877F2"
    }
  },
  mounted() {
  this.animate(0)
  },
  methods:{
  displayMethodForhoverElement(){
    return "block";
  }
  }
}
</script>

<style lang="scss" scoped>

.img-fb{
  width: 100%;
  height: 100%;
}
.parent-facebook{
  position: relative;
  width: 30%;
  height: 30%;
  background-color: white;
  border: 5px solid #1877F2;
  border-radius: 20px;

}
.animate-comp{
  animation:animate-fb;
  animation-delay: 0s;
  animation-duration: 0.7s;
  animation-iteration-count: 1;
}
.parent-facebook:hover{
  cursor: pointer;
}
.hover-element-fb{
  position: absolute;
  width: 98%;
  height: 0%;
  top: 0;
  left: 0;
  background-color: #1877F2;
  border-radius: 20px;
  border: 6px solid #1877F2;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  a{
    font-family: Hack-Regular, Hack;
    font-size: 20px;
  }
  a:hover{
    cursor: pointer;
  }

}
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
@media screen and (max-width: 725px) and (max-width: 1200px){
  .parent-facebook{
    position: relative;
    width: 80%;
    height: 10%;
    background-color: white;
    border: 5px solid #1877F2;
    border-radius: 20px;
  }
}

</style>
