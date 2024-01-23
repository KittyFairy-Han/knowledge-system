---
theme: v-green
highlight: an-old-hope
---



  &nbsp;&nbsp; 坐标杭州，快两年工作经验。面了杭州的阿里、网易、滴滴、上海的字节。<br>
  &nbsp;&nbsp; 整个过程下来，最喜欢的是网易和字节的广告投放部门，不论业务类型还是流程友好度方面。<br>
  &nbsp;&nbsp; 面试问题能记住的都写在下面了，算是自己复盘一遍，希望能够帮到你查缺补漏,项目上引出的通用前端问题也写了，纯项目业务的就不写啦。<br>

## 总结

### 一 针对前端技术问答型的题

问答类型的题就是考前端的深度和广度。都是针对简历中写的技能来考察，然后适当加深度。有时候简历中没提到的，面试官也会问，但是不会问很深，就属于广度方面吧。<br>
**频率高的**：闭包和作用域、事件循环、异步、跨域、前端存储、缓存、技术栈（我没用过 react，所以都是问我 vue 的问题）、库（axios）、http。这些会比较深入原理去问<br>
**频率较低**：模块化、webworker、前端安全、错误监控、性能、内存、webpack 这些一般问的比较浅<br>

### 二 项目类型的问题

个人感觉，说项目的时候要想好思路，说出解决了难点或者有什么亮点，进而说出自己的贡献和过程中的成长。<br>
我的项目有时候会引出一些通用的前端技术的问题，大家可以参考看看。

- webpack 里面的 loader、plugin 区别，在 webpack 打包流程中哪个环节作用？
- 常用的 loader 介绍一下
- 写过 loader 和 plugin 吗？
- 现在要写一个 loader 实现把中文全部整理出来，思路？
- AST 了解吗
- 如何在运行时拿到打包阶段的变量
- if(process.env.NODE_ENV == "development"){require(a.js)} 这个代码在打包的时候会打包进去吗
- tree-shaking 是什么? 什么语法才能 tree-shaking? import \* 会进行 tree-shaking 吗?
- webpack 划分 chunk 的几种情况
- webpack 怎么控制输出文件的名称？
- 两个浏览器标签页直接通信的方式？如何实时通信？

因为我有个项目是主要做前端工程化方面的，然后会对 webpack 工作流程要了解多一点，所以可能这部分会问的多一点。

### 三 输出类型的题

一般所有视频面试都会考作用域、闭包、this 指向、时间循环方面的输出题，就是给你一段代码，问执行过程。<br>
这种类型的题我记不清当时代码了，每次题目考察的细节都不一样，唯一的正解就是多多多刷题，难免总是有写细节没练习到。

### 四 实现类型的问题

有的时候是半命题的（比如实现一个数组的拍平，要求用到 toString）,这种情况就是要按要求写函数。如果有其他思路最好也说一下，或者实现一下。总之在达到要求的基础上方法思路越多越好。<br>
很多题目都是数字字符串相互转换，然后熟练运用实例方法，来达到解题的目的。另外就是闭包的应用、正则的应用、递归的应用。<br>
这篇面经涉及的编程题，我当时的作答我会写到文章最下面。

## 字节-商品化

### 一面 
（我感觉是随缘问）

- 作用域方面的题涉及严格模式，问输出
- 强缓存和协商缓存流程 cache-control 有哪些值都是什么含义
- https 原理
- http1->1.1->2 区别
- TCP 和 UDP 区别
- fetch 用过吗
- promise 有几种状态
- axios 的 timeout 如何实现的?用 fetch 和 promise 实现一个有 timeout 的请求<br>
[模仿 axios 的 timeout 功能](#axiosTimeout).
- 讨论了半天 reflow 和 repaint。列举各种情况问是否有 reflow，现在只记得问到遮挡都能给我问懵。
- 用 fixed 定位 flex 是否生效

### 二面 编程

记得是 8 个题，想破脑袋，也只回忆起了 5 个。

- css 水平垂直居中写出三种以上方案
- 作用域方面的题，问输出
- 实现节流防抖函数，说出区别<br>
[节流和防抖](#debounceThrottle)
- 经典问题，实现一个 new<br>
[实现 new](#codingNew)
- 实现函数，传入两个数组 ,返回一个数组
  （这道题到现在我都...，描述少）

```js
//传入
["A1", "A2", "A3", "B1", "B2", "C1", "C2", "C3", "C4"][("A", "B", "C", "D")][
  //返回
  ("A1", "A2", "A3", "A", "B1", "B2", "B", "C1", "C2", "C3", "C4", "C", "D")
];
```

## 阿里-淘宝

### 一面 编程+简历

#### 半小时笔试

- 实现 EatMan，达到以下效果。<br>
[EatMan](#EatMan)

```js
/**
 * 实现一个EatMan
 * 说明：实现一个EatMan，EatMan可以有以下一些行为
 * 示例：
 *  1. EatMan(“Hank”)输出:
 *   Hi! This is Hank!
 *  2. EatMan(“Hank”).eat(“dinner”).eat(“supper”)输出
 *   Hi This is Hank!
 *   Eat dinner~
 *   Eat supper~
 *  3. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”)输出
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
 *  4. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”).eatFirst("breakfast")输出
 *   Eat breakfast~
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
 */
```

- 实现 curry 函数 。接受两个参数，第一个参数是一个函数，第二个参数是参数个数。达到以下效果。<br>
> // 深拷贝复制所有层，浅拷贝只复制第一层
[函数柯里化](#condingCurry)

```js
let curAdd = curry((a, b) => a + b, 2);
let curMul = curry((a, b, c) => a * b * c, 3);

curAdd(1)(2); //3
curMul(1)(2)(3); //6
```

#### 考察简历

时间很短，半小时以内。

- generator 函数 、yaild 使用经验？和 async await 的区别？
- asycn await 解决了前端的一个经典问题，是什么？
- 前后发送同一个请求多次，怎么中断后面的请求？

## 网易(offer)

(全程所有面试官包括hr都nice极了 o((>ω< ))o)
(高帅单身小伙hr让我写面经q一下他)

### 一面 考察简历

- css 伪元素使用时需要注意什么
- 水平垂直居中
- service worker 了解过吗
- 单线程、异步、事件循环的关系
- 事件轮询流程说一下
- 前端缓存方案
- 前端存储方案
- v-if、v-for 想要同时用怎么办
- v-for 的 key 作用
- vue 热更新的原理
- vue 的双向绑定
- 前端路由两种模式的原理和优缺点
- 前端中应用到了哪些数据结构
- https 加密原理
- 虚拟 DOM 干嘛的。随之出了一个数据结构树的题，记不清咋问的了
- 小程序和微信的通信，是怎么做的了解多少说多少
- 对于简历上的项目问了一些前端问题，在第二部分提到的问题范围内。

### 二面 编程+情景题

- 事件轮询方面的题，问输出
- 实现函数 找出两个数组的不重合部分，方法越多越好。<br>
[找数组不重合元素](#notCommon)
- 实现 sleep 函数 <br>
[sleep](#sleep)
- 实现函数找出 1-10000 中的对称数 <br>
[找对称数](#symNumber)
- 骨架图了解过吗
- 日志上报
- 怎么防刷
- xss 和 crsf 原理和应对方案
- 前端优化

### 三面 项目+职业规划

- 职业规划方面
- 平时如何学习

## 滴滴(offer)

一面时间半小时，二面时间 45 分钟左右，面试时间最短，问的问题也最少，主要抓住一个点考深度，不会面面俱到的考每一项技术问题。<br>
整体印象就是以上，但是能想起来的问题就这几个了，我好像失忆了。

- 小程序和 web 区别
- vue 和 react 对比
- vue3 比 vue2 哪些方面提升了？你觉得最重要的是哪个点？
- jq 对比 vue （或者 react）。哪个性能好？
- 为什么要有虚拟 DOM?虚拟 DOM 是干嘛的？
- 操作一个 dom 节点，是 jq 快还是 vue 快。为什么？

## 字节-广告投放

（hr小哥哥小姐姐很友好）

### 一面 简历+编程

- rem、em 区别
- 浏览器最小显示 12 像素字体，但是现在要求显示 10 像素的怎么办
- 页面的自适应
- 强缓存和协商缓存具体流程，相关请求头和响应头字段
- v-for 时候的 key 是干嘛的
- promise.all 是串行还是并发？一个串行的异步实现思路
- 实现节流防抖函数，说出区别<br>
[节流防抖](#debounceThrottle)
- 实现数组拍平方法（应用到 toString）<br>
[找对称数](#flatArr)
- 对于简历上的项目问了一些前端问题，在第二部分提到的问题范围内。

### 二面 项目＋编程题

(最久的面试 100 分钟左右，没有之一，但这个面试官真的nice)<br>
本来说要出两个编程题，但是由于时间关系，没来得及出第二题 hhh。

- 事件循环。setTimeout(fn,2000)。2s 后一定执行函数了吗？从事件表、事件队列、执行栈的方向说以下 2s 的时候内存在干嘛？
- setTimeout 和 requestAnimation 在性能上的区别?
- 怎么进行前端的性能监控？哪些指标可以用来检测前端性能？
- 实现 Reader <br>
[Reader](codingReader)

```js
let arr = [1, 2, 3, 4, 5, 6];
const reader = arr.getReader();
console.log(reader.read()); // [1]
console.log(reader.read("a")); // stirng is illegal
console.log(reader.read(1.5)); // decimal number is illegal
console.log(reader.read(-1)); // nagative number is illegal
console.log(reader.read(1)); // [2]
console.log(reader.read(2)); // [3, 4]
console.log(reader.read(3)); // [5, 6]
console.log(reader.read()); // []
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

- 循环依赖怎么处理的

### 三面 项目＋编程题

- 用 requestAnimation 实现 \_setTimeout [用requestAnimation实现setTimeout](#_setTimeout)

```js
_setTimeout(() => {
  console.log("2222");
}, 5000);
```


- 实现函数找出字符串中的最长升串[最长升值子串](#maxLen)

```js
console.log(getMaxSort("124378925123456")); //123456
```


## 阿里-乌鸫科技(offer)

写不动了....明天再写

## 编程题

下面是我写的答案，仅仅仅供参考

### axios timeout

<div id="axiosTimeout"></div>

```js
//待补充
```

### 节流防抖

<div id="debounceThrottle"></div>

```js
function debounce(fn, delay) {
  const ctx = this;
  let timer;
  return function () {
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, delay);
  };
}
function throttle(fn, delay, wait) {
  const ctx = this;
  let start;
  let timer;
  return function () {
    const args = arguments;
    if (!start) {
      start = getNow();
    }
    const now = getNow();
    if (now - start < wait) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(ctx, args);
      }, delay);
    } else {
      fn.apply(ctx, args);
      start = getNow();
    }
  };
}
function getNow() {
  return new Date().getTime();
}
```

### 写一个 new

<div id="codingNew"></div>

```js
const myNew = function (constructor) {
  let o = Object.create(constructor.prototype);
  const k = constructor.call(o);
  if (typeof k === "object") { // 如果是简单类型则还是 return o
    return k;
  } else {
    return o;
  }
};
```

### EatMan

<div id="EatMan"></div>

```js
class EatManClass {
  constructor(name) {
    this.normalEvents = [];
    this.firstEvents = [];
    this.sayHi(name);
    setTimeout(() => {
      this.doEat();
    });
  }
  sayHi(y) {
    const fn = (x) => {
      console.log(`Hi! This is ${x}!`);
    };
    this.normalEvents.push([y, fn]);
  }
  eat(y) {
    const fn = (x) => {
      console.log(`Eat ${x}~`);
    };
    this.normalEvents.push([y, fn]);

    return this;
  }
  eatFirst(y) {
    const fn = (x) => {
      console.log(`Eat ${x}~~~`);
    };
    this.firstEvents.push([y, fn]);

    return this;
  }
  doEat() {
    this.firstEvents.forEach(([param, fn]) => {
      fn(param);
    });
    this.normalEvents.reverse().forEach(([param, fn]) => {
      fn(param);
    });
  }
}
function EatMan(name) {
  return new EatManClass(name);
}
```

### 函数柯里化

<div id="condingCurry"></div>

```js
function curryN(n, fn) {
  const args = [];
  function stepCurry(n, fn) {
    return (stepX) => {
      args.push(stepX);
      return n == 1 ? fn(...args) : stepCurry(n - 1, fn);
    };
  }
  return stepCurry(n, fn);
}
```

### 找两个数组不重合元素

<div id="notCommon"></div>

```js
function findNotCommon(arr, brr) {
  //待补充
}
```

### sleep

<div id="codingSleep"></div>

```js
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
```

### 找对称数

<div id="symNumber"></div>

```js
function findSymNumber(arr, brr) {
  //待补充
}
```

### 数组拍平

<div id="flatArr"></div>

```js
function flat(arr) {
  let result = [];
  function step(current) {
    if (Array.isArray(current)) {
      for (let ele of current) {
        step(ele);
      }
    } else {
      result.push(current);
    }
  }
  step(arr);
  return result;
}
function flatByStr(arr) {
  const str = String(arr);
  const str1 = str.replace(/[/,'').replace(/]/, "");
  const result = str1.split(",");
  return result;
}
```

### Reader

<div id="codingReader"></div>

```js
Array.prototype.getReader = function () {
  let arr = this;
  let start = 0;
  return {
    read: function (len) {
      const type = typeof len;

      if (type == "undefined") {
        len = 1;
      }
      if (type !== "number" && type !== "undefined") {
        console.error(`${type} is illegal`);
        return;
      }
      if (len < 0) {
        console.error(`nagative number is illegal`);
        return;
      }
      if (String(len).split(".").length > 1) {
        console.error(`decimal number is illegal`);
      }

      let end = start + len;
      if (start >= arr.length) {
        return [];
      }

      try {
        const result = arr.slice(start, end);
        //console.log(result)
        start = end;

        return result;
      } catch (e) {
        console.log(e);
      }
    },
  };
};
```

### 用requestAnimation实现setTimeout
<div id="_setTimeout"></div>

```js
function _setTimeout(fn, delay) {
  let endTime = getCur() + delay;
  let timer;
  let step = () => {
    if (getCur() >= endTime) {
      fn();
      cancelAnimationFrame(timer);
    } else {
      requestAnimationFrame(step);
    }
  };
  timer = requestAnimationFrame(step);
}
function getCur() {
  return new Date().getTime();
}
```

### 最长升值子串
<div id="maxLen"></div>

```js
function getMaxSort(str) {
  let arr = str.split("");
  let maxArr = [];
  function step(start) {
    let base = arr[start];
    let sortArr = [base];
    let j = start + 1;
    while (j < arr.length) {
      let cur = arr[j];
      if (cur <= base) {
        break;
      }
      sortArr.push(cur);
      j++;
      base = cur;
    }
    if (maxArr.length < sortArr.length) {
      maxArr = sortArr;
    }
    if (j < arr.length) {
      step(j);
    }
  }
  step(0);
  return maxArr.join();
}
```



