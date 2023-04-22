

## redux VS contextAPI+useReducer

[完整 🌰](https://codesandbox.io/s/reactxue-xi-forked-1cjkfj?file=/src/react-state-management/By4ReactReduxHooks.jsx)

### 使用对比

- 用 redux：ByRedux.jsx

```js
import "../styles.css";
import { actions, reducer } from "./store";
import { useEffect, useState } from "react";
import { createStore } from "redux";
const store = createStore(reducer);

const ShowCount = () => {
  const [count, setCount] = useState(store.getState().count);
  useEffect(() => {
    // 订阅store数据变化
    store.subscribe(() => {
      // 从store取数据
      const state = store.getState();
      setCount(state.count);
    });
  }, []);
  return <h2>count:{count}</h2>;
};
const ChangeCount = () => {
  return (
    <>
      {/* 向store提交数据 */}
      <button onClick={() => store.dispatch(actions.DECREASE)}>➖1</button>
      <button onClick={() => store.dispatch(actions.INCREASE)}>➕1</button>
    </>
  );
};
export default function ByRedux() {
  return (
    <div className="App">
      <h1>用redux做数据管理</h1>
      <ShowCount />
      <ChangeCount />
    </div>
  );
}
```

- 用 contextAPI + useReducer：ByContextAndReducer.jsx

```js
import "../styles.css";
import { actions, reducer, initialState } from "./store";
import { createContext, useContext, useReducer } from "react";
const appContext = createContext(initialState);

const ShowCount = () => {
  /* 获取数据 */
  const { state } = useContext(appContext);
  return <h2>count:{state.count}</h2>;
};
const ChangeCount = () => {
  const { dispatch } = useContext(appContext);
  return (
    <>
      {/* 提交数据 */}
      <button onClick={() => dispatch(actions.DECREASE)}>➖1</button>
      <button onClick={() => dispatch(actions.INCREASE)}>➕1</button>
    </>
  );
};
export default function ByContextAndReducer() {
  // 基于context可以跨层传递的特性，同时把state和setState向下传递，就能够达到全局数据共get共state的效果
  // 为什么用useReducer不用useState呢？因为复杂数据用setState不如dispatch，dispatch里面对数据处理进行细化
  // setState 是单纯设置一个结果值，没有对中间过程进行细化处理
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>用context和useReducer做数据管理</h1>
      <appContext.Provider value={{ state, dispatch }}>
        <ShowCount />
        <ChangeCount />
      </appContext.Provider>
    </div>
  );
}
```

#### redux 流程（无中间件）

1. 通常页面初始化，我们调用 store.subscribe()传入 cb1、cb2 等回调返回 unsubscribe1、unsubscribe2
2. 我们调用 store.dispatch ：
3. store 调用 reducer
4. store 更新 state 为 newstate
5. store 调用所有的 cb1、cb2
6. 通常 cb1、cb2 等回调中都有 store.getState() 来获取 newstate 的逻辑
7. 1 ～ 5 重复多次
8. 通常页面卸载时，我们调用 unsubscribe1、unsubscribe2 取消订阅
   ！！取消订阅后调用 dispatch 仍可以改变 store 中的 state 值，但我们传入的 cb1、cb2 不会被调用

### 简易模拟 redux 源码

```js
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = [];
  function getState() {
    return state;
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  dispatch({ type: "@@redux/INIT" });
  return { dispatch, subscribe, getState };
}
```

### 功能与性能对比

#### contextAPI+userReducer

- 订阅了 context 实例对象的组件在 context 值变化的时候一定会被强制更新，可能会有性能问题。
- 不包括任何副作用和中间件机制，不能改造

#### redux

- redux 内部，state 改变时都会触发所有的 listen callback 执行一边，要避免重复渲染需要在 react 组件层去做。
- 可通过中间件扩展

## 从 redux 到 redux + react-redux

### 使用对比

- 用 redux : 上文已提过，略
- 用 react-redux : ByReactRedux.jsx

```js
import "../styles.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { reducer, actions } from "../redux-vs-context+reducer/store";
const store = createStore(reducer);

/**显示组件 */
const ShowCount = ({ stateCount }) => {
  return <h2>count:{stateCount}</h2>;
};
//映射与连接
const mapStateToProps = (state) => {
  return { stateCount: state.count };
};
const ShowCountPro = connect(mapStateToProps, () => {})(ShowCount);

/**操作组件 */
const ChangeCount = ({ dispatchIncreatment, dispatchDecreatment }) => {
  return (
    <div>
      <button onClick={() => dispatchDecreatment()}>➖1</button>
      <button onClick={() => dispatchIncreatment()}>➕1</button>
    </div>
  );
};
//映射与连接
const mapDispatchToProps = (dispatch) => ({
  dispatchIncreatment: () => {
    dispatch(actions.INCREASE);
  },
  dispatchDecreatment: () => {
    dispatch(actions.DECREASE);
  },
});
const ChangeCountPro = connect(() => {}, mapDispatchToProps)(ChangeCount);

/**======================================== */
const ByReactRedux = () => {
  return (
    <div className="App">
      <h1>用react-redux做数据管理</h1>
      {/* 重要！ */}
      <Provider store={store}>
        <ShowCountPro />
        <ChangeCountPro />
      </Provider>
    </div>
  );
};
export default ByReactRedux;
```

### react-redux 基于 redux 做了什么 ？

两个核心 Provider 和 connect （v7.1+出了 hooks 写法，续更在讲)

- Provider 是基于 react 的 context 的穿透能力，把 store 向下传递。
- connect 负责订阅 store、向业务组件注入 store 中的 state 和注入 dispatch 的能力（暂且成为 dispatchFn）。
  > connect 本质上是一个返回高阶组件的高阶函数,高阶组件是接受一个组件返回一个组件的函数。所以 connect 里面嵌套了两层函数，有点函数柯里化的意思（快绕晕了 😷）。
- connect 接受两个函数（下面称为 mapState 和 mapDispatch）作为参数，用来把 store 中的 state、dispatchFn 映射到业务组件的 prop 上

这样一来 state 和 dispatchFn 都变成了业务组件的 props，业务组件不需要显式的调用 store.subscribe、store.getState、store.dispatch

### 简易模拟 react-redux 的 Provider 和 connect

```js
import { useState, useEffect, useContext, createContext } from "react";

const storeContext = createContext();

const Provider = ({ children, store }) => {
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

const Connect = (mapStateToProps, mapDispatchToProps) => {
  // 要返回的高阶组件
  const withStore = (OldComp) => {
    const NewComp = (props) => {
      const store = useContext(storeContext);
      const [state, setState] = useState(store.getState());
      useEffect(() => {
        //订阅store的变化，store变化就更新state，进而更新commonProps，业务组件也会随之变化
        store.subscribe(() => {
          const state = store.getState();
          setState(state);
        });
      }, []);
      // 想要注入的state
      const commonProps = mapStateToProps(state);
      // 想要注入的function
      const commonDispatch = mapDispatchToProps(store.dispatch);
      // 这是给原始组件增加的store的sate和function
      const someInject = { ...commonProps, ...commonDispatch };
      return <OldComp {...props} {...someInject} />;
    };
    return NewComp;
  };
  return withStore;
};

export { Connect as connect, Provider };
```

把刚刚 demo 中两处 'react-redux' 的引用换成 './my-react-redux' 仍可成功实现 react-redux 的效果

### react-redux 性能优化

刚刚的模拟只是完成了 react-redux 的基本功能，对于业务层面来说最大的受益也只是使用起来重复的代码少写了点。  
但 react-redux 做的不仅如此，其中很重要的的作用就是性能优化。只有映射到当前业务组件中 state 变化时，当前的业务组件才更新。使用 redux 时，需要业务层面手动去做这些性能优化。  
react-redux 的源码还是非常复杂的，可以阅读[这篇](https://juejin.cn/post/6844903929222791175#heading-10)深入学习。

