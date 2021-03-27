<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 11:19:45
 * @LastEditors: your name
 * @LastEditTime: 2020-11-22 11:36:56
 * @Description: file content
-->
## session cookie webstorage

- cookie 服务器在本地机器上存储的小段文本并随每一个请求发送至服务器，减少下次访问的一些步骤
- session 比 cookie 安全，目的和 cookie 差不多
- webstorage localStorage
  不参与服务器通信，供浏览器自己存储数据的和多个窗口之间通信使用，手动清除销毁
- webstorage sessionStorage
  目的与 locastorage 一样，关闭窗口销毁

  |                  | session             | cookie                      | webstorage             |
  | ---------------- | ------------------- | --------------------------- | ---------------------- |
  | 保存位置和安全性 | server 好           | broswer 差                  | broswer 差             |
  | 生命周期         | maxInactiveInternal | maxAge 默认为关闭浏览器之前 | 关闭窗口、手动清除之前 |
  | 大小             | 尽量精简            | <4k                         | >=5m                   |
  | 作用(为什么)     | 减少下次请求步骤    | 减少下次请求步骤            | 前端自己存数据         |
  | 使用(怎么做)     | 服务端代码          | document.cookie             | 如下                   |
- indexDB [【参考资料】]("http://www.ruanyifeng.com/blog/2018/07/indexeddb.html")
- window.

```js
getItem();
setItem();
removeItem();
key();
clear();
```

```js
const setStorage = (key, value) => {
  // 支持localStorage
  if (window.localStorage) {
    if (value == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }
  // 支持sessionStorage
  else if (window.sessionStorage) {
    if (value == null) {
      sessionStorage.removeItem(key);
    } else {
      value && sessionStorage.setItem(key, value);
    }
  }
  // 支持cookie
  // 默认一天失效
  else if (document.cookie) {
    $.cookie(key, value, {
      expires: 1,
      path: "/",
    });
  }
  // 都不支持
  else {
  }
};

/**
 * 公用缓存get方法
 * @param {*} key
 */
const getStorage = (key) => {
  // 支持localStorage
  if (window.localStorage) {
    return window.localStorage.getItem(key);
  }
  // 支持sessionStorage
  else if (window.sessionStorage) {
    return sessionStorage.getItem(key);
  }
  // 支持cookie
  else if (document.cookie) {
    return $.cookie(key);
  }
  // 都不支持
  else {
    return null;
  }
};
```
