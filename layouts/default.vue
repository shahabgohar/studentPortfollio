<template>
  <div>

    <navbar-component></navbar-component>
    <selector-component></selector-component>
    <Nuxt />
  </div>
</template>
<scrip>
export default {


}
</scrip>

<script>
import NavbarComponent from "~/components/navbarComponent";
import SelectorComponent from "~/components/selectorComponent";
export default {
  components: {SelectorComponent, NavbarComponent}
}
</script>
