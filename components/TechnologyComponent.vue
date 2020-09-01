<template>
<div class="parent-tech">
  <table class="table-lg">
    <tr>
      <th> Languages & Technology</th>
    </tr>
    <tr>
      <td class="t"><div class="tech">Laravel/PHP</div></td>
      <td><div class="icon"><img src="~/assets/svgs/SVG/laravel.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Vue Js</div></td>
      <td><div class="icon"><img src="~/assets/svgs/SVG/vue-final.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Android Development</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/android.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Oracle</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/oracle_1.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Javascript</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/javascript.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">C#</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/C_Sharp_logo.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">Adobe Illustrator</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/illustrator.svg" alt=""></div></td>
    </tr>
    <tr>
      <td class="t"><div class="tech">HTML & CSS</div></td>
      <td ><div class="icon"><img src="~/assets/svgs/SVG/html_css.svg" alt=""></div></td>
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
  background-color: #7f828b;

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
  }
}
.t{
  text-align: right;
  border-right-color: #102f88;
  border-right-style: solid;
  border-right-width: thick;

}
@media screen and (max-width: 700px) {
  th{
    font-family: Hack-Regular, Hack;
    font-size: 20px;
  }
}
</style>


