<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 17:35:10
 * @LastEditors: your name
 * @LastEditTime: 2020-11-22 10:30:48
 * @Description: file content
-->
# WebWork

## 限制

- 同源限制
- Dom 限制：不能操作 Dom
- 脚本限制：不能使用 alert confirm 等弹窗脚本
- 文件限制：不能读取本机文件系统

## 用法

- main.js

```js
let w = new Worker("child.js");
w.postMessage("Hello World");
w.terminate();
w.onmessage = (evt) => {
  console.log(evt.data); //'i am child i received'
};
```

- child.js

```js
self.onmessage=(evt)=>{
    console.log(evt.data)//'Hello world'
    self.postMessege('i am child i received')
}
```
