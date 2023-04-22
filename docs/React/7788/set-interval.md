
 
新手上路总是有很多坑，如果你也遇到了相同的问题，希望可以对你有点帮助 ✿✿ヽ(°▽°)ノ✿

## 发现问题 setInterval 不更新？

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

工作两年一直都是用 Vue2.x ，最近项目现学现卖 React17+，使用函数式组件+hook的写法，发现会有一些思维定式，会以原来的思路去考虑 React 函数式组件的数据驱动机制，然后就进入了一些误区。
（题外话，Vue 还是真爱，进入误区怪自己不怪 Vue，(づ￣ 3 ￣)づ）  
#### 由一个简单的例子开始

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
即  
将  
剧  
透  

![cat](http://www.zmaomao.com/uploads/201208/9-20120QG1302K.jpg)

结  
果  
是  
0  
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
  const count = 59; // 这个 59 没有排上用场！！

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



### 使用 ref
通过上面的原因分析，我们知道了由于 useCountDown 只执行了一次，setInterval 的回调函数 (下文简称‘cb’) 这个闭包中的 count 变量始终是调用 useCountDown 那次渲染时的 count，count 不变所以计时器数值不更新。
所以，我们就从 count 这个点切入，让 count 跳出一次渲染（以下“一次渲染”称为“快照”）的限制，成为组件整个生命周期都一直存在的，这样每秒执行回调函数的时候，去读取 count 的值，就是不同的。跳出快照的限制，在整个生命周期中一直存在，你一定想要了 ref 吧，就用它！  
不过呢，ref 有个限制，那就是 ref 的 current 值改变的时候，并不会重新触发渲染。所以我们不能完全抛弃 useState 而只用 useRef，要两者结合使用！

```js
export default () => {
  const countSaver = useRef(60);
  const [count, setCount] = useState(countSaver.current);

  const useCountDown = () => {
    setInterval(() => {
      // 这里的 count 永远是 60，但是 countSaver.current 是随时间改变的
      if (countSaver.current === 0) {
        // 清除定时器等操作
      }
      // console.log("tick", countSaver.current);
      countSaver.current = countSaver.current - 1;
      setCount(countSaver.current); //触发下一次渲染
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

我们也可以做一些小的改变，还是借助 ref，这次我们 current 不用来存 count，直接用来存 cb。每个快照都重新给 current 赋值， 这样每秒执行的 cb 都是一个新的 cb，每个新的 cb 中都使用了新的 count，而不再是调用 useCountDown 那个快照中的 count。  
我参考的文章《使用 React Hooks 声明 setInterval》中正是这样做的

```js
export default () => {
  const cbSaver = useRef();
  const [count, setCount] = useState(60);

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

### “以旧推新” 的思路

其实不使用 ref，也可以解决问题。这种方式可以理解为:是在给 React“发送指令”告知如何更新状态,不需要关心当前值是什么，只要对 “旧的值” 进行修改即可。
能获取到“旧的值”的方案有两种。一个是 形如 setSome(old=>old-1) 这样的 updater，另外一个就是把 useState 换成 useReducer。

#### 先说使用形如 setCount(count=>count-1) 这样的 updater 吧！

**优点**：代码最简单，在原有的代码上改造最小。  
**局限**：①updater 中无法获取到新的 props。② 数据复杂时，不好管理

> 对 ① 的举例 ：当 count 每次不是减 1 而是根据 prop 进行动态改变具体的减量的时候。第 ② 点，后面会提到。

```js
export default () => {
  const [count, setCount] = useState(60);
  const updater = (count) => count - 1;
  if (count === 0) {
    //清除定时器等操作
  }
  const useCountDown = () => {
    setInterval(() => {
      // 这里取到的 count 永远是 60
      setCount(updater); //updater 函数体内不可以读取到新的 props
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

#### 使用 useReducer

在我看来是上面 updater 方案的一个升级版本。它能够获取新的 props，也更适用于数据复杂的情况（现在还体现不出来，后面加上清除定时器的逻辑会有所体现）。

<!-- useReducer 返回的 state 并不是一个生命周期内的变量，它还是只属于当前快照的一个普通变量。和 useRef 不同哦。 -->

```js
export default () => {
  const reducer = (state) => state - 1; //reducer 函数体内可以读取到新的 props
  const [state, dispatch] = useReducer(reducer, 60);
  if (state === 0) {
    //清除定时器等操作
  }
  const useCountDown = () => {
    setInterval(() => {
      // 这里取到的 state 永远是 60
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

## 补充逻辑

### ref 方案

```js
export default () => {
  const cbSaver = useRef();
  const [count, setCount] = useState("");
  const [timer, setTimer] = useState(null);
  if (count === 0) {
    timer && clearInterval(timer);
    timer && setTimer(null);
  }
  cbSaver.current = () => {
    setCount(count - 1);
  };

  const useCountDown = () => {
    const t = setInterval(() => {
      cbSaver.current();
    }, 1000);
    setTimer(t);
    setCount(5);
  };

  return (
    <>
      {timer ? (
        <button>{count}</button>
      ) : (
        <button onClick={useCountDown}>倒计时</button>
      )}
    </>
  );
};
```

《使用 React Hooks 声明 setInterval》文章中最后提取出了一个自定义的 hook ，本来我也是想提取出一个自己的 hook。但是我发现，我和参考文章不同的是，我是需要点击触发定时器，这样的话 hook 就不是在函数式组件顶层调用，违背了 hook 的原则。这种情况，死活不知道咋写才能提取出来。请大佬们指路

### updater 方案、useReducer 方案

- updater 方案

```js
export default () => {
  const [count, setCount] = useState(5);
  const [timer, setTimer] = useState(null);
  const updater = (count) => count - 1;
  if (count === 0) {
    timer && clearInterval(timer);
    timer && setTimer(null);
  }
  const useCountDown = () => {
    const t = setInterval(() => {
      // 这里取到的 count 永远是 60
      setCount(updater); //updater 函数体内不可以读取到新的 props
    }, 1000);
    setCount(5);
    setTimer(t);
  };
  return (
    <>
      {timer ? (
        <button>{count}</button>
      ) : (
        <button onClick={useCountDown}>倒计时</button>
      )}
    </>
  );
};
```

- useReducer 方案

```js
export default () => {
  const reducer = (state, { type, payload }) => {
    if (type === "deCount") {
      return { ...state, count: state.count - 1 };
    }
    if (type === "createTimer") {
      return { count: 5, timer: payload };
    }
    if (type === "clearTimer") {
      clearInterval(state.timer);
      return { count: 0, timer: null };
    }
  };
  const [state, dispatch] = useReducer(reducer, {});

  if (state.count === 0) {
    state.timer && dispatch({ type: "clearTimer" });
  }
  const useCountDown = () => {
    const timer = setInterval(() => {
      dispatch({ type: "deCount" });
    }, 1000);
    dispatch({ type: "createTimer", payload: timer });
  };

  return (
    <>
      {state.timer ? (
        <button>{state.count}</button>
      ) : (
        <button onClick={useCountDown}>倒计时</button>
      )}
    </>
  );
};
```

当数据管理多了的时候，并且多个 state 直接相互依赖，useState+updater 的方案不如 useReducer 方案逻辑更加清晰易读。虽然在这个例子上体现不是很明显，但是有一些场景，useReducer 优势体现更明显[比如](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)。

## 参考

[useEffect 指南](https://overreacted.io/a-complete-guide-to-useeffect/)    

[使用 React Hooks 声明 setInterval](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)   

[React-Hook usereducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)    

[React-Hook useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)    

