<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-06 21:19:37
 * @LastEditors: your name
 * @LastEditTime: 2021-04-08 14:06:46
 * @Description: 内存
-->

# 内存

## JS 中的内存

像 C 语言这样的底层语言一般都有底层的内存管理接口，比如 malloc()和 free()用于分配内存和释放内存。<br>
而对于 JavaScript 来说，会在创建变量（对象，字符串等）时分配内存，在不用的时候会自动释放（垃圾回收）。<br>
因为自动垃圾回收机制的存在，开发人员可以不关心也不注意内存释放的有关问题，但对无用内存的释放这件事是客观存在的。

## 内存的生命周期

1. 分配（创建）：JavaScript 在定义变量时就完成了内存分配。
2. 使用（读写）：读取与写入可能是写入一个变量或者一个对象的属性值，甚至传递函数的参数。
3. 释放（垃圾回收）：JS 有自动垃圾回收机制，找出那些不再继续使用的值，然后释放其占用的内存。

## 垃圾回收机制

局部变量只在函数的执行过程中存在，当函数运行结束，没有其他引用(闭包)，那么该变量会被标记回收。<br>
全局变量的生命周期直至浏览器卸载页面才会结束，也就是说全局变量不会被当成垃圾回收。<br>
最艰难的任务是找到不再需要使用的变量。

### 引用计数法

```js
let arr = [1, 2, 3, 4]; //引用计数为1
console.log("hello world");
arr = null; //引用计数为0
```

#### 引用计数法在出现循环引用的时候，会造成内存泄漏

```js
function f() {
  let a = {};
  let b = {};
  a.p = b;
  b.p = a;
}
f();
```

```js
let div = document.createElement("div");
div.onclick = function() {
  // 这里的 this 和 div 指向一致都是createElement的那个dom节点
  console.log("click");
};
```

### 标记清除法

> 为了解决循环引用的问题，现在浏览器都是用标记清除法

垃圾收集器定时扫描具体步骤如下

1. 给存储在内存中的所有变量都加上标记。（加上标记）
2. 从根部（在 JS 中就是全局对象）出发能把触及到的变量的标记清除。（清除标记）
3. 把还带有标记的变量回收。（回收内存）

## 内存泄漏

内存泄漏就是只不在使用的值没有被释放。<br>
不幸的是，即使不考虑垃圾回收对性能的影响，目前最新的垃圾回收算法，也无法智能回收所有的极端情况。

### 常见的案例

- 意外的全局变量

```js
function f() {
  this.a = 1;
}
f();
```

- 没有及时清理的定时器和事件监听
- 闭包

```js
var theThing = null;
var replaceThing = function() {
  var originalThing = theThing;
  var unused = function() {
    if (originalThing)
      // 对于 'originalThing'的引用
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join("*"),
    someMethod: function() {
      console.log("message");
    },
  };
};
setInterval(replaceThing, 1000);
```

这段代码，每次调用 replaceThing 时，theThing 获得了包含一个巨大的数组和一个对于新闭包 someMethod 的对象。
同时 unused 是一个引用了 originalThing 的闭包。

这个范例的关键在于，闭包之间是共享作用域的，尽管 unused 可能一直没有被调用，但是 someMethod 可能会被调用，就会导致无法对其内存进行回收。
当这段代码被反复执行时，内存会持续增长。

- dom 引用

1. DOM 元素清空或删除时,内存中的引用没有设置为空指针

```js
let dom = document.getElementById("image");
function removeImage() {
  document.body.removeChild(document.getElementById("image"));
  // 这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.
}
```

2. DOM 元素清空或删除时，子元素存在 JS 引用，导致子元素的所有父元素都不会被删除

```js
// b是a的子dom节点, a是body的子节点
var aElement = document.getElementById("a");
var bElement = document.getElementById("b");
document.body.removeChild(aElement);
```

3. DOM 元素清空或删除时，绑定的事件未清除



### 如何避免

- 能不用全局变量的就不用，谨慎使用闭包
- 及时清理定时器、dom 引用
- 组织好逻辑避免死循环等

