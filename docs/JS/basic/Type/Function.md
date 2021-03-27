# 函数

## 实例属性

> _(不常用)_

- name
- length(**参数列表**的长度)
- arguments(参数对象)

## 实例方法

- call(obj,arg 1,...,arg N)
- apply(obj,[arg 1,...,arg N])
- bind(obj,[arg 1,...,arg N])

```js
let o = {};
function f(v) {
  this.a = v;
}
o.a; //undefined
f.call(o, 100); //o.a=100
f.apply(o, [200]); // o.a=200
copyF = f.bind(o, 300); //copyF=function f(v){this.a=v}
copyF(); //o.a=300
```

- call apply 无返回值，bind 返回函数，call apply 传参形式不一样

## 参数

### 特性

> _理解了就行)_

- 省略性
- 覆盖性

### arguments

- arguments 是 js 内置对象，类数组对象，本质是对象而非数组。
- arguments key 值是 '0','1','2',...
- arguments 具有 length 属性
- arguments 转换为数组的方法：

> Array-考点-like-array to array

## 函数作用域

- 函数中的变量作用域于定义有关，与执行无关
- this 与执行有关
  > 箭头函数内部的 this 除外

## 立即执行函数 IIFE

- 避免污染全局变量
- 内部封装单独的作用域，封装私有变量，外部无法读取

## 箭头函数特点

与普通函数不同的地方：

- 没有 arguments
- 不能做构造函数，因为没有自己的 this
- this 指向与定义有关，与调用无关

## 考点

### 用 apply 写 bind

```js
Function.prototype.myBind = function(context, ...args) {
  // let self = this;
  // return function(){
  //     self.apply(context,args)
  // }
  return () => {
    this.apply(context, args);
  };
};

function testFn(m, n, o) {
  console.log(`${this.name}-${m}-${n}-${o}`);
}

let obj = {
  name: "hanq-bind",
};

testFn.myBind(obj, 1, 2, 3)();
```

### 实现 call

```js
Function.prototype.myCall = function(context, ...args) {
  if (!context) {
    console.error("no context");
    return;
  }
  context.fn = this;
  let result = context.fn(args);
  delete context.fn;
  return result;
};
```

### 实现 apply

```js
Function.prototype.myApply = function(context, args) {
  if (!context) {
    console.error("no context");
    return;
  }
  context.fn = this;
  let result = context.fn(args);
  delete context.fn;
  return result;
};
```

### 实现 bind

```js
Function.prototype.myBind = function(context, args) {
  if (!context) {
    console.error("no context");
    return;
  }

  return () => {
    context.fn = this;
    let result = context.fn(args);
    delete context.fn;
    return result;
  };
};
```
