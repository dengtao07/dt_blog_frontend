<template>
  <div>
    <div class="home-banner" @click="handleClick">首页</div>
    <div class="loading-tip" v-loading="loading" v-if="loading"></div>
    <transition name="fade">
      <ul class="article-list" v-if="articleList.length > 0 && !loading">
        <li v-for="article of articleList" :key="article.id" class="article-item">
          <router-link :to="`/article-detail/${article.id}`" class="article-content">
            <div>
              <h4 class="article-header">{{ article.title }}</h4>
              <p class="article-abstract">{{ article.abstract }}</p>
              <p>{{ article.createTime }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </transition>
    <div v-if="articleList.length === 0 && !loading"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      articleList: [],
      loading: true
    };
  },
  methods: {
    async getHomeArticleList() {
      const response = await this.$apis.getHomeArticleList();
      this.loading = false;
      if (response.code === '1') {
        this.articleList = response.data.articleList;
    
      } else {
        this.articleList = [];
      }
    },
    handleClick() {
      this.$router.push("/articlemd");
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
.loading-tip {
  margin-top: 100px;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter {
  opacity: 0;
}
.article-list {
  padding: 0;
  list-style: none;
  .article-item {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .article-content {
      display: block;
      width: 70%;
      border: 1px solid black;
      color: black;
      padding: 20px;
      .article-header {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .article-abstract {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
</style>
