<template>
  <div class="catalog" ref="catalog">
    <p>文章目录</p>
    <ul>
      <li v-for="item of catalogList" :key="item.href">
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
    return {
      activatedLinkId: ""
    };
  },
  props: {
    catalogList: {
      type: Array,
      required: true
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
.link-not-activetd {
  color: black;
  &:hover {
    color: red;
  }
}
.link-actived {
  color: green;
}
</style>