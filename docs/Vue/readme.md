<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 20:33:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 20:35:07
 * @Description: file content
-->


# vue 其他考点

## data 为何是函数

- vue 文件最后是一个 class
- 如果 data 仍然是一个纯粹的对象，则所有的实例将共享 data
- 组件复用下,data 是函数，不会造成数据同时指向一处的问题。

## ajax 请求应该放在哪个生命周期？ **mounted**

- 首先，js 是单线程，ajax 异步获取数据
- 生命周期钩子 callback 中异步操作会放入事件队列，而不会在这个钩子函数中执行。所以 created 和 mounted 中请求数据这个动作在时间上的差别十分微小。
- 生命周期钩子函数中的异步赋值，vue 会在一遍流程走完之后执行 update。不会立即更新数据，所以不会导致虚拟 DOM 重新加载，也不影响页面中静态的部分加载。
- 另外，给数据赋值然后更新 DOM 也是异步的，侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更，去掉重复赋值然后更新。
- 结论，放在 mounted 之前没有性能优化，保证逻辑的统一性，放在 mounted。

## beforeDwstory 里面干嘛

- 解绑自定义事件
- 清除定时器
- 解绑自定义的 DOM 事件 如 widow.scroll 等

## 全局对象 vs vuex

- 数据不是相应式的 view 无法自动更新，其他组件也无法自动同步更新。
- 修改无法跟踪 watch。vuex 只能调用特定的方法来实现数据修改，可预测，可追踪。
- 不符合组件化开发的 取数据要到最顶层的 window 上面，项目大了，混乱

## vue 常见性能优化

### vue 层级的优化

- 合理使用 v-show v-if
- v-for 加 key 避免与 v-if 一起使用
- 合理使用 computed 因为有缓存
- data 层级不要太深。watch 深度监听 ， 层级太深可能导致页面卡一下
- 该销毁的及时销毁
- 合理使用 异步组件
- 合理使用 keep-alive

### webpack 层级的优化

- 《webpack》 章节

### 前端通用的性能优化，图片懒加载、减少请求次数等

- 《优化》章节

## 上传操作

### 传统表单

- 传统写法

```html
<form enctype="multipart/form-data" action="/api/upload" method="post">
  <!-- 传统表单上传 -->
  <input type="file" />
  <button type="submit"></button>
</form>
```

- 转换为 js 写法

```html
<input type="file" @change="handleFileChange"/>
```

```js
const handleFileChange = async (e) => {
  const target = e.target;
  const files = target.files;
  if (files) {
    const uploadFile = files[0];
    const formData = new FormData();
    formData.append(uploadFile.name, uploadFile);
    const result = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
```

## 面试题
### 为啥要改写
1️⃣ 对 ts 弱支持  
2️⃣ 功能点的数据和逻辑分散：Vue2.x 是选项配置式（Options API）的写法  
3️⃣ 组件化不彻底：纯逻辑复用不优雅，mixin 痛点较多  
4️⃣ 响应式不完善：检测不到对象属性的添加和删除、无法监控到数组下标的变化  
在 Vue3 中，这些缺点都改掉了，甚至比 React 做的更好

### 为什么 Vue3 可以监听数组下标变化、属性变化
Vue3 用了 Proxy 有这个能力，Vue2 用的是 defineProperty 没有这个能力。  
- Object.defineProperty 只能作用于单个属性，它无法“预知”对象将来可能会有哪些新的属性，因此它无法监测到属性的添加或删除。同样，由于 JavaScript 的数组其实是一种特殊的对象，数组的索引其实是对象的属性，Object.defineProperty 也无法监测到数组索引的改变。
- 因为 Proxy 不是直接作用于对象的某个属性，而是作用于整个对象。因此，无论对象的哪个属性被访问或修改，或者有新的属性被添加或删除，Proxy 都可以拦截到。
