<template>
  <div class="article">
    <div class="loading-tip" v-loading="loading" v-if="loading"></div>
    <transition name="article">
      <div
        :class="{'article-wrapper':true, 'essay-textalign-center':blogOrEssay === 'essay'}"
        v-if="!loading"
      >
        <article-side-bar
          class="article-side-bar"
          :nums="articleInfo.likeNums"
          :like="articleInfo.doUserLike"
          @addLikeNum="addLikeNum"
          @navigateToComment="navigateToComment"
        ></article-side-bar>
        <h1 class="article-header">{{ articleInfo.title }}</h1>
        <div class="article-meta">
          <el-tag v-for="(tag, index) of articleInfo.tags" type="success" :key="index">{{ tag }}</el-tag>
          <span class="article-updatetime">更新于{{ articleInfo.updatedTime }}</span>
          <span v-if="role === '0'">
            <a @click="navigateToEdit(0)">编辑</a>
            <a @click="navigateToEdit(1)">新建文章</a>
          </span>
        </div>
        <div v-html="articleInfo.contentHtml" class="article-container" ref="content"></div>
        <div class="article-comment" id="comment">
          <h3 class="comment-header">留言</h3>
          <emoji-input :index="{ articleId: articlePath, commentId: '' }"></emoji-input>
          <comment :comments="comments"></comment>
        </div>
      </div>
    </transition>
    <transition name="article">
      <catalog
        v-if="!loading && blogOrEssay === 'dev'"
        :catalogList="catalogList"
        :firstVisibleElemetHref="firstVisibleElemetHref"
        class="article-catalog"
      ></catalog>
    </transition>
  </div>
</template>

<script>
import Catalog from "./Catalog";
import Comment from "./Comment";
import EmojiInput from "./EmojiInput";
import ArticleSideBar from "./ArticleSideBar";
import { debounce, throttle, backToTopBtnShowable } from "@/utils/utils.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "BlogDetail",
  data() {
    return {
      articleInfo: {},
      comments: [],
      catalogList: [],
      firstVisibleElemetHref: "",
      articleId: 1,
      loading: true,
      watchPageScroll: throttle(this.watchPageScrollFunc),
      blogOrEssay: "dev",
      getArticleDetailApi: ""
    };
  },
  components: {
    Catalog,
    Comment,
    EmojiInput,
    ArticleSideBar
  },
  methods: {
    watchPageScrollFunc() {
      let contentElementRef = Array.from(
        this.$refs.content.querySelectorAll("h1,h2,h3,h4,h5,h6")
      );
      for (let index = 0; index < contentElementRef.length; index++) {
        const viewPortHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        const offsetTop = contentElementRef[index].offsetTop;
        const elementHeight = contentElementRef[index].clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const top = offsetTop - scrollTop + elementHeight;
        if (top <= viewPortHeight && top > 0) {
          this.firstVisibleElemetHref = this.catalogList[index].href;
          break;
        }
        //如果整个文章的标题都不在视区，高亮最后一个标题
        this.firstVisibleElemetHref = this.catalogList[
          this.catalogList.length - 1
        ].href;
      }
    },
    extractCatalog() {
      let contentElementRef = Array.from(
        this.$refs.content.querySelectorAll("h1,h2,h3,h4,h5,h6")
      );
      contentElementRef.forEach((item, index) => {
        item.id = item.localName + "-" + index;
        this.catalogList.push({
          tagName: item.localName,
          href: `#${item.localName}-${index}`,
          text: item.innerText
        });
      });
      if (this.catalogList.length > 0) {
        this.firstVisibleElemetHref = this.catalogList[0].href;
      }
      window.addEventListener("scroll", this.watchPageScroll);
    },
    navigateToEdit(type) {
      let url =
        type === 0
          ? `/${this.blogOrEssay}-article-edit/${this.articleId}`
          : `/${this.blogOrEssay}-article-edit/new`;
      this.$router.push(url);
    },
    addLikeNum() {
      let articleInfo = this.articleInfo;
      articleInfo.doUserLike
        ? (articleInfo.likeNums -= 1)
        : (articleInfo.likeNums += 1);
      articleInfo.doUserLike = !articleInfo.doUserLike;
      this.submitLike();
    },
    navigateToComment() {
      document.querySelector("#comment").scrollIntoView(true);
    },
    async submitLike() {
      let curDoUserLike = this.articleInfo.doUserLike;
      let likeArticleApi =
        this.blogOrEssay === "dev"
          ? this.$apis.likeDevArticleApi
          : this.$apis.likeEssayArticleApi;
      await likeArticleApi({
        id: this.articleId,
        doUserLike: curDoUserLike
      });
    }
  },
  computed: {
    ...mapState(["role", "newComnentSubmitted", "isLogined"]),
    articlePath() {
      return this.$route.path;
    }
  },
  watch: {
    async newComnentSubmitted(newVal, oldVal) {
      if (newVal !== oldVal) {
        let response = await this.getArticleDetailApi({
          articleId: this.articleId
        });
        let { comments } = response.data.article;
        this.comments = comments;
      }
    },

    //当用户登录或者登出后，校验用户点赞状态
    async isLogined(newVal, oldVal) {
      if (newVal !== oldVal) {
        let checkUserLikeStatusApi =
          this.blogOrEssay === "dev"
            ? this.$apis.checkDevUserLikeStatus
            : this.$apis.checkEssayUserLikeStatus;
        let response = await checkUserLikeStatusApi({
          id: this.articleId
        });
        this.articleInfo.doUserLike = response.data.doUserLike;
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //不同参数之间跳转时，刷新页面
    //例如/article-detail/1跳转到/article-detail/2
    next();
  },
  async created() {
    this.articleId = +this.$route.params.id;
    this.blogOrEssay = this.$route.path.indexOf("dev") > 0 ? "dev" : "essay";
    this.getArticleDetailApi =
      this.blogOrEssay === "dev"
        ? this.$apis.getDevArticleDetail
        : this.$apis.getEssayArticleDetail;
    let response = await this.getArticleDetailApi({
      articleId: this.articleId
    });
    let {
      title,
      tags,
      author,
      create_time,
      content_html,
      content_md,
      comments,
      updated_time,
      like_nums,
      doUserLike
    } = response.data.article;
    this.articleInfo = {
      title,
      tags: tags.split(","),
      author,
      createTime: create_time,
      updatedTime: updated_time,
      contentHtml: decodeURI(content_html),
      contentMd: decodeURI(content_md),
      comments,
      likeNums: like_nums,
      doUserLike
    };
    this.comments = comments;
    this.loading = false;
    this.$nextTick(() => {
      if (this.blogOrEssay === "dev") {
        this.extractCatalog();
      }
    });
  },
  beforeDestroy() {
    if (this.blogOrEssay === "dev") {
      window.removeEventListener("scroll", this.watchPageScroll);
    }
  }
};
</script>

<style scoped lang="scss">
.article {
  width: 70%;
  .article-wrapper {
    width: 85%;
    .article-side-bar {
      position: fixed;
      margin-left: -80px;
      top: 40%;
    }
    .el-tag {
      margin-right: 10px;
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
    .article-meta {
      .article-updatetime {
        font-size: 14px;
        color: #999;
      }
      a {
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .article-comment {
      .comment-header {
        position: relative;
        margin-bottom: 30px;
        &::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          opacity: 0.6;
          width: 53px;
          height: 6px;
          background-color: #1170f5;
          background-image: linear-gradient(126deg, #0262f5, #fff 99%);
        }
      }
    }
  }
  .essay-textalign-center {
    margin: 0 auto;
  }
  .article-catalog {
    position: fixed;
    right: 6%;
    bottom: 20%;
    z-index: 20000;
    font-size: 14px;
    max-width: 250px;
    max-height: 320px;
    overflow-y: auto;
    ::v-deep {
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.article-enter-active {
  transition: all 1s;
}
.article-enter {
  opacity: 0;
}
</style>
