/* eslint-disable no-unused-vars */
class socketClient {
  wsUrl = "";
  websocket = null;
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
  }
  // 初始化socket
  initWebSocket() {
    this.websocket = new WebSocket(this.wsUrl);
    console.log("========= create websocket ===========");
    this.wsOpen().then(res => {
      console.log("========= onopen websocket ===========", res);
      this.wsSend(`{
        appId: "wangyanfeng",
        appSecret: "1aa176cb18ec1b182472a178f5bdb704"
      }`);
      console.log("========= 授权完成 ===========");
    });
  }
  // 打开连接
  wsOpen() {
    if (this.websocket) {
      return new Promise((resolve, reject) => {
        try {
          this.websocket.onopen = evt => {
            resolve(evt);
          };
        } catch (err) {
          reject(err);
        }
      });
    }
  }
  // 关闭连接
  wsClose() {
    if (this.websocket) {
      this.websocket.close();
      return new Promise((resolve, reject) => {
        try {
          this.websocket.onclose = evt => {
            console.log("========= 客户端断开连接 ===========", evt);
            resolve(evt);
          };
        } catch (err) {
          reject(err);
        }
      });
    }
  }
  // 监听消息
  wsMessage(apiPath, callback) {
    // 需要监听的消息路径
    if (this.websocket) {
      try {
        console.log("---ok");
        // 初始化事件
        let evts = [];
        apiPath.forEach(item => {
          evts.push(
            new CustomEvent(item, { detail: { data: "" }, bubbles: false })
          );
        });
        this.websocket.onmessage = evt => {
          // 判断是否有 data 数据
          if (evt.data) {
            let data = evt.data;
            if (this.isJsonString(data)) {
              let obj = JSON.parse(data);
              if (obj.requestId) {
                let events = evts.find(item => item.type === obj.requestId);
                if (events) {
                  events.detail.data = obj;
                  document.dispatchEvent(events);
                }
              }
            }
          }
        };
      } catch (err) {
        callback(err);
      }
    }
  }
  // 发送消息
  wsSend(data) {
    if (this.websocket) {
      return new Promise((resolve, reject) => {
        try {
          this.websocket.send(data);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }
  // 连接因错误而关闭时触发
  wsOnerror() {
    if (this.websocket) {
      return new Promise((resolve, reject) => {
        try {
          this.websocket.onerror = evt => {
            resolve(evt);
          };
        } catch (err) {
          reject(err);
        }
      });
    }
  }
  // 判断是否是json字符串
  isJsonString(str) {
    try {
      if (typeof JSON.parse(str) == "object") {
        return true;
      }
    } catch (e) {
      console.log("isJsonString:错误捕获");
    }
    return false;
  }
}

export { socketClient };
