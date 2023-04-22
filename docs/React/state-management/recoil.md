## recoil

和 redux 完全独立的一个状态管理库，感觉用起来很香

### 使用

### 原理

### 与 redux家族 对比
使用 Redux、Mobx 当然可以，并没有什么问题，主要原因是它们本身并不是 React 库，我们是借助这些库的能力来实现状态管理。像 Redux 它本身虽然提供了强大的状态管理能力，但是使用的成本非常高，你还需要编写大量冗长的代码，另外像异步处理或缓存计算也不是这些库本身的能力，甚至需要借助其他的外部库。
并且，它们并不能访问 React 内部的调度程序，而 Recoil 在后台使用 React 本身的状态，在未来还能提供并发模式这样的能力。





上一篇 React 的状态流管理梳理了一遍，由于 redux 家族太庞大，所以这篇接着和大家一起学习 redux 中的中间件等剩下的重要成员。  
在 redux-saga 之前，[完整示 🌰](https://codesandbox.io/s/reactxue-xi-forked-wz2rhs?file=/src/redux-extra/index.js) 看这里（示例中用了自己写的 combineReducer 和 thunk）。  
从 redux-saga 开始，[完整示 🌰](https://codesandbox.io/s/reactxue-xi-forked-wz2rhs?file=/src/redux-saga/index.js) 看这里。

⚠️ 以下代码只写了关键部分，具体看示例


