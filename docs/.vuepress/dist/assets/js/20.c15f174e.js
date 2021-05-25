(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{372:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"set-map-数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-map-数据类型"}},[t._v("#")]),t._v(" Set Map 数据类型")]),t._v(" "),a("ul",[a("li",[t._v("Set 类似数组，内部没有重复的成员")]),t._v(" "),a("li",[t._v("Set 内部用 === 判断， NaN 看做相等\n"),a("blockquote",[a("p",[t._v("NaN 自身不等，只是在 Set 这种数据结构中看作相等")])])]),t._v(" "),a("li",[t._v("Map 是更完善的 hash 结构，键（key）值（value）对的键也可以是对象")])]),t._v(" "),a("h2",{attrs:{id:"构造"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构造"}},[t._v("#")]),t._v(" 构造")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" s "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("likeArray"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Object "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("双元素的二维数组")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  参数：[[a,1],[b,2],[c,3]] 映射结果： a=>1 b=>2 c=>3")]),t._v("\n")])])]),a("h2",{attrs:{id:"实例属性和方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实例属性和方法"}},[t._v("#")]),t._v(" 实例属性和方法")]),t._v(" "),a("ul",[a("li",[t._v("element 表示成员、key 表示 Map 的键、value 表示 Map 的值")]),t._v(" "),a("li",[t._v("set get map 是 Map 独有的方法")]),t._v(" "),a("li",[t._v("Set 没有 set get 方法 所以获取和修改 Set 的值 可以把它转成数组去操作然后在转回来")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("name")]),t._v(" "),a("th",[t._v("arguments")]),t._v(" "),a("th",[t._v("return")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("============")]),t._v(" "),a("td",[t._v("================")]),t._v(" "),a("td",[t._v("==================")])]),t._v(" "),a("tr",[a("td",[t._v("size")]),t._v(" "),a("td",[t._v("/")]),t._v(" "),a("td",[t._v("lenght:Number")]),t._v(" "),a("td",[t._v("获取成员数")])]),t._v(" "),a("tr",[a("td",[t._v("操作成员")]),t._v(" "),a("td",[t._v("============")]),t._v(" "),a("td",[t._v("================")]),t._v(" "),a("td",[t._v("==================")])]),t._v(" "),a("tr",[a("td",[t._v("add")]),t._v(" "),a("td",[t._v("element")]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[t._v("增，返回是否成功")])]),t._v(" "),a("tr",[a("td",[t._v("delete")]),t._v(" "),a("td",[t._v("element/key")]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[t._v("删，返回是否成功")])]),t._v(" "),a("tr",[a("td",[t._v("has")]),t._v(" "),a("td",[t._v("element")]),t._v(" "),a("td",[t._v("element/key")]),t._v(" "),a("td",[t._v("判断是否有该成员")])]),t._v(" "),a("tr",[a("td",[t._v("clear")]),t._v(" "),a("td",[t._v("/")]),t._v(" "),a("td",[t._v("/")]),t._v(" "),a("td",[t._v("清空成员")])]),t._v(" "),a("tr",[a("td",[t._v("set")]),t._v(" "),a("td",[t._v("key,value")]),t._v(" "),a("td",[t._v("修改后的 Map 对象")]),t._v(" "),a("td",[t._v("设置成员值")])]),t._v(" "),a("tr",[a("td",[t._v("get")]),t._v(" "),a("td",[t._v("key")]),t._v(" "),a("td",[t._v("value")]),t._v(" "),a("td",[t._v("获取成员值")])]),t._v(" "),a("tr",[a("td",[t._v("遍历")]),t._v(" "),a("td",[t._v("============")]),t._v(" "),a("td",[t._v("================")]),t._v(" "),a("td",[t._v("==================")])]),t._v(" "),a("tr",[a("td",[t._v("keys")]),t._v(" "),a("td",[t._v("/")]),t._v(" "),a("td",[t._v("值:SetInterator/键:MapIterator")]),t._v(" "),a("td",[t._v("返回所有的键，对于 Set 来说键就是值")])]),t._v(" "),a("tr",[a("td",[t._v("values")]),t._v(" "),a("td",[t._v("/")]),t._v(" "),a("td",[t._v("值:SetInterator/值:MapIterator")]),t._v(" "),a("td",[t._v("返回所有的值")])]),t._v(" "),a("tr",[a("td",[t._v("entries")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("forEach")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("for of")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" set "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sb"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sc"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" map "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ma"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"mb"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"m3"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"mc"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nset"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一次循环输出 sa,sa")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一次循环输出 m1,ma")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" set"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第一次循环输出 sa")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第一次循环输出 m1,ma")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用"}},[t._v("#")]),t._v(" 应用")]),t._v(" "),a("blockquote",[a("p",[t._v("利用 Set 为数组去重，章节：Array-考点-去重")])])])}),[],!1,null,null,null);s.default=e.exports}}]);