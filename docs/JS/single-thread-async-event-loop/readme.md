<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 11:17:43
 * @LastEditors: your name
 * @LastEditTime: 2020-11-22 10:49:13
 * @Description: file content
-->

# 单线程、异步、事件轮询

## 三者关系

单线程，产生阻塞问题 --->
解决阻塞，产生异步 --->
如何实现异步，核心是事件轮询

## js 解决异步的方案的发展历程

原生 js(
回调
) -> jq defferd -> promise -> promise + async await

- 除了原生 其他方案有一个共同点是支持链式操作
- 比如我们在异步操作之后除了执行 doSucTask1 还要执行别的任务 task2 task3  
  就可以 .then(doSucTask1).then(doSucTask2).then(doSucTask3)以此类推  
  而不用修改 doSucTask1 里面的逻辑
- 符合开放封闭原则

## “多线程”

```js
w = new Worker("demo_workers.js");
w.onmessage(fn);
w.terminate();
```
