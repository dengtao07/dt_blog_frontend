<template>
  <keep-alive>
    <article-list :type="blogOrEssay"></article-list>
  </keep-alive>
</template>

<script>
import ArticleList from "../../components/ArticleList";
export default {
  name: "Essay",
  data() {
    return {
      blogOrEssay: "essay"
    };
  },
  components: {
    ArticleList
  }
};
</script>

<style>
</style>