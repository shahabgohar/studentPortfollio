<template>

      <v-sheet
      color="transparent"
      width="auto"
        class="logo py-4 d-flex justify-center align-center flex-column text-center"
      >
        <v-card-text class="font-32px my-4">Building with Nuxt</v-card-text>
        <NuxtLogo />
        <v-card-text class="font-32px my-4">Building with </v-card-text>
        <LoveLogo class="mb-4" />
      </v-sheet>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
