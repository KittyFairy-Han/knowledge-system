<br />
<b>Notice</b>:  Undefined index: md in <b>/opt/www/file/get.php</b> on line <b>14</b><br />
<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 20:23:59
 * @LastEditors: hanqing5
 * @LastEditTime: 2021-04-01 17:20:19
 * @Description: 使用
-->

# 使用

## 选项

### computed

-   什么时候使用 set

v-model 的一个值来自父组件或者是 store

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
            default: '',
        },
    },

    model: {
        prop: 'keywordFromParent',
        event: 'emitKeywordChange',
    },

    computed: {
        keyword: {
            get() {
                return this.keywordFromParent
            },
            set() {
                this.$emit('emitKeywordChange')
            },
        },
    },
}
</script>

<style></style>
```

```js
export default {
    computed: {
        actTab: {
            get() {
                return 'store 里面的 state'
            },
            set(payload) {
                this['store 里面的 mutation'](paload)
            },
        },
    },
}
```

这种情况不用 computed set 的另一种写法,不如 computed set 更简洁

```js
export default {
    computed:{
        actTab(){
            return 'store 里面的 state'
        }

    }
    watch:{
        actTab(paload){
            this.['store 里面的 mutation'](paload)
        }
    }

}

```

-   有缓存机制

```js
export default{

  data(){
    return a:0
  }
  mounted(){
    setInterval(()=>{this.a=Math.random()},1000)
  }
  computed:{
    copyA(){
      return this.a
      // 如果其他地方没有用到 copyA 那么 a 改变了 copyA 也不会相应的变化
    }
  }
  watch:{
    a(nv,ov){
      // 不管视图是否渲染这个值 都能监听到变化

    }
  }
}

```

```js
data(){
  return a:[1,2,3]
}
mounted(){
  setInterval(()=>{this.a=[1,2,3]},1000)
}
computed:{
  copyA(){
    return this.a
    // 视图中渲染了 a 每次重新赋值，但是 copyA 不响应，因为每次赋值是一样的
  }

}
watch:{
  a(nv,ov){
    // watch 的时候比较的是引用，虽然每次实际的结果一样，但是其实引用不一样，所以 watch 响应
  }
}

```

### watch

-   新增属性 监听不到

```js
state = {}
state = { a: 1 }
state.a = 2
// 以上过程可以监听到
// 但是如果没有第二步 直接 第一第三步 就监听不到了
```

-   watch 的时间

非 immediate 的 watch 监听从 mounted 之后开始，immediate 的 watch 监听从 created 之前开始
（watch 的触发是有异步的 for 循环给数组 push 不是 push 一次触发一次 而是当前所在的函数运行完了 才触发）

##### 场景 a：父组件的 testValue 通过 prop 传给子组件, watch 不为 immediate

```js
export default {
    data() {
        return {
            testValue: 0,
        }
    },
    created() {
        this.testValue = 1
    },
    mounted() {
        console.log('parent mounted', this.testValue)
    },
    watch: {
        testValue(v) {
            console.log('parent watch', v)
        },
    },
}
export default {
    props: {
        testValue: 0,
    },
    created() {
        console.log('child created', this.testValue)
    },
    mounted() {
        console.log('child mounted', this.testValue)
    },
    watch: {
        testValue(v) {
            console.log('child watch', v)
        },
    },
}
```

1. parent created 给 testValue 赋值
2. child created testValue 初始化完成
3. 打印：child mounted 1
4. child 开启监听
5. 打印：parent mounted 1
6. 打印：parent 开启监听
7. 打印：parent watch 1

##### 场景 b：父组件的 testValue 通过 prop 传给子组件, watch 为 immediate

```js
// 父
export default {
    data() {
        return {
            testValue: 0,
        }
    },
    created() {
        this.testValue = 1
    },
    mounted() {
        console.log('parent mounted', this.testValue)
    },
    watch: {
        testValue: {
            immediate: true,
            handler() {
                console.log('parent watch', v)
            },
        },
    },
}
// 子
export default {
    props: {
        testValue: 0,
    },
    created() {
        console.log('child created', this.testValue)
    },
    mounted() {
        console.log('child mounted', this.testValue)
    },
    watch: {
        testValue: {
            immediate: true,
            handler() {
                console.log('child watch', v)
            },
        },
    },
}
```

1. parent 开启监听
1. parent create 初始化 testValue
1. 打印：parent watch 0
1. parent created 给 testValue 赋值
1. child 开启监听
1. child create 拿到 testValue 的值
1. 打印：child watch 1
1. child created 1
1. 打印：child mounted 1
1. 打印：parent mounted 1
1. 打印：parent watch 1

### computed 和 watch

computed 和 watch 触发时间以及顺序

```js
export default {
    data() {
        return {
            colorArr: [],
        }
    },
    computed: {
        bgColor() {
            const [r, g, b] = this.colorArr
            console.log('computed of colorArr')
            return `rgba(${r},${g},${b},0.5)`
        },
    },
    watch: {
        colorArr(newValue, oldValue) {
            console.log('watch colorArr', newValue)
        },
    },
}
```

-   情况一

```html
<template>
<main>
<span>{{bgColor}}<span>
<main>
</template>
```

```js
export default {
    created() {
        setInterval(() => {
            this.colorArr = [1, 2, 3].map(() => parseInt(Math.random() * 255))
            console.log('next line')
        }, 5000)
    },
    // 打印顺序 ： next line、watch colorArr、computed of colorArr
}
```

-   情况二

```js
export default {
    created() {
        setInterval(() => {
            this.colorArr = [1, 2, 3].map(() => parseInt(Math.random() * 255))
            console.log(this.bgColor)
            console.log('next line')
        }, 5000)
    },
    // 打印顺序 ： computed of colorArr、next line、watch colorArr、
}
```

## 命令

### v-html

xss 攻击可能，会覆盖子元素

### v-if v-show

#### 区别

-   v-if 是否插入节点，如果是组件则表现为是否创建（走组件的生命周期流程）组件
-   v-show 是基于 display 属性

#### 场景

-   v-show 频繁的在显示与隐藏之间切换
-   v-if 与 v-else 连用，非频繁切换

### v-if dom 和 vm 之间如何选择

-   可视物联 layout-config
-   left 统计 right 统计
-   适合在组件上加 v-if
-   当不关注这个模块的适合 这个组件不生成 里面数据监听啥的也都不存在了 节约了很多性能
-   如果是在组件里面 用 v-if 那虽然渲染上还是节约的 但是 vue 的数据监听还是都在的

### v-for

-   遍历数组，也可以遍历对象
-   v-for 与 v-if 不能一起使用
-   要有 key

### v-model

-   修饰符
-   .lazy(节流)
-   .number 识别为数字类型

### 自定义 v-model

父组件传入子组件的 prop，子组件是无法修改的。用 v-model 传入子组件的 prop，子组件内部是可以修改的。

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
            name: '',
        }
    },
}
</script>
<!-->child<-->
<template>
    <!-->value的值对应model.prop的值、emit的值对应model.event的值<-->
    <input type="text" :value="name" @input="$emit('nameChange')" />
</template>
<script>
export default {
    model: {
        prop: 'name', //与prop中的name对应
        event: 'nameChange',
    },
    props: {
        name: {
            // 与父组件v-model的属性对应
            type: String,
            default: '',
        },
    },
}
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
            default: '',
        },
    },
}
</script>
```

## 绑定 event

-   多个参数时，要手动传入 event 对象
-   接收的是一个原生的 event 对象
-   事件被挂载到当前元素
-   能用修饰符的时候用修饰符，提高开发效率

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
            console.log(e) //MouseEvent对象
        },
        handleClick2(num, e) {
            console.log(e) //MouseEvent对象
        },
        handleClick3(num, e) {
            console.log(e) //undefined
        },
    },
}
</script>
```

## 组件通信

-   props 、\$emit
-   event 全局实例 自定义事件

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

## 生命周期

-   最常用的 created mounted beforeDestory
-   created vm 实例初始化 父-子
-   mounted dom 挂载和渲染 子-父
-   beforeUpdate 父-子
-   updated 子-父
-   beforeDestory 父-子
-   destoryed 子-父

### 如果 vue 组件继承的情况 生命周期是啥样的

-   parent mounted
-   child1 mounted
-   parent mounted
-   child2 mounted

### 父子组件 mounted 里面如果有异步 怎么控制 mounted 里面逻辑执行顺序

-   同步代码的情况是 child mounted -> parent mounted
-   异步代码无法控制 肯定谁快谁先执行

```js
// 父组件
export default {
    async mounted() {
        await this.asyncTask()
        console.log('parent async')
    },
    methods: {
        asyncTask() {
            return new Promise((res) => {
                setTimeout(() => {
                    res(true)
                }, 2000)
            })
        },
    },
}
```

```js
// 子组件
export default {
    async mounted() {
        await this.asyncTask()
        console.log('childern async')
    },
    methods: {
        asyncTask() {
            return new Promise((res) => {
                setTimeout(() => {
                    res(true)
                }, 3000)
            })
        },
    },
}
```

-   结果是 parent async、childern async

## 其他特性

### \$nextTick

-   vue 是异步渲染
-   data 改变之后，DOM 不会立刻渲染
-   \$nextTick 会在 DOM 渲染之后被触发，以获取最新的 DOM 节点状态等
-   页面渲染会将 data 的修改做整合，多次 data 修改只会渲染一次

### slot

-   slot
-   scope slot

### 动态、异步组件

-   渲染组件的情况多变时，使用动态组件
-   vs v-if：当组件比较少时，可以用 v-if 取代动态组件。当组件类型比较多，且不知道本次有哪些类型，每个类型多少个时，用动态组件比较方便。

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
            curCmpName: 'cmp1',
            cmpNames: ['text', 'image', 'video', 'image', 'audio'],
        }
    },
}
</script>
```

-   组件很大的时候，用懒加载的方式，异步组件，异步路由，优化性能

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

-   缓存组件，
-   频繁切换，不重复渲染
-   vue 常见性能优化之一
-   与 v-show 区别，keepalive 是 vue 层级的控制，v-show 是原生 css 层级的控制

### mixin

-   多个组件有相同的逻辑，抽离出来
-   有哪些问题
    -   变量来源不明确，降低可读性
    -   命名冲突，直接覆盖
    -   mixin 可能出现多对多，程序复杂度提高

## vuex

-   mutation 原子，同步操作，改变 state 必须通过 mutation
-   action 整合 mutation，完成异步操作必须用 action

## vue-router

### 模式

-   hash
-   history 后者需要 server 支持，无需特殊需求选择前者

### 动态路由

```js
// router/index.js
new VueRouter({
    routes: [{ path: '/user/:id', component: User }],
})
// User