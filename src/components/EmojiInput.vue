<template>
  <div>
    <div class="edit-area">
      <div
        class="textarea"
        ref="inputContent"
        contenteditable="true"
        autocomplete="off"
        :placeholder="placeholder"
        draggable="false"
        spellcheck="false"
      ></div>
      <emoji class="emoji-picker" @exportEmoji="insertEmojiImg"></emoji>
    </div>
    <div v-if="!username" class="info">
      <el-form class="info-form" label-width="80px" :model="userInfoForm" ref="userInfoForm">
        <el-form-item label="您的大名" prop="username">
          <el-input
            type="text"
            v-model="userInfoForm.username"
            maxlength="10"
            autocomplete="off"
            placeholder="必填"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input
            type="text"
            v-model="userInfoForm.contact"
            autocomplete="off"
            placeholder="微信/QQ/邮箱，必填"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="action">
      <span v-if="!username">请先注册登录或留下您的基本信息</span>
      <el-button
        type="primary"
        size="medium"
        :disabled="!submitAble"
        icon="el-icon-s-promotion"
        :loading="submittingComment"
        @click="submitComment"
      >发送</el-button>
    </div>
  </div>
</template>

<script>
import Emoji from "./Emoji";
import { mapMutations } from "vuex";
import { showMessage, formatedDate } from "../utils/utils.js";
export default {
  name: "EmojiInput",
  props: ["index"],
  data() {
    return {
      textarea: "",
      userInfoForm: {
        username: "",
        contact: ""
      },
      placeholder: "畅所欲言吧...",
      comIndex: this.index,
      submittingComment: false
    };
  },
  components: {
    Emoji
  },
  methods: {
    ...mapMutations(["changeCommentSubmitState"]),
    insertEmojiImg(emoji) {
      let emojiImg = document.createElement("img");
      emojiImg.src = emoji.src;
      emojiImg.alt = emoji.alt;
      emojiImg.setAttribute(
        "style",
        "height:20px; width:20px; draggable:false; margin:0px 1px"
      );
      this.$refs.inputContent.appendChild(emojiImg);
    },
    async submitComment() {
      let commentInfo = {
        author: this.username || this.userInfoForm.username,
        content: this.$refs.inputContent.innerHTML,
        articleId: this.comIndex.articleId.split("/")[2],
        commentId: this.comIndex.commentId,
        replyTo: this.comIndex.replyTo
      };
      this.submittingComment = true;
      let response = await this.$apis.saveComment(commentInfo);
      if (response && response.data && response.data.affectedRows === 1) {
        this.$refs.inputContent.innerHTML = "";
        !this.username && this.$refs["userInfoForm"].resetFields();
        this.changeCommentSubmitState();
        this.$emit("closeEmojiInput");
        showMessage("提交成功", "success");
      } else {
        showMessage("提交失败，请稍后再试", "error");
      }
      this.submittingComment = false;
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    submitAble() {
      let userInfor = this.userInfoForm;
      let isUserInfoAble =
        !!userInfor.username.trim() && !!userInfor.contact.trim();
      let isVuexUsernameAble = !!this.username;
      let isTextAreaAble =
        this.$refs.inputContent && !!this.$refs.inputContent.innerHTML.trim();
      return (isVuexUsernameAble || isUserInfoAble) && isTextAreaAble;
    }
  }
};
</script>

<style scoped lang="scss">
.edit-area {
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  position: relative;
  .textarea {
    border-radius: 4px;
    padding: 8px 20px 35px 20px;
    font-size: 14px;
    &:empty:before {
      content: attr(placeholder);
      position: absolute;
      opacity: 0.4;
      pointer-events: none;
      user-select: none;
    }
  }
  .emoji-picker {
    position: absolute;
    height: 20px;
    width: 20px;
    bottom: 5px;
    left: 10px;
  }
  ::v-deep {
    .el-textarea__inner {
      padding-bottom: 30px;
    }
  }
}

.info {
  .info-form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .el-form-item {
      flex-basis: 48%;
      margin-bottom: 0;
    }
  }
}

.action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    color: #666;
    font-size: 13px;
    margin-right: 20px;
  }
}
</style>
