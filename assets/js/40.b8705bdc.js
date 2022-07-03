(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{428:function(t,a,s){"use strict";s.r(a);var e=s(42),v=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"数据类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据类型"}},[t._v("#")]),t._v(" 数据类型")]),t._v(" "),s("p",[t._v("Number（包括 NaN）、String、Boolean、复合类型（Array 、Object 、Function、null） 、undefined")]),t._v(" "),s("h2",{attrs:{id:"判断数据类型的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#判断数据类型的方法"}},[t._v("#")]),t._v(" 判断数据类型的方法")]),t._v(" "),s("h3",{attrs:{id:"typeof-运算符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typeof-运算符"}},[t._v("#")]),t._v(" typeof 运算符")]),t._v(" "),s("ul",[s("li",[t._v("用法: typeof A")]),t._v(" "),s("li",[t._v("返回值: String")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("测试值")]),t._v(" "),s("th",[t._v("返回值")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("Number")]),t._v(" "),s("td",[t._v('"number"')])]),t._v(" "),s("tr",[s("td",[t._v("String")]),t._v(" "),s("td",[t._v('"string"')])]),t._v(" "),s("tr",[s("td",[t._v("Boolean")]),t._v(" "),s("td",[t._v('"boolean"')])]),t._v(" "),s("tr",[s("td",[t._v("Symbol")]),t._v(" "),s("td",[t._v('"symbol"')])]),t._v(" "),s("tr",[s("td",[t._v("Object(包含 Set Map Date Math 等)")]),t._v(" "),s("td",[t._v('"object"')])]),t._v(" "),s("tr",[s("td",[t._v("Array")]),t._v(" "),s("td",[t._v('"object"')])]),t._v(" "),s("tr",[s("td",[t._v("null")]),t._v(" "),s("td",[t._v('"object"')])]),t._v(" "),s("tr",[s("td",[t._v("Function")]),t._v(" "),s("td",[t._v('"function"')])]),t._v(" "),s("tr",[s("td",[t._v("undefined")]),t._v(" "),s("td",[t._v('"undefined"')])])])]),t._v(" "),s("h3",{attrs:{id:"instanceof-运算符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#instanceof-运算符"}},[t._v("#")]),t._v(" instanceof 运算符")]),t._v(" "),s("ul",[s("li",[t._v("用法: A instanceof B\n用来判断 A 是否在 B 的原型链上 , 所以只对复合类型有效")]),t._v(" "),s("li",[t._v("返回值: trule/false")])]),t._v(" "),s("h3",{attrs:{id:"object-prototype-tostring-函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#object-prototype-tostring-函数"}},[t._v("#")]),t._v(" Object.prototype.toString() 函数")]),t._v(" "),s("ul",[s("li",[t._v("用法: Object.prototype.toString.call(A)")]),t._v(" "),s("li",[t._v("返回值: String")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("测试值")]),t._v(" "),s("th",[t._v("返回值")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("Number")]),t._v(" "),s("td",[t._v('"[object Number]"')])]),t._v(" "),s("tr",[s("td",[t._v("String")]),t._v(" "),s("td",[t._v('"[object String]"')])]),t._v(" "),s("tr",[s("td",[t._v("Boolean")]),t._v(" "),s("td",[t._v('"[object Boolean]"')])]),t._v(" "),s("tr",[s("td",[t._v("Symbol")]),t._v(" "),s("td",[t._v('"[object Symbol]"')])]),t._v(" "),s("tr",[s("td",[t._v("Object")]),t._v(" "),s("td",[t._v('"[object Object]"')])]),t._v(" "),s("tr",[s("td",[t._v("Array")]),t._v(" "),s("td",[t._v('"[object Array]"')])]),t._v(" "),s("tr",[s("td",[t._v("null")]),t._v(" "),s("td",[t._v('"[object Null]"')])]),t._v(" "),s("tr",[s("td",[t._v("Function")]),t._v(" "),s("td",[t._v('"[object Function]"')])]),t._v(" "),s("tr",[s("td",[t._v("undefined")]),t._v(" "),s("td",[t._v('"[object Undefined]"')])]),t._v(" "),s("tr",[s("td",[t._v("Error")]),t._v(" "),s("td",[t._v('"[object Error]"')])]),t._v(" "),s("tr",[s("td",[t._v("Math")]),t._v(" "),s("td",[t._v('"[object Math]"')])]),t._v(" "),s("tr",[s("td",[t._v("Date")]),t._v(" "),s("td",[t._v('"[object Date]"')])]),t._v(" "),s("tr",[s("td",[t._v("Set")]),t._v(" "),s("td",[t._v('"[object Set]"')])]),t._v(" "),s("tr",[s("td",[t._v("Map")]),t._v(" "),s("td",[t._v('"[object Map]"')])]),t._v(" "),s("tr",[s("td",[t._v("正则")]),t._v(" "),s("td",[t._v('"[object RegExp]"')])])])]),t._v(" "),s("h2",{attrs:{id:"类型转换"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类型转换"}},[t._v("#")]),t._v(" 类型转换")]),t._v(" "),s("ul",[s("li",[t._v("数据类型转换的原理是 toString() 和 valueOf()\n"),s("blockquote",[s("p",[t._v("undefined 和 null 不能直接调用这两个方法")])])])]),t._v(" "),s("h3",{attrs:{id:"自动转换"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动转换"}},[t._v("#")]),t._v(" 自动转换")]),t._v(" "),s("ul",[s("li",[t._v("——> Boolean:\n条件语句、三元运算、非运算")]),t._v(" "),s("li",[t._v("——> String:\n字符串与其他类型用 “+” 连接时")]),t._v(" "),s("li",[t._v("——> Number:\n除了以上的运算方式，其他运算方式如 + - * / == 等，都会转换为数字类型进行计算")])]),t._v(" "),s("h3",{attrs:{id:"强制转换"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#强制转换"}},[t._v("#")]),t._v(" 强制转换")]),t._v(" "),s("ul",[s("li",[t._v("——> Number:\nNumber()")]),t._v(" "),s("li",[t._v("——> String:\nString()")]),t._v(" "),s("li",[t._v("——> Boolean:\nBoolean()")])]),t._v(" "),s("h2",{attrs:{id:"写正则表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#写正则表达式"}},[t._v("#")]),t._v(" 写正则表达式")]),t._v(" "),s("ol",[s("li",[t._v("用正则表达式匹配字符串，以字母开头，后面是数字、字符串或者下划线，长度为 9-20")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RegExp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"^[a-zA-Z][a-zA-Z0-9_]{8,19}$"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"基础类型和引用类型的值内存中的位置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础类型和引用类型的值内存中的位置"}},[t._v("#")]),t._v(" 基础类型和引用类型的值内存中的位置")]),t._v(" "),s("ul",[s("li",[t._v("基础类型变量存在栈，值也存在栈")]),t._v(" "),s("li",[t._v("引用存在栈，但它指向的值存在堆")])]),t._v(" "),s("h2",{attrs:{id:"object、map"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#object、map"}},[t._v("#")]),t._v(" Object、Map")]),t._v(" "),s("ul",[s("li",[t._v("key 的类型不同。Object 只能是 string 或者 Symbol")]),t._v(" "),s("li",[t._v("Object 遍历时候顺序不能保证、Map 保证按照设置的顺序")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" abc"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"我的key是字符开头"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"我的key是数字开头"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//再次打印:{1: "我的key是数字开头", abc: "我的key是字符开头"}')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" map "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"我的key是字符开头"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"我的key是数字开头"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//{"a" => "我的key是字符开头", 1 => "我的key是数字开头"}')]),t._v("\n\n")])])]),s("ul",[s("li",[t._v("Map 用起来更优雅")]),t._v(" "),s("li",[t._v("Map 的性能收益，大量增删操作时速度快，储存大量的数据时占用的内存更小。")]),t._v(" "),s("li",[t._v("数据量小的时候 Object 占用的内存更小，新建时 Object 更快")])])])}),[],!1,null,null,null);a.default=v.exports}}]);