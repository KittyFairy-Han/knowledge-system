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

1. HTML 代码转化成 DOM
2. CSS 代码转化成 CSSOM（CSS Object Model）
3. 结合 DOM 和 CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
5. 将布局绘制（paint）在屏幕上

## 二、reflow 和 repaint

以下三种情况，会导致网页重新渲染。

-   修改 DOM
-   修改样式表
-   用户事件（比如鼠标悬停、页面滚动、输入框键入文字、改变窗口大小等等）

重新渲染，就需要重新生成布局和重新绘制。前者叫做"重排"（reflow），后者叫做"重绘"（repaint）。

## 三、对于性能的影响

一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染。

-   offsetTop/offsetLeft/offsetWidth/offsetHeight
-   scrollTop/scrollLeft/scrollWidth/scrollHeight
-   clientTop/clientLeft/clientWidth/clientHeight
-   getComputedStyle()

所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面。

```js
// bad
div.style.left = div.offsetLeft + 10 + 'px'
div.style.top = div.offsetTop + 10 + 'px'

// good
var left = div.offsetLeft
var top = div.offsetTop
div.style.left = left + 10 + 'px'
div.style.top = top + 10 + 'px'
```

一般的规则是：

-   样式表越简单，重排和重绘就越快。
-   重排和重绘的 DOM 元素层级越高，成本就越高。
-   table 元素的重排和重绘成本，要高于 div 元素

## 四、提高性能的九个技巧

vdom、离线 dom、display=none、用 class 而不是一条一条改变、position=absolute||fixed 对 reflow 耗能小、visibility 只 repaint、js 动画使用 window.requestAnimation