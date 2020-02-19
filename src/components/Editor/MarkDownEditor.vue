<template>
  <div class="editor-container">
    <div class="editor-topbar">
      <div>编辑文章</div>
      <div class="editor-topbar-btn">
        <el-button type="success" :loading="savingArticle" @click="saveArticle">保存</el-button>
        <el-button type="success" :loading="postingArticle" @click="postArticle">发布</el-button>
      </div>
    </div>
    <el-input v-model="articleTitle" placeholder="请输入内容"></el-input>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{ tag }}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <mavon-editor v-model="markdownValue" @save="postArticle" />
    <router-link to="/">daohang</router-link>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MarkDownEditor",
  data() {
    return {
      markdownValue: "",
      articleTitle: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      savingArticle: false,
      postingArticle: false
    };
  },
  methods: {
    ...mapMutations(["saveEcodeedHtml"]),
    saveMarkDown(value, render) {
      this.saveEcodeedHtml(encodeURI(render));
      console.log(this.$store.state.encodeedHtml);
    },
    saveArticle() {
      this.savingArticle = true;
    },
    async postArticle(value, render) {
      this.postingArticle = true;
      let articleInfo = {
        title: this.articleTitle,
        author: "dt",
        tags: this.dynamicTags.join(","),
        contentMd: encodeURI(value),
        contentHtml: encodeURI(render),
        createTime: Date()
      };
      let response = await this.$apis.saveArticle(articleInfo);
      if (response) {
        this.postingArticle = false;
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
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
  .editor-topbar {
    display: flex;
    align-items: center;
    height: 67px;
    background-color: #e9ecef;
    justify-content: center;
    position: relative;
    .editor-topbar-btn {
      position: absolute;
      right: 40px;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
