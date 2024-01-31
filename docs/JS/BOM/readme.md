# BOM 对象

## 结构

```js
var window = {
  对话框: {
    methods: [alert(), confirm(), prompt(), print()],
  },
  location: {
    props: [protocal, hostnmae, port, pathname, search, hash],
    methods: [reload(), reload(true), replace(), assigon()],
    event: [hashChange],
  },
  history: {
    props: [length, state],
    methods: [go(), forword(), back(), pushState(), replaceState(), popState()],
    evnet: [],
  },
  screen,
  navigator,
};
```

## 前端路由

基于 BOM API 实现前端路由

### hash

window.location.hash、
window.hashChnge

### history

window.history.pushState、
window.history.popState

### 前端路由比传统路由优缺点

- 首次页面展现慢
- 之后展现快
- 有利于前后端分离开发


## 其他考点
### 常用 API 干嘛用
- location 跳转
- navigator 判断环境
- screen 屏幕旋转，3d项目用
- setTimeout、setInterval
- history 一般都是React Router封装过的
- performance 性能监控，3d项目监测加载速度和内存
### 检测浏览器类型

navigator.userAgent 属性

```js
/**
 * 是否为android机
 * @returns {boolean}
 */
const isAndroid = () => {
  let ua = window.navigator.userAgent;
  return ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1 || ua.indexOf("Adr") > -1;
};

/**
 * 是否为微信环境
 * @returns {boolean}
 */

const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};
```
### 全局对象
Node.js：在 Node.js 中，全局对象是 global。你可以在任何地方使用 global 来访问全局作用域。

Web Workers：在 Web Workers 中，全局对象是 self。Web Workers 是运行在后台的 JavaScript 线程，它们没有访问 DOM 的权限，所以没有 window 对象。

### React和Vue的Router作用、原理
React Router 和 Vue Router 都是用于在单页面应用（SPA）中实现路由功能的库。它们的主要作用是根据浏览器的 URL 来决定渲染哪个组件，从而实现页面的切换而无需重新加载整个页面。    
路由有hash和history模式，基于浏览器的api（上面说过了）  
- 基于 history 的需要服务端支持，美观
- 基于 hash 的不需要服务端支持，兼容性更好，但不美观




## location 属性的应用

```js
/**
 * 获取url中特定字符串的值
 * @param {*} name 字符串key
 * @param {*} path 默认为页面链接地址，也可自己传某段string
 */
const getUrlParameter = (name, path = window.location.href) => {
  const result =
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(path) || [undefined, ""])[1].replace(/\+/g, "%20")
    ) || null;
  return result ? result : "";
};
```

