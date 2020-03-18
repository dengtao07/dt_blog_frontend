<template>
  <div class="editor-container">
    <div class="editor-topbar">
      <div>编辑文章</div>
      <div class="editor-topbar-btn">
        <el-button type="success" :loading="savingArticle" @click="saveArticle">保存</el-button>
        <el-button type="success" :loading="postingArticle" @click="postArticle">发布</el-button>
      </div>
    </div>
    <el-input v-model="articleInfo.title" placeholder="请输入标题"></el-input>
    <div>
      <el-tag
        :key="tag"
        v-for="tag in articleInfo.tags"
        closable
        :disable-transitions="false"
        @close="handleTagClose(tag)"
      >{{ tag }}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="tagInputVisible"
        v-model="tagInputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showCreateTagInput">+ 新建标签</el-button>
    </div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入摘要"
      v-model="articleInfo.abstract"
      maxlength="200"
      show-word-limit
    ></el-input>
    <mavon-editor
      v-model="articleInfo.contentMd"
      @save="postArticle"
      :ishljs="true"
      codeStyle="atom-one-dark"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { formatedDate, showMessage } from "../../utils/utils";
export default {
  name: "MarkDownEditor",
  data() {
    return {
      articleInfo: {
        title: "",
        tags: [],
        author: "",
        abstract: "",
        contentHtml: "",
        contentMd: ""
      },
      tagInputVisible: false,
      tagInputValue: "",
      savingArticle: false,
      postingArticle: false,
      articleId: "",
      apiType: 0 // api的类型，0为dev，1为essay
    };
  },
  methods: {
    ...mapMutations(["saveEcodeedHtml"]),
    saveArticle() {
      this.savingArticle = true;
    },
    checkArticleValid(articleInfo) {
      if (!articleInfo.title) {
        showMessage("未填写文章标题", "error");
        return false;
      }
      if (!articleInfo.tags) {
        showMessage("未填写文章标签", "error");
        return false;
      }
      if (!articleInfo.abstract) {
        showMessage("未填写文章摘要", "error");
        return false;
      }
      if (!articleInfo.content_md) {
        showMessage("没有文章内容", "error");
        return false;
      }
      return true;
    },
    async postArticle(value, render) {
      this.postingArticle = true;
      let articleInfo = {
        title: this.articleInfo.title,
        author: "dt",
        tags: this.articleInfo.tags.join(","),
        abstract: this.articleInfo.abstract,
        content_md: encodeURI(value),
        content_html: encodeURI(render)
      };
      if (!this.checkArticleValid(articleInfo)) {
        this.postingArticle = false;
        return false;
      }
      let response;
      if (!!this.articleId) {
        //路由中获取到id的话则是更新文章，否则是新建文章
        articleInfo.id = this.articleId;
        let requestApi =
          this.apiType === 0
            ? this.$apis.updateDevArticle
            : this.$apis.updateEssayArticle;
        response = await requestApi(articleInfo);
      } else {
        let requestApi =
          this.apiType === 0
            ? this.$apis.newDevArticle
            : this.$apis.newEssayArticle;
        response = await requestApi(articleInfo);
      }
      if (
        response &&
        response.data &&
        (response.data.id || response.data.code === 1)
      ) {
        showMessage("提交成功", "success");
      } else {
        showMessage("提交失败", "error");
      }
      this.postingArticle = false;
    },
    handleTagClose(tag) {
      this.articleInfo.tags.splice(this.articleInfo.tags.indexOf(tag), 1);
    },

    showCreateTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let tagInputValue = this.tagInputValue;
      if (tagInputValue) {
        this.articleInfo.tags.push(tagInputValue);
      }
      this.tagInputVisible = false;
      this.tagInputValue = "";
    }
  },
  async created() {
    let path = this.$route.path;
    this.apiType = path.indexOf("dev-article-edit") > 0 ? 0 : 1;
    this.articleId = +this.$route.params.id;
    if (!!this.articleId) {
      //获取到id的话则修改相应文章
      //未获取到则是新建文章
      let requestApi =
        this.apiType === 0
          ? this.$apis.getDevArticleDetail
          : this.$apis.getEssayArticleDetail;
      let response = await requestApi({
        articleId: this.articleId
      });
      let {
        title,
        tags,
        author,
        content_html,
        content_md,
        abstract
      } = response.data.article;
      this.articleInfo = {
        title,
        tags: tags.split(","),
        author,
        abstract,
        contentHtml: decodeURI(content_html),
        contentMd: decodeURI(content_md)
      };
    }
  }
};
</script>

<style scoped lang="scss">
.editor-container {
  padding: 20px;
  width: 90%;
  & > * {
    margin-bottom: 10px;
  }
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
.el-tag {
  margin-right: 10px;
}
.button-new-tag {
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
