<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 17:37:37
 * @LastEditors: your name
 * @LastEditTime: 2021-04-02 19:06:55
 * @Description: file content
-->

# ES6 新增

## es6 其他常用功能

- let const
- 块级作用域
- 字符串模版
- 扩展运算符
- 解构赋值
- 函数可以指定默认参数

## let const 与 var

> 查看作用域章节

## 解构赋值

- 对象解构
- 数组解构
- 混合解构
- 字符串解构

### 应用

- 互换值
- 复制数组
- 函数传参列表不定长度时

```js
//1
[a, b] = [b, a];
//2
const colors = [1, 2, 3];
const [...copyColors] = colors;
copyColors; //[1,2,3]
//3
function f(...args) {}
f(1);
f(1, 2);
f(1, 2, 3);
```

## Symbol

Symbol 从根本上防止属性名的冲突。这就是 ES6 引入 Symbol 的原因。

## Proxy 元编程、Reflect

### 对 Proxy 的理解

Proxy 在语言层面修改某些操作的默认行为，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

> 需要注意的是， 在 IE 下， 这个特性**永远**都**不会**被支持， 包括 Vue 3.0 也是单独开发一套 API 来适应 IE11， 故而在需要支持 IE 的环境下禁止使用 Proxy。

### Proxy 13 种拦截

| 拦截                                      | 拦截的内容                                      | 举例   |
| ----------------------------------------- | ----------------------------------------------- | ------ |
| get(target, propKey, receiver)            | 对象属性的读取                                  |        |
| set(target, propKey, value, receiver)     | 对象属性的设置                                  |        |
| has(target, propKey)                      | in 操作符                                       |        |
| construct(target, args)                   | new 操作                                        |        |
| apply(target, object, args)               | 拦截 Proxy 实例作为函数调用的操作               | 说明 3 |
| deleteProperty(target, propKey)           | delete 操作符                                   |        |
| ownKeys(target)                           | 说明 1                                          |        |
| getPrototypeOf(target)                    | Object.getPrototypeOf(proxy)                    |        |
| setPrototypeOf(target, proto)             | Object.setPrototypeOf(proxy, proto)             |        |
| getOwnPropertyDescriptor(target, propKey) | Object.getOwnPropertyDescriptor(proxy, propKey) |        |
| defineProperty(target, propKey, propDesc) | 说明 2                                          |        |
| preventExtensions(target)                 | Object.preventExtensions(proxy)                 |        |
| isExtensible(target)                      | Object.isExtensible(proxy)                      |        |

- 说明 1： Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- 说明 2： Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
- 说明 3：proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

### Proxy 基本使用

```js
const arr = [];
const arrPro = new Proxy(arr, {
  get: (target, prop) => {
    if (prop === "number") {
      return target.length;
    }
    return target[prop];
  },
});
// 有自定义的操作
console.log(arr.number, arrPro.number); //undefined 0
// 无操作转发代理
arr.push(1);
console.log(arr[0], arrPro[0]); // 1 1
arrPro.push(2);
console.log(arr[1], arrPro[1]); // 2 2
```

### Reflect 的理解

- Reflect 能力与 Proxy 拦截一一对应
- Reflect 是能够更加优雅的使用 Object 的相关方法

### Reflect 基本使用

上面的例子改一改

```js
const arr = [];
const arrPro = new Proxy(arr, {
  get: (target, prop, receiver) => {
    if (prop === "number") {
      return Reflect.get(target, "length", receiver);
    }
    return Reflect.get(target, prop, receiver);
  },
});
// 有自定义的操作
console.log(arr.number, arrPro.number); //undefined 0
// 无操作转发代理
arr.push(1);
console.log(arr[0], arrPro[0]); // 1 1
arrPro.push(2);
console.log(arr[1], arrPro[1]); // 2 2
```

这么看用 Reflect 好像有点多此一举？<br/>
下面这个例子不用 Reflect 就会出错了

```js
const arr = [];
const arrPro = new Proxy(arr, {
  get: (target, prop, receiver) => {
    if (prop === "number") {
      return target.length;
    }
    return target[prop];
  },
});
const arrProChild = Object.create(arrPro);
arrProChild.push(1, 2, 3);
console.log(arrProChild.number); //0    ???正确应该是 3 啊
```

用 Reflect

```js
const arr = [];
const arrPro = new Proxy(arr, {
  get: (target, prop, receiver) => {
    if (prop === "number") {
      return Reflect.get(target, "length", receiver);
    }
    return Reflect.get(target, prop, receiver);
  },
});
const arrProChild = Object.create(arrPro);
arrProChild.push(1, 2, 3);
console.log(arrProChild.number); //3
```

## fetch

### fetch VS XMLHttpRequest

fetch()是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。
浏览器原生提供这个对象。---阮一峰博文

|          | fetch                                                  | XMLHttpRequest             | 基于 xhr 封装的库 axios                          |
| -------- | ------------------------------------------------------ | -------------------------- | ------------------------------------------------ |
| 基于     | 原生 js 采用了 Promise                                 | 原生 js 采用了 callback    | 基于 xhr 结合了 Promise                          |
| API 设计 | 符合模块化设计(说明 1)                                 | API 设计并不是很好(说明 2) | 符合模块化设计                                   |
| 传输数据 | 通过数据流（Stream 对象）处理数据(说明 3)              | 不支持数据流(说明 4)       | 不支持数据流                                     |
| 报错     | 只有网络错误，或者无法连接时，才报错(rejected)(说明 5) | 非 200 都会进 error 回调   | 非 200 都会 reject                               |
| 跨域     | 设置 no-cors 属性就能跨域                              | 不能跨域                   | 不能跨域，但是通常项目中有 node 后端代理可以跨域 |

- 说明 1 API 分散在多个对象上（Response 对象、Request 对象、Headers 对象）
- 说明 2 输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
- 说明 3 可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。
- 说明 4 所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
- 说明 5 只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。<br>
  这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected 状态）。<br>
  只有通过 Response.status 属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。或者 response.ok 是否为 true 判断请求是否成功

### Response.headers 属性

是一个 Map 对象，可以使用 Map 数据结构可以采用的 API

### Response 读取内容的方法

```js
response.text(); //得到文本字符串。
response.json(); //得到 JSON 对象。
response.blob(); //得到二进制 Blob 对象。
response.formData(); //得到 FormData 表单对象。
response.arrayBuffer(); //得到二进制 ArrayBuffer 对象。
```

- response.formData()主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。
- response.blob()用于获取二进制文件。 比如拿到图片的二进制数据然后渲染到网页上。
- response.arrayBuffer()主要用于获取流媒体文件。比如音频、视频
  > 数据流只能读取一次，一旦读取，数据流就空了。再次读取就不会得到结果。解决方法是在读取之前，先使用.clone()方法，
