<template>
  <div class="tools">
    <div :class="{'like': like, 'dislike': !like, 'common': true}" @click="addLikeNum">
      <div v-if="likeNums !== 0" class="like-nums">{{likeNums}}</div>
    </div>
    <div class="comment" @click="navigateToComment"></div>
  </div>
</template>

<script>
export default {
  name: "ArticleSideBar",
  props: ["nums", "like"],
  data() {
    return {};
  },
  methods: {
    addLikeNum() {
      this.$emit("addLikeNum");
    },
    navigateToComment() {
      this.$emit("navigateToComment");
    }
  },
  computed: {
    likeNums() {
      return this.nums;
    }
  }
};
</script>

<style scoped lang="scss">
.tools {
  list-style: none;
  width: 50px;
  display: flex;
  flex-direction: column;
  & > div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #aaa;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  }
  .common {
    cursor: pointer;
    position: relative;
    .like-nums {
      height: 20px;
      line-height: 20px;
      color: #6cbd45;
      user-select: none;
      position: absolute;
      top: -22px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .like {
    background: url("../assets/images/like-active.svg") no-repeat;
    background-position: 50% 50%;
    border-color: #6cbd45;
  }
  .dislike {
    background: url("../assets/images/like.svg") no-repeat;
    background-position: 50% 50%;
    &:hover {
      background: url("../assets/images/like-hover.svg") no-repeat;
      background-position: 50% 50%;
    }
  }
  .comment {
    background: url("../assets/images/comment.svg") no-repeat;
    background-position: 50% 50%;
    &:hover {
      background: url("../assets/images/comment-hover.svg") no-repeat;
      background-position: 50% 50%;
      cursor: pointer;
    }
  }
}
</style>