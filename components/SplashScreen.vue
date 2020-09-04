<template>
<div class="size">
  <div class="anima">
  <img v-bind:src='path'>
  </div>
  <div class="parent-progress">
  <div ref="load" class="real-progress">

  </div>
  </div>
  </div>
</template>

<script>
export default {
name: "SplashScreen",
  data(){
  return{
    refHolder:null,
    path:"http://"+window.location.hostname+"svgs/logo.svg",
    val:0
  }
  },
  mounted() {

  this.refHolder = setInterval(()=>{
    this.$refs['load'].style.width = this.val.toString()+"%"

    this.val += 10
    if(this.val >= 100){
      clearInterval(this.refHolder)
      this.$store.commit("splash/setIsSplash")
    }

  },500)

  }
}
</script>

<style scoped lang="scss">
.real-progress{
  height: 100%;
  width: 0%;
  background-color: rgba(155, 150, 149, 0.48);
  border-radius: 12px;
  background: rgb(137,137,137);
  background: linear-gradient(90deg, rgba(137,137,137,0.8160306358871674) 0%, rgba(255,255,255,1) 34%);
}

.parent-progress{
  width: 40%;
  height: 2%;
  border-radius: 12px;
}
.anima{
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
img{
  width: 100%;
  height: 100%;
}
.size{
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 725px) {
img{
  width: 80%;
  height: 100%;
}
}


</style>
