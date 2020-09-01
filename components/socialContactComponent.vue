<template>
<div class="pare">
  <mail-component></mail-component>
  <gmail-component></gmail-component>
  <github-component></github-component>
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
  background-color: #F7F8FB;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
@media screen and (max-width: 725px) and (max-width: 1200px) {
  .pare{
    width: 100%;
    height: 100%;
    background-color: #F7F8FB;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
