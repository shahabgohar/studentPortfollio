<template>
<div class="pare">
  <div class="bound">
<!-- <mail-component></mail-component>-->
  <gmail-component></gmail-component>
  <github-component></github-component>
  </div>
</div>
</template>

<script>
import MailComponent from "@/components/MailComponent";
import GmailComponent from "@/components/gmailComponent";
import GithubComponent from "~/components/githubComponent";
export default {
name: "socialContactComponent",
  components: {GithubComponent, GmailComponent, MailComponent}
}
</script>


<style scoped lang="scss">
.pare{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bound{
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
@media screen and (max-width: 725px) and (max-width: 1200px) {
  .bound{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
