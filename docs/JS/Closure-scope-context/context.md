<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 21:02:07
 * @LastEditors: your name
 * @LastEditTime: 2020-11-21 20:39:48
 * @Description: file content
-->

## this 难在哪里

javaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this 就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this 的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。avaScript 提供了 call、apply、bind 这三个方法，来切换/固定 this 的指向。

## 使用情景以及指向

- 全局环境
  this === window;

```js
this === window; //true
function f1() {
  console.log(this);
}
f1(); //window
```

- 构造函数
  this===当前实例
- 对象方法
  this===调用它的对象

```js
const o = {
  f: function() {
    console.log(this === o);
  },
};
o.f(); //o
```

- 多层嵌套
  - **实际应用时应该避免多层嵌套使用 this**

```js
const o = {
  child: function() {
    const grandChild = function() {
      console.log(this);
    };
    grandChild();
  },
};
o.child(); //window
```

- 箭头函数
  this===定义时，最近一层非箭头函数的 this,和调用时无关

```js
const o = {
  child1: {
    grandChild1: () => {
      console.log(this);
    },
  },
  child2: function() {
    const grandChild2 = () => {
      console.log(this);
    };
    grandChild2();
  },
};
o.child1.grandChild1(); //window
o.child2(); //o
```

## 考点

```js
const o = {
  f: function() {
    console.log(this);
  },
};
o.f(); //o
const g = o.f;
g(); //window
```
  可以这样理解，JavaScript 引擎内部，o 和 o.f 储存在两个内存地址，称为地址一和地址二。o.f()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this 指向 o。但是，上面第二种情况，是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此 this 指向全局环境。

``` js

const o = {
  p: 1,
  mid: {
    f: function() {
      console.log(this);
    },
  },
  child3: function() {
    return function grandChild3() {
      console.log(this);
    };
  },
  child4: function() {
    function grandChild4() {
      console.log(this);
    }
    grandChild4();
  },
};
o.mid.f(); //o.mid
o.child3()(); //window
o.child4(); //window
```

```js
(function() {
  function a() {
    console.log(this);
    function b() {
      console.log(this);
      function c() {
        console.log(this);
      }
      c();
    }
    b();
  }
  a();
})();
// window,window,window
```


## 使用时需要注意(非箭头函数)

- 尽量避免多层嵌套时使用 this
- 数组回调函数、dom 事件回调函数尽量避免使用 this
