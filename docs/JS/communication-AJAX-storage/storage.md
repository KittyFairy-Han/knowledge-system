<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 11:19:45
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 17:11:10
 * @Description: file content
-->

# 前端存储

## session、 cookie、 webstorage、 indexDB 对比

|              | session             | cookie                             | webstorage                                          | indexDB        |Cache Storage |
| ------------ | ------------------- | ---------------------------------- | --------------------------------------------------- | -------------- | ------------ |
| 保存位置     | server              | broswer                            | broswer                                             | broswer        |      broswer  |
| 安全性       | 好                  | 差                                 | 差                                                  |                |      差|
| 生命周期     | maxInactiveInternal | maxAge (默认为关闭浏览器之前)      | sessionStorage：关闭窗口、locastorage：手动清除之前 | 手动清除前     |      手动清除前|
| 大小         | 尽量精简            | <4k                                | >=5m                                                | 无限           |      比webStorage大|
| 作用(为什么) | 减少下次请求步骤    | 减少下次请求步骤(请求时每次都携带) | 前端自己存数据、减少下次请求步骤(不参与请求)        | 同左           |      减少网络请求、支持离线访问|
| 存储形式     |                     | 文本                               | 键值对                                              | 键值对、二进制 |      键值对|
| 使用(怎么做) | 服务端代码          | document.cookie                    | 同步、不能搜索                                      | 异步、可以搜索 |      见使用示例|

## 应用场景
- cookie 登录态
- localStorage 长期保存客户端数据，减少网络请求，提高网页性能。
- SessionStorage 保存页面会话期间的临时数据
- Cache Storage 缓存网络资源，提高应用的加载性能或离线访问能力
- IndexedDB 存储大量结构化数据，进行复杂查询操作，如客户端搜索、离线应用等。

## indexDB 
[【参考资料】](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
## webstorage

window.localStorage./window.sessionStorage.方法
```js
getItem();
setItem();
removeItem();
key();
clear();
```

## Cache Storage
```js
// 检查浏览器是否支持 Service Worker 和 Cache API
if ('serviceWorker' in navigator && 'caches' in window) {
  caches.open('my-cache').then((cache) => {
    fetch('https://example.com').then((response) => {
      // 将响应添加到缓存中
      cache.put('https://example.com', response);
    });
  });
}
caches.open('my-cache').then((cache) => {
  cache.match('https://example.com').then((response) => {
    if (response) {
      // 从缓存中获取到了响应
      console.log(response);
    } else {
      // 缓存中没有找到响应
      console.log('No response found in cache.');
    }
  });
});
```