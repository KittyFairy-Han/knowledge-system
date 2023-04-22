<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 20:26:03
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 20:26:15
 * @Description: 原理
-->
# 原理

## 对比传统

### 传统组件与 vue、react 的组件化

- 传统组件，静态渲染，更新要依赖于 DOM
- vue、react 组件，数据驱动视图
### vue vs react
#### vue 本身是 MVVM 框架，由 MVC 发展而来

- vue 使用 模板 是从 angular 引入，模版语法双引号中是 JS 变量有点不习惯，还有各种指令学习成本比较高。
- MVVM 数据视图分离更明显，数据双向绑定。
- 组件化是由 MVVM 扩展的

#### React 本质是前端组件化框架，由后端组件化发展而来

- React 使用 JSX, JSX 逐渐趋向标准化，学习成本低（只要记住大括号中式 JS 表达式就行，不用学习指令）
- 视图分离不够清晰，视图代码写在 render 函数中，和 JS 逻辑有融合
- 组件化更彻底和清晰
### Vue 和 Jq 比的特点，特点好在哪里？

- 数据视图分离，解耦、符合开放封闭原则
- 数据驱动视图，dom 操作内部封装了，只处理数据变化，更好实现业务逻辑
- Jq 在 js 代码里面操作 dom，视图混淆到 js 逻辑中，操作 dom 本身就是主动改变视图非数据驱动

## MVVM

- Model(M)-ViewModel(VM)-View(V)

```vue

<!--> View <-->
<template></template>
<script>
export defalut{
    data(){
       return{
           //<!--> Model <-->
       }
    }
}
</script>
//
<!--> ViewModel <-->
// vue 内部封装,是个抽象的概念，是一种能力.
```

## Vue 响应式

### 什么是响应式

组件 data 数据一旦变化，立即触发视图更新

### 如何实现响应式

- vue2 核心 API ：Object.defineProperty
  [vue2 应式实现的核心代码](vue的响应式（数据驱动）.html)
- 缺点：
- 1. 需要改造数组原型来实现数组变化的监听，
- 2. 深度监听，需要一次递归到底，一次性计算量大，如果一个对象深度很大，页面可能就卡死了。
- 3. 无法监听新增/删除属性 需要用 Vue.set/Vue.deleteProperty

```js
// 假设vue data中存在一个对象是这样的
person = { name: "zs", year: "19" };
// 假设某个函数中执行了
delete person.year;
// vue监听不到 无法触发视图更新 要做特殊处理
Vue.deleteProperty("name");
```

- vue3 核心方案： proxy
  [vue3 响应式实现的核心代码](vue考点.md)
- proxy 兼容性不是很好，所以短期不会取代 Object.defineProperty，短期 vue2 也不会过时。

## vdom 与 diff

- [vdom](../_8DOM/vdom/)

## 模版编译

### 模版是什么

- 模版的本质是字符串，是有逻辑，可嵌入 JS 变量的字符串，并期望转换成 html 。
- 前端代码只有 JS 是有逻辑的、可以渲染 html 的语言，所以模版必须先转换成 JS 代码段，进而生成 html，
- 转换为 JS 运行后得到 vnode(虚拟节点)，

### 编译流程是怎样的

1. 模版编译为 render 函数，执行 render 函数，**返回 vnode**
2. 基于 vnode 在执行 patch 和 diff
3. 使用 webpack vue-loader，会在**开发**环境下**编译模板**（运行前）。如果是引入 vue 文件，在 html 中写 template，是浏览器去编译的（运行时），和以上不同，效率不如上述高

### render 函数是什么

[模版编译举例](./vue模版解析.html)

- 有些复杂的情况下，不能用 template，可以考虑自己写 render
- react 一直用 render，没有 template

## 异步渲染

- 回顾 nextTick
- 汇总 data 的修改，一次性更新视图
- 减少 DOM 的操作次数，提高性能

## 渲染总体流程

- 渲染与模板编译
- 渲染与响应式
- 渲染与 vdom
- 渲染是**异步**的

### 1 把模版 templete 解析成 render 函数

- with 的用法
- 模版中的所有信息都被 render 函数包含

1. data 变成 js 变量
2. 指令变成 逻辑
3. 返回 vnode

### 2 响应式开始监听

- object.defineProperty

1. 拦截 get , data、method 里面的属性和方法 代理到 vm 上
2. 拦截 set , set 里面会调用 updateComponent

### 3 首次渲染，显示页面，绑定依赖

1. 初次渲染 执行 updateComponent, 执行 vm.\_render
2. 以 todolist 为例，访问到 vm.list 和 vm.title
3. 监听 data 属性的 getter setter，被 get 拦截 绑定依赖

- data 中有很多属性，有些被用到，有些没有使用
- 用到的走 get 没用的没走 get
- 不走 get 的属性 set 时候不需要关心 避免不必要的渲染

```vue
// vue 模版中
<p>{{name}}</p>
// vue data 代码中 { name:'yxr', year:22 } // 执行 render 函数时候，name 走了 get，year 没走
```

4. 走到 patch 第一段逻辑 patch(elem,vnode)
5. 渲染到 html 中
6. patch 将 vnode 渲染成 dom 初次渲染完成

### 4 data 属性变化

1. set 中执行 updateComponent,执行 updateComponent,执行 vm.\_render
2. 走到 patch 第二段逻辑 patch(oldVnode,newVnode)
3. 渲染到 html 中

## 前端路由

### hash 模式

- hash 变化会触发页面跳转，前进、后退
- 不会刷新页面
- 不会提交到 server 端
- 基于 window.location 的 onHashChange 事件、hash 属性来实现

### history 模式

- url 规范的路由
- 跳转时不刷新页面
- - https//github.com/xxx 刷新页面
- - https//github.com/xxx/yyy 前端跳转不刷新页面
- - https//github.com/xxx/yyy/zzz 前端跳转刷新页面
- 需要 server 端支持
- 核心：window.history.onpopstate 事件，window.history.pushState 方法

### 对比

- 除非考虑提高 SEO 效率，能用简单的就用简单的，hash
