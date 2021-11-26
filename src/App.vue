<script>
import Card from "./components/card.vue";
import List from "./components/list.vue";
import ChatText from "./components/chat_text.vue";
import Message from "./components/message.vue";

export default {
  components: {
    Card,
    List,
    ChatText,
    Message,
  },
  created() {
    this.$store.commit("initData");
  },
};
</script>

<template>
  <div id="app">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <ChatText></ChatText>
    </div>
  </div>
</template>

<style lang="less" scoped>
#app {
  margin: 20px auto;
  width: 98%;
  height: 90%;

  overflow: hidden;
  border-radius: 3px;

  .sidebar,
  .main {
    height: 100%;
  }

  .sidebar {
    float: left;
    width: 15%;
    color: #f4f4f4;
    background-color: #2e3238;
  }

  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }

  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .message {
    height: ~"calc(100% - 160px)";
  }
}
</style>
