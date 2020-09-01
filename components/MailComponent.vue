<template>
<div class="parent-facebook" @mouseover="displayHoverElement" @mouseleave="removeHoverElement">
  <img class="img-fb" src="~/assets/svgs/SVG/facebook_svg.svg" alt="">
<div class="hover-element-fb" ref="hover" style="display: none">
<a href="https://www.fb.com/shahab.gohar/" target="_blank" ref="append-child" style="display: none">fb.com/shahab.gohar/</a>
</div>
</div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
name: "MailComponent",
  mixins:[shareGlobalMixin],
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
  width: 20%;
  height: 10%;
  background-color: white;
  border: 5px solid #1877F2;
  border-radius: 20px;

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
