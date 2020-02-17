<template>
  <div>
    <h1 class="article-header">Ajax基础知识梳理</h1>
    <div class="article-meta">
      <el-tag type="success">标签三</el-tag>
      <span>更新于xxxx</span>
      <router-link to="/articlemd">编辑</router-link>
    </div>
    <div v-html="encodeedHtml" class="article-container" ref="content"></div>
    <catalog
      :catalogList="catalogList"
      :firstVisibleElemetHref="firstVisibleElemetHref"
      class="article-catalog"
    ></catalog>
  </div>
</template>

<script>
import Catalog from "./components/Catalog";
import { debounce, throttle } from "@/utils/utils.js";
export default {
  name: "ArticleDetail",
  data() {
    return {
      id: 0,
      encodeedHtml: "",
      catalogList: [],
      firstVisibleElemetHref: "",
      input: ""
    };
  },
  components: {
    Catalog
  },
  methods: {
    handleClick() {
      console.log(this.$store.state.encodeedHtml);
    },
    watchPageScroll() {
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
        if (this.catalogList.length > 0) {
          this.firstVisibleElemetHref = this.catalogList[0].href;
        }
        window.onscroll = debounce(this.watchPageScroll, 100);
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
.el-tag + .el-tag {
  margin-left: 10px;
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
.article-catalog {
  position: fixed;
  right: 100px;
  bottom: 30%;
}
</style>