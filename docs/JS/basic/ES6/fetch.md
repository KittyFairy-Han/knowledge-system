<!--
 * @Author: 鱼小柔
 * @Date: 2021-06-06 11:01:42
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 11:04:50
 * @Description: file content
-->
# fetch

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
