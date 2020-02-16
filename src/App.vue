<template>
  <div id="app">
    <router-view />
    <back-to-top class="to-top-button"></back-to-top>
  </div>
</template>

<script>
import BackToTop from "@/components/BackToTop.vue";
export default {
  components: {
    BackToTop
  }
};
</script>

<style lang="scss">
.to-top-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
