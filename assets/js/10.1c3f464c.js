(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{358:function(t,s,a){t.exports=a.p+"assets/img/app-demo-f1.92977ac8.png"},359:function(t,s,a){t.exports=a.p+"assets/img/app-demo-f2.5cc3e4af.png"},446:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"标题没想好"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#标题没想好"}},[t._v("#")]),t._v(" 标题没想好")]),t._v(" "),n("h2",{attrs:{id:"需求"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#需求"}},[t._v("#")]),t._v(" 需求")]),t._v(" "),n("ol",[n("li",[t._v("插件化。"),n("br"),t._v("\n工作中的一个项目称为 iarrm，遇到过一个插件化的需求，具体的业务场景是这样的:"),n("br"),t._v("\n客户端有多个标签(可以理解为几个功能按钮的组合体)，标签类型有多种。每种类型的标签支持以插件的形式独立安装，安装后，客户端就携带这种插件的功能。点击一个标签中的一个按钮，根据当前标签的类型和点击的按钮，唤起对应的 web 页面, 相当于浏览器打开一个新的标签页。"),n("br"),t._v("\n例如，安装了人脸插件的客户端，就携带有查看人脸抓拍历史、人脸实时抓拍情况、人脸数据统计图等功能。当点击人脸标签上的人脸历史按钮时，就打开人脸历史的 web 页面，使用其中的功能。")])]),t._v(" "),n("blockquote",[n("p",[t._v("标签的多种类型，从业务角度来讲，是对应多种不同的监控摄像头；从代码角度来讲，是对应多个 iarrm 插件。")])]),t._v(" "),n("p",[n("img",{attrs:{src:a(358),alt:"f1"}})]),t._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[t._v("支持多主题。"),n("br"),t._v("\n客户端唤起网页时，通知 web 当前使用的主题，web 全局应用该主题。\n"),n("img",{attrs:{src:a(359),alt:"f2"}})])]),t._v(" "),n("li",[n("p",[t._v("提供一个脚手架"),n("br"),t._v("\n要提供一个脚手架（公司内部前端工程都是 webpack+vue）给分公司，当新增标签类型时，尽量能够复用组件，只开发业务。")])])]),t._v(" "),n("p",[t._v("根据需求可以分析出来几个技术点：1 插件化 2 多主题 3 客户端与 web 通信 4 脚手架。下面就逐一击破吧~")]),t._v(" "),n("h2",{attrs:{id:"插件化"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#插件化"}},[t._v("#")]),t._v(" 插件化")]),t._v(" "),n("p",[t._v("“插件化” 这个概念映射到前端工程代码，该怎么理解呢？")]),t._v(" "),n("p",[t._v("① 根据需求多个插件完全独立，就说明每个插件 ≈ 完整前端应用包")]),t._v(" "),n("blockquote",[n("p",[t._v("TIPS"),n("br"),t._v("\n准确来讲每个插件对应前端应用包+后端应用包，但是我们这里不讨论后端。"),n("br"),t._v("\n下文前端应用包或插件会使用 app 代指")])]),t._v(" "),n("p",[t._v("这些插件对于前端开发来说，大多数的依赖和使用的组件都是相同的（比如上图的人脸、卡口插件都包含历史这个页面，页面上的具体功能都差不多)。\n所以正确的方案应该是"),n("strong",[t._v("一个前端工程，可以输出多个不同的 app")]),t._v("。这样更方便的实现组件的复用，也更方便项目的维护。")]),t._v(" "),n("p",[t._v("② 根据需求，客户端标签中的每个按钮都会唤起一个 web 页面，所以每个 app 都包含多个 page，这是典型的 MPA。"),n("br"),t._v("\n所以我们的"),n("strong",[t._v("每个 app 都是一个 MPA")]),t._v(" 即多页面应用。")]),t._v(" "),n("h2",{attrs:{id:"与客户端通信"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#与客户端通信"}},[t._v("#")]),t._v(" 与客户端通信")]),t._v(" "),n("p",[t._v("在这个项目中，通信这个功能，主要是客户端向 web 传达一些信息，web 是不需要主动调用客户端的功能的。所以只要弄明白 client 如何调用 js 就行了。"),n("br"),t._v("\n其实 client->js 已经有了成熟的技术方案，前端需要做的就是在 window 上注册一个方法，client 调用这个方法进行一些信息的传达。"),n("br"),t._v("\n每个页面功能不同，但都会传达的一个信息就是当前使用的主题，所以我们就以传递主题信息为例子。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// apps/demo/home/main.js")]),t._v("\nwindow"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("clientCallJs")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("params")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("skin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("params"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSkin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("skin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSkin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("skin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置主题")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 下面小节将补充这个函数")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("这样，当客户端调用 clientCallJs 方法时，就会进入 js 内部的逻辑。我们根据 params 传参去做一些后续的事情。")]),t._v(" "),n("h2",{attrs:{id:"多主题功能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#多主题功能"}},[t._v("#")]),t._v(" 多主题功能")]),t._v(" "),n("h3",{attrs:{id:"基本思路"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基本思路"}},[t._v("#")]),t._v(" 基本思路")]),t._v(" "),n("p",[t._v("结合这个项目的特点，多主题每次只会应用其中的一种，不需要在线换肤。所以采用的技术方案是，把多个主题分包，根据客户端传参去加载对应的文件，其他主题包不会用到，不需要去加载避免浪费资源。"),n("br"),t._v("\n这里的关键点是分包，分包的方式有多种，"),n("a",{attrs:{href:"https://juejin.cn/post/7004790532916379655",target:"_blank",rel:"noopener noreferrer"}},[t._v("可以查看这篇文章：webpack chunk"),n("OutboundLink")],1),t._v("。结合这个项目的需求，采用 import() 函数这种分包方式，达到拆分和异步加载的目的。\n假设 demo 插件有两种色系的主题，蓝色和绿色。以demo-home页面为例子，源码目录大概就是这样的：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("project\n  └── ....\n      ├── demo\n      |   ├── home\n      |   |   ├──main.js\n      |   |   ├──themes\n      |   |   |   ├──blue.less      //home页面蓝色主题样式定义在这里\n      |   |   |   └──green.less     //home页面蓝色主题样式定义在这里\n      |   |   └──App.vue\n      |   └── ...\n      └── ....\n")])])]),n("p",[t._v("引入皮肤的代码雏形大概就是这样的")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// apps/demo/home/main.js")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSkin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("skin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "themes-" */')]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("./themes/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("skin"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v(".less")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("为了后面更加方便的介绍。我把 App.vue、blue.less、green.less 的代码贴一下")]),t._v(" "),n("div",{staticClass:"language-vue extra-class"},[n("pre",{pre:!0,attrs:{class:"language-vue"}},[n("code",[t._v("\n")])])]),n("h3",{attrs:{id:"目录结构以及使用示例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#目录结构以及使用示例"}},[t._v("#")]),t._v(" 目录结构以及使用示例")]),t._v(" "),n("div",{staticClass:"language-code extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("  src\n  ├── main.js\n  ├── ...\n  ├── skin\n  |   ├── green\n  |   |   ├── theme.less # 定义一些主题通用的变量\n  |   |   ├── demo-vars.less # 定义一些业务相关的变量\n  |   |   └── index.less # green 主题的主人口 里面引用了green/theme.less、green/demo-vars.less、style/demo.less\n  |   ├── blue\n  |   |   ├── theme.less # 定义一些主题通用的变量\n  |   |   ├── demo-vars.less # 定义一些业务相关的变量\n  |   |   └── index.less # blue 主题的主人口 blue/theme.blue/demo-vars.less、style/demo.less\n  |   └── style\n  |       └── demo.less # demo 使用对应的业务变量或者直接引用主题变量定义样式\n  └── ...\n\n")])])]),n("ul",[n("li",[t._v("green")])]),t._v(" "),n("div",{staticClass:"language-less extra-class"},[n("pre",{pre:!0,attrs:{class:"language-less"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// green/theme.less")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" #08ff70"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-act-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" #e6941a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@text-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" white"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//green/demo-vars.less")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@demo-home-border-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" lightgreen"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// green/index.less 顺序必须是先引入变量文件然后引入业务代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./theme.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./demo-vars.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"../style/demo.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("ul",[n("li",[t._v("blue")])]),t._v(" "),n("div",{staticClass:"language-less extra-class"},[n("pre",{pre:!0,attrs:{class:"language-less"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//blue/theme.less")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" #1a68c2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-act-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" #e3e61a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@text-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" white"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//blue/demo-vars.less")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@demo-home-border-color"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" skyblue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//blue/index.less 顺序必须是先引入变量文件然后引入业务代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./theme.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./demo-vars.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"../style/demo.less"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("ul",[n("li",[t._v("style")])]),t._v(" "),n("div",{staticClass:"language-less extra-class"},[n("pre",{pre:!0,attrs:{class:"language-less"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//style/demo.less")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo-home-root")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("border")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@demo-home-border-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v("&:hover")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("@main-act-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h3",{attrs:{id:"how-to-分-chunk"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#how-to-分-chunk"}},[t._v("#")]),t._v(" how to 分 chunk")]),t._v(" "),n("p",[t._v("引入 模块的几种方式 import、require、import()。这几种方式只有 import() 能实现自动划分 chunk，如果使用 import 或者 require 需要手动配置 splitChunk，所以采用了 import() 的方式。如果想要了解配置 splitChunk 主动划分移步 chunk 章节。")]),t._v(" "),n("blockquote",[n("p",[t._v("(webpack 官方提示：可以自己配置分包，但是不要在没有实践测量的情况下，尝试手动优化这些参数。默认模式是经过千挑万选的，可以用于满足最佳 web 性能的策略。)")])]),t._v(" "),n("h4",{attrs:{id:"写法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#写法"}},[t._v("#")]),t._v(" 写法")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// apps/demo/home/main.js")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSkin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("skin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "global-themes-" */')]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("./themes/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("skin"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v(".less")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用魔法注释为chunk命名,这样打包出来的文件名就是global-themes0、global-themes1、...")]),t._v("\n")])])]),n("h4",{attrs:{id:"打包后两个主题文件分别为-global-themes0-css-绿色主题对应的-css-、global-themes1-css-蓝色主题对应的-css"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#打包后两个主题文件分别为-global-themes0-css-绿色主题对应的-css-、global-themes1-css-蓝色主题对应的-css"}},[t._v("#")]),t._v(" 打包后两个主题文件分别为 global-themes0.css(绿色主题对应的 css)、global-themes1.css (蓝色主题对应的 css)")]),t._v(" "),n("div",{staticClass:"language-css extra-class"},[n("pre",{pre:!0,attrs:{class:"language-css"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* global-themes0.css 绿色主题对应的css */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo-home-root")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #08ff70"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("border")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid #90ee90"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo-home-root:hover")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #e6941a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* global-themes1.css 蓝色主题对应的css */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo-home-root")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #1a68c2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("border")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid #87ceeb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo-home-root:hover")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #e3e61a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:""}},[n("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"path"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fs "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fs"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pages "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// vue.config.js -- 在生产环境下 ===== start")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 当前的 process.env.PLUGIN_KEY值是 demo")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 读取 src/pages/demo 下面的的所有目录，也就是 home、about")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pageNameList "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("readdirSync")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("src/pages/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("process"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PLUGIN_KEY")]),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置当前plugin所有page下面的main.js为入口，也就是 home、about 目录下的 main.js 为两个入口")]),t._v("\npageNameList"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pageName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  pages"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pluginKey"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pageName"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("src/pages/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pluginKey"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pageName"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("/main.js")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最后形成的多页面配置项是这样的")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pages:{")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//   "demo-home":"src/pages/demo/home/main.js",')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//   "demo-about":"src/pages/demo/about/main.js"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// }")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// vue.config.js -- 在生产环境下 ===== end")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// vue.config.js -- 在开发环境下 ===== start")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pluginKeyList "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("readdirSync")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("src/pages")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npluginKeyList"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pluginKey")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" pageNameList "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("readdirSync")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("src/pages/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pluginKey"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  pageNameList"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pageName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    pages"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pluginKey"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pageName"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token template-string"}},[n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("src/pages/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pluginKey"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pageName"),n("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("/main.js")]),n("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//根据pluginKey去配置pages选项")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// vue.config.js -- 在开发环境下 ===== end")]),t._v("\nmodule"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pages "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pages"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("process.env.PLUGIN_KEY 拿到命令行中 PLUGIN_KEY=xxx 的 xxx。然后根据 process.env.PLUGIN_KEY 去 pages 对应的目录下找 main.js,配置 vue.config.js 中的 pages 选项。在开发环境下，是没有 process.env.PLUGIN_KEY 的，那么就是把 pages 下所有目录中的 main.js 都找到配置 vue.config.js 中的 pages 选项。")])])}),[],!1,null,null,null);s.default=e.exports}}]);