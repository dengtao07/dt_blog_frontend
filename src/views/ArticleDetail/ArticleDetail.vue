<template>
  <div class="article">
    <div class="loading-tip" v-loading="loading" v-if="loading"></div>
    <transition name="article">
      <div class="article-wrapper" v-if="!loading">
        <h1 class="article-header">{{ articleInfo.title }}</h1>
        <div class="article-meta">
          <el-tag v-for="(tag, index) of articleInfo.tags" type="success" :key="index">{{ tag }}</el-tag>
          <span class="article-updatetime">更新于{{ articleInfo.createTime }}</span>
          <router-link :to="`/article-edit/${articleId}`" v-if="role === '0'">编辑</router-link>
          <router-link to="/article-edit/new" v-if="role === '0'">新建文章</router-link>
        </div>
        <div v-html="articleInfo.contentHtml" class="article-container" ref="content"></div>
        <div class="article-comment">
          <h3 class="comment-header">留言</h3>
          <emoji-input :index="{articleId:articlePath, commentId:''}"></emoji-input>
          <comment :comments="articleInfo.comments"></comment>
        </div>
      </div>
    </transition>
    <transition name="article">
      <catalog
        v-if="!loading"
        :catalogList="catalogList"
        :firstVisibleElemetHref="firstVisibleElemetHref"
        class="article-catalog"
      ></catalog>
    </transition>
  </div>
</template>

<script>
import Catalog from "./components/Catalog";
import Comment from "../../components/Comment";
import EmojiInput from "../../components/EmojiInput";
import { debounce, throttle, backToTopBtnShowable } from "@/utils/utils.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "ArticleDetail",
  data() {
    return {
      articleInfo: {},
      catalogList: [],
      firstVisibleElemetHref: "",
      articleId: 1,
      loading: true,
      watchPageScroll: debounce(this.watchPageScrollFunc)
    };
  },
  components: {
    Catalog,
    Comment,
    EmojiInput
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
    }
  },
  computed: {
    ...mapState(["role"]),
    articlePath() {
      return this.$route.path;
    }
  },
  beforeRouteUpdate(to, from, next) {
    //不同参数之间跳转时，刷新页面
    //例如/article-detail/1跳转到/article-detail/2
    next();
  },
  async created() {
    this.articleId = +this.$route.params.id;
    let response = await this.$apis.getArticleDetail({
      articleId: this.articleId
    });
    let {
      title,
      tags,
      author,
      createTime,
      contentHtml,
      contentMd,
      comments
    } = response.data.article;
    this.articleInfo = {
      title,
      tags: tags.split(","),
      author,
      createTime,
      contentHtml: decodeURI(contentHtml),
      contentMd: decodeURI(contentMd),
      comments
    };
    this.loading = false;
    this.$nextTick(() => {
      this.extractCatalog();
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.watchPageScroll);
  }
};
</script>

<style scoped lang="scss">
.article {
  width: 70%;
  .article-wrapper {
    width: 85%;
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
      }
    }
    .article-comment {
      .comment-header {
        position: relative;
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
