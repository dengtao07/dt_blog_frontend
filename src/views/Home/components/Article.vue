<template>
  <router-link to="`/articleDetail?id=${article.id}`" class="article-card">
    <div>
      <h4>{{ article.title }}</h4>
      <p>{{ article.abstract }}</p>
      <p>{{ article.time }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ArticleList",
  props: ["article"],
  methods: {}
};
</script>

<style scoped lang="scss">
.article-card {
  display: block;
  width: 70%;
  height: 100px;
  border: 1px solid black;
  color: black;
  margin-bottom: 10px;
  padding: 20px;
}
</style>
