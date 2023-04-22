没有废话！接着来 redux hooks

## react-redux hooks 与 connect

上面的 connect 真是够绕的哈 😅，我刚接触的时候也看傻 👀 了。connect 是高阶函数实现复用逻辑的思想，以前 react 还没有 hook 的时候实现逻辑复用也都是用这种方式进行逻辑注入，react 出了 hooks，react-redux 也提供了 hooks，用起来真是顺溜 😊 多了！

### 使用对比

- 用 react-redux 的 connect :上文已提过，略
- 用 react-redux 的 hooks : ByReactReduxHook

```js
import "../styles.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { reducer, actions } from "./store";
const store = createStore(reducer);

/**显示组件 */
const ShowCount = () => {
  const stateCount = useSelector((state) => state.count);
  return <h2>count:{stateCount}</h2>;
};

/**操作组件 */
const ChangeCount = () => {
  const dispatch = useDispatch();
  const dispatchIncreatment = () => {
    dispatch(actions.INCREASE);
  };
  const dispatchDecreatment = () => {
    dispatch(actions.DECREASE);
  };
  return (
    <div>
      <button onClick={() => dispatchDecreatment()}>➖1</button>
      <button onClick={() => dispatchIncreatment()}>➕1</button>
    </div>
  );
};

/**======================================== */
const ByReactReduxHook = () => {
  return (
    <div className="App">
      <h1>用 react-redux hooks 做数据管理</h1>
      {/* 重要！ */}
      <Provider store={store}>
        <ShowCount />
        <ChangeCount />
      </Provider>
    </div>
  );
};
export default ByReactReduxHook;
```

_Provider 还是那个 Provider，把 connect 这种 HOC 的方式换成 useSelector+useDispatch 这种 Hook 的方式了_

### 模拟 useSelector 与 useDispatch

（其实还有 useStore 这个 hook，但不怎么用，不介绍了）

```js
// 在上文中 简易模拟 react-redux 的 Provider 和 connect 代码后面追加
const useSelector = (fn) => {
  const store = useContext(storeContext);
  const selectState = fn(store.getState());

  store.subscribe(() => {
    const selectState = fn(store.getState());
    // how to trigger component render？
  });

  return selectState;
};

const useDispatch = () => {
  const store = useContext(storeContext);
  return store.dispatch;
};

export { useSelector, useDispatch };
```

### connect 与 hooks 对比

hooks 优点

- 更容易理解、易上手、
- 更符合 React Functional Component 的思想，官方也是推荐使用 hooks 的方式。
- 例子中做了个小实验，渲染性能上也是 useSelector 更好
  欢迎评论区说出 connect 比 hooks 好的点 😂

## 🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬🌸🌟🍬

————————————————————————————————————————————————————————————————
碎碎念：  
本来初衷是想择优或者按业务场景推荐对应的 React 状态管理方案，但是发现了这个有来无回的 redux，都快忘了初衷了。  
但 redux 全家桶太丰（tao）富（yan）了，所以接下来还是继续 combineReducer、中间件。
————————————————————————————————————————————————————————————————
❕ 提示：  
[combineReducer,thunk 相关代码](https://codesandbox.io/s/reactxue-xi-wz2rhs?file=/src/redux-extra/store/index.js)  
下文列举关键代码，完整看 ⬅
————————————————————————————————————————————————————————————————

## combineReducer

### 用法

#### 1.定义不同的 reducer

- countStore.js

```js
export const initialState = {
  count: 0,
};
export const countActionTypes = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};
export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case countActionTypes.INCREASE:
      return { count: state.count + 1 };
    case countActionTypes.DECREASE:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

- todoStore.js

```js
export const initialState = {
  todoList: [],
};
export const todoActionTypes = {
  CREATE: "CREATE",
  FINISH: "FINISH",
};
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActionTypes.CREATE:
      return { todoList: [...state.todoList, action.payload] };
    case todoActionTypes.FINISH:
      return {
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
```

#### 2.combineReducer 函数

```js
const rootReducer = combineReducers({
  countStates: countReducer,
  todoStates: todoReducer,
});
const store = createStore(rootReducer);
```

#### 3.业务中使用注意 mapStateToProps 接受的参数

```js
const mapStateToProps = (state) => ({
  // state是rootState而不是某一个命名空间下的state
  count: state.countStates.count,
});
```

### 原理

reducer 中的 state 是命名空间下的，而 mapStateToProps 接收的 state 是 rootState，因为 combineReducers 大概就是这样的一个函数

```js
/**
 * 模拟 combineReducer
 * @param {object} object
 */
export default function combineReducers(object) {
  const keyList = Object.keys(object);
  const rootReducer = (oldRootState = {}, action) => {
    const newRootState = {};
    // console.log("oldRootState", oldRootState);
    keyList.forEach((key) => {
      // dispatch一个action的时候，依次进入每个reducer，而不是进入命名空间下的某一个reducer
      const reducer = object[key];
      // reducer中的state是命名空间下的state
      // 因为依次进入每个action，所以action的type相同的时候，会命中多个reducer，需要人为控制action.type不同
      // connect传入mapStateToProps的state是rootState
      const newState = reducer(oldRootState[key], action);
      newRootState[key] = newState;
    });
    // console.log("newRootState", newRootState);

    return newRootState;
  };
  return rootReducer;
}
```

## 中间件

### 中间件公式

是一个三阶函数

```js
// next 是下一个中间件，如果只有一个中间件 next = store.dispatch
const thunk = (store) => (next) => (action) => {
  // 中间件中的逻辑如 log 等
};
```

业务层 dispatch 之后在 store 内部这样调用，所以公式是那个鬼（bushi）样子咯

```js
someMiddleWare(store)(next)(action);
```

### 小试牛刀 redux-thunk

redux-thunk 作为一个中间件的入门极好！写一个类似 redux-thunk 的中间件，实现 dispatch 后可以异步

```js
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    action(store.dispatch, store.getState);
  } else {
    next(action);
  }
};
```

用用看咯

1. applyMiddleware

```js
// 关键代码就是在 createStore 时 applyMiddleware(thunk)
const store = createStore(rootReducer, applyMiddleware(thunk));
```

2. mapDispatchToProps 添加一个异步的 dispatch

```js
const mapDispatchToProps = (dispatch) => ({
  // 新增
  dispatchGetListAsync: () => {
    dispatch(async (dispatch, getState) => {
      const list = await getList();
      dispatch({ type: todoActionTypes.INIT, payload: list });
    });
  },
  // ....
});
```

3. List 组件调用 dispatchGetListAsync

```js
// ...
useEffect(() => {
  dispatchGetListAsync();
}, []);
// ...
```

## redux-saga 闪亮登场

### 使用示例

对比 thunk 更改点：

1. 配置 saga

```js
// 新增 store/todoSaga.js
import { call, put, takeEvery, all } from "redux-saga/effects";
import getTodoList from "../mocks/getTodoList";
import { todoActionTypes } from "./todoStore";

function* initTodoList() {
  const todoList = yield call(getTodoList); //模拟接口请求
  yield put({ type: todoActionTypes.INIT, payload: todoList });
}
export function* todoSaga() {
  yield takeEvery("INIT_TODO_LIST", initTodoList);
}
```

2. 与 thunk 不同的是，createSagaMiddleware 与 sagaMiddleware.run(todoSaga)

```js
// 改造 store/index.js
import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { todoSaga } from "./todoSaga";
import { countActionTypes, countReducer } from "./countStore";
import { todoReducer, todoActionTypes } from "./todoStore";

const rootReducer = combineReducers({
  countStates: countReducer,
  todoStates: todoReducer,
});
const sagaMiddleware = createSagaMiddleware(); //创建一个实例

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(todoSaga); //run我们写的saga

export default store;
export { countActionTypes, todoActionTypes };
```

3. dispatch saga 中定义的类型，异步请求逻辑已经挪到 saga 中，dispatch 更清爽

```js
// 改造 components/List.jsx
// ...
const mapDispatchToProps = (dispatch) => ({
  dispatchGetListAsync: () => {
    // 只有 dispatchGetListAsync 做了更改
    dispatch({ type: "INIT_TODO_LIST" });
  },
  //...
});
// ....
```

### 原理

源码太太太复杂了！争取补个流程图！真的能摸透了单独写一篇吧！
