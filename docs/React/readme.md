# React
## 面试题
- useRef、ref 和 forwardRef 都是与组件引用（reference）相关的概念，但它们的用途和工作方式有所不同。
- useRef 是一个 React Hook，它可以在函数组件中创建一个可变的引用对象，这个对象的 .current 属性可以被改变，而不会引发组件重新渲染。这对于保存非状态数据（例如输入框的实例或任何其他你想在组件的生命周期内保持的值）非常有用。计时器。
- ref 是一个特殊的属性，可以被添加到任何 React 组件上。useRef + ref，在组件内部访问dom
- forwardRef 是一个 React API，它可以让我们将 ref 通过组件传递给子组件。useRef + ref + forwardRef 父组件调用子组件中的dom

## Fiber
### 为什么
在旧的 React 架构中，一旦开始渲染就不能被打断，如果组件树很大，渲染过程可能会占用很长时间，导致浏览器无法及时响应用户的交互，从而影响用户体验。
### 是什么？
- 从使用者角度，Fiber 是 Vdom
- 从原理层面，是最小工作单元
### 怎么做？
1.Reconciliation 阶段：在这个阶段，React 会构建 Fiber 树
2.Commit 阶段：在这个阶段，React 会根据 Reconciliation 阶段计算出的结果来更一次性更新 DOM

## hooks
useMemo 和 useCallback 都是 React Hooks，用于优化 React 组件的性能。

useMemo 是用来返回一个 memoized 值，也就是说，它会记住你的函数的返回结果，只有当依赖项改变时，才会重新计算这个值。这对于避免在每次渲染时都进行高开销的计算非常有用。

useCallback 则是返回一个 memoized 回调函数。它的工作方式和 useMemo 类似，但它返回的是函数。只有当依赖项改变时，才会返回新的函数。  

useEffect：这个 Hook 会在浏览器完成布局和绘制后，在一个延迟事件中被调用。因此，即使 effect 导致了额外的渲染，用户也不会感觉到。  

useLayoutEffect：这个 Hook 会在浏览器完成布局和绘制，但在新的绘制被显示在屏幕之前被调用。如果你的 effect 进行了 DOM 变更，而你希望在用户看到新的渲染之前就完成这个变更，那么应该使用 useLayoutEffect。只有在需要同步修改 DOM，并且需要在用户看到新的渲染之前就完成这个修改的情况下，才应该使用。获取dom用**Ref**

## diff
规则：  
1. 同层比较
2. 类型比较 
3. key比较
如何判断：
类型不同时，React 会移除旧节点，创建并插入新节点  
类型和key相同的节点，会被认为是相同的节点，原地复用  
类型相同但key不同的节点，会被认为是不同的节点，移动复用。下标递增法移动复用。

## 对比 Vue
- React 通过 JSX 来描述 UI，Vue 通过模板来描述 UI
- 数据驱动，但驱动的机制不一样。Vue是通过数据劫持+发布订阅模式，React是通过Fiber架构
- diff 算法不同
- 生态系统、学习曲线、灵活性、易用性


## React 18 并发模式
并发模式（Concurrent Mode）是在 Fiber 架构基础上的一次重大升级。  
Fiber 架构是 React 16 中引入的，它改变了 React 的调和（Reconciliation）算法，使得 React 可以将渲染工作分解成多个小任务，从而避免长时间的计算阻塞浏览器。  
并发模式则进一步利用了 Fiber 架构的优势，使得 React 可以在处理一个更新的同时，开始处理另一个更新。这使得 React 可以在处理大的更新的同时，还能响应用户的交互，从而保持用户界面的流畅。
### 处理流程


## 考点

当你在组件中调用 setState 时，React 不会立即更新组件。相反，它会将新的状态更新放入一个队列中。这个队列被称为更新队列（Update Queue）。

然后，React 会在适当的时机（通常是在当前 JavaScript 事件循环结束后）开始处理这个队列。这个过程被称为 Reconciliation。在这个过程中，React 会遍历更新队列，将所有的状态更新应用到组件的状态上。然后，React 会根据新的状态构建一个新的 Fiber 树。

最后，在 Commit 阶段，React 会根据新的 Fiber 树来更新 DOM。这个过程只会发生一次，即使你在一个事件处理函数中连续调用了多次 setState。

这就是 React 如何将多次 setState 合并到一次 Reconciliation 的大致过程。这个过程的目的是为了提高性能，因为 DOM 更新通常是比较昂贵的操作，通过批量处理状态更新，React 可以减少不必要的 DOM 更新。

### React 和 Vue3 都有 hook，有何不同
Vue3 的逻辑复用是基于 compositionAPI 的，通常业务开发会封装成一个自己的 Hook。这些自定义 Hook 更像是一个没有 UI 的组件。它具备Vue3 组件的特点，比如响应式、有生命周期等。  
React 的逻辑复用是基于 Hook 的，通常业务开发也可以自定义 Hook。这些自定义的 Hook 更像一个函数，和 useState 是一个量级，不是组件级别。     
React内置的或者自定义的Hook如果要对比，应该是对比Vue3中的各个compositionAPI，它们才是一个量级的。  

React和Vue的Router作用、原理