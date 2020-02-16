<template>
  <div>
    <div v-html="encodeedHtml" class="article-container" ref="content"></div>
    <catalog :catalogList="catalogList"></catalog>
  </div>
</template>

<script>
import Catalog from "./components/Catalog";
export default {
  name: "ArticleDetail",
  data() {
    return {
      id: 0,
      encodeedHtml: "",
      catalogList: []
    };
  },
  components: {
    Catalog
  },
  methods: {
    handleClick() {
      console.log(this.$store.state.encodeedHtml);
    },
    extractCatalog() {
      this.$nextTick(() => {
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
      });
    }
  },
  // computed: {
  //   encodeedHtml() {
  //     return decodeURI(this.$store.state.encodeedHtml);
  //   }
  // },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(async vm => {
      let response = await vm.$apis.getMarkdownSource();
      vm.encodeedHtml = decodeURI(response.data.html);
      vm.extractCatalog();
    });
  }
};
</script>

<style scoped lang="scss">
.article-container {
  width: 60%;
  & ::v-deep {
    .hljs {
      max-height: 300px;
      max-width: 90%;
      overflow: auto;
    }
  }
}
</style>