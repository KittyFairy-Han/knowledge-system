<!--
 * @Author: 鱼小柔
 * @Date: 2021-06-06 10:59:01
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 11:00:27
 * @Description: file content
-->
# Proxy 和 Reflect
## Proxy 

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
## Reflect
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
在某些情况下，Reflect 的方法可以提供更准确、更可靠的结果。 Reflect.get 可以接受一个额外的参数作为 this 的值。这在你需要在不同的上下文中获取属性值时非常有用。  

```js
const arr = [];
const arrPro = new Proxy(arr, {
  get: (target, prop, receiver) => {
    // 当你尝试获取 arrProChild.number 时，receiver 就是 arrProChild 对象。
    // receiver 的主要用途是在处理继承时保持正确的 this 绑定
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
