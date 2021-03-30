<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 20:34:37
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 23:59:02
 * @Description: file content
-->

# Vue3

<!-- ![alt text](./test.png "title text") -->

## 对比 Vue2 的优化点

- ts 重写
- 响应式原理不再是 Object.defineProperty 而是使用 ES6 的 Proxy
- Composition API 即组合式 API
- 性能提升
- 打包体积更小(主要得益于全局 api 可以 treeshaking 了)

## 为什么要重构

- 随着复杂度的上升，代码越来越难维护 -- Composition API。
- vue2 对于 typescript 的支持非常有限 -- ts 重写。

## Vue3 数据驱动原理

Proxy 实现 vue3 的 reactive 函数的简易版

```js
const data = {
  name: "zs",
  age: 20,
  info: {
    city: "beijing",
  },
};
const proxyData = reactive(data);
function reactive(target = {}) {
  if (typeof target !== "object" || target == null) {
    return target;
  }
  const proxyConfig = {
    // proxy 不是一次性递归 性能好
    get(target, key, receiver) {
      // 原型的属性不处理
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        // 不拦截
      }
      const result = Reflect.get(target, key, receiver);
      // 深度监听
      return reactive(result);
    },
    set(target, key, val, receiver) {
      // 不重复修改数据
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log("拦截 set 修改属性");
      } else {
        console.log("拦截 set 新增属性");
      }
      const oldValue = tarrget[key];
      if (oldValue === val) {
        return true;
      }
      const result = Reflect.get(target, key, val, receiver);
      // 拦截操作
      console.log("拦截 set", key, val);
      return result; // 是否成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      console.log("拦截 deleteProperty", key, val);
      return result; // 是否成功
    },
  };
}
```
