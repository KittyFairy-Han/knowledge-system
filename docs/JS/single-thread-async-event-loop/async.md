# 异步

## 异步方案的发展历程

**callback -> jq defferd -> promise -> promise + async await**

回调有一个“回调地狱的问题”<br>

<hr>
jq defferd 、 promise 有一个共同点是支持链式操作<br>
链式操作解决了回调地狱的问题,可以使逻辑分离,可以追加逻辑而不用每次修改callback里面的逻辑<br>
符合开放封闭原则<br>
<hr>
async await 在 promise 上封装了语法糖，让异步代码更像同步代码，更语义化。

## 异步方案逐一介绍

假设有一个异步的任务和对异步任务成功和失败的后续处理

```js
function asyncTask() {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      // 请求成功
    } else {
      // 请求失败
    }
  }, 500);
}
function success() {
  console.log("async task succeed");
}
function fail() {
  console.log("async task failed");
}
```

### step1 回调函数

- 改写异步任务如下

```js
function asyncTask(success, fail) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      // 请求成功
      success();
    } else {
      // 请求失败
      fail();
    }
  }, 500);
}
```

### step2 jQuery 的 defferd

- 第一种用法

```js
function asyncTask() {
  const dtd = $.Deferred();
  setTimeout(() => {
    if (Math.random() > 0.5) {
      // 请求成功
      dtd.resolve();
    } else {
      // 请求失败
      dtd.reject();
    }
  }, 500);
  return dtd;
}
asyncTask()
  .then(success)
  .cath(fail);
```

- 第二种用法

```js
function asyncTask() {
  const dtd = $.Deferred();
  setTimeout(() => {
    if (Math.random() > 0.5) {
      // 请求成功
      dtd.resolve();
    } else {
      // 请求失败
      dtd.reject();
    }
  }, 500);
  return dtd.promise();
}
$.when(asyncTask)
  .then(success)
  .catch(failFn);
```

### step3 Promise

```js
function asyncTask() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
        // 请求成功
      } else {
        reject();
        // 请求失败
      }
    }, 2000);
  });
  return promise;
}
asyncTask()
  .then(success)
  .catch(fail);
```

### step4 async-await

```js
// 对异步函数的改造和 Promise 一样
try {
  await asyncTask();
  success();
} catch {
  fail();
}
```

## Promise 扩展

### 状态

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。
- 类似下面的用法其实是把异步操作 asyncTask、task2、task3 串联起来了

```js
asyncTask()
  .then(task2)
  .then(task3)
  .then(success);
```

```js
await asycnTask();
await task2();
await task3();
success();
```

### Promise.all 可以让异步操作并行, 减少请求的时间

- 等待所有请求都成功了就会调用 .then 方法。或者等待某一个失败了就进 .catch

```js
Promise.all([asyncTask(), task2(), task3()]).then(success);
```

- 所有请求都成功了，就会执行下一行

```js
await Promise.all([asyncTask(), task2(), task3()]);
success();
```

### Promise.race 请求也是并行

- 所有请求中只要有一个完成了（成功或者失败）就会调用 .then

### Promise.resolve、Promise.reject 但是 resolve、reject 不是实例方法

```js
function fetchWithtimeOut(timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("timeout");
    }, timeout);
    fetch(url, data)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}
```
