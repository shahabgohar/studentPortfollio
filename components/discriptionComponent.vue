<template>
<div class="parent-description">
  <p>{{description}}</p>
</div>
</template>

<script>
export default {
  name: "discriptionComponent",
  data() {
    return {
      description: " My Name is Muhammad Shahab UD Din Gohar and I am looking for internship or a project",
      counter: 1,
      resas :1,
      backup: null,
      splitDescription: null,
      setIntervalHandler:null
    }
  },
  mounted() {
    this.backup = this.description
    this.splitDescription = this.description.split(" ")
    setTimeout(()=>{
      var backs = 53
      this.setIntervalHandler = setInterval(()=>{
        this.splitDescription.push(this.splitDescription[0])
        this.splitDescription = this.splitDescription.slice(this.counter,this.splitDescription.length)
        var str = ""
        this.splitDescription.forEach((e)=>{
          if(backs == 53){
            backs =0
          str = e
        }else{
          str += " "+e
        }
      })
        this.description = str

    },1000)
          },1500)
  }
}
</script>

<style scoped lang="scss">

.parent-description{
  width: 90%;
  height: 6vh;
  background-color: #F7F8FB;
  overflow: hidden;
  padding-top: 1vh;
  padding-bottom: 1vh;
}
p{
  display: inline;
  font-size: 6vh;
  font-family: Hack-Regular, Hack;
  display: inline;

}
#hand{

  animation: hand-animate 3s infinite 0s linear;
}
p:hover{
  cursor: context-menu;
}
@keyframes hand-animate {
  0%{
  }
  33%{
    transform: skewX(55deg);
  }
  67%{
    transform: skewX(0deg);
  }
}


@media screen and (max-width: 725px) and (max-width: 1200px){
  .parent-description{
    width: 95%;
    height: 3vh;
    background-color: #F7F8FB;
    overflow: hidden;
    padding-top: 1vh;
    padding-bottom: 1vh;
  }
  p{
    display: inline;
    font-size: 3vh;
    font-family: Hack-Regular, Hack;
    display: inline;

  }
}
</style>
