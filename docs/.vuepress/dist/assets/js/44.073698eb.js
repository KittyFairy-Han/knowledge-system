(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{393:function(t,a,s){"use strict";s.r(a);var n=s(42),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue-其他考点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-其他考点"}},[t._v("#")]),t._v(" vue 其他考点")]),t._v(" "),s("h2",{attrs:{id:"data-为何是函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-为何是函数"}},[t._v("#")]),t._v(" data 为何是函数")]),t._v(" "),s("ul",[s("li",[t._v("vue 文件最后是一个 class")]),t._v(" "),s("li",[t._v("如果 data 仍然是一个纯粹的对象，则所有的实例将共享 data")]),t._v(" "),s("li",[t._v("组件复用下,data 是函数，不会造成数据同时指向一处的问题。")])]),t._v(" "),s("h2",{attrs:{id:"ajax-请求应该放在哪个生命周期-mounted"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ajax-请求应该放在哪个生命周期-mounted"}},[t._v("#")]),t._v(" ajax 请求应该放在哪个生命周期？ "),s("strong",[t._v("mounted")])]),t._v(" "),s("ul",[s("li",[t._v("首先，js 是单线程，ajax 异步获取数据")]),t._v(" "),s("li",[t._v("生命周期钩子 callback 中异步操作会放入事件队列，而不会在这个钩子函数中执行。所以 created 和 mounted 中请求数据这个动作在时间上的差别十分微小。")]),t._v(" "),s("li",[t._v("生命周期钩子函数中的异步赋值，vue 会在一遍流程走完之后执行 update。不会立即更新数据，所以不会导致虚拟 DOM 重新加载，也不影响页面中静态的部分加载。")]),t._v(" "),s("li",[t._v("另外，给数据赋值然后更新 DOM 也是异步的，侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更，去掉重复赋值然后更新。")]),t._v(" "),s("li",[t._v("结论，放在 mounted 之前没有性能优化，保证逻辑的统一性，放在 mounted。")])]),t._v(" "),s("h2",{attrs:{id:"beforedwstory-里面干嘛"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforedwstory-里面干嘛"}},[t._v("#")]),t._v(" beforeDwstory 里面干嘛")]),t._v(" "),s("ul",[s("li",[t._v("解绑自定义事件")]),t._v(" "),s("li",[t._v("清除定时器")]),t._v(" "),s("li",[t._v("解绑自定义的 DOM 事件 如 widow.scroll 等")])]),t._v(" "),s("h2",{attrs:{id:"全局对象-vs-vuex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局对象-vs-vuex"}},[t._v("#")]),t._v(" 全局对象 vs vuex")]),t._v(" "),s("ul",[s("li",[t._v("数据不是相应式的 view 无法自动更新，其他组件也无法自动同步更新。")]),t._v(" "),s("li",[t._v("修改无法跟踪 watch。vuex 只能调用特定的方法来实现数据修改，可预测，可追踪。")]),t._v(" "),s("li",[t._v("不符合组件化开发的 取数据要到最顶层的 window 上面，项目大了，混乱")])]),t._v(" "),s("h2",{attrs:{id:"vue-常见性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-常见性能优化"}},[t._v("#")]),t._v(" vue 常见性能优化")]),t._v(" "),s("h3",{attrs:{id:"vue-层级的优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-层级的优化"}},[t._v("#")]),t._v(" vue 层级的优化")]),t._v(" "),s("ul",[s("li",[t._v("合理使用 v-show v-if")]),t._v(" "),s("li",[t._v("v-for 加 key 避免与 v-if 一起使用")]),t._v(" "),s("li",[t._v("合理使用 computed 因为有缓存")]),t._v(" "),s("li",[t._v("data 层级不要太深。watch 深度监听 ， 层级太深可能导致页面卡一下")]),t._v(" "),s("li",[t._v("该销毁的及时销毁")]),t._v(" "),s("li",[t._v("合理使用 异步组件")]),t._v(" "),s("li",[t._v("合理使用 keep-alive")])]),t._v(" "),s("h3",{attrs:{id:"webpack-层级的优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-层级的优化"}},[t._v("#")]),t._v(" webpack 层级的优化")]),t._v(" "),s("ul",[s("li",[t._v("《webpack》 章节")])]),t._v(" "),s("h3",{attrs:{id:"前端通用的性能优化-图片懒加载、减少请求次数等"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前端通用的性能优化-图片懒加载、减少请求次数等"}},[t._v("#")]),t._v(" 前端通用的性能优化，图片懒加载、减少请求次数等")]),t._v(" "),s("ul",[s("li",[t._v("《优化》章节")])]),t._v(" "),s("h2",{attrs:{id:"上传操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#上传操作"}},[t._v("#")]),t._v(" 上传操作")]),t._v(" "),s("h3",{attrs:{id:"传统表单"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#传统表单"}},[t._v("#")]),t._v(" 传统表单")]),t._v(" "),s("ul",[s("li",[t._v("传统写法")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("form")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("enctype")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("multipart/form-data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("action")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("/api/upload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("method")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("post"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 传统表单上传 --\x3e")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("submit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("form")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("ul",[s("li",[t._v("转换为 js 写法")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@change")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleFileChange"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("handleFileChange")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" files "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("files"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" uploadFile "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" files"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" formData "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FormData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    formData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uploadFile"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" uploadFile"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" axios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/upload"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" formData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      headers"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"multipart/form-data"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);