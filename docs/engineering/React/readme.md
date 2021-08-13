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
// 2s 后,又执行了 setCount(59)。但是不会进行第三次渲染了
// ...
// ns 后，又执行了 setCount(59)。但是不会触发渲染
```

## 如何解决
