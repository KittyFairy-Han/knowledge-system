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

## 应用

- 函数柯里化

```js
/* 函数柯里化 */

function add(x, y, z) {
  return [x, y, z];
}

function curringAdd(x) {
  return function fn1(y) {
    return function fn2(z) {
      return add(x, y, z);
    };
  };
}

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
