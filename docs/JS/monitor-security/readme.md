<!--
 * @Author: 鱼小柔
 * @Date: 2021-05-30 19:05:38
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 18:40:41
 * @Description: file content
-->
# 错误监控

## 是什么(两种大类)

代码运行错误
资源加载错误

## 怎么捕获错误?(错误捕获方式)

### 代码运行错误

- try catch

```js
try {
  // 可能有错误的代码
} catch (e) {
  // 捕获到 try 代码块的错误得到一个错误对象 e，进行处理分析
  console.log(e);
} finally {
  console.log("finally");
}
```

- window.onerror

```js
/**
 * @description 运行时错误处理器
 * @param {string} message 错误信息
 * @param {string} source 发生错误的脚本URL
 * @param {number} lineno 发生错误的行号
 * @param {number} colno 发生错误的列号
 * @param {object} error Error对象
 */
window.onerror = function (message,source,lineno,colno,error) {...}
window.addEventListener("error",function (message,source,lineno,colno,error) {...})
window.addEventListener("error",function (message,source,lineno,colno,error) {...},false)
```

### 资源加载方式错误

- object.onerror (object 泛指 img 或 script 等)
  <br>资源加载失败会触发一个 Event 接口的 error 事件，并执行 onerror()处理函数。
  <br>资源加载失败的 error 事件不会向上冒泡到 window，

```js
//注意和 window.onerror 的参数不同
imgdom.onerror = function(event){...}
```

- performance.getEntries()
  <br>
  获取加载成功的资源 函数返回的是数组
- window.addEventListener 事件捕获阶段
  <br>资源加载失败的 error 事件虽然不会冒泡到 window 但是能被 window.addEventListener 捕获阶段监听到。

```js
// 第三个参数一定是 true 才是再捕获阶段的监听
window.addEventListener(
  "error",
  function(e) {
    // e 可能是运行时错误也可能是资源加载方式错误 要进一步判断再做处理
  },
  true
);
```

### 跨域的 js 运行错误怎么捕获

？？

### promise 异步的错误

- try catch 代码块不能捕获 但是 promise 提供了 catch 方法可以捕获

Promise.then 方法接受两个参数，第一个参数是处理 Promise 成功状态（fulfilled）的回调函数，第二个参数是处理 Promise 失败状态（rejected）的回调函数。而 Promise.catch 方法接受一个参数，这个参数是处理 Promise 失败状态的回调函数。

## 上报错误or埋点

- Ajax 通信方式上报
- 统一基础设施去做 hubble 埋点、伏羲

```js
new Image().src = "http://baidu.com/testjk?r=tksjk";
```
