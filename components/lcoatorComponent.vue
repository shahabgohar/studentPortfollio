<template>
  <div class="selector-parent" @mouseover="glamourText" @mouseleave="deglamourText">
    <div class="animated-bars-top" ref="animated-bars-top"></div>
    <div class="animated-bars-bottom" ref="animated-bars-bottom"></div>
    <div class="bars"></div>
    <p class="text" ref="test" v-if="this.$store.getters['locator/getCurrentPath'] !== `${this.name}`" @click="navigate" ><b>{{ name }}</b></p>
    <p class="text" ref="test" v-if="this.$store.getters['locator/getCurrentPath'] === `${this.name}`" style="color: white" @click="navigate" ><b>{{ name }}</b></p>
    <div class="bars"></div>
  </div>
 </template>

<script>
import {mapState} from 'vuex';
export default {
  name: "lcoatorComponent",
  props:['name'],
  data(){
    return{
    time:0,
      isSelected:true

    }
  },
  mounted() {
    this.initStoreRef()
  },
  watch:{
    path:()=>{
      console.log("changed")
    }
  },
  ...mapState({
    path:state=> state.locator.path
  }),
  methods:{
    initStoreRef(){

    },
    navigate(){
      this.$store.commit('locator/setPath',this.name)

    },
    glamourText(){
      if(this.time == 0){

        this.$refs['test'].style.color = "white"
        this.time = 1
        this.startAnimation()
      }

    },
    startAnimation(){
      this.$refs['animated-bars-top'].classList.add('animate-top-down')
      this.$refs['animated-bars-bottom'].classList.add('animate-top-down')
    },
    deglamourText(){
      if(this.$store.state.locator.path !== this.name)
      this.$refs['test'].style.color = "black"
      this.time = 0
      this.$refs['animated-bars-top'].classList.remove('animate-top-down')
      this.$refs['animated-bars-bottom'].classList.remove('animate-top-down')
    }
  }
}
</script>

<style lang="scss" scoped>
.selector-parent{
  position: relative;
  width: 100%;
  height: 10%;
  background-color: #1877F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
selector-parent:hover{
  cursor: pointer;
}
.bars{
  width: 100%;
  height: 10%;
  background-color: #D44B3D;
  border-radius:20px;
}
p.text{
  font-family: Hack-Regular, Hack;
  font-size: 20px;

}
p.text:hover{
  cursor: pointer;
}
.animated-bars-top{
  position: absolute;
  top: 0;
  width: 0%;
  height: 10%;
  background-color: white;
  border-radius:20px;
}
.animated-bars-bottom{
  position: absolute;
  bottom: 0;
  width: 0%;
  height: 10%;
  background-color: white;
  border-radius:20px;
}

.animate-top-down{
  animation: top-down-animation 2s linear 0s infinite;
}
@keyframes top-down-animation {
  0%{

  }
  50%{
    width: 100%;
  }
  100%{
    width: 0%;
  }

}
@media screen and (max-width: 725px) and (max-width: 1200px){
  p.text{
    font-family: Hack-Regular, Hack;
    font-size: 19px;

  }
}

@media screen and (max-width: 600px) and (max-width: 725px){
  p.text{
    font-family: Hack-Regular, Hack;
    font-size: 10px;

  }
}


</style>
