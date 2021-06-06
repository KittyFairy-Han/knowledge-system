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

