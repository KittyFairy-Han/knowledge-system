<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 20:23:59
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 20:24:01
 * @Description: 使用
-->
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
