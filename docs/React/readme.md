# React
## 面试题
- useRef、ref 和 forwardRef 都是与组件引用（reference）相关的概念，但它们的用途和工作方式有所不同。
- useRef 是一个 React Hook，它可以在函数组件中创建一个可变的引用对象，这个对象的 .current 属性可以被改变，而不会引发组件重新渲染。这对于保存非状态数据（例如输入框的实例或任何其他你想在组件的生命周期内保持的值）非常有用。计时器。
- ref 是一个特殊的属性，可以被添加到任何 React 组件上。useRef + ref，在组件内部访问dom
- forwardRef 是一个 React API，它可以让我们将 ref 通过组件传递给子组件。useRef + ref + forwardRef 父组件调用子组件中的dom

## Fiber
- 面相使用者来说

## hooks
useMemo 和 useCallback 都是 React Hooks，用于优化 React 组件的性能。

useMemo 是用来返回一个 memoized 值，也就是说，它会记住你的函数的返回结果，只有当依赖项改变时，才会重新计算这个值。这对于避免在每次渲染时都进行高开销的计算非常有用。

useCallback 则是返回一个 memoized 回调函数。它的工作方式和 useMemo 类似，但它返回的是函数。只有当依赖项改变时，才会返回新的函数。

## 对比 Vue
- React 通过 JSX 来描述 UI，Vue 通过模板来描述 UI
- 数据驱动，但一个是单向绑定，一个是双向绑定
- 设计模式，React 是基于 Fiber,Vue是响应式
- diff 算法不同