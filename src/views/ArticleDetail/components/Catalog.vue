<template>
  <div class="catalog" ref="catalog">
    <p v-if="catalogList.length>0">目录</p>
    <ul class="catalog-ul">
      <li v-for="item of catalogList" :key="item.href" :class="catalogLiStyle(item.href)">
        <a
          :href="item.href"
          :class="{'link-not-activetd': true,'link-actived':activatedLinkId===item.href}"
        >{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Catalog",
  data() {
    return {};
  },
  props: {
    catalogList: {
      type: Array,
      required: true
    },
    firstVisibleElemetHref: {
      type: String
    }
  },
  methods: {
    catalogLiStyle(item) {
      if (/#h3/.test(item)) return "catalog-li-h3";
      if (/#h4/.test(item)) return "catalog-li-h4";
      if (/#h5/.test(item)) return "catalog-li-h5";
      if (/#h6/.test(item)) return "catalog-li-h6";
    }
  },
  computed: {
    activatedLinkId: {
      get() {
        return this.firstVisibleElemetHref;
      },
      set(val) {
        return val;
      }
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.activatedLinkId = to.hash;
    }
  }
};
</script>

<style scoped lang="scss">
.catalog {
  .catalog-ul {
    list-style: none;
    padding: 0;
    li {
      line-height: 24px;
    }
    .catalog-li-h3 {
      padding-left: 16px;
    }
    .catalog-li-h4 {
      padding-left: 32px;
    }
    .catalog-li-h5 {
      padding-left: 48px;
    }
    .catalog-li-h6 {
      padding-left: 64px;
    }
  }
}
.link-not-activetd {
  color: #6c757d;
  &:hover {
    color: #494f54;
  }
}
.link-actived {
  color: #00965e !important;
}
</style>