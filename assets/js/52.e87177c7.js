(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{436:function(t,a,s){"use strict";s.r(a);var e=s(42),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),s("h2",{attrs:{id:"对比传统"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对比传统"}},[t._v("#")]),t._v(" 对比传统")]),t._v(" "),s("h3",{attrs:{id:"传统组件与-vue、react-的组件化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#传统组件与-vue、react-的组件化"}},[t._v("#")]),t._v(" 传统组件与 vue、react 的组件化")]),t._v(" "),s("ul",[s("li",[t._v("传统组件，静态渲染，更新要依赖于 DOM")]),t._v(" "),s("li",[t._v("vue、react 组件，数据驱动视图")])]),t._v(" "),s("h3",{attrs:{id:"vue-vs-react"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-vs-react"}},[t._v("#")]),t._v(" vue vs react")]),t._v(" "),s("h4",{attrs:{id:"vue-本身是-mvvm-框架-由-mvc-发展而来"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-本身是-mvvm-框架-由-mvc-发展而来"}},[t._v("#")]),t._v(" vue 本身是 MVVM 框架，由 MVC 发展而来")]),t._v(" "),s("ul",[s("li",[t._v("vue 使用 模板 是从 angular 引入，模版语法双引号中是 JS 变量有点不习惯，还有各种指令学习成本比较高。")]),t._v(" "),s("li",[t._v("MVVM 数据视图分离更明显，数据双向绑定。")]),t._v(" "),s("li",[t._v("组件化是由 MVVM 扩展的")])]),t._v(" "),s("h4",{attrs:{id:"react-本质是前端组件化框架-由后端组件化发展而来"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-本质是前端组件化框架-由后端组件化发展而来"}},[t._v("#")]),t._v(" React 本质是前端组件化框架，由后端组件化发展而来")]),t._v(" "),s("ul",[s("li",[t._v("React 使用 JSX, JSX 逐渐趋向标准化，学习成本低（只要记住大括号中式 JS 表达式就行，不用学习指令）")]),t._v(" "),s("li",[t._v("视图分离不够清晰，视图代码写在 render 函数中，和 JS 逻辑有融合")]),t._v(" "),s("li",[t._v("组件化更彻底和清晰")])]),t._v(" "),s("h3",{attrs:{id:"vue-和-jq-比的特点-特点好在哪里"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-和-jq-比的特点-特点好在哪里"}},[t._v("#")]),t._v(" Vue 和 Jq 比的特点，特点好在哪里？")]),t._v(" "),s("ul",[s("li",[t._v("数据视图分离，解耦、符合开放封闭原则")]),t._v(" "),s("li",[t._v("数据驱动视图，dom 操作内部封装了，只处理数据变化，更好实现业务逻辑")]),t._v(" "),s("li",[t._v("Jq 在 js 代码里面操作 dom，视图混淆到 js 逻辑中，操作 dom 本身就是主动改变视图非数据驱动")])]),t._v(" "),s("h2",{attrs:{id:"mvvm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvvm"}},[t._v("#")]),t._v(" MVVM")]),t._v(" "),s("ul",[s("li",[t._v("Model(M)-ViewModel(VM)-View(V)")])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\x3e View <--\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" defalut"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//\x3c!--\x3e Model <--\x3e")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n//\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\x3e ViewModel <--\x3e")]),t._v("\n// vue 内部封装,是个抽象的概念，是一种能力.\n")])])]),s("h2",{attrs:{id:"vue-响应式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-响应式"}},[t._v("#")]),t._v(" Vue 响应式")]),t._v(" "),s("h3",{attrs:{id:"什么是响应式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是响应式"}},[t._v("#")]),t._v(" 什么是响应式")]),t._v(" "),s("p",[t._v("组件 data 数据一旦变化，立即触发视图更新")]),t._v(" "),s("h3",{attrs:{id:"如何实现响应式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何实现响应式"}},[t._v("#")]),t._v(" 如何实现响应式")]),t._v(" "),s("ul",[s("li",[t._v("vue2 核心 API ：Object.defineProperty\n"),s("RouterLink",{attrs:{to:"/engineering/Vue/vue的响应式（数据驱动）.html"}},[t._v("vue2 应式实现的核心代码")])],1),t._v(" "),s("li",[t._v("缺点：")]),t._v(" "),s("li",[s("ol",[s("li",[t._v("需要改造数组原型来实现数组变化的监听，")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"2"}},[s("li",[t._v("深度监听，需要一次递归到底，一次性计算量大，如果一个对象深度很大，页面可能就卡死了。")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"3"}},[s("li",[t._v("无法监听新增/删除属性 需要用 Vue.set/Vue.deleteProperty")])])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设vue data中存在一个对象是这样的")]),t._v("\nperson "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"zs"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" year"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"19"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设某个函数中执行了")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" person"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("year"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// vue监听不到 无法触发视图更新 要做特殊处理")]),t._v("\nVue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("deleteProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("vue3 核心方案： proxy\n"),s("RouterLink",{attrs:{to:"/engineering/Vue/vue考点.html"}},[t._v("vue3 响应式实现的核心代码")])],1),t._v(" "),s("li",[t._v("proxy 兼容性不是很好，所以短期不会取代 Object.defineProperty，短期 vue2 也不会过时。")])]),t._v(" "),s("h2",{attrs:{id:"vdom-与-diff"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vdom-与-diff"}},[t._v("#")]),t._v(" vdom 与 diff")]),t._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/engineering/_8DOM/vdom/"}},[t._v("vdom")])],1)]),t._v(" "),s("h2",{attrs:{id:"模版编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模版编译"}},[t._v("#")]),t._v(" 模版编译")]),t._v(" "),s("h3",{attrs:{id:"模版是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模版是什么"}},[t._v("#")]),t._v(" 模版是什么")]),t._v(" "),s("ul",[s("li",[t._v("模版的本质是字符串，是有逻辑，可嵌入 JS 变量的字符串，并期望转换成 html 。")]),t._v(" "),s("li",[t._v("前端代码只有 JS 是有逻辑的、可以渲染 html 的语言，所以模版必须先转换成 JS 代码段，进而生成 html，")]),t._v(" "),s("li",[t._v("转换为 JS 运行后得到 vnode(虚拟节点)，")])]),t._v(" "),s("h3",{attrs:{id:"编译流程是怎样的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#编译流程是怎样的"}},[t._v("#")]),t._v(" 编译流程是怎样的")]),t._v(" "),s("ol",[s("li",[t._v("模版编译为 render 函数，执行 render 函数，"),s("strong",[t._v("返回 vnode")])]),t._v(" "),s("li",[t._v("基于 vnode 在执行 patch 和 diff")]),t._v(" "),s("li",[t._v("使用 webpack vue-loader，会在"),s("strong",[t._v("开发")]),t._v("环境下"),s("strong",[t._v("编译模板")]),t._v("（运行前）。如果是引入 vue 文件，在 html 中写 template，是浏览器去编译的（运行时），和以上不同，效率不如上述高")])]),t._v(" "),s("h3",{attrs:{id:"render-函数是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render-函数是什么"}},[t._v("#")]),t._v(" render 函数是什么")]),t._v(" "),s("p",[s("RouterLink",{attrs:{to:"/engineering/Vue/vue模版解析.html"}},[t._v("模版编译举例")])],1),t._v(" "),s("ul",[s("li",[t._v("有些复杂的情况下，不能用 template，可以考虑自己写 render")]),t._v(" "),s("li",[t._v("react 一直用 render，没有 template")])]),t._v(" "),s("h2",{attrs:{id:"异步渲染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#异步渲染"}},[t._v("#")]),t._v(" 异步渲染")]),t._v(" "),s("ul",[s("li",[t._v("回顾 nextTick")]),t._v(" "),s("li",[t._v("汇总 data 的修改，一次性更新视图")]),t._v(" "),s("li",[t._v("减少 DOM 的操作次数，提高性能")])]),t._v(" "),s("h2",{attrs:{id:"渲染总体流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染总体流程"}},[t._v("#")]),t._v(" 渲染总体流程")]),t._v(" "),s("ul",[s("li",[t._v("渲染与模板编译")]),t._v(" "),s("li",[t._v("渲染与响应式")]),t._v(" "),s("li",[t._v("渲染与 vdom")]),t._v(" "),s("li",[t._v("渲染是"),s("strong",[t._v("异步")]),t._v("的")])]),t._v(" "),s("h3",{attrs:{id:"_1-把模版-templete-解析成-render-函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-把模版-templete-解析成-render-函数"}},[t._v("#")]),t._v(" 1 把模版 templete 解析成 render 函数")]),t._v(" "),s("ul",[s("li",[t._v("with 的用法")]),t._v(" "),s("li",[t._v("模版中的所有信息都被 render 函数包含")])]),t._v(" "),s("ol",[s("li",[t._v("data 变成 js 变量")]),t._v(" "),s("li",[t._v("指令变成 逻辑")]),t._v(" "),s("li",[t._v("返回 vnode")])]),t._v(" "),s("h3",{attrs:{id:"_2-响应式开始监听"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-响应式开始监听"}},[t._v("#")]),t._v(" 2 响应式开始监听")]),t._v(" "),s("ul",[s("li",[t._v("object.defineProperty")])]),t._v(" "),s("ol",[s("li",[t._v("拦截 get , data、method 里面的属性和方法 代理到 vm 上")]),t._v(" "),s("li",[t._v("拦截 set , set 里面会调用 updateComponent")])]),t._v(" "),s("h3",{attrs:{id:"_3-首次渲染-显示页面-绑定依赖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-首次渲染-显示页面-绑定依赖"}},[t._v("#")]),t._v(" 3 首次渲染，显示页面，绑定依赖")]),t._v(" "),s("ol",[s("li",[t._v("初次渲染 执行 updateComponent, 执行 vm._render")]),t._v(" "),s("li",[t._v("以 todolist 为例，访问到 vm.list 和 vm.title")]),t._v(" "),s("li",[t._v("监听 data 属性的 getter setter，被 get 拦截 绑定依赖")])]),t._v(" "),s("ul",[s("li",[t._v("data 中有很多属性，有些被用到，有些没有使用")]),t._v(" "),s("li",[t._v("用到的走 get 没用的没走 get")]),t._v(" "),s("li",[t._v("不走 get 的属性 set 时候不需要关心 避免不必要的渲染")])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("// vue 模版中\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{name}}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n// vue data 代码中 { name:'yxr', year:22 } // 执行 render 函数时候，name 走了 get，year 没走\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("走到 patch 第一段逻辑 patch(elem,vnode)")]),t._v(" "),s("li",[t._v("渲染到 html 中")]),t._v(" "),s("li",[t._v("patch 将 vnode 渲染成 dom 初次渲染完成")])]),t._v(" "),s("h3",{attrs:{id:"_4-data-属性变化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-data-属性变化"}},[t._v("#")]),t._v(" 4 data 属性变化")]),t._v(" "),s("ol",[s("li",[t._v("set 中执行 updateComponent,执行 updateComponent,执行 vm._render")]),t._v(" "),s("li",[t._v("走到 patch 第二段逻辑 patch(oldVnode,newVnode)")]),t._v(" "),s("li",[t._v("渲染到 html 中")])]),t._v(" "),s("h2",{attrs:{id:"前端路由"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前端路由"}},[t._v("#")]),t._v(" 前端路由")]),t._v(" "),s("h3",{attrs:{id:"hash-模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hash-模式"}},[t._v("#")]),t._v(" hash 模式")]),t._v(" "),s("ul",[s("li",[t._v("hash 变化会触发页面跳转，前进、后退")]),t._v(" "),s("li",[t._v("不会刷新页面")]),t._v(" "),s("li",[t._v("不会提交到 server 端")]),t._v(" "),s("li",[t._v("基于 window.location 的 onHashChange 事件、hash 属性来实现")])]),t._v(" "),s("h3",{attrs:{id:"history-模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history-模式"}},[t._v("#")]),t._v(" history 模式")]),t._v(" "),s("ul",[s("li",[t._v("url 规范的路由")]),t._v(" "),s("li",[t._v("跳转时不刷新页面")]),t._v(" "),s("li",[s("ul",[s("li",[t._v("https//github.com/xxx 刷新页面")])])]),t._v(" "),s("li",[s("ul",[s("li",[t._v("https//github.com/xxx/yyy 前端跳转不刷新页面")])])]),t._v(" "),s("li",[s("ul",[s("li",[t._v("https//github.com/xxx/yyy/zzz 前端跳转刷新页面")])])]),t._v(" "),s("li",[t._v("需要 server 端支持")]),t._v(" "),s("li",[t._v("核心：window.history.onpopstate 事件，window.history.pushState 方法")])]),t._v(" "),s("h3",{attrs:{id:"对比"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对比"}},[t._v("#")]),t._v(" 对比")]),t._v(" "),s("ul",[s("li",[t._v("除非考虑提高 SEO 效率，能用简单的就用简单的，hash")])])])}),[],!1,null,null,null);a.default=r.exports}}]);