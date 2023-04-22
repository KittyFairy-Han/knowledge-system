学完 redux 全家桶，趁热深入学习一下 zustand，因为 zustand 和 redux 的设计理念相似，官网也说了“Conceptually, Zustand and Redux are quite similar, both are based on an immutable state model.”  
[完整示例](https://codesandbox.io/s/react-zhuang-tai-guan-li-xue-xi-dglmj8?file=/src/by-zustand/main.tsx)

## 特点

好好好！

#### 用起来感觉

- 🤗 积极拥抱 hooks
- 🫧 不需要使用 context providers 包裹应用、也没有 reducer 那种模版代码
- 🫧  API 设计地优雅清晰（create、usexxxStore 大部分够用了）
- 🏳️‍🌈 支持多个 store
- 🫧 直接支持异步，不需要另外引入中间件
- 💪 外部可用，详见示例中的“increment 另一种写法”
- 💝 可以持久化（存到 localStorage）
- 🔌 可扩展（插入中间件）
- 😊 心智负担低

#### 原理架构上

- 内部两个重要部分，Vanilla 层是发布订阅模式的实现（读取 state，提供 subscribe 方法给 React 层）、React 层执行 subscribe 注册 listener，通过 forceUpdate 对组件进行重渲染。
- 重新渲染时对比函数默认是 Object.is，所以渲染优化主要在于业务层的 selector 写法和传入 equalityFn 对比函数

## 使用

1. 通过 create 定义 store
2. 通过 const xxx = usexxxStore(selector,equalityFn)获取 state
   > 这里的 state 可以是数据也可以是改变数据的方法，具体看示例就明白了

#### 定义 store -- create

- todoStore

```ts
import { create } from "./my-zustand";
import { queryMockList } from "../mock-fns";

type Todo = {
  id: number | string;
  content: string;
};

type State = {
  todoList: Todo[];
};

type Actions = {
  create: (qty: Todo) => void;
  finish: (qty: Todo) => void;
  initial: () => Promise<void>;
};

export const useTodoStore = create<State & Actions>((set, get) => ({
  // 待办事项
  todoList: [],
  // 创建
  create: (qty: Todo) => {
    set((state) => ({ todoList: [...state.todoList, qty] }));
  },
  // 初始获取
  initial: async () => {
    const data: Todo[] = await queryMockList();
    set((state) => ({ todoList: data }));
  },
}));
```

- countStore

```js
import { create } from "./my-zustand";

export const useCountStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

//increment 另一种写法
/* export const increment = () => {
  useCountStore.setState((state) => ({ count: state.count + 1 }));
}; */
```

#### 使用 store -- usexxxStore

- Header 用来新增 todo 和自增 count

```tsx
const Header = () => {
  const count = useCountStore((coutState) => coutState.count);
  const inCount = useCountStore((coutState) => coutState.increment);
  const createTodo = useTodoStore((todoState) => todoState.create);

  const addTodo = () => {
    const inputEle = document.getElementById("todo-input") as HTMLInputElement;
    const content = inputEle.value;
    createTodo({ id: count, content });
    inCount();
  };

  return (
    <section>
      <input id="todo-input" type="text" />
      <button onClick={addTodo}>
        <span role="img" aria-label="+">
          ➕
        </span>
      </button>
      <span>自增id为{count}</span>
    </section>
  );
};
```

- List 列表组件

```tsx
const List = () => {
  const todoList = useTodoStore((todoState) => todoState.todoList);
  const initialTodoList = useTodoStore((todoState) => todoState.initial);

  useEffect(() => {
    initialTodoList();
  }, []);

  return (
    <section>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
```

- main.tsx

```tsx
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  // <StrictMode>
  <div className="App">
    <h1>使用了zustand</h1>
    <h2>添加一个待办</h2>
    <Header />

    <h2>待办列表</h2>

    <List />
  </div>
  // </StrictMode>
);
```

## 原理

### 如何工作？

1. 调用 create

- - 传入 create 的参数中定义 状态、方法。如 ⬆️ 示例中的 count、inCount

2. zustand 创建了一个 store，这个 store 的机制和 redux 一样，是基于发布订阅模式的
3. zustand 创建了一个 usexxxStore（统称） hook ，这个就是 create 的返回值。usexxxStore 内部逻辑已经定义了但目前还没有执行。
4. 组件中调用 usexxxStore 来获取状态、方法

- - 传入 selector(用来生成 stateSlice) 和 equality 对比函数

5. 每一处 usexxxStore 第一次调用的时候对 store 进行了订阅，像 store 中注册了 listener
6. 组件中改变了状态，如执行 ⬆️ 示例中的 inCount 方法
7. store 中的 listener 依次执行
8. listener 内部用 equality 来对比新旧 stateSlice，如果确实改变了则更新组件

### 简易版本的 zustand

- Vanilla 层的 createStore （[源码 vanilla.ts](https://github.com/pmndrs/zustand/blob/main/src/vanilla.ts)）
  和简易版本的 redux 差不多，与 redux 不一样的地方在于 setState，redux 改变状态依赖于 reducer 的返回值

```js
function createStore(createState) {
  let state;
  let listeners = [];
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
  function setState(fnOrObj, replace) {
    const nextState = typeof fnOrObj === "function" ? fnOrObj(state) : fnOrObj;
    const previousState = state;
    state = replace ? nextState : Object.assign(state, nextState);
    listeners.forEach((listener) => listener(state, previousState));
  }

  function destory(params) {
    listeners = [];
  }
  const api = { getState, setState, subscribe, destory };
  state = createState(setState, getState, api);
  return api;
}
```

- React 层的 create （[源码 react.ts](https://github.com/pmndrs/zustand/blob/main/src/react.ts)）  
  又一次很大的变更，可以在[这次提交中](https://github.com/pmndrs/zustand/commit/a34649d35ab6dc91b658729a94764a5c1560fcda#diff-ca56e63fa839455c920562a44ebc44594f47957bbd3e9873c8a9e64104af2c41)找到
  变更之后核心的部分依赖于第三方 useSyncExternalStoreWithSelector，为了方便解释工作流程，下面展示变更之前的源码。🫶 注释很重要哦～

```js
export function create(createState) {
  const api = createStore(createState);
  function useStore(selector = api.getState, equalityFn = Object.is) {
    const hookSpaceRef = useRef(selector.toString());
    const [, forceUpdate] = useReducer((c) => c + 1, 0);
    const state = api.getState();
    // 每一个useStore第一次调用的时候，初始化三个ref ---- hook空间的初始化第一部分
    // 三个ref 把本hook空间 state、selector、selectedState 存下来
    // 方便store中state变化、业务层render的时候取值
    const stateRef = useRef(state);
    const selectorRef = useRef(selector);
    let stateSliceRef = useRef(selector(state));

    //TODO
    //源码中还有一段uselayoutEffect(()=>{})的逻辑，
    //去掉也不影响呀，不懂这段逻辑干嘛的

    useLayoutEffect(() => {
      // 每一个useStore第一次调用的时候，订阅状态变化 ------ hook空间的初始化第二部分
      const listener = () => {
        // 业务层每次setState
        //取出当前的状态（一个store中的全量状态）
        const nextState = api.getState();
        //通过对应的selector计算出当前的状态切片
        //因为每个useStore的时候都初始化了一个selectorRef，所以通过selectorRef.current就能找到对应的selector
        //为什么不直接用useStore传入的selector计算呢？因为listener的执行和useStore的调用是割裂的，用useStore传入的selector并不是对应的selector
        const nextStateSlice = selectorRef.current(nextState);
        //比较状态切片是否变化了，变化了才更新
        if (!equalityFn(nextStateSlice, stateSliceRef.current)) {
          // 更新状态
          stateRef.current = nextState;
          // 更新状态切片，用于下一次进入listener时的比较
          stateSliceRef.current = nextStateSlice;
          // 触发业务层的render
          forceUpdate();
        } else {
          // 无需更新
        }
      };
      const unSubscribe = api.subscribe(listener);
      // 当组件销毁，我们需要取消订阅
      return unSubscribe;
    }, []);

    return stateSliceRef.current;
  }

  return useStore;
}
```

## 关于手动渲染优化

useXxxStore(selector,equityFn)中 equityFn 是手动优化的万金油，以下场景是指如果不用 equityFn，从代码习惯上 or 代码设计上该如何优化。  
下面的例子不一定贴切，因为通常需要手动渲染优化的都是大型项目，但是从 todoList 这样的小 demo 入手去解释如何做到优化反而是个好方法。

### 每个状态单独 selector 提取

拿 Header 组件举例，count，inCount 的取值如果是这样的，而不是 ⬆️ 示例中的那样单独 selector

```js
const { count, inCount } = useCountStore((state) => ({
  count: state.count,
  inCount: state.increment,
}));
```

假设当前 count 的值是 5，某个地方 set 了 count 的值，但仍然是 5。  
用以上这种合并写法会触发 render。  
🚀 所以还是建议**拆开 selector**。

### 派生状态单独管理

新功能：要对 todoList 的总条数做统计，在项目中的多处展示。  
如果这样写

```tsx
const TotalShow = () => {
  const todoList = useTodoStore((todoState) => todoState.todoList);
  return <span>（共{todoList.length}条）</span>;
};
```

假设对 todoList 的某一条内容进行了修改，但没有发生增删。  
用以上这种写法会触发 render，就触发这种不必要的 render。  
🚀 类似这样的派生状态，我们可以**单独**用一个 todoLength**状态去维护**，像下面这样

```tsx
/* todoStore.ts */
// ... 较为简单，省略代码
// 增加一个todoLength的状态
// ... 较为简单，省略代码
/* TotalShow.tsx */
const TotalShow = () => {
  const todoList = useTodoStore((todoState) => todoState.todoLength);
  return <span>（共{todoLength}条）</span>;
};
```

### 复杂组件原子化(细粒度 memo)

新功能：取出列表的前 3 项内容单独显示。  
按照上面\<List/>组件的写法，todoList 是整体更新的，列表中某一项的内容改变，整个列表都会更新。  
如果我们想要只更新，修改的那一项该怎么做呢？上面的两种方法肯定都不适用了 ～  
🚀把 list 的每一项单独做为一个**组件，拆分**出来，像这样

```tsx
const ListItemContent = ({ index }) => {
  console.log(
    "=======ListItemContent render ====== , useTodoStore*1, index=",
    index
  );
  const item =
    useTodoStore(
      useCallback((todoState) => todoState.todoList[index], [index])
    ) || {};
  return (
    <li key={item.id}>
      <span>{item.content}</span>
    </li>
  );
};
const TopN = ({n=3})=>{
  return <><h2>前{n}项</h2>
  {Array.from({length:n}).map((i,index)=><ListItemContent index={index} />)}
  </ListItemContent>
}
```

## 其他细节or延伸

- zustand set 数据的时候，默认是合并的，第二个参数传入 true 则代表覆盖
- zustand 的持久化主要是用到 persist
- zustand 结合 immer，可以从 immutable“转换为”mutable
- zustand 结合 redux like、devtools、combime store 等中间件更强大

## 推荐阅读

- [谈谈复杂应用的状态管理（上）：为什么是 Zustand](https://zhuanlan.zhihu.com/p/591981209)

- [...下...](https://zhuanlan.zhihu.com/p/592383756)  
  看不懂，但我大为震撼 😲 ！直呼 zustand yyds 🥳
