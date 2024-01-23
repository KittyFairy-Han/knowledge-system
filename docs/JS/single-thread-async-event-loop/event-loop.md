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

- 宏任务：setTimeout、setInterval、requestAnimationFrame
- 微任务：nextTick、then

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
