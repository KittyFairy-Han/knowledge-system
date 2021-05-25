<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 11:19:45
 * @LastEditors: your name
 * @LastEditTime: 2021-04-05 14:42:39
 * @Description: file content
-->

## session cookie webstorage indexDB

- indexDB [【参考资料】](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

|              | session             | cookie                             | webstorage                                          | indexDB        |
| ------------ | ------------------- | ---------------------------------- | --------------------------------------------------- | -------------- |
| 保存位置     | server              | broswer                            | broswer                                             | broswer        |
| 安全性       | 好                  | 差                                 | 差                                                  |                |
| 生命周期     | maxInactiveInternal | maxAge (默认为关闭浏览器之前)      | sessionStorage：关闭窗口、locastorage：手动清除之前 | 手动清除前     |
| 大小         | 尽量精简            | <4k                                | >=5m                                                | 无限           |
| 作用(为什么) | 减少下次请求步骤    | 减少下次请求步骤(请求时每次都携带) | 前端自己存数据、减少下次请求步骤(不参与请求)        | 同左           |
| 存储形式     |                     | 文本                               | 键值对                                              | 键值对、二进制         |
| 使用(怎么做) | 服务端代码          | document.cookie                    | 同步、不能搜索                                      | 异步、可以搜索 |

- window.localStorage./window.sessionStorage.

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
