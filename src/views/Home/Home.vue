<template>
  <div>
    <div class="home-banner">首页</div>
    <article-list v-if="articleList.length > 0" :articleList="articleList"></article-list>
    <div v-else>暂时没有数据</div>
  </div>
</template>

<script>
import ArticleList from "./components/Article.vue";
export default {
  name: "Home",
  components: {
    ArticleList
  },
  data() {
    return {
      articleList: []
    };
  },
  methods: {
    async getHomeArticleList() {
      const response = await this.$apis.getHomeArticleList();
      if (response && response.data.code === "1") {
        this.articleList = response.data.data;
      } else {
        this.articleList = [];
      }
    }
  },
  created() {
    this.getHomeArticleList();
  }
};
</script>

<style scoped lang="scss">
.home-banner {
  background-color: aquamarine;
  height: 200px;
}
</style>
