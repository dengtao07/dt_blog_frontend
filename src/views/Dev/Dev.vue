<template>
  <keep-alive>
    <article-list :type="blogOrEssay"></article-list>
  </keep-alive>
</template>

<script>
import ArticleList from "../../components/ArticleList";
export default {
  name: "Dev",
  data() {
    return {
      blogOrEssay: "dev"
    };
  },
  components: {
    ArticleList
  }
};
</script>

<style>
</style>