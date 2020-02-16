<template>
  <div @click="backToTop" v-show="show" class="to-top-button">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      show: false
    };
  },
  mounted() {
    window.onscroll = () => {
      if (
        window.document.body.scrollTop > 100 ||
        window.document.documentElement.scrollTop > 100
      ) {
        this.show = true;
      } else {
        this.show = false;
      }
    };
  },
  methods: {
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped lang="scss">
.to-top-button {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .el-icon-caret-top {
    font-size: 23px;
  }
}
</style>