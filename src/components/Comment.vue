<template>
  <div>
    <div class="wrapper" v-for="comment of commentList" :key="comment.id">
      <div class="comment-container reply-btn-common">
        <div class="comment-content">
          <span v-html="`${comment.author}：${comment.content}`"></span>
        </div>
        <div class="reply-meta">
          <div>{{ comment.time }}</div>
          <div class="opt-btn">
            <span v-if="role==='0'" @click="deleteComment(comment.id)">
              <img src="../assets/images/delete.svg" /> 删除
            </span>
            <span @click="openEmojiInput(comment.id)">
              <img src="../assets/images/reply.svg" /> 回复
            </span>
          </div>
        </div>
        <emoji-input
          v-if="visibleEmojiInputIndex === comment.id"
          @closeEmojiInput="closeEmojiInput"
          :index="{
						articleId: articlePath,
						commentId: comment.id,
						replyTo: comment.author
					}"
        ></emoji-input>
      </div>
      <div class="reply-wrapper">
        <div
          class="reply-container reply-btn-common"
          v-for="reply of comment.replyList"
          :key="reply.id"
        >
          <div class="reply-content">
            <span>
              <span>{{ reply.author }}</span>
              <span>@</span>
              <span>{{ reply.replyTo }}：</span>
              <span v-html="reply.content"></span>
            </span>
          </div>
          <div class="reply-meta">
            <div>{{ reply.time }}</div>
            <div class="opt-btn">
              <span v-if="role==='0'" @click="deleteComment(reply.id)">
                <img src="../assets/images/delete.svg" /> 删除
              </span>
              <span @click="openEmojiInput(reply.id)">
                <img src="../assets/images/reply.svg" /> 回复
              </span>
            </div>
          </div>
          <emoji-input
            v-if="visibleEmojiInputIndex === reply.id"
            @closeEmojiInput="closeEmojiInput"
            :index="{
							articleId: articlePath,
							commentId: reply.id,
							replyTo: reply.author
						}"
          ></emoji-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiInput from "./EmojiInput";
import { mapState, mapMutations } from "vuex";
import { showMessage } from "../utils/utils.js";
export default {
  name: "Comment",
  props: ["comments"],
  data() {
    return {
      visibleEmojiInputIndex: ""
    };
  },
  components: {
    EmojiInput
  },
  computed: {
    ...mapState(["role"]),
    articlePath() {
      return this.$route.path;
    },
    commentList() {
      let commentString = this.comments ? this.comments : "[]";
      return JSON.parse(commentString);
    }
  },
  methods: {
    ...mapMutations(["changeCommentSubmitState"]),
    async deleteComment(id) {
      let blogOrEssay = this.$route.path.indexOf("dev") > 0 ? "dev" : "essay";
      let saveCommentApi =
        blogOrEssay === "dev"
          ? this.$apis.deleteDevComment
          : this.$apis.deleteEssayComment;
      let response = await saveCommentApi({
        articleId: this.articlePath.split("/")[2],
        id
      });
      if (response && response.data && response.data.code === 1) {
        showMessage("提交成功", "success");
        this.changeCommentSubmitState();
      } else {
        showMessage("提交失败，请稍后再试", "error");
      }
    },
    openEmojiInput(id) {
      this.visibleEmojiInputIndex =
        this.visibleEmojiInputIndex === id ? "" : id;
    },
    closeEmojiInput() {
      this.visibleEmojiInputIndex = "";
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 20px;
  border-bottom: 1px dotted #999;
  .reply-btn-common {
    &:hover {
      ::v-deep {
        .opt-btn {
          cursor: pointer;
          visibility: visible;
        }
      }
    }
  }
}
.comment-container {
  padding: 5px 0;
  comment-content: {
    font-size: 16px;
    color: #303133;
  }
}
.reply-wrapper {
  background-color: #f8f9fa;
  border-left: 3px #999 solid;
  font-size: 14px;
  color: #606266;
  .reply-container {
    padding: 5px 40px;
  }
}

.reply-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
  .opt-btn {
    visibility: hidden;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }
    }
  }
}
</style>
