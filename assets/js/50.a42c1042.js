(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{439:function(t,s,a){"use strict";a.r(s);var e=a(42),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"渲染性能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#渲染性能"}},[t._v("#")]),t._v(" 渲染性能")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("【阮一峰-网页性能管理详解】"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"一、渲染流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、渲染流程"}},[t._v("#")]),t._v(" 一、渲染流程")]),t._v(" "),a("ol",[a("li",[t._v("HTML 代码转化成 DOM")]),t._v(" "),a("li",[t._v("CSS 代码转化成 CSSOM（CSS Object Model）")]),t._v(" "),a("li",[t._v("结合 DOM 和 CSSOM，生成一棵渲染树（包含每个节点的视觉信息）")]),t._v(" "),a("li",[t._v("生成布局（layout），即将所有渲染树的所有节点进行平面合成")]),t._v(" "),a("li",[t._v("将布局绘制（paint）在屏幕上")])]),t._v(" "),a("h2",{attrs:{id:"二、reflow-和-repaint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、reflow-和-repaint"}},[t._v("#")]),t._v(" 二、reflow 和 repaint")]),t._v(" "),a("p",[t._v("以下三种情况，会导致网页重新渲染。")]),t._v(" "),a("ul",[a("li",[t._v("修改 DOM")]),t._v(" "),a("li",[t._v("修改样式表")]),t._v(" "),a("li",[t._v("用户事件（比如鼠标悬停、页面滚动、输入框键入文字、改变窗口大小等等）")])]),t._v(" "),a("p",[t._v('重新渲染，就需要重新生成布局和重新绘制。前者叫做"重排"（reflow），后者叫做"重绘"（repaint）。')]),t._v(" "),a("h2",{attrs:{id:"三、对于性能的影响"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、对于性能的影响"}},[t._v("#")]),t._v(" 三、对于性能的影响")]),t._v(" "),a("p",[t._v("一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染。")]),t._v(" "),a("ul",[a("li",[t._v("offsetTop/offsetLeft/offsetWidth/offsetHeight")]),t._v(" "),a("li",[t._v("scrollTop/scrollLeft/scrollWidth/scrollHeight")]),t._v(" "),a("li",[t._v("clientTop/clientLeft/clientWidth/clientHeight")]),t._v(" "),a("li",[t._v("getComputedStyle()")])]),t._v(" "),a("p",[t._v("所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// bad")]),t._v("\ndiv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" div"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\ndiv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("top "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" div"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// good")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" div"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetLeft\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" top "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" div"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetTop\ndiv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\ndiv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("top "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" top "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\n")])])]),a("p",[t._v("一般的规则是：")]),t._v(" "),a("ul",[a("li",[t._v("样式表越简单，重排和重绘就越快。")]),t._v(" "),a("li",[t._v("重排和重绘的 DOM 元素层级越高，成本就越高。")]),t._v(" "),a("li",[t._v("table 元素的重排和重绘成本，要高于 div 元素")])]),t._v(" "),a("h2",{attrs:{id:"四、提高性能的九个技巧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、提高性能的九个技巧"}},[t._v("#")]),t._v(" 四、提高性能的九个技巧")]),t._v(" "),a("p",[t._v("vdom、离线 dom、display=none、用 class 而不是一条一条改变、position=absolute||fixed 对 reflow 耗能小、visibility 只 repaint、js 动画使用 window.requestAnimation")])])}),[],!1,null,null,null);s.default=r.exports}}]);