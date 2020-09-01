<template>
  <div class="parent" @mouseover="displayHoverElement" @mouseleave="removeHoverElement">
    <img src="~/assets/svgs/SVG/gmail.svg" class="img-gmail" alt="">
    <div class="hover-element" ref="hover" style="display: none">
    <button ref="append-child" @click="copyEmailtToClipBoard($event)">Copy Email</button>
    </div>
  </div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
  name: "gmailComponent",
  mixins:[shareGlobalMixin],
  methods:{
    copyEmailtToClipBoard(event){
      event.preventDefault()
      navigator.clipboard.writeText("imshahabgohar1230@gmail.com").then(()=>{
        alert('success')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.img-gmail{
  width: 100%;
  height: 100%;
}
.parent{
  position: relative;
  width: 20%;
  height: 10%;
  background-color: white;
  border: 5px solid #D44B3D;
  border-radius: 20px;

}
.parent:hover{
  cursor: pointer;
}
.hover-element{
  position: absolute;
  width: 98%;
  height: 0%;
  top: 0;
  background-color: #D44B3D;
  border-radius: 20px;
  border: 5px solid #D44B3D;
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
@media screen and (max-width: 725px) and (max-width: 1200px){
  .parent{
    position: relative;
    width: 80%;
    height: 10%;
    background-color: white;
    border: 5px solid #D44B3D;
    border-radius: 20px;
  }
}
</style>
