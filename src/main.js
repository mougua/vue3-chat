import {createApp, nextTick} from "vue";

import {createStore} from "vuex";

import axios from "axios";
import App from "./App.vue";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

const now = new Date();
const store = createStore({
  state: {
    // 当前用户
    user: {
      name: "",
      img: "images/1.jpg",
    },
    // 会话列表
    sessions: [
      // {
      //   id: 1,
      //   sessionId: null,
      //   api_version: "/v1",
      //   user: {
      //     name: "机器人 v1",
      //     img: "images/2.png",
      //   },
      //   messages: [],
      // },
      {
        id: 2,
        sessionId: null,
        api_version: "/v2",
        user: {
          name: "机器人 v2",
          img: "images/3.jpg",
        },
        messages: [],
      },
    ],
    // 当前选中的会话
    currentSessionId: 2,
    // 过滤出只包含这个key的会话
    filterKey: "",
  },
  mutations: {
    initData(state) {
      // let data = localStorage.getItem('vue-chat-session');
      // if (data) {
      //   console.log("some data");
      //   state.sessions = JSON.parse(data);
      // }
      state.sessions.forEach((session) => {
        store.dispatch("initSession", session);
      });
    },
    // 选择会话
    selectSession(state, id) {
      state.currentSessionId = id;
    },
    // 搜索
    setFilterKey(state, value) {
      state.filterKey = value;
    },
  },
  actions: {
    initSession(state, session) {
      session.sessionId = uuidv4();
      session.messages = [];
      session.messages.push({
        content: "[系统信息]：会话开始",
        date: now,
      });
      session.messages.push({
        content: "[系统信息]：会话id：" + session.sessionId,
        date: now,
      });
      session.messages.push({
        content: "你好，我是明君情感机构的客服老师，请问你是遇到什么情感问题需要帮助和解决呢？",
        date: now,
      });
      axios
        .post(api_url + session.api_version + "/start_chat", {
          session_id: session.sessionId,
          text: ""
        });
    },
    resetSession(context) {
      const session = context.getters.selectedSession;
      axios
        .post(api_url + session.api_version + "/end_chat", {
          session_id: session.sessionId,
          text: ""
        });
      store.dispatch("initSession", session);
    },
    // 发送消息
    sendMessage(context, content) {
      const session = context.getters.selectedSession;
      session.messages.push({
        content: content,
        date: new Date(),
        self: true,
      });
      axios
        .post(api_url + session.api_version + "/chat", {
          session_id: session.sessionId,
          text: content,
        })
        .then(function (response) {
          const l = response.data.length;
          if (response.data !== "") {
            setTimeout(
              () =>
                session.messages.push({
                  content: response.data,
                  date: new Date(),
                  self: false,
                }),
              Math.max(50 * l, 1000)
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  getters: {
    filteredSessions: (state) => {
      return state.sessions.filter((s) => s.user.name.includes(state.filterKey));
    },
    selectedSession: (state) => {
      return state.sessions.find((s) => s.id === state.currentSessionId);
    },
  },
});

store.watch(
  (state) => state.sessions,
  (val) => {
    console.log("CHANGE: ", val);
    localStorage.setItem("vue-chat-session", JSON.stringify(val));
  },
  {
    deep: true,
  }
);

const app = createApp(App);
app.use(store);
app.mount("app");
