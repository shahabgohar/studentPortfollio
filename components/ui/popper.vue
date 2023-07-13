<script>
  import { defineComponent } from "vue";
  import Popper from "vue3-popper";

  export default defineComponent({
    components: {
      Popper,
    },
  });
</script>
<template>
    <Popper :content="content">
        <slot></slot>
    </Popper>
</template>