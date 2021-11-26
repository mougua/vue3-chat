<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    ...mapActions(["sendMessage", "resetSession"]),
    chat(txt) {
      try {
        this.sendMessage(this.content);
      } catch (e) {}
      this.content = "";
    },
    reset() {
      this.content = "";
      this.resetSession();
    },
    onKeyup(e) {
      if (e.keyCode === 13 && this.content.length) {
        this.chat(this.content);
      }
    },
  },
};
</script>

<template>
  <div class="text">
    <textarea
      placeholder="按 Enter 发送"
      v-model="content"
      @keyup="onKeyup"
    ></textarea>

    <button @click="chat(content)">发送</button>
    <button @click="reset()">清空重来</button>
  </div>
  <div></div>
</template>

<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 80%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }

  button {
    color: white;
    background: #6abe83;
    border: none;
    width: 90px;
    float: right;
    margin-right: 5px;
    height: 25px;
    border-radius: 6px;
    outline: none;
  }
}
</style>
