<template>
  <div>
    <h1>socket</h1>
    <!-- <button type="button" @click="wsCreateBtn">连接</button> -->
    <button type="button" @click="wsCloseBtn">断开</button>
    <br />
    <br />

    <p v-for="(item, index) in msg" :key="index">{{ item }}</p>

    <textarea
      row="5"
      v-model="test"
      style="width:300px; height:200px"
    ></textarea>
    <button type="button" @click="wsSendBtn">发送</button>

    <p>{{ msg01 }}</p>
    <h1>-------------------------</h1>
    <p>{{ msg02 }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 1,
      test: "",
      msg: [],
      msg01: "",
      msg02: ""
    };
  },
  created() {
    // 接口 路径
    let apiPath = ["AOSDHASGHDKLGSGFKLASGDFKJAGSDFGAKJS", "abcd"];
    this.$socket.wsMessage(apiPath, err => {
      console.log("--err", err);
    });
  },
  mounted() {
    // 接口返回值，与接口路径相同
    document.addEventListener("AOSDHASGHDKLGSGFKLASGDFKJAGSDFGAKJS", e => {
      console.log("获取事件数据msg01:", e);
      this.msg01 = e.detail.data;
    });

    document.addEventListener("abcd", e => {
      console.log("获取事件数据msg02:", e);
      this.msg02 = e.detail.data;
    });
  },
  methods: {
    wsCreateBtn() {
      console.log(this.$socket);

      if (this.$socket.websocket.readyState !== 1) {
        this.$socket.wsOpen().then(res => {
          console.log("重新打开", res);
        });
      }
    },
    wsCloseBtn() {
      this.$socket.wsClose();
    },
    wsSendBtn() {
      this.$socket.wsSend(`{
        "name": "张三",
        "age": 29,
        "requestId":"abcd"
      }`);
      this.$socket.wsSend(this.test);
    }
  }
};
</script>

<style lang="scss" scoped></style>
