<!--
 * @Author: 鱼小柔
 * @Date: 2021-11-21 15:42:21
 * @LastEditors: your name
 * @LastEditTime: 2021-11-21 21:49:21
 * @Description: vue3 好在哪里
-->

# vue3 好

## 使用体验方面

相比较 React Vue2.x 使用上有一些缺点。  
② 对 ts 弱支持  
① 逻辑散  
③ 组件化不彻底\无法监控到数组下标的变化
④ 数据驱动：检测不到对象属性的添加和删除\
在 Vue3 中，这些缺点都改掉了，甚至比 React 做的更好

### 支持 ts

### 逻辑聚合

假设一个列表筛选的业务场景：
Vue 2.x 中逻辑分布可能是这样的：数据和逻辑被分散在了各个 option 中  
得益于 composition api ，Vue3.x 中逻辑分布聚合了
![vue3.x逻辑分布散](./static/composition.jpg)

### 组件化更清晰

得益于 hook。 通过对比 Vue Hooks 与 React Hooks 可以发现，Vue 3.0 将 Mutable 特性完美与 Hooks 结合，规避了一些 React Hooks 的硬伤。所以我们可以说 Vue 借鉴了 React Hooks 的思想，但创造出来的确实一个更精美的艺术品。

并且对比 ReactHook 有如下优势
对 Hooks 使用顺序无要求，而且可以放在条件语句里。

不需要使用 usecallback useEffect useMemo 等进行性能优化，所有性能优化都是自动的。

## 运行性能方面（速度)

（例子：https://www.yuque.com/hugsun/vue3/perf）（（https://www.yuque.com/hugsun/vue3/bta09m））

### 初始化

#### proxy 代替 Object.defineProperty

Object.defineProperty 只能劫持对象的属性, 所以在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要在**Vue 实例初始化的时候递归遍历**这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的。
![vue2 数据劫持](./static/proxy_vue2.png)

Proxy 是对象层的劫持，在 Vue.js 3.x 中，初始化一个响应式数据时不会直接进行深层递归调用，**递归调用是发生在 getter 的时候**，也就是说只有属性被使用了才会进一步的深层调用。这其实是一种延时定义子对象响应式的实现，在性能上会有一定的提升。
![vue3 数据劫持](./static/proxy_vue3.png)

### 更新（依赖跟踪速度提升约 40%（更高效的 ref 实现（读取速度提升约 260%，写入速度提升约 50%）

#### 响应式
https://juejin.cn/post/7034880625047765000、https://segmentfault.com/a/1190000040163047

#### vdom diff 静态标记

（https://juejin.cn/post/6844904134647234568、https://www.cnblogs.com/smart-elwin/p/15269299.html）
（https://github.com/vuejs/rfcs/issues/89）

diff 算法增加
HOISTED = -1, // 特殊标志是负整数表示永远不会用作 diff
举例

```vue
<span>你好</span>
<div>{{ message }}</div>
```

没有静态标记之前

```js
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
```

做了静态提升之后

```js
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
```

静态内容\_hoisted_1 被放置在 render 函数外，每次渲染的时候只要取 \_hoisted_1 即可
同时 \_hoisted_1 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用于 Diff

template 预字符串化 vdom 节点数量减少，结构会简单
举例

```vue
<div class="menu-bar-container">
    <div class="logo">
      <h1>介绍</h1>
    </div>
    <ul class="nav">
      <p><a href="">1</a></p>
      <p><a href="">2</a></p>
      ....
      <p><a href="">19</a></p>
      <p><a href="">20</a></p>
    </ul>
  </div>
<div class="user">
    <span>{{user.name}}</span>
  </div>
```

除了 span 元素是动态元素之外，其余都是静态节点。 vue3 模板编译的时候会去识别动/静比例，当遇到大量连续的静态内容时，会直接将他编译为一个普通的字符串节点。  
diff 算法由双端对比升级成最长递增子序列。属于 vue2.x 的双端对比和 react 的递增法的结合。

## 内存（内存使用量减少约 17%

vue 的 hook 得益于 setup 只运行一次
不会再每次渲染重复调用，减少 GC 压力。
