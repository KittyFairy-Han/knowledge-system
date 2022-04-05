# 捋一捋 React 的技术栈们

刚接触 React 时，由于它庞大的生态系统，让我十分凌乱，遇到问题不知道该去哪里看官方文档或者说去看哪个官方文档。redux？sage？dva？umi？都是啥？？？有啥关系？。一直都很想理清各个技术栈之间的关系，终于！  
本文主要是对 React 相关的技术栈进行一下梳理，从几个方面:为什么要有它(指某一个技术栈)，它们之间又是什么关系？

## 数据流方案

JavaScript 开发的 web 应用, 需要管理的状态越来越多, 这些状态包括服务器返回的数据, 用户操作的数据等等, 也包括一些 UI 的状态。整个应用的状态管理越来越复杂，我们无法安安静静地做切图仔了。

随之，出现了 React 等数据驱动视图的前端框架。  
但其实 React 只是在视图层帮助我们解决了 DOM 的渲染过程, state 依然是留给我们自己来管理。
管理不断变化的 state 是非常困难的，无论单个组件自己的 state，还是父子组件间传递的 props，也包括通过 Context 进行共享的 state。

### redux

然后，Redux 就登场了。Redux 就是一个帮助我们管理 State 的容器。

#### 核心机制

具体怎么管理的呢，那就涉及到几个关键的概念:state、action、reducer。

- state 就是我们的状态(数据)。
- action: 可以理解为更新状态的指令。本身是一个对象，通过 action.type 来给不同的指令命名/定义。
- reducer: 可以理解为有各种逻辑流程的一个机器，根据不同的指令来修改状态，连接了 action 与 state。所有的 reducer 都应该是纯函数，不能产生任何的副作用。
- store:可以理解为有多个加工机器的总工厂，聚合了多个 reducer。
- 所有 state 的变化, 必须通过 store.dispatch 来派发 action 进而更新 state。具体 action 与 state 如何对应，逻辑就在我们定义的 reducer 里。

#### 基础示例

1. 定义初始化 state
2. 定义 action
3. 定义 reducer
4. 创建的 store，使用 redux 提供的 createStore 方法。
5. 基于 store 的 api 使用

```js
// 创建 store
import { createStore } from "redux"; // 引入
const initialState = {
  count: 0,
};
const actions = {
  INCREASE: { type: "INCREASE" },
  DECREASE: { type: "DECREASE" },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INCREASE.type:
      return { count: state.count + 1 };
    case actions.DECREASE.type:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

// 使用 store
store.dispatch(actions.INCREASE);
store.getState(); // {count: 1}
store.dispatch(actions.INCREASE);
store.getState(); // {count: 2}
store.dispatch(actions.DECREASE);
store.getState(); // {count: 1}
```

### redux-sage

按照原始的 redux 工作流程，是不能在 reducer 中进行异步操作的，因为这样会违反“纯函数、不产生副作用”的原则；而往往实际中，很多数据都是来自于 ajax 请求等异步操作的，并且其中一些需要存入 store 中方便组件间的共用，这个时候就需要一个中间件(Middleware)来处理这种业务场景。

redux 对于中间件提供了【位于 action 被发起之后，到达 reducer 之前的】扩展点。redux-saga 就是应用于 redux 的中间件。

#### 核心 API

- generator
  被 yield 的对象都是一类指令，指令可被 Middleware 解释执行。当 Middleware 取得一个 yield 后的 Promise，Middleware 会暂停 Saga，Promise 被 resolve，Middleware 会恢复 Saga 接着执行，直到遇到下一个 yield。
- call:简单的理解为执行副作用的函数。call 让 Middleware 来调用 副作用函数(如异步的 ajax 请求等)。
- put:简单理解为 redux 框架中的 dispatch 函数。当 put 一个 action 后，reducer 中就会计算新的 state 并返回。
- takeEvery:用于监听所有的副作用 action，并在副作用 action 被匹配时执行副作用任务。

#### Redux-saga 的使用步骤

1. 定义 state、action、reducer

```js
//reducers.js
const initialState = {
  count: 0,
};
const actions = {
  INCREASE: { type: "INCREASE" },
  DECREASE: { type: "DECREASE" },
  STE_STEP: { type: "SET_STEP" },
};
export default function(state = initialState, action) {
  const { step, count } = state;
  const payload = action.payload;
  switch (action.type) {
    case actions.STE_STEP.type:
      return { ...state, step: payload };
    case actions.INCREASE.type:
      return { ...state, count: count + step };
    case actions.DECREMENT.type:
      return { ...state, count: count - step };
    default:
      return state;
  }
}
```

2. 定义中间件  
   ① 创建 effect(包含副作用的任务):使用 call 发起异步操作，操作完成后使用 put 函数触发 action ，同步更新 state。  
   ② 创建中间件:使用 takeEvery 把异步 action 与 effect 联系起来

```js
//sage.js
import { put, takeEvery, call } from "redux-saga/effects";

const queryStep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5);
    }, 200);
  });
};

// 定义effect：等待queryStep这个异步resolve了，派发(put可以等效地理解为dispatch) INCREMENT 这个 action
export function* getStep() {
  const step = yield call(queryStep);
  yield put({ type: "SET_STEP", payload: step });
}

// 监听：GET_STEP 被业务组件dispatch后，中间件会调用上面的 getStep
export function* watchGetStep() {
  yield takeEvery("GET_STEP", getStep);
}
```

3. Middleware 与 store  
   ① 使用 createSagaMiddleware 方法创建 Middleware  
   ② 创建的 store 时，传入第一个参数为 reducer，第二个参数为 applyMiddleware(刚刚 ① 创建的 Middleware)  
   ③ 调用 Middleware 的 run 函数来执行某个或者某些 Middleware
4. store 与 react 根 render 建立联系

```js
// main.js
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { watchGetStep } from "./sagas";

//使用 createSagaMiddleware 方法创建 Middleware
const sagaMiddleware = createSagaMiddleware();
//中间件应用到 store 上
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
//启用中间件
sagaMiddleware.run(watchGetStep);

function render() {
  ReactDOM.render(<Counter store={store} />, document.getElementById("root"));
}
render();

//订阅 store
store.subscribe(render);
```

6. 在业务组件中使用

```js
//Counter.js
import React, { useEffect } from "react";

const Counter = ({ store }) => {
  const {step,count} = store.getState();

  const increment = () => {
    store.dispatch({ type: "INCREMENT" }); //不走中间件
  };
  const decrement = () => {
    store.dispatch({ type: "DECREMENT" });//不走中间件
  };
  useEffect(() => {
    store.dispatch({ type: "GET_STEP" }); //发起一个异步的action，通过中间件

  return (
    <div>
      <button onClick={increment}>+{step}</button>{" "}
      <button onClick={decrement}>-{step}</button>
      <hr />
      <div>count: {count}</div>
    </div>
  );
}

export default Counter;
```

### react-redux

react-redux 是为了让 redux 更好的适用于 react 而生的一个库。当我们多个组件都共享某一个 state,可能就会存在这样的业务逻辑:多个组件都要订阅 state 的变化、也能修改 state 的值。这种情况下,重复的代码就会比较多,react-redux 就是针对 react 对 redux 又进行了一层封装，解决了这个问题。

#### 核心机制

1. react-redux 导入 Provider 组件，包在根组件的外层。
2. mapStateToProps: 建立一个从(store 中)state 到(业务组件总)props 的映射关系。
3. mapDispatchToProps: 建立业务组件 dispatch 到 store.dispatch 方法的映射。
4. connect 方法:接受两个函数(mapStateToProps、mapDispatchToProps)，再接收一个业务组件。

#### 基础示例

```js
// store.js
import { createStore } from "redux"; // 引入
const initialState = {
  count: 0,
};
const actions = {
  INCREASE: { type: "INCREASE" },
  DECREASE: { type: "DECREASE" },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INCREASE.type:
      return { count: state.count + 1 };
    case actions.DECREASE.type:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
```

```js
// main.js
import { Provider } from "react-redux";
import store from "./store.js";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

```js
// Counter.js
import { connect } from "react-redux";

//定义store中state到业务组件中props的映射
function mapStateToProps(state, businessProps) {
  return {
    count: state.count,
  };
}

//定义业务组件中动作到store.dispatch的映射
function mapDispatchToProps(dispatch, businessProps) {
  return {
    increment: () => {
      dispatch({ type: "INCREASE" });
    },
    decrement: () => {
      dispatch({ type: "DECREASE" });
    },
  };
}

// 业务组件
const Counter = (props) => {
  const { count, increment, decrement } = props;
  return (
    <div>
      <input type="button" onClick={increment} value="+" />
      <input type="button" onClick={decrement} value="-" />
      <span> count:{value}</span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### dva

上面说的 redux-saga 和 react-redux 看起来好像是对 redux 的两套进阶，但是没有结合起来。这不就轮到 dva 登场了。  
最浅显易懂的解释 dva = React-Router + Redux + Redux-saga + react-redux。dva 首先是一个基于 redux 和 redux-saga 的数据流方案，也采用了 react-redux 的 connect，还内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

#### 核心机制

Redux + Redux-saga + react-redux，整个数据流方案已经很完善了，dva 做的就是结合并且让写法也更偏于配置。  
dva 通过 model 的概念把一个"领域"的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects。

#### 使用步骤

- models/counter.js(数据模型)

```js
// 模拟一个接口
const queryStep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5);
    }, 200);
  });
};
// 配置数据模型
export default {
  namespace: "counterModel",
  state: {
    step: 0,
    count: 0,
  },
  reducers: {
    setCount(state, { payload }) {
      return {
        ...state,
        count: payload,
      };
    },
    setStep(state, { payload }) {
      return {
        ...state,
        step: payload,
      };
    },
  },
  effects: {
    *getStep({ payload }, { call, put }) {
      let data = yield call(queryStep, payload); //queryStep 是个接口
      console.log(data);
      if (data) {
        yield put({
          type: "setStep",
          payload: data,
        });
      }
    },
  },
};
```

- Counter.js (组件)

```js
import { useEffect } from "react";
import { connect } from "umi";
const Counter = (props) => {
  const { dispatch, count, step } = props;
  const increment = () => {
    dispatch({
      type: "counterModel/setCount", //提交reducer
      payload: count + step,
    });
  };
  const decrement = () => {
    dispatch({
      type: "counterModel/setCount", //提交reducer
      payload: count - step,
    });
  };
  useEffect(() => {
    dispatch({
      type: "counterModel/getStep", // 初次渲染，通过派发effect从接口获取step
      payload: {},
    });
  }, []);
  return (
    <div>
      <input type="button" onClick={increment} value={`+${step}`} />
      <input type="button" onClick={decrement} value={`-${step}`} />
      <span> count:{count}</span>
    </div>
  );
};
const modelFn = ({ counterModel }) => {
  return {
    count: counterModel.count,
    step: counterModel.step,
  };
};
export default connect(modelFn)(Counter); // connect 与 react-redux 的 connect 是一个
```

## 相关脚手架

上面提到 dva 其实已经是框架级别的方案，但是因为 dva 主要还是处理数据流，所以没有归属到这个章节。一下对 umi 和 ant-design-pro 的介绍也主要是概括和区分上面几个概念的层次的。

### umi

umi 整体是个大而全的 React 框架

- umi 的数据流方案和 dva 是深度融合的，基本就是直接采用了 dva 的那一套
- 支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。
- 默认就引入了 ant-design 的组件库
- ...

### ant-design-pro

ant-design-pro 是基于 umi 的一个面向企业级应用的后台管理框架。通常，面相企业的后台管理应用都会用 ant-design-pro，一般后台管理应用的组件表现形式都比较相似，不用像 C 端那样定制样式，所以用 ant-design-pro 会开发更便捷。  
面相 C 端的应用还是用 umi 比较多，ant-design-pro 相对来说限制性更强。
