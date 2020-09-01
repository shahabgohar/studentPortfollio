<template>
<div class="parent-tech">
  <table class="table-lg">
    <tr>
      <th> Languages & Technology</th>
    </tr>
    <tr>
      <td class="t"><div class="tech">Laravel/PHP</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/laravel.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Vue Js</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/vue-final.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Android Development</div></td>
      <td class="i" ><div class="icon"><img src="~/assets/svgs/SVG/android.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Oracle</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/oracle_1.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Javascript</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/javascript.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">C#</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/C_Sharp_logo.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Adobe Illustrator</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/illustrator.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">HTML & CSS</div></td>
      <td class="i"><div class="icon"><img src="~/assets/svgs/SVG/html_css.svg" alt=""></div></td>
    </tr>


  </table>
</div>
</template>

<script>
export default {
name: "TechnologyComponent"
}
</script>
<style lang="scss" scoped>
.parent-tech{
  width: 100%;
  height: 90vh;
  background-color: #F7F8FB;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.table-lg{
  width: 80%;
  height: 90%;

}
th{
  font-family: Hack-Regular, Hack;
  font-size: 25px;
}
td{
  text-align: left;
  vertical-align: center;

  font-family: Hack-Regular, Hack;
  font-size: 25px;

}

table{
  border-collapse: collapse;

}
.tech{
  padding-right: 2%;
  font-size: 20px;

}
.icon{
  padding-left: 1%;
  height: 10vh;

  img{
    width: 100%;
    height: 100%;
    animation:animate-logos;
    animation-iteration-count: 1;
    animation-duration: 1s;
    animation-delay: 0s;
  }
}
.t{
  text-align: right;
  border-right-color: #8d8d8d;
  border-right-style: solid;
  border-right-width: thick;
  animation: animate-tech-name;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: 0s;

}

@keyframes animate-logos{
  0%{
    width: 0%;
  }

  100%{

    width: 100%;
  }
}
@keyframes animate-tech-name{
  0%{
    transform: translateX(-100vw);
  }
  100%{
    transform:  translateX(-0vw);
  }
}
@media screen and (max-width: 700px) {
  th{
    font-family: Hack-Regular, Hack;
    font-size: 20px;
  }
}
</style>


