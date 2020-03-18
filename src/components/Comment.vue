<template>
  <div>
    <div class="wrapper" v-for="comment of commentList" :key="comment.id">
      <div class="comment-container reply-btn-common">
        <div class="comment-content">
          <span v-html="`${comment.author}：${comment.content}`"></span>
        </div>
        <div class="reply-meta">
          <span>{{ comment.time }}</span>
          <span @click="openEmojiInput(comment.id)" class="reply-btn">
            <img class="reply-icon" src="../assets/images/reply.svg" /> 回复
          </span>
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
            <span>{{ reply.time }}</span>
            <span @click="openEmojiInput(reply.id)" class="reply-btn">
              <img class="reply-icon" src="../assets/images/reply.svg" />回复
            </span>
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
    articlePath() {
      return this.$route.path;
    },
    commentList() {
      let commentString = this.comments ? this.comments : "[]";
      return JSON.parse(commentString);
    }
  },
  methods: {
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
        .reply-btn {
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
  .reply-btn {
    visibility: hidden;
    display: flex;
    align-items: center;
    .reply-icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
}
</style>
