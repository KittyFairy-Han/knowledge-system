<!--
 * @Author: hanqing5
 * @Date: 2021-03-29 08:57:45
 * @LastEditors: your name
 * @LastEditTime: 2021-04-08 13:52:52
 * @Description: 文件描述
-->

# 渲染性能

[【阮一峰-网页性能管理详解】](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)

## 一、渲染流程

1. Parsing：HTML 代码转化成 DOM、CSS 代码转化成 CSSOM（CSS Object Model）
2. Construction：结合 DOM 和 CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
3. Layout：生成布局（layout），即将所有渲染树的所有节点进行平面合成
4. Paint：将布局绘制（paint）在屏幕上

对应到性能面板，"Scripting" 阶段主要涉及到 JavaScript 的执行，包括 DOM 和 CSSOM 的构建。"Rendering" 阶段主要涉及到渲染树的构建和布局的计算。"Painting" 阶段则涉及到像素的绘制，这部分工作最后会交给 GPU 完成。

1. CPU-Scripting ->
2. CPU-Rendering 紫色->
3. CPU-Rendering 紫色->
4. CPU-Painting 绿色 -> Gpu

当用户操作改变布局时，从第 2 步继续开始。也就是回流 reflow。  
当用户操作改变外观但是不改变布局时，从第 4 步开始。也就是重绘 repaint。

## 二、reflow 和 repaint

以下三种情况，会导致网页重新渲染。

- 修改 DOM
- 修改样式表
- 用户事件（比如鼠标悬停、页面滚动、输入框键入文字、改变窗口大小等等）

重新渲染，就需要重新生成布局和重新绘制。前者叫做"重排"（reflow），后者叫做"重绘"（repaint）。

## 三、对于性能的影响

一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染。

- offsetTop/offsetLeft/offsetWidth/offsetHeight
- scrollTop/scrollLeft/scrollWidth/scrollHeight
- clientTop/clientLeft/clientWidth/clientHeight
- getComputedStyle()

所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面。

```js
// bad
div.style.left = div.offsetLeft + 10 + "px";
div.style.top = div.offsetTop + 10 + "px";

// good
var left = div.offsetLeft;
var top = div.offsetTop;
div.style.left = left + 10 + "px";
div.style.top = top + 10 + "px";
```

一般的规则是：

- 样式表越简单，重排和重绘就越快。
- 重排和重绘的 DOM 元素层级越高，成本就越高。
- table 元素的重排和重绘成本，要高于 div 元素

## 四、提高性能的九个技巧

vdom、离线 dom、display=none、用 class 而不是一条一条改变、position=absolute||fixed 对 reflow 耗能小、visibility 只 repaint、js 动画使用 window.requestAnimation

## 考点

### 什么是回流和重绘

- 回流：布局改变
- 重绘：布局不改变

### 什么情况触发回流

- 增删 dom
- 已有 dom 尺寸和位置变化
- 激活伪类
- 窗口改变

### 回流的影响范围

自身肯定回流，对其他元素有无影响取决于是否让其他元素尺寸大小发生改变

### 为什么 Transform 不回流

- 即使位置大小改变，但实际的布局不改变（不会影响到元素的盒模型尺寸和位置），不回流
- 会创建复合层，gpu 为 cpu 分担计算压力，减少 cpu 的重绘工作量。

### 还有哪些属性可以创建复合层

opacity、filter、perspective、backface-visibility、will-change

### 复合层有缺点吗？

滥用会过渡消耗内存空间

### 如何理解 CPU、GPU 在回流和重绘中的职责？

在浏览器的渲染过程中，回流和重绘都会涉及到 CPU 和 GPU 的计算。

- 回流：这个过程主要由 CPU 完成，因为它涉及到布局（元素的位置和大小）的计算。

- 重绘：这个过程通常涉及到 CPU 和 GPU。CPU 负责计算绘制操作（比如说确定哪些像素需要改变），然后 GPU 负责实际的绘制（填充颜色等）。

### 从 CPU 和 GPU 的工作量分析，硬件加速和复合层如何达到优化？

在某些情况下，浏览器会尝试优化这个过程，比如通过创建复合层（compositing layers）或者使用硬件加速，让 GPU 分担 CPU 的压力。但是，这并不意味着重绘完全不需要 CPU，因为在 GPU 开始绘制之前，CPU 仍然需要计算出哪些部分需要重绘，原来还需要计算那些像素需要改变，现在这部分就 GPU 去计算。
