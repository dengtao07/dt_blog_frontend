<template>
  <div class="editor-container">
    <mavon-editor v-model="value" @save="saveMarkDown" />
    <router-link to="/">daohang</router-link>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MarkDownEditor",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    ...mapMutations(["saveEcodeedHtml"]),
    saveMarkDown(value, render) {
      this.saveEcodeedHtml(encodeURI(render));
      console.log(this.$store.state.encodeedHtml);
    }
  },
  computed: {},
  created() {}
};
</script>

<style scoped lang="scss">
.editor-container {
  padding: 20px;
}
</style>
