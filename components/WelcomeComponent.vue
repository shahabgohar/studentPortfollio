<template>
  <div class="wrap">
      <h1 class="greet animate-welcome" >Hello! </h1>
    <h1 class="greet" id="hand">👋</h1>
  </div>
</template>

<script>
export default {
  name: "WelcomeComponent",

}
</script>

<style lang="scss" scoped>
.wrap{
  animation: animate-hello;
  animation-duration: 2s;
  animation-iteration-count: 1;
}
@keyframes animate-hello{
  0%{
    transform: translateX(-100vw);
  }
  28%{
    transform: translateX(-80vw);
  }
  57%{
    transform:  translateX(-50vw);
  }
  78%{
    transform:  translateX(-30vw);
  }
  99%{
    transform:  translateX(0vw);
  }
}

#hand{
  animation: shake-hand 0.8s infinite 0s linear;
}

@keyframes shake-hand{
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(20deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
.wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.greet{
  font-family: Hack-Regular, Hack;
  font-size: 200px;
}

@media screen and (max-width: 725px) and (min-width: 680px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 100px;
  }
}
@media screen and (max-width: 680px) and (min-width: 550px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 80px;
  }
}
@media screen and (max-width: 550px) and (min-width: 400px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 65px;
  }
}
@media screen and (max-width: 400px) and (min-width: 200px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 50px;
  }
}
@media screen and (max-width: 300px) and (min-width: 100px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 40px;
  }
}
@media screen and (min-width: 1022px ) and (max-width: 1200px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 180px;
  }
}
@media screen and (min-width: 725px ) and (max-width: 1022px) {
  .greet{
    font-family: Hack-Regular, Hack;
    font-size: 120px;
  }
}

</style>
