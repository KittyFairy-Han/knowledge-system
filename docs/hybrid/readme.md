## 考点

### hybrid 中的 webview 与 app 如何通信？

- app 调用 web：webview 定义全局方法 app 可以直接调用
- web 调用 app：app 暴露一个对象到全局 window 下，web 通过这个对象去调用 app

### webview 打包到 app 的问题？

- 更新麻烦
- 包更大
