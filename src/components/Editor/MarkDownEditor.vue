<template>
  <div class="editor-container">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="tagInputVisible"
      v-model="tagInputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
      value: "",
      dynamicTags: ["标签一", "标签二", "标签三"],
      tagInputVisible: false,
      tagInputValue: ""
    };
  },
  methods: {
    ...mapMutations(["saveEcodeedHtml"]),
    saveMarkDown(value, render) {
      this.saveEcodeedHtml(encodeURI(render));
      console.log(this.$store.state.encodeedHtml);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
