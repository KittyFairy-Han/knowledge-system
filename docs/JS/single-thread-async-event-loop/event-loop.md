<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 17:33:52
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 12:35:31
 * @Description: file content
-->

# 事件轮询

[事件轮询【参考资料】]('https://www.cnblogs.com/dong-xu/p/7000163.html)

## 宏任务 微任务

- 宏任务：setTimeout、setInterval、immediate、I/O （后两个是node的）
- 微任务：Promise.then、MutationObserver、IntersectionObserver
> MutationObserver 是用来监视 DOM 变化的 API。当你创建一个 MutationObserver 并使用它来监视某个 DOM 节点时，每当这个节点或其子节点发生变化时，你指定的回调函数就会被调用。这个回调函数是一个微任务，它会在当前宏任务结束后，下一个宏任务开始前执行。  
IntersectionObserver 是用来监视元素与其祖先元素或视口（viewport）相交状态的 API。当你创建一个 IntersectionObserver 并使用它来监视某个元素时，每当这个元素的相交状态发生变化时，你指定的回调函数就会被调用。这个回调函数也是一个微任务，它会在当前宏任务结束后，下一个宏任务开始前执行。  
Promise 中有请求，成功的时候 resolve，那么它是一个宏任务。浏览器原生的 Promise.then 是微任务

## 轮巡过程

![事件轮询](./static/event-loop.png)

## 考点

```js
// 3、end、2、4
// 如果去掉 resolve（2） 这行则打印 3、end、4、1
let p = function() {
  return new Promise((resolve) => {
    const p1 = new Promise((resolve) => {
      setTimeout(()=>resolve(1), 0);
      resolve(2);
    });
    p1.then(console.log);
    console.log(3);
    resolve(4);
  });
};
p().then(console.log);
console.log("end");
```
