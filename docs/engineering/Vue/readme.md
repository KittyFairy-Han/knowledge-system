# 使用

## v-html

xss 攻击可能，会覆盖子元素

## computed

有缓存机制，data 变了才触发重新计算

### set

- input v-model  是父组件的一个值

```vue
<template>
  <div class="search-row">
    <el-input v-model="keyword" clearable> </el-input>
  </div>
</template>

<script>
export default {
  props: {
    keywordFromParent: {
      type: String,
      default: "",
    },
  },

  model: {
    prop: "keywordFromParent",
    event: "emitKeywordChange",
  },

  computed: {
    keyword: {
      get() {
        return this.keywordFromParent;
      },
      set() {
        this.$emit("emitKeywordChange");
      },
    },
  },
};
</script>

<style></style>
```

## vue watch

- 默认浅度监听
- 引用类型实现深度监听需要 deep：true

## class style

- 使用动态属性
- css 属性驼峰写法

## v-if v-show

### 区别

- v-if 是否插入节点，如果是组件则表现为是否创建（走组件的生命周期流程）组件
- v-show 是基于 display 属性

### 场景

- v-show 频繁的在显示与隐藏之间切换
- v-if 与 v-else 连用，非频繁切换

## vue 组件使用

### 通信

- props 、\$emit
- event 全局实例 自定义事件

```js
// event.js
import Vue from 'vue'
export default new Vue()
// 组件1.vue
created(){ // 在某个时机 不一定是 created
    event.$emit('customEvent',data)
}
// 组件2.vue
methods:{
    fn(data){
        // 处理 data
    },
},
created(){
    event.$on('customEvent',this.fn) //绑定自定义事件
},
beforeDestory(){
    event.$off('customEvent',this.fn) //及时销毁 否则造成内存泄漏
},
```

### 组件生命周期

- 最常用的 created mounted beforeDestory
- created vm 实例初始化 是从父到子
- mounted dom 挂载和渲染 是从子到父
- beforeUpdate 父-子
- updated 子-父
- beforeDestory 父-子
- destoryed 子-父

## v-for

- 遍历数组，也可以遍历对象
- v-for 与 v-if 不能一起使用
- 要有 key

## event

- 多个参数时，要手动传入 event 对象
- 接收的是一个原生的 event 对象
- 事件被挂载到当前元素
- 能用修饰符的时候用修饰符，提高开发效率

```vue
<template>
  <main>
    <div @click="handleClick1"></div>
    <div @click="handleClick2(2, $event)"></div>
    <div @click="handleClick3(3)"></div>
  </main>
</template>
<script>
export default {
  methods: {
    handleClick(e) {
      console.log(e); //MouseEvent对象
    },
    handleClick2(num, e) {
      console.log(e); //MouseEvent对象
    },
    handleClick3(num, e) {
      console.log(e); //undefined
    },
  },
};
</script>
```

## v-model

- 修饰符
- .lazy(节流)
- .number 识别为数字类型

## Vue 高级特性

### 自定义 v-model

使用情景：父组件传入子组件的 prop，子组件是无法修改的。但是用 v-model 传入子组件的 prp，子组件内部是可以修改的。

```vue
<!-->parent<-->
<template>
  <c1 :nameFromParent="name"></c1>
  <child v-model="name"></child>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
};
</script>
<!-->child<-->
<template>
  <!-->value的值对应model.prop的值、emit的值对应model.event的值<-->
  <input type="text" :value="name" @input="$emit('nameChange')" />
</template>
<script>
export default {
  model: {
    prop: "name", //与prop中的name对应
    event: "nameChange",
  },
  props: {
    name: {
      // 与父组件v-model的属性对应
      type: String,
      default: "",
    },
  },
};
</script>
<!-->c1<-->
<template>
  <p>{{ name }}</p>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
```

### \$nextTick

- vue 是异步渲染
- data 改变之后，DOM 不会立刻渲染
- \$nextTick 会在 DOM 渲染之后被触发，以获取最新的 DOM 节点状态等
- 页面渲染会将 data 的修改做整合，多次 data 修改只会渲染一次

### slot

- slot
- scope slot

### 动态、异步组件

- 渲染组件的情况多变时，使用动态组件
- vs v-if：当组件比较少时，可以用 v-if 取代动态组件。当组件类型比较多，且不知道本次有哪些类型，每个类型多少个时，用动态组件比较方便。

```vue
<template>
  <component :is="curCmpName"></component>
  <section class="cmp-wrapper" v-for="name in cmpNames">
    <component :is="name"></component>
  </section>
</template>
<script>
// 假设已经全局注册了text,image,video,image,audio，cmp1，cmp2组件
export default {
  data() {
    return {
      curCmpName: "cmp1",
      cmpNames: ["text", "image", "video", "image", "audio"],
    };
  },
};
</script>
```

- 组件很大的时候，用懒加载的方式，异步组件，异步路由，优化性能

```vue
<script>
import cmp1 form './cmp1' //同步引入
export default{
    components:{
        cmp1:()=>import('./cmp1') //异步引入
    }
}
</script>
```

### keep-alive

- 缓存组件，
- 频繁切换，不重复渲染
- vue 常见性能优化之一
- 与 v-show 区别，keepalive 是 vue 层级的控制，v-show 是原生 css 层级的控制

### mixin

- 多个组件有相同的逻辑，抽离出来
- 有哪些问题
  - 变量来源不明确，降低可读性
  - 命名冲突，直接覆盖
  - mixin 可能出现多对多，程序复杂度提高

## vuex

- mutation 原子，同步操作，改变 state 必须通过 mutation
- action 整合 mutation，完成异步操作必须用 action

## vue-router

### 模式

- hash
- history 后者需要 server 支持，无需特殊需求选择前者

## 动态路由

- 组件可以使用懒加载

```js
// router/index.js
new VueRouter({
  routes: [{ path: "/user/:id", component: User }],
});
// User.vue
// 获取 id
this.$router.params.id;
```

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

# vue3

- ts 重写
- 性能提升
- Composition API
- 响应式原理不再是 defineProperty 而是使用 proxy
- 打包体积更小 因为全局 api 可以 treeshaking 了

## 为什么要重构 Composition API 存在的意义？

- 随着复杂度的上升，代码越来越难维护。
- vue2 对于 typescript 的支持非常有限。

## Proxy

### 基本使用

### 响应式

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

### reflect

- 和 proxy 能力一一对应
- 规范化、标准化、函数式
- 逐渐替代 Object 上的工具函数
