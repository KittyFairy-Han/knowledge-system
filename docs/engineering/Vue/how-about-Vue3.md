<!--
 * @Author: 鱼小柔
 * @Date: 2021-11-21 15:42:21
 * @LastEditors: your name
 * @LastEditTime: 2021-12-05 23:34:43
 * @Description: Vue3 好在哪里
-->

# Vue3 好

这次主要是想和大家介绍 Vue3 的优点。因为大家对 Vue2 都有基础了，所以会以 Vue2 为基础来说它的用法改变和性能提升。遇到与 React 思想相同，或者用法相似的地方，也会与 React 做比较。  
内容上，只会说设计思路，尽量配图，通俗易懂的让大家了解到它优秀的地方。不会上升到源码讲解，因为每个点细节的去讲都值得一整篇文章了。

## 使用体验方面

相比较 React Vue2.x 使用上有一些缺点。  
1️⃣ 对 ts 弱支持  
2️⃣ 功能点数据和逻辑分散  
3️⃣ 组件化不彻底：纯逻辑复用不优雅  
4️⃣ 响应式不完善：检测不到对象属性的添加和删除、无法监控到数组下标的变化
在 Vue3 中，这些缺点都改掉了，甚至比 React 做的更好。

### 支持 ts

Vue3.x ts 重写，对 ts 支持友好。🎉🎉🎉

### 逻辑聚合

Vue3 中使用 composition API 使逻辑更加聚合。  
看一个官方的例子 🌰
![Vue3.x逻辑分布散](./static/composition.jpg)
每个颜色代表一个功能点，在 Vue2.x 中以 Option API 的形式分布，每个功能点的数据在 data 中定义，有些可能存在与 computed 中，然后功能点的逻辑可能分散 methods，watch 等 option 中。  
在 Vue3.x 中以 composition API 的形式分布，每个功能点就聚合到一起了。来看一下 vue3 中 data、computed、methods、watch、生命周期函数的用法：

```js
function setup() {
  /* 类似 data */
  const greetings = ref("unknow");
  /* computed */
  const greetingLen = computed(() => {
    return greetings.value.length;
  });
  /* methods */
  const updateGreeting = () => {
    greetings.value += "Hello ";
  };
  /* watch */
  watch(greetings, () => {
    document.title = `updating ${greetings.value}`;
  });
  return {
    greetings,
    greetingLen,
    updateGreeting,
  };
}
```

### 逻辑复用完善

Vue3.x 中也采用了 hook 的思想，使用 hook 更利于逻辑复用。  
在 Vue2.x 中，纯逻辑复用会采用 mixin 的方式，mixin 与组件之间存在隐式依赖，可能产生命名冲突等，降低了应用的可预测性。Hooks 不是注入代码片段，类似一个独立的实例，不会和引入它的组件代码发生耦合或者覆盖，也不能更改组件传递给它的属性。Hooks 之间还可以相互调用。
![Vue3.x组件化更清晰](./static/hooks.png)
通过对比 Vue Hooks 与 React Hooks 可以发现，Vue 3.x 规避了一些 React Hooks 的使用上的限制和麻烦之处。  
1️⃣ React Hooks 必须在顶层调用，不能在条件语句使用。Vue Hooks 的使用没有这些限制，只把它当成一个普通的函数用就 ok。  
React 的状态管理因为底层是链表，每一个 hook 的 next 是指向下一个 hook 的，if 会导致顺序不正确，从而报错，所以 react 是不允许这样使用 hook 的。  
2️⃣ React Hooks 有时需要手动使用 useCallback，useMemo 去优化，避免每次渲染都执行过多或过重的 Hook 导致性能不佳。Vue 是不需要开发人员去考虑这些手动优化的。  
Vue 的数据驱动是基于响应式的，setup 中的 调用的 hook 只会在初始化时执行一次，不会在每次渲染时都重复执行，避开了需要手动优化的麻烦。

Vue Hooks 的例子 🌰，实现一个 Hooks，检查是否在目标元素以外进行点击。这是一个很有用的 Hooks，比如应用于点击下拉框的外侧任意位置关闭下拉框。  
Hook 内部代码

```js
import { ref, onMounted, onUnmounted, Ref } from "vue";
// elementRef 目标元素
export default (elementRef: Ref<null | HTMLElement>) => {
  // 定义一个状态表示是否在元素外点击
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  // Hook 被注册时开启监听
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  // Hook 被注销时移除监听
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  // 把状态传递给父级组件
  return isClickOutside;
};
```

组件中应用 Hook

```js
import useClickOutside from "../hooks/useClickOutside";
// ....
function setup() {
  // ....
  const dropdownRef = (ref < HTMLElement) | (null > null);
  const isClickOutside = useClickOutside(dropdownRef);
  watch(isClickOutside, () => {
    if (isClickOutside.value && isOpen.value) {
      // 打开状态下，点击非目标元素和它的孩子节点则关闭目标元素
      isOpen.value = false;
    }
  });
  return {
    // ...
    isOpen,
    isClickOutside,
    dropdownRef,
  };
}
```

### 响应式改写

proxy 代替 Object.defineProperty 劫持对象整体，得益于 proxy 原生能力，可以劫持对象增删属性、数组下标变化。🎉🎉🎉

## 性能-初始化速度

### 响应式：proxy 代替 Object.defineProperty

[实验数据](https://www.yuque.com/hugsun/Vue3/perf)

Object.defineProperty 只能劫持对象的属性, 所以在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要在**Vue 实例初始化的时候递归遍历**这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的。
![Vue2 数据劫持](./static/proxy_Vue2.png)

Proxy 是对象层的劫持，在 Vue.js 3.x 中，初始化一个响应式数据时不会直接进行深层递归调用，**递归调用是发生在 getter 的时候**，也就是说只有属性被使用了才会进一步的深层调用。这其实是一种延时定义子对象响应式的实现，在性能上会有一定的提升。
![Vue3 数据劫持](./static/proxy_Vue3.png)

## 性能-更新速度

Vue 和 React 本质上都是 js 框架，数据驱动流程是对运行速度影响最大的一个因素。两者都用到了 VDOM，相同的思想是 data-VDOM-view 。这整个流程，除了最后更新视图，其他的本质上都是 js 执行。js 执行期间会一直占据着 CPU，如果时间过长，一则会导致用户触发的事件得不到响应, 二则会导致掉帧即阻塞浏览器渲染，用户可以感知到这些卡顿。  
解决这种由于 js 执行时间过长导致卡顿的问题 Vue 和 React 走了不同的路。  
1️⃣ React 的思路：CPU 总运算量不变，但是做到快速响应用户，让用户觉得够快。  
于是 React 走了类似 CPU 调度的逻辑，把 VDOM tree，设计成链表的结构，（链表的节点数据结构是 Fiber），利用浏览器的空闲时间来做数据驱动视图更新的流程，有动画或者用户交互的任务，就把主进程控制权还给浏览器。这就像 CPU 调度进程一样，我们要让高优先级的进程或者短进程优先运行，不能让长进程长期霸占资源。

> 核心是应用了这个 API ：requestIdleCallback。

2️⃣ Vue3 的思路：优化每个任务，让它有多快就多快，达到挤压 CPU 总运算量的目的（废除了时间切片的思路）。具体优化点下面小节介绍。

> 为什么移除时间切片呢？因为每个任务极致优化后，cpu 总运算量降低，已经不需要时间切片了。[尤大亲自解释](https://github.com/Vuejs/rfcs/issues/89)
> 根据尤大公布的数据就是 Vue3 update 性能提升了 1.3~2 倍

#### 为什么会走不同的路呢？

我的理解：React 和 Vue 数据驱动的原理不同，尽管它们的思想轮廓是相似的（data-VDOM-view）。
当数据改变时， React 会递归比对整个新旧 VirtualDOM 树，找出需要变动的节点，然后一气呵成的更新。所以对于 React 来说，能优化的点就是从 diff 算法入手，但是由于整棵树去 diff 然后统一渲染，diff 时间还是会很长。

![React VDOM](./static/VDOM_React.png)

> React 组件树级别的优化(即防止不必要的子组件重新呈现)需要显式使用 usemo。但是用好 usemo 不是一件容易的事。

对于 Vue 来说，① 在组件级别采用的是响应式的机制，可以让 Vue 精确地定位，而不是整棵树做 diff。响应式有一定的优化空间 ② 组件内部使用的是 VDOM diff，边对比变更新，不是一气呵成。（和选择不同的路有啥关系）③ 使用模板相比 JSX，易于静态分析(AOT)，也让它有更多优化的空间。

### 响应式

从 Vue2.x 到 Vue3.0,响应式从 Object.defineProperty 变成 Proxy，对初始化性能有一定提升。上面已经说过了。从 3.0 到 3.2 ，响应式性能进一步显著提升。

> 与 3.0 版本相比有一组数据：依赖跟踪速度提升约 40%、ref 读取速度提升约 260%，写入速度提升约 50%。

上文提到过 effect 是嵌套调用的，所以我们用 effectTrackDepth 来记录目前这个 effect 在第几层，每当有 effect 执行 effectTrackDepth++，每当 effect 执行完毕 effectTrackDepth--。
再通过 trackOpBit 作为它位标记，可以理解为唯一 ID，具体为 trackOpBit = 1 << effectTrackDepth。
对于 dep 我们也需要改造一下，原来的 dep 就只是一个 set，我们在此基础上加上两个属性，用来标记该属性上次和本次在哪些 effect 中使用过，再通过对比进行删除和新增。
由于一个 ReactiveData 的属性可能会用到多个 effect 中，所以我们通过按位或给 dep 打标记，又因为每个 effect 的位标记各不相同，在通过按位与判断得出的值是否大于零，这样就可以分辨出这个值到底都在哪些 effect 中用过了。

### template 预字符串化

通过 template 预字符串化 VDOM 节点数量减少，DOM tree 结构变得简单，遍历时间缩短。  
Vue3 模板编译的时候会去识别动/静比例，当遇到大量连续的静态内容时，会直接将他编译为一个普通的字符串节点。
![template与字符串化](./static/template_stringfy.png)
🌰

```Vue
<div class="menu-bar-container">
    <div class="logo">
      <h1>介绍</h1>
    </div>
    <ul class="nav">
      <p><a href="">1</a></p>
      <p><a href="">2</a></p>
      ...
      <p><a href="">19</a></p>
      <p><a href="">20</a></p>
    </ul>
  </div>
<div class="user">
    <span>{{user.name}}</span>
</div>
```

除了 span 元素是动态元素之外，其余都是静态节点。在编译阶段，会把连续的静态元素部分合并为字符串。

### VDOM 静态标记与静态提升

创建 VDOM 的时候会根据 VDOM 的内容是否可以变化，为其添加静态标记 PatchFlag，如果 patchFlag = -1 表示当前节点是静态的，永远不会用作 diff。应用静态标记，大大的减少了 diff 工作量。  
静态提升是指对与静态的节点，会缓存在 render 函数之外，创建 VDOM 的时候直接引用，不需要重新创建。
用下面的代码举例

```Vue
<template>
  <span>你好</span>
  <div>{{ message }}</div>
</template>
```

![Vue2 diff](./static/diff_VDOM_Vue2.png)

<!-- ```js
export function render(...args) {
  return (
    _openBlock(),
    _createBlock(
      ...args,
      [
        _createVNode("span", null, "你好"),
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
``` -->

![Vue3 diff](./static/VDOM_Vue3.png)
![Vue3 diff](./static/diff_VDOM_Vue3.png)

span 元素 这行代码是静态的，在没有静态标记的时候，每次 diff 它也会参与,渲染之前总是会被重新创建。 加入静态标记后，它就不用参加 diff 流程了。
做了静态提升之后，假设\_hosted_1 这个变量代表 span 元素的 VDOM,每次渲染的时候只要取 \_hoisted_1 即可。

<!-- ```js
const _hoisted_1 = /*#__PURE__*/ _createVNode(
  "span",
  null,
  "你好",
  -1 /* HOISTED */
);

export function render(...args) {
  return (
    _openBlock(),
    _createBlock(
      ...args,
      [
        _hoisted_1,
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
``` -->

> 疑问: 静态标记静态提升，React 为啥不做呢?

### diff 算法内部优化

算法复杂，很难抽象出流程图。简单列一下区别和性能对比：
React 的 DOM tree 是链表结构，从单边开始比较,原地复用、下标递增法移动复用。
Vue2 双端比较，比较时总共有五种情况（四种相等＋一种不相等），分别做不同的处理。相比 React，双端比较更能节约次数。
Vue3 先双端比较，原地复用。然后最长递增子序列移动复用。(最长递增子序列使用的是“贪心 + 二分查找”的算法)。比 Vue2 更快。

## 体积

### Vue tree shaking

源码支持 tree shaking，打包体积变小。

##

不需要使用 usecallback useEffect useMemo 等进行性能优化，所有性能优化都是自动的。
