# 闭包

## 闭包是什么？

> 通过作用来理解

- 保持函数内部变量， 使其在函数结束执行之后仍可以访问

```js
//1
function createIncrementor(start) {
  return function() {
    console.log(start);
    return start++;
  };
}

var incre = createIncrementor(5);

incre(); // 5
incre(); // 6
incre(); // 7

//2
// 输出全为10
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 50);
}
// 输出相应的输出
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 50);
  })(i);
}
```

- 封装私有属性

```js
function Person() {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge,
  };
}

var p1 = Person();
p1.setAge(25);
p1.getAge(); // 25
p1._age; // undefined
```

## 考点

- 闭包容易出错的地方:闭包与循环

```js
// 栗子1
function outer() {
  var result = [];
  for (var i = 0; i < 10; i++) {
    result[i] = function() {
      console.log(i);
      i++;
    };
  }
  return result;
}
var inners = outer();
for (var i = 0; i < 10; i++) {
  inners[i](); //10,11,12,.....19 而不是 0,1,2,...9
}

// 栗子2
// function asyncTask(cb){
//   setTimeout(cb, 100);
// }
// function nowExe(cb){
//   cb()
// }
function task() {
  let arr = [0, 1, 2];
  for (var i = 0; i < 3; i++) {
    var inner = function() {
      console.log(arr[i]);
      console.log(i);
    };
    inner(); //arr[i] 分别为 0 1 2 ，i 分别为 0 1 2
    // nowExe(inner)
    // asyncTask(inner)
    setTimeout(inner, 100); //arr[i] 分别为 undeifined undeifined undeifined，i 分别为 3 3 3
  }
}
task(); // 0 0 1 1 2 2 undeifined 3 undeifined 3 undeifined 3
// 为 undifiend 的原因是 arr[3] 不存在
```

- 闭包容易出错的地方:this

```js
object.getNameFunc(); // The Window
var object = {
  name: "My Object",
  getNameFunc: function() {
    var t = function() {
      console.log(this.name);
    };
    return t;
  },
};
object.getNameFunc()(); // The Window
var object = {
  name: "My Object",
  getNameFunc: function() {
    (function() {
      console.log(this.name);
    })();
  },
};
object.getNameFunc(); // The Window
```


### 从原理上说一下闭包怎么产生的
与 JavaScript 的函数和变量的作用域有关。可以举inner、outer的函数例子说明。  
在 JavaScript 中，函数可以形成作用域，这意味着函数内部的变量在函数外部是无法直接访问的。但是，如果一个函数内部定义了另一个函数，并且这个内部函数引用了外部函数的变量，那么即使外部函数执行完毕，这个变量也不会被销毁，因为内部函数还持有对它的引用。这个时候，就形成了一个闭包。  
所以，闭包的主要用途是保存状态和实现私有成员。

## 应用

- 函数柯里化，意义：
提高函数的可组合性、延迟计算/运行、参数复用
- - 参数复用：柯里化可以使得函数在多次调用中复用某些参数，减少重复代码。
- - 延迟计算/运行：柯里化的函数不会立即求值，而是通过闭包的形式保存参数，只有在真正需要结果的时候才进行计算。
- - 提高函数的可组合性：柯里化后的函数更容易和其他函数组合在一起，创建更复杂的函数。



```js
/* 函数柯里化 */
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
//测试
let add = (x, y, z) => {
  return [x, y, z];
};

let curringAdd = curryN(3, add);
curringAdd(1)(2)(3);
```

- 移动端节流和防抖

```js
//节流
let debounce = function(fn, delay) {
  let timer = null;
  let context = this;
  return function() {
    args = arguments;
    //每次一调用函数时，取消上一次的定时
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

//防抖
let throttle = function(cb, delay, wait) {
  let start;
  let timer;
  const context = this;
  return function() {
    args = arguments;
    let current = new Date();
    timer && clearTimeout(timer);
    if (current - start < wait) {
      timer = setTimeout(() => {
        cb.apply(context, args);
      }, delay);
    } else {
      cb.apply(context, args);
      start = current;
    }
  };
};
```

[验证节流防抖](throttle.html)

- 在 three 的控制器中应用了闭包来保持内部变量，同时也封装私有属性