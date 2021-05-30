(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{373:function(t,e,s){"use strict";s.r(e);var a=s(42),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"dom-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-是什么"}},[t._v("#")]),t._v(" DOM 是什么")]),t._v(" "),s("p",[t._v("DOM 是用来呈现 HTML 文档以及与 HTML 文档交互的 API,独立于平台与编程语言（如 js java）。DOM 数据结构的本质是树 DOM 树中每个节点的类型是 Node。")]),t._v(" "),s("h1",{attrs:{id:"为什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么"}},[t._v("#")]),t._v(" 为什么")]),t._v(" "),s("p",[t._v("能够为所有的浏览器提供一致的方式,去创建、修改、删除文档中的节点。")]),t._v(" "),s("h1",{attrs:{id:"node-和-element-nodelist-和-htmlcollection"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-和-element-nodelist-和-htmlcollection"}},[t._v("#")]),t._v(" Node 和 Element，NodeList 和 HTMLCollection")]),t._v(" "),s("ul",[s("li",[t._v("NodeList 是由 Node 组成的集合")]),t._v(" "),s("li",[t._v("HTMLCollection 是由 Element 组成的集合")]),t._v(" "),s("li",[t._v("Element 继承 Node 所以 Node 用的 Element 都可以用")]),t._v(" "),s("li",[t._v("NodeList 是 likeArray 的对象")]),t._v(" "),s("li",[t._v("可以通过[index]和.item(index)方法访问集合中的某个元素")]),t._v(" "),s("li",[t._v("NodeList 是静态集合，HTMLCollection 为动态集合")])]),t._v(" "),s("h1",{attrs:{id:"属性和方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性和方法"}},[t._v("#")]),t._v(" 属性和方法")]),t._v(" "),s("h2",{attrs:{id:"属性-用来表示-dom-直接的关系"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性-用来表示-dom-直接的关系"}},[t._v("#")]),t._v(" 属性(用来表示 dom 直接的关系)")]),t._v(" "),s("blockquote",[s("p",[t._v("以下属性都是 readonly")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("返回 Node 类型")]),t._v(" "),s("th",[t._v("返回 Element 类型")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("parentNode")]),t._v(" "),s("td",[t._v("parentElement")])]),t._v(" "),s("tr",[s("td",[t._v("childNodes")]),t._v(" "),s("td",[t._v("children")])]),t._v(" "),s("tr",[s("td",[t._v("firstChild")]),t._v(" "),s("td",[t._v("firstElementChild")])]),t._v(" "),s("tr",[s("td",[t._v("lastChild")]),t._v(" "),s("td",[t._v("lastElementChild")])]),t._v(" "),s("tr",[s("td",[t._v("nextSibling")]),t._v(" "),s("td",[t._v("nextElementSibling")])]),t._v(" "),s("tr",[s("td",[t._v("previousSibling")]),t._v(" "),s("td",[t._v("previousElementSibling")])])])]),t._v(" "),s("h2",{attrs:{id:"属性-用来-get-和-set-节点内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性-用来-get-和-set-节点内容"}},[t._v("#")]),t._v(" 属性(用来 get 和 set 节点内容)")]),t._v(" "),s("blockquote",[s("p",[t._v("前两个只有 Element 类型才拥有")])]),t._v(" "),s("ul",[s("li",[t._v("innerHTML")]),t._v(" "),s("li",[t._v("outerHTML")]),t._v(" "),s("li",[t._v("innerText")]),t._v(" "),s("li",[t._v("outerText")]),t._v(" "),s("li",[t._v("textContent")])]),t._v(" "),s("h2",{attrs:{id:"document-createelement"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#document-createelement"}},[t._v("#")]),t._v(" document.createElement()")]),t._v(" "),s("blockquote",[s("p",[t._v("createElement 只能由 document 来调用")])]),t._v(" "),s("h2",{attrs:{id:"方法-用来获取-dom-节点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法-用来获取-dom-节点"}},[t._v("#")]),t._v(" 方法(用来获取 dom 节点)")]),t._v(" "),s("blockquote",[s("p",[t._v("element 特有")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("返回值是什么类型的对象")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("getElementById(id:String)")]),t._v(" "),s("td",[t._v("Element")])]),t._v(" "),s("tr",[s("td",[t._v("getElementByTagName(name:String)")]),t._v(" "),s("td",[t._v("HtmlCollection")])]),t._v(" "),s("tr",[s("td",[t._v("getElementByClassName(className:String)")]),t._v(" "),s("td",[t._v("HtmlCollection")])]),t._v(" "),s("tr",[s("td",[t._v("querySelector(selector:String)")]),t._v(" "),s("td",[t._v("Element")])]),t._v(" "),s("tr",[s("td",[t._v("querySelectorAll(selector:String)")]),t._v(" "),s("td",[t._v("NodeLiist")])])])]),t._v(" "),s("blockquote",[s("p",[t._v("node.childNodes 和 element.children 分别返回 NodeList 和 HtmlCollection 类型")])]),t._v(" "),s("h2",{attrs:{id:"方法-用来操作-dom-节点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法-用来操作-dom-节点"}},[t._v("#")]),t._v(" 方法(用来操作 dom 节点)")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("methods")]),t._v(" "),s("th",[t._v("参数类型")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("hasChildNodes")]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("contains")]),t._v(" "),s("td",[t._v("Node")])]),t._v(" "),s("tr",[s("td",[t._v("appendChild")]),t._v(" "),s("td",[t._v("Node")])]),t._v(" "),s("tr",[s("td",[t._v("append")]),t._v(" "),s("td",[t._v("Nodes/DOMString(被当成文本节点处理)")])]),t._v(" "),s("tr",[s("td",[t._v("removeChild")]),t._v(" "),s("td",[t._v("Node")])]),t._v(" "),s("tr",[s("td",[t._v("remove")]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("insertBefore")]),t._v(" "),s("td",[t._v("newChild:Node,referChild:Node")])]),t._v(" "),s("tr",[s("td",[t._v("prepend")]),t._v(" "),s("td",[t._v("newChild:Node/DOMString(被当成文本节点处理) referChild:Node")])]),t._v(" "),s("tr",[s("td",[t._v("replaceChild")]),t._v(" "),s("td",[t._v("newChild:Node,referChild:Node")])]),t._v(" "),s("tr",[s("td",[t._v("cloneNode")]),t._v(" "),s("td")])])]),t._v(" "),s("h1",{attrs:{id:"attribute-和-property-区分"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#attribute-和-property-区分"}},[t._v("#")]),t._v(" attribute 和 property 区分")]),t._v(" "),s("ul",[s("li",[t._v("property 和 Node 实例对象的属性永远一致")]),t._v(" "),s("li",[t._v("attribute 和标签上的显示永远一致")]),t._v(" "),s("li",[t._v("访问 property 可以直接通过 . 运算符")]),t._v(" "),s("li",[t._v("访问 attribute 通过 getAttribute() 方法")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ele "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"div"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nele"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("title"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//''")]),t._v("\nele"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAttribute")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//null")]),t._v("\n")])])]),s("blockquote",[s("p",[t._v("有很多细节看笔记吧")])]),t._v(" "),s("h1",{attrs:{id:"事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),s("h2",{attrs:{id:"事件发展"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件发展"}},[t._v("#")]),t._v(" 事件发展")]),t._v(" "),s("ul",[s("li",[t._v("dom0\nele.onclick = function(){}")]),t._v(" "),s("li",[t._v("dom2\nele.addEventListerner('click',function(){},false)")]),t._v(" "),s("li",[t._v("dom3\nele.addEventListerner('keyup',function(){},false)\n"),s("blockquote",[s("p",[t._v("第三个参数 true 则是在捕获阶段触发 false 是在冒泡阶段触发 默认 false")])])])]),t._v(" "),s("h1",{attrs:{id:"dom-事件模型和事件流"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-事件模型和事件流"}},[t._v("#")]),t._v(" dom 事件模型和事件流")]),t._v(" "),s("p",[t._v("捕获阶段->目标阶段->冒泡阶段")]),t._v(" "),s("h2",{attrs:{id:"描述-dom-事件捕获流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#描述-dom-事件捕获流程"}},[t._v("#")]),t._v(" 描述 dom 事件捕获流程")]),t._v(" "),s("ul",[s("li",[t._v("捕获阶段\nwindow->document->html->body->...\nhtml = document.documentElement\nbody = document.body")]),t._v(" "),s("li",[t._v("目标阶段")]),t._v(" "),s("li",[t._v("冒泡阶段\n与捕获反向")])]),t._v(" "),s("h2",{attrs:{id:"event-对象的常见应用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event-对象的常见应用"}},[t._v("#")]),t._v(" Event 对象的常见应用")]),t._v(" "),s("ul",[s("li",[t._v("阻止默认事件 ：event.preventDefault()")]),t._v(" "),s("li",[t._v("停止冒泡 ：event.stopPropagation()")]),t._v(" "),s("li",[t._v("事件响应优先级 ：event.stopImmediatePropagation()\n"),s("ul",[s("li",[t._v("同一个 dom 同一个类型 click 注册了两个事件 a b，a 里面执行它 则不继续触发 b")])])]),t._v(" "),s("li",[t._v("当前所响应的元素(事件绑定在谁上) ：event.currentTarget")]),t._v(" "),s("li",[t._v("当前被点击的元素 ：event.target")])]),t._v(" "),s("h3",{attrs:{id:"事件代理-委托"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件代理-委托"}},[t._v("#")]),t._v(" 事件代理(委托)")]),t._v(" "),s("ul",[s("li",[t._v("基本应用：列表的点击")]),t._v(" "),s("li",[t._v("适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。值得注意的是，mouseover 和 mouseout 需要经常计算它们的位置，代理起不太容易。")]),t._v(" "),s("li",[t._v("不适合的很多，例如，mousemove，每次都要计算它的位置，非常不好把控。还有，focus，blur 之类的，本身就没冒泡的性，自然就不能用事件委托了。")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#test"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("click")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nodeName "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LI"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"li click"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" target "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nodeName "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ul"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nodeName "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LI"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"li click because propo"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      target "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" target"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"下拉框"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下拉框"}},[t._v("#")]),t._v(" 下拉框")]),t._v(" "),s("p",[t._v("下拉框的一般做法， 是把下拉面板放在容器元素内部，通过绝对定位将元素展示出来，通过 z-index 控制元素浮在其他元素上层")]),t._v(" "),s("blockquote",[s("p",[t._v("此时在页面上任意一处的点击事件， 都应关闭下拉框， 但是面板内点击不会关闭弹出面板， 我们会在 document 上注册一个 click 事件， 当这个事件被触发的时候， 关闭面板， 根据事件冒泡原则， 在面板上点击， 最终也会冒泡到 document 上， 同样会关闭面板，这是我们不想要的， 那么我们会在面板上也注册一个事件， 触发的时候调用 stopPropagation， 阻止冒泡， 那么点击面板的时候， 由于事件不会冒泡到 document， 则不会关闭面板， 这个结果是我们需要的。")])]),t._v(" "),s("blockquote",[s("p",[t._v("但是此时还有另外一个问题， 如果有其他元素也阻止了事件冒泡， 那么界面上会出现点击其他元素而下拉面板不关闭的情况， 此时， 我们可以将 document 的事件注册在捕获阶段， 这样其他元素是无法阻止事件传播到 document 上， 当然， 面板也无法阻止， 此时就需要判断 target 了， 如果 target 在面板内部， 不关闭， 否则关闭。 会显得比上一个方法要麻烦一点， 但是效果是最好的， 这里是一个取舍的问题。")])]),t._v(" "),s("h3",{attrs:{id:"mouseover-和-mouseenter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mouseover-和-mouseenter"}},[t._v("#")]),t._v(" mouseover 和 mouseenter")]),t._v(" "),s("p",[t._v("父子元素，子元素在父元素中间\n父over-父enter-父out-子over-子out-父over-父out-父leave")]),t._v(" "),s("h2",{attrs:{id:"自定义事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义事件"}},[t._v("#")]),t._v(" 自定义事件")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//定义test事件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" customEve "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// const customEve = new Event('test',someObj);")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 也可以用 CustomEvent , 区别是 CustomEvent 有两个参数可以接收")]),t._v("\nele"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test event"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//触发test件")]),t._v("\nele"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatchEvent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customEve"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);