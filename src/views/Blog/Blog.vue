<template>
  <keep-alive>
    <article-list :type="blogOrEssay"></article-list>
  </keep-alive>
</template>

<script>
import ArticleList from "../../components/ArticleList";
export default {
  name: "Blog",
  data() {
    return {
      blogOrEssay: "blog"
    };
  },
  components: {
    ArticleList
  }
};
</script>

<style>
</style>