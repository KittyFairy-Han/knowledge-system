# BOM 对象

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

# 浏览器内核

- Trident：ie 内核
- Gecko：ff 内核
- webkit：Safari
- Blink：（Chrome，operal，
- Trident+webkit：QQ 浏览器

# 检测浏览器类型

navigator.userAgent

```js
/**
 *检查环境，启动下载
 *
 * @param {*} { 会传入一个cb，用于控制在beforeJump中控制跳转 }
 * @returns
 */
const checkToDownload = ({
  downloadUrl,
  iosCallback = () => {
    window.location.href = "/youtui/ab/getIosDownload";
  },
}) => {
  if (!isWeiXin() && !getUrlParameter("appPreview")) {
    // 当前页面在安卓的其他浏览器中并且不在趣晒app中 自动发起下载
    if (isAndroid()) {
      toDownloadUrl(downloadUrl);
    } else {
      iosCallback && iosCallback();
    }
  }
};

const toDownloadUrl = (url) => {
  if (url) {
    setTimeout(() => {
      window.location.href = url;
    }, 120);
  } else {
    console.error("重定向url为空");
  }
};

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

# 前端路由

## 基于 BOM API

### hash

window.location.hash
window.hashChnge

### history

window.history.pushState
window.history.popState

## 优缺点

- 首次页面展现慢
- 之后展现快
- 有利于前后端分离开发
