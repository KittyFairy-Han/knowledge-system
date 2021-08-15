# 开始入门啦

新手上路总是有很多坑

## 前情提要 setInterval 不更新？

一个很小的需求，发送手机验证码，60s 的倒计时。我是这样写的（简化版，无关的业务代码删除了），发现 count60-59-59....59,后面一直是 59。当时的我：(ｷ｀ﾟ Д ﾟ ´)!! 为啥么不更新！！？？

```js
export default () => {
  const [count, setCount] = useState(60);

  const useCountDown = () => {
    setInterval(() => {
      if (count === 0) {
        // 清除定时器等操作
      }
      setCount(count - 1);
    }, 1000);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}></button>
    </>
  );
};
```

## 探究原因

### step1 走出误区

工作两年一直都是用 Vue2.x ，最近项目现学现卖 React17+，使用**函数式**组件写法，发现会有一些思维定式 ， 会以 Vue 的思路去考虑 React 函数式组件的数据驱动机制，然后就进入了一些误区。在这里总结一下，希望对你（和我差不多情况的）有所帮助。  
（题外话，Vue 还是真爱，进入误区怪自己不怪 Vue，(づ￣ 3 ￣)づ）  
由一个简单的例子开始

```js
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
}
```

#### 我以为

Counter 函数就执行了一次，执行的时候 React 把 count 这个变量存起来，并且开启了对 count 的监听。当 count 变化的时候，React 主动触 dom 节点（即 return 的部分)的更新。  
误区关键点  
① 函数只执行一次，dom 节点渲染多次  
② 存在监听的模式

#### 真相大白(●—●)

实际上，count 只是一个数字。它不是神奇的“数据绑定”、“观察者”、“代理”或其他任何“魔法”。如下所示：

```js
const count = 42;
/* ... */
<p>You clicked {count} times</p>;
/* ... */
```

我们的组件第一次渲染时，count 初始化为 0。当我们每次调用 setCount(x)时，React 重新执行 Counter 函数(即重新调用了 Counter 组件)。每次 count 的值都是通过 useState 返回的一个常量。 如下所示：

```js
// 第一次渲染
function Counter() {
  const count = 0; // useState() 返回
  /* ... */
  <p>You clicked {count} times</p>;
  /* ... */
}

// 点击一次后，整个函数又运行了一遍
function Counter() {
  const count = 1; // useState() 返回
  /* ... */
  <p>You clicked {count} times</p>;
  /* ... */
}

// 再次点击，整个函数再次运行
function Counter() {
  const count = 2; // useState() 返回
  /* ... */
  <p>You clicked {count} times</p>;
  /* ... */
}
```

对比误区，正确的理解：  
① 初次渲染和 setCount 的时候，都会重新执行一次 Counter 函数。  
② 不存在观察 count。《p》 You clicked {count} times 《/p》 这行代码没有数据绑定！count 每次都是函数内部的一个常量，由 useState 返回。count **不会随时间变化，组件每个渲染“看到”它自己的 count 值，组件中任何变量在渲染之间都是被隔离的**。

> 在这个过程中 React 做了什么？  
> 触发 Counter 重新执行的“开关”是 setCount ，当我们调用 setCount，React 再次使用不同的 count 值通过 useState 返回给组件。然后 React 更新 DOM 以匹配我们最新的渲染输出。

### step2 换个形式理解一下

```js
function Counter() {
  const [count, setCount] = useState(0);

  function delayAlertCount() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={delayAlertCount}>Show alert</button>
    </div>
  );
}
```

点击一下“show alert”按钮，然后点一下“click me”。alert 结果会是？  
即将剧透  
即将剧透  
即将剧透  
即将剧透  
即将剧透  
结果是 0  
结合上面的理解，其实每次渲染可以提取成以下:

```js
// 首次渲染(点击了“show alert”按钮，3s后执行回调)
function Counter() {
  const count = 0;
  /* ... */
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }
  /* ... */
}

// +1 后渲染
function Counter() {
  const count = 1;
  /* ... */
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }
  /* ... */
}
```

以此类推，每个渲染都会拥有它自己的 count 和 handleAlertClick，这些版本中的每一个都“记住”了自己的 count：

```js
// 首次渲染(点击了“show alert”按钮，3s后执行回调)
function Counter() {
  /* ... */
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + 0);
    }, 3000);
  }
  /* ... */
  <button onClick={handleAlertClick} />; // 这个时候 点击事件回调函数内部拿到的 count 值是 0
  /* ... */
}

// +1 后渲染
function Counter() {
  /* ... */
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + 1);
    }, 3000);
  }
  /* ... */
  <button onClick={handleAlertClick} />; // 这个时候 点击事件回调函数内部拿到的 count 值是 0
  /* ... */
}
```

所以 alert 的是 0！

### step3 回到开头的例子

```js
// 首次渲染 点击按钮开始 setInterval
export default () => {
  const count = 60;

  const useCountDown = () => {
    setInterval(() => {
      if (count === 0) {
        // 清除定时器等操作
      }
      setCount(count - 1);
    }, 1000);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}></button>
    </>
  );
};
```

```js
// 1s 后，执行了setCount(59)。进行第二次渲染
export default () => {
  const count = 59;

  const useCountDown = () => {
    /* 这次没有执行这个函数，省略这部分代码 */
  };

  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}></button>
    </>
  );
};
```

```js
// 2s 后,又执行了 setCount(59)。
// ...
// ns 后，又执行了 setCount(59)。
```

## 如何解决

通过上面的原因分析，我们知道了由于 useCountDown 只执行了一次，setInterval 的回调函数 (下文简称‘cb’) 这个闭包中的 count 变量始终是调用 useCountDown 那次渲染时的 count，count 不变所以计时器数值不更新。
所以，我们就从 count 这个点切入，

### 使用 ref

让 count 跳出一次渲染（以下“一次渲染”称为“快照”）的限制，成为组件整个生命周期都一直存在的，这样每秒执行回调函数的时候，去读取 count 的值，就是不同的。跳出快照的限制，在整个生命周期中一直存在，你一定想要了 ref 吧，就用它！  
但这里有个限制，那就是 ref 的 current 值改变的时候，并不会重新触发渲染。所以我们不能完全抛弃 useState 而只用 useRef，要两者结合使用！

```js
export default () => {
  const countSaver = useRef(60);
  const [count, setCount] = useState(countSaver.current);

  const useCountDown = () => {
    setInterval(() => {
      if (countSaver.current === 0) {
        // 清除定时器等操作
      }
      // console.log("tick", countSaver.current);
      countSaver.current = countSaver.current - 1;
      setCount(countSaver.current);
    }, 1000);
  };

  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}>倒计时</button>
    </>
  );
};
```

我们也可以做一些小的改变，还是使用 ref，这次我们 current 不用来存 count，直接用来存 cb。每个快照都重新给 current 赋值， 这样每秒执行的 cb 都是一个新的 cb，每个新的 cb 中都使用了新的 count，而不再是调用 useCountDown 那个快照中的 count。

```js
export default () => {
  const cbSaver = useRef();
  const [count, setCount] = useState(60);、

  cbSaver.current = () => {
      if (count === 0) {
        // 清除定时器等操作
      }
      setCount(count - 1);
  };

  const useCountDown = () => {
    setInterval(() => {
      cbSaver.current();
    }, 1000);
  };

  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}>倒计时</button>
    </>
  );
};
```

### 使用形如 setCount(count=>count-1)

其实不使用 ref，就用 setCount 也可以解决问题。这种方式可以理解为:是在给 React“发送指令”告知如何更新状态,不需要关心当前值是什么，只要对 “旧的值” 进行修改即可。
优点：代码最简单，在原有的代码上改造最小。  
局限：无法获取到新的 props。(比如这种场景：当 count 每次不是 -1 而是根据 prop 进行动态改变的时候)  
我个人还是觉得很别扭，这种写法有一种自相矛盾的感觉。

```js
export default () => {
  const [count, setCount] = useState(60);
  if (count === 0) {
    //清除定时器等操作
  }
  const useCountDown = () => {
    setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={useCountDown}></button>
    </>
  );
};
```

### 使用 reducer

使用 reducer 这种方式，在我看来是上面方法的一个升级版本。在保留优点的同时，它打破了无法获取新的 props 这一局限。  
useReducer 返回的 state 并不是一个生命周期内的变量，它还是只属于当前快照的一个普通变量。用这种方式，就我个人来讲，比上面的别扭感大大降低了。

```js
export default () => {
  const reducer = (state) => state - 1;
  const [state, dispatch] = useReducer(reducer, 10);
  if (state === 0) {
    //清除定时器等操作
  }
  const useCountDown = () => {
    setInterval(() => {
      dispatch({});
    }, 1000);
  };

  return (
    <>
      <span>{state}</span>
      <button onClick={useCountDown}>倒计时</button>
    </>
  );
};
```

### 三种方法分别加上清除定时器的逻辑

- ref 方案
- updater 方案
- useReducer 方案

```js
export default () => {
  const reducer = (state, { type, payload }) => {
    if (type === "deCount") {
      if (state.count <= 0) {
        return { timer: null, count: 0 };
      } else {
        return { ...state, count: state.count - 1 };
      }
    }
    if (type === "createTimer") {
      return { ...state, timer: payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, { count: 60 });

  const useCountDown = () => {
    const timer = setInterval(() => {
      dispatch({ type: "deCount" });
    }, 1000);
    dispatch({ type: "createTimer", payload: timer });
  };

  return (
    <>
      <span>{state.count}</span>
      <button onClick={useCountDown}>倒计时</button>
    </>
  );
};
```
