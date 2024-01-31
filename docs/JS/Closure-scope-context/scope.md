<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 21:02:17
 * @LastEditors: your name
 * @LastEditTime: 2021-04-06 23:07:07
 * @Description: file content
-->

# 作用域

## 局部代码块作用域

> 块级作用域使广泛应用的 IIFE 不在必要了

- es6 中，全局变量不直接挂在 window 对象上

```js
var a = "通过 var 声明的 a";
const d = "通过 const 声明的 d";
a; //'通过 var 声明的 a'
this.a; //'通过 var 声明的 a'
window.a; //'通过 var 声明的 a'
d; //'通过 const 声明的 d'
this.d; //undefind
window.d; //undefind
window === this; //true
```

- es5 没有块级作用域，es6 才有。es6 中的 let const 声明的变量是存在局部作用域的。

```js
if (true) {
  let a = 0;
  const b = 1;
  var c = 2;
}
a; //报错
b; //报错
c; //2
```

- let const 和 var 不一样，不存在变量提升
- const 声明和赋值必须同时进行
- const 声明复合类型时 是指地址不能改变

```js
function outer() {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result[i] = function() {
      console.log(i); // 这个i不在全局所以当执行result[i]函数的时候i不是10
    };
  }
  return result;
}
const inners = outer();
for (let i = 0; i < 10; i++) {
  inners[i](); //0,1,....,9
}
```

## 改变作用域

- with 和 catch 会将对象中标识符的解析添加到作用域链的最前端，标识符的解析就是 with（）和 catch（）括号中的对象。
- eval 如果字符串中有新定义函数，那么它就有可能再建一个执行环境。

```js
var x = 10,
  y = 10;

with ({ x: 20 }) {
  alert(x); // 20
  alert(y); // 10
}

alert(x); // 10
alert(y); // 10
```


## 题目
[作用域相关的题目](https://blog.csdn.net/qq_32560473/article/details/79774565)
### let 为什么不能重复定义
为了防止变量声明的混乱和错误。这个规则有助于提高代码的可读性和可维护性。
### 函数作用域什么时候创建的
定义的时候  
但是它的生命周期开始于函数的调用时刻。当函数被调用时，会创建一个新的执行上下文，包括创建一个新的作用域链，然后将这个新创建的执行上下文推入执行上下文栈，成为当前正在执行的上下文。当函数执行完毕后，这个执行上下文会被销毁，作用域结构还是存在的，但是作用域信息随之销毁。