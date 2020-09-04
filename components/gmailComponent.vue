<template>
  <div ref="parent" class="parent" @mouseover="displayHoverElement" @mouseleave="removeHoverElement">
    <img src="~/assets/svgs/SVG/gmail.svg" class="img-gmail" alt="">
    <div class="hover-element" ref="hover" style="display: none">
      <img src="~/assets/svgs/SVG/copy_1.svg" ref="append-child" @click="copyEmailtToClipBoard($event)" class="img-gmail" alt="">
    </div>
  </div>
</template>

<script>
import shareGlobalMixin from "~/Mixins/shareGlobalMixin";

export default {
  name: "gmailComponent",
  mixins:[shareGlobalMixin],
  data(){
    return {
      borderColor:"red",
      animateHandle:null
    }
  },
  mounted() {
    this.animate(1000)
  },
  methods:{

    copyEmailtToClipBoard(event){
      event.preventDefault()
      navigator.clipboard.writeText("imshahabgohar1230@gmail.com").then(()=>{
        alert('mail address copied to clipboard')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.email-button{
  width: 50%;
  height: 100%;
  border: 5px solid ;

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
.animate-comp{
  animation: animate-fb;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
.img-gmail{
  width: 90%;
  height: 90%;
}
.parent{
  position: relative;
  width: 30%;
  height: 30%;
  background-color: white;
  border: 5px solid #D44B3D;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
