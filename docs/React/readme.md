# React

## hook

### 为什么

- 函数式组件状态管理
- 逻辑复用

### 常用的 hook 以及区别

- useMemo 是用来返回一个 memoized 值，也就是说，它会记住你的函数的返回结果，只有当依赖项改变时，才会重新计算这个值。这对于避免在每次渲染时都进行高开销的计算非常有用。

- useCallback 则是返回一个 memoized 回调函数。它的工作方式和 useMemo 类似，但它返回的是函数。只有当依赖项改变时，才会返回新的函数。
- useEffect：这个 Hook 会在浏览器完成布局和绘制后，在一个延迟事件中被调用。因此，即使 effect 导致了额外的渲染，用户也不会感觉到。

- useLayoutEffect：这个 Hook 会在浏览器完成布局和绘制，但在新的绘制被显示在屏幕之前被调用。如果你的 effect 进行了 DOM 变更，而你希望在用户看到新的渲染之前就完成这个变更，那么应该使用 useLayoutEffect。只有在需要同步修改 DOM，并且需要在用户看到新的渲染之前就完成这个修改的情况下，才应该使用。获取 dom 用**Ref**

- useState：不必多言

- useReducer：接受一个 reducer 函数和初始状态作为参数，返回一个包含两个元素的数组（当前状态和一个 dispatch 函数）。当需要自己写 Reducer 的时候，用 useReducer 比 useState 更合适

- useImperativeHandle：这个 Hook 可以让你在父组件中通过 ref 访问到子组件中你想暴露出来的任何值。
``` js
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});

function ParentComponent() {
  const inputRef = useRef();

  const handleClick = () => {
    // 当按钮被点击时，触发 FancyInput 组件的 focus 方法
    inputRef.current.focus();
  };

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

export default ParentComponent;
```

## Fiber

### 为什么

在旧的 React 架构中，一旦开始渲染就不能被打断，如果组件树很大，渲染过程可能会占用很长时间，导致浏览器无法及时响应用户的交互，从而影响用户体验。

### 是什么？

- 从使用者角度，Fiber 是 Vdom
- 从原理层面，是最小工作单元

### 怎么做？

1. Reconciliation 阶段：在这个阶段，React 会构建 Fiber 树
2. Commit 阶段：在这个阶段，React 会根据 Reconciliation 阶段计算出的结果来更一次性更新 DOM

## JSX VDom

### 是什么

React 使用 JSX 来定义 UI，使用虚拟 DOM 来跟踪状态变化，使用 Diff 算法来高效地更新 UI。这三个概念是 React 高效、声明式和组件化的基础。

- JSX 可以理解为模板语言
- VDom 的本质是：用 JS 数据结构模拟真实的 DOM 结构

### 为什么（优势）

真实 DOM 操作时昂贵的，用 VDom 提高性能，两个 VDom 树比较必然需要算法，提高比较效率

为啥提高性能？

- 虚拟 DOM 在内存中进行操作，比直接操作真实 DOM 快得多
- 通过 Diff 算法，更新小部分差异，不用全部更新
- 批量更新差异，不一个一个操作，类似离线操作 Dom

其他优势？

- 简化编程模型：开发者只需要关注状态（state）的管理，React 会处理从 JSX 到 VDom 到 真实 Dom。
- 跨平台：因为是 JS 对象，这使得 React 可以用于构建各种平台的应用，如 web、React Native（iOS 和 Android）等

## diff 算法

### 是什么

Diff 算法是 React 用来比较两个虚拟 DOM 树的差异的算法。

### 为什么

肯定要差异更新呀，不然每次全量更新太耗性能了

### 怎么做

时间复杂度 o(N)，比较的原则做了调整：

- 只比较同一层级
- tag 不同，直接删掉重建，不在深度比较
- tag 同，
  - - key 也相同的节点，会被认为是相同的节点，原地复用
  - - key 不同的节点，会被认为是不同的节点，移动复用。下标递增法移动复用。

#### 原

树 diff 的时间复杂度是 O(N^3)，遍历过程：

- 遍历 tree1、tree2
- 排序
  1000 个节点，计算需要计算 1 亿次，算法不可用<br/>

## React 的合成事件

### 是什么

绑定到文档根节点非真实 dom，通过事件委托处理，暴露的 e 具备原生的 API 和 React 特有的 API。

> （确实添加了一些 React 特有的属性和方法，但这些主要是为了内部使用，例如实现事件委托和事件池。对于开发者来说，合成事件的接口与原生事件的接口几乎完全相同。）

### 为什么

- 兼容性：由于浏览器对于原生事件的实现存在差异，直接使用原生事件可能会导致在不同浏览器中表现不一致。React 对事件封装了，解决了这些问题。
- 事件委托，提高性能。减少监听器数量->减少内存占用和 DOM 操作
- 事件池，提高性能。合成事件复用->减少对象的创建和销毁->减少 GC 次数

## React 18 并发模式

并发模式（Concurrent Mode）是在 Fiber 架构基础上的一次重大升级。  
Fiber 架构是 React 16 中引入的，它改变了 React 的调和（Reconciliation）算法，使得 React 可以将渲染工作分解成多个小任务，从而避免长时间的计算阻塞浏览器。  
并发模式则进一步利用了 Fiber 架构的优势，使得 React 可以在处理一个更新的同时，开始处理另一个更新。这使得 React 可以在处理大的更新的同时，还能响应用户的交互，从而保持用户界面的流畅。  
虽然并发模式可以提高应用的响应性，但它也可能带来一些新的问题，如状态的不一致性。因此，使用并发模式需要更加小心地管理状态和副作用。  
React 16.8 的 Fiber 架构确实已经具备了在渲染过程中被打断和恢复的能力，这是 Fiber 架构的一个重要特性。然而，这个特性在 React 16.8 中并没有被完全利用。直到 React 18，React 团队才引入了并发模式（Concurrent Mode），这是一种新的渲染模式，它充分利用了 Fiber 架构的这个特性，使得 React 可以在处理一个更新的同时，开始处理另一个更新。

## 对比 Vue

- React 通过 JSX 来描述 UI，Vue 通过模板来描述 UI
- 数据驱动，但驱动的机制不一样。Vue 是通过数据劫持+发布订阅模式，React 是通过 Fiber 架构
- diff 算法不同
- 生态系统、学习曲线、灵活性、易用性

## 考点

### useRef、ref 和 forwardRef 区别

useRef、ref 和 forwardRef 都是与组件引用（reference）相关的概念，但它们的用途和工作方式有所不同。

- useRef 是一个 React Hook，它可以在函数组件中创建一个可变的引用对象，这个对象的 .current 属性可以被改变，而不会引发组件重新渲染。这对于保存非状态数据（例如输入框的实例或任何其他你想在组件的生命周期内保持的值）非常有用。计时器。
- ref 是一个特殊的属性，可以被添加到任何 React 组件上。useRef + ref，在组件内部访问 dom
- forwardRef 是一个 React API，它可以让我们将 ref 通过组件传递给子组件。

useRef + ref + forwardRef 父组件调用子组件中的 dom

### hook 为什么不能在条件语句中

React 的 Hook 底层是链表，每一个 Hook 的 next 是指向下一个 Hook 的，if 会导致顺序不正确，导致 React 无法正确地追踪 Hooks 的状态，状态错乱。

### hook 为什么用链表
- 节省内存（比数组、树等）
- 高效插入和删除（比数组、树等）

### React 和 Vue3 都有 hook，有何不同

Vue3 的逻辑复用是基于 compositionAPI 的，通常业务开发会封装成一个自己的 Hook。这些自定义 Hook 更像是一个没有 UI 的组件。它具备 Vue3 组件的特点，比如响应式、有生命周期等。  
React 的逻辑复用是基于 Hook 的，通常业务开发也可以自定义 Hook。这些自定义的 Hook 更像一个函数，和 useState 是一个量级，不是组件级别。  
React 内置的或者自定义的 Hook 如果要对比，应该是对比 Vue3 中的各个 compositionAPI，它们才是一个量级的。

React 和 Vue 的 Router 作用、原理

### 连续 setState 会触发两次吗

当你在组件中调用 setState 时，React 不会立即更新组件。相反，它会将新的状态更新放入一个队列中。这个队列被称为更新队列（Update Queue）。

然后，React 会在适当的时机（通常是在当前 JavaScript 事件循环结束后）开始处理这个队列。这个过程被称为 Reconciliation。在这个过程中，React 会遍历更新队列，将所有的状态更新应用到组件的状态上。然后，React 会根据新的状态构建一个新的 Fiber 树。

最后，在 Commit 阶段，React 会根据新的 Fiber 树来更新 DOM。这个过程只会发生一次，即使你在一个事件处理函数中连续调用了多次 setState。

这就是 React 如何将多次 setState 合并到一次 Reconciliation 的大致过程。这个过程的目的是为了提高性能，因为 DOM 更新通常是比较昂贵的操作，通过批量处理状态更新，React 可以减少不必要的 DOM 更新。

### 父组件和子组件渲染过程

父变子就变，因为 diff 时，只进行同级比较,使用 React.PureComponent 或 React.memo  
commit 阶段先渲染子组件，再渲染父组件

### requestIdleCallback 兼容性不好

setTimeout 和 MessageChannel 来模拟一个类似的行为  
这个示例中的 fallback 函数使用 MessageChannel 来模拟 requestIdleCallback 的行为。当你调用 fallback 函数时，它会创建一个新的 MessageChannel，并设置 port1.onmessage 为一个函数，这个函数会在消息被接收时被调用。然后，如果当前没有调度任务，它会通过 port.postMessage 来发送一个消息，这会导致 port1.onmessage 在下一个事件循环中被调用。

```js
let scheduled = false;

function fallback(fn) {
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = () => {
    scheduled = false;
    const time = performance.now();
    const timeout = 3000; // 你可以根据需要调整这个值
    fn({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, timeout - (performance.now() - time));
      },
    });
  };
  if (!scheduled) {
    scheduled = true;
    port.postMessage(undefined);
  }
}

const requestIdleCallback = window.requestIdleCallback || fallback;
const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;

// 使用方式
requestIdleCallback(myCallback);
cancelIdleCallback(myHandle);
```

### portal 事件冒泡到父组件为什么

React 的事件冒泡是基于它自己的事件系统，称为 SyntheticEvent（合成事件）。React 使用一个名为事件委托的技术，它在文档的根节点上添加一个监听器，然后使用单一的事件监听器来监听所有的事件。

当一个事件发生时，React 会创建一个 SyntheticEvent 对象，并将其传递给你定义的事件处理器。这个 SyntheticEvent 对象有一个 nativeEvent 属性，它是对原生浏览器事件的引用。然后，React 会根据组件树的结构，按照从最深的节点到最浅的节点的顺序，依次调用事件处理器。这就是所谓的事件冒泡。

对于 Portal，尽管它可以将子节点渲染到存在于父组件 DOM 结构之外的 DOM 节点，但在 React 的组件树中，Portal 的位置是固定的。因此，当一个在 Portal 中的元素触发了一个事件，React 会创建一个 SyntheticEvent 对象，并按照 Portal 在组件树中的位置，进行事件冒泡。

这就是为什么在 Portal 中的事件可以冒泡到包含 Portal 的父组件的原因。

### 事件池和事件委托机制有什么缺点吗

- 事件委托：

- - 对于一些不冒泡的事件，如 blur、focus、mouseenter、mouseleave 等，事件委托可能无法正常工作。React 对此做了一些处理，使得这些事件在 React 中也能冒泡，但如果你直接使用原生事件，这可能会成为一个问题。
- - 如果你需要在事件处理函数中阻止事件的冒泡，那么事件委托可能会导致一些问题，因为事件处理函数实际上是在父节点上执行的。
- 事件池：

- - 由于事件对象可能被复用，所以你不能在事件处理函数之外的异步代码中访问事件对象的属性，因为到那时事件对象可能已经被复用并重置了。如果你需要在异步代码中使用事件属性，你应该在事件处理函数中提前获取并保存这些属性。
- - 如果你需要访问原生事件的一些非标准属性，可能会遇到问题，因为 React 的合成事件可能没有包含这些属性。

### 性能优化的

- React.memo - 比如一个订单倒计时页面，每秒都会更新，但是页面上的其他内容并不会变化，这时候就可以使用 React.memo 来避免不必要的渲染。
- useCallback - 一些传递给子组件的事件会用 useCallback，避免触发不必要的子组件重新渲染。
- useMemo - 一些计算量比较大的函数，可以用 useMemo 来缓存计算结果，避免重复计算。
