<template>
  <transition name="fade">
    <div @click="backToTop" v-show="backToTopshow" class="to-top-button">
      <i class="el-icon-arrow-up"></i>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { backToTopBtnShowable, debounce } from "../utils/utils";
export default {
  name: "BackToTop",
  computed: {
    ...mapState(["backToTopshow"])
  },
  mounted() {
    window.onscroll = debounce(backToTopBtnShowable.bind(this));
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
  width: 40px;
  height: 40px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  .el-icon-arrow-up {
    font-size: 25px;
    color: #666;
  }
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 1s;
}
</style>