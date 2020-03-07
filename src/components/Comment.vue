<template>
  <div>
    <div class="wrapper" v-for="comment of commentList" :key="comment.id">
      <div class="comment-container">
        <div class="comment-content">
          <span>{{comment.author}}：{{comment.content}}</span>
        </div>
        <div class="reply-meta">
          <span>{{comment.time}}</span>
          <span @click="openTextarea(comment.id)" class="reply-btn">回复</span>
        </div>
        <emoji-input
          v-if="visibleEmojiInputIndex === comment.id"
          :index="{articleId:articlePath, commentId:comment.id, replyTo:comment.author}"
        ></emoji-input>
      </div>
      <div class="reply-wrapper">
        <div class="reply-container" v-for="reply of comment.replyList" :key="reply.id">
          <div class="reply-content">
            <span>
              <span>{{reply.author}}</span>
              <span>@</span>
              <span>{{reply.replyTo}}：</span>
              {{reply.content}}
            </span>
          </div>
          <div class="reply-meta">
            <span>{{reply.time}}</span>
            <span @click="openTextarea(reply.id)" class="reply-btn">回复</span>
          </div>
          <emoji-input
            v-if="visibleEmojiInputIndex === reply.id"
            :index="{articleId:articlePath, commentId:reply.id, replyTo:reply.author}"
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
      let commentString = this.comments;
      return JSON.parse(commentString);
    }
  },
  methods: {
    openTextarea(id) {
      this.visibleEmojiInputIndex =
        this.visibleEmojiInputIndex === id ? "" : id;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 20px;
  border-bottom: 1px dotted #999;
  .comment-container {
    padding: 5px 0;
  }
  .reply-wrapper {
    background-color: #f8f9fa;
    border-left: 3px #999 solid;
    .reply-container {
      padding: 5px 40px;
    }
  }

  .reply-meta {
    display: flex;
    justify-content: space-between;
    .reply-btn {
      cursor: pointer;
    }
  }
}
</style>