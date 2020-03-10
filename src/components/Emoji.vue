<template>
  <div>
    <el-popover placement="bottom" width="320" trigger="click">
      <div class="emoji-container">
        <img
          class="emoji"
          v-for="(emoji, index) of emojiList"
          :key="index"
          :src="emojiUrlObj[emoji.filename]"
          @click="exportEmoji(emoji)"
        />
      </div>
      <img
        ref="emojiBtn"
        class="emoji-btn"
        src="../assets/emoji/1f60a.png"
        @mouseover="handleMouseover"
        slot="reference"
      />
    </el-popover>
  </div>
</template>

<script>
import EmojiObj from "../utils/EmojiMapper.js";
export default {
  name: "Emoji",
  data() {
    return {
      emojiList: EmojiObj.emojiList
    };
  },
  computed: {
    emojiUrlObj() {
      let emojiUrlObj = {};
      this.emojiList.forEach(item => {
        let filename = item.filename;
        emojiUrlObj[filename] = require("../assets/emoji/" + filename + ".png");
      });
      return emojiUrlObj;
    }
  },
  methods: {
    exportEmoji(emoji) {
      this.$emit("exportEmoji", emoji);
    },
    randomEmojiArr() {
      let arr = [
        require("../assets/emoji/1f600.png"),
        require("../assets/emoji/1f601.png"),
        require("../assets/emoji/1f609.png"),
        require("../assets/emoji/1f61b.png"),
        require("../assets/emoji/1f92a.png"),
        require("../assets/emoji/1f973.png"),
        require("../assets/emoji/1f638.png"),
        require("../assets/emoji/1f920.png"),
        require("../assets/emoji/1f917.png"),
        require("../assets/emoji/1f923.png")
      ];
      let randomIndex = Math.floor(Math.random() * 10);
      this.$refs.emojiBtn.src = arr[randomIndex];
    },
    handleMouseover() {
      this.randomEmojiArr();
    }
  }
};
</script>

<style scoped lang="scss">
.emoji-container {
  height: 200px;
  overflow: auto;
}

.emoji {
  width: 24px;
  height: 24px;
  margin: 6px;
  &:hover {
    cursor: pointer;
  }
}

.emoji-btn {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
