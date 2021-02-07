import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { socketClient } from "@/utils/socket";
// 创建对象
const socket = new socketClient("ws://8.136.106.14:8087/conn?u=wangyanfeng");
// 初始化 对象
socket.initWebSocket();
// 挂载全局socket对象
Vue.prototype.$socket = socket;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
