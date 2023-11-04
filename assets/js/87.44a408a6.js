(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{526:function(t,s,a){"use strict";a.r(s);var n=a(42),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"gl-drawarrays-mode-first-count"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gl-drawarrays-mode-first-count"}},[t._v("#")]),t._v(" gl.drawArrays(mode, first, count)")]),t._v(" "),a("ul",[a("li",[t._v("first，count 决定拿出的坐标有哪些：类似 str.substr(start, end) 的意思。")]),t._v(" "),a("li",[t._v("mode 决定对这些坐标的处理方式。"),a("br"),t._v("\n假设拿出的坐标有 a,b,c,d,...,n-1,n")])]),t._v(" "),a("h4",{attrs:{id:"mode-gl-gl-points"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mode-gl-gl-points"}},[t._v("#")]),t._v(" mode = gl.GL_POINTS")]),t._v(" "),a("p",[t._v("绘制结果是多个点，每个坐标都被绘制为一个点。")]),t._v(" "),a("h4",{attrs:{id:"mode-gl-gl-lines"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mode-gl-gl-lines"}},[t._v("#")]),t._v(" mode = gl.GL_LINES")]),t._v(" "),a("p",[t._v("绘制结果是多个线段，坐标按顺序两个点连接为一个线段，不重复使用点。"),a("br"),t._v("\na->b,c->d,...,n-1->n")]),t._v(" "),a("h4",{attrs:{id:"mode-gl-gl-line-loop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mode-gl-gl-line-loop"}},[t._v("#")]),t._v(" mode = gl.GL_LINE_LOOP")]),t._v(" "),a("p",[t._v("绘制结果是一个线圈，坐标按顺序依次连接，首尾相接"),a("br"),t._v("\na->b->c->d->...->n->a")]),t._v(" "),a("h3",{attrs:{id:"矩阵固定公式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#矩阵固定公式"}},[t._v("#")]),t._v(" 矩阵固定公式")]),t._v(" "),a("p",[t._v("用这些固定公式去 x 点的齐次坐标（x,y,z,1）可以进行变换")]),t._v(" "),a("h4",{attrs:{id:"平移矩阵"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#平移矩阵"}},[t._v("#")]),t._v(" 平移矩阵")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("1st")]),t._v(" "),a("th",[t._v("3nd")]),t._v(" "),a("th",[t._v("3rd")]),t._v(" "),a("th",[t._v("4th")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("1")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("Δx")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("Δy")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("Δz")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")])])])]),t._v(" "),a("h4",{attrs:{id:"旋转矩阵-旋转角度-θ"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#旋转矩阵-旋转角度-θ"}},[t._v("#")]),t._v(" 旋转矩阵（旋转角度 Θ）")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("绕 z 轴旋转")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("1st")]),t._v(" "),a("th",[t._v("3nd")]),t._v(" "),a("th",[t._v("3rd")]),t._v(" "),a("th",[t._v("4th")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("cosΘ")]),t._v(" "),a("td",[t._v("-sinΘ")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("sinΘ")]),t._v(" "),a("td",[t._v("cosΘ")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")])])])])]),t._v(" "),a("li",[a("p",[t._v("绕 x 轴旋转")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("1st")]),t._v(" "),a("th",[t._v("3nd")]),t._v(" "),a("th",[t._v("3rd")]),t._v(" "),a("th",[t._v("4th")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("1")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("cosΘ")]),t._v(" "),a("td",[t._v("-sin0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("sin0")]),t._v(" "),a("td",[t._v("cos0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")])])])])]),t._v(" "),a("li",[a("p",[t._v("绕 y 轴旋转")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("1st")]),t._v(" "),a("th",[t._v("3nd")]),t._v(" "),a("th",[t._v("3rd")]),t._v(" "),a("th",[t._v("4th")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("cosΘ")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("sinΘ")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("-sinΘ")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("cosΘ")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")])])])])])]),t._v(" "),a("h3",{attrs:{id:"gl-drawelements-mode-count-type-start"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gl-drawelements-mode-count-type-start"}},[t._v("#")]),t._v(" gl.drawElements(mode, count, type, start)")]),t._v(" "),a("p",[t._v("和 gl.drawArrays(mode, first, count) 不同在于")]),t._v(" "),a("ul",[a("li",[t._v("多了个 type")]),t._v(" "),a("li",[t._v("count 和 start 是针对索引的，不是针对坐标的")])]),t._v(" "),a("h3",{attrs:{id:"gl-drawarray-与-gl-drawelements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gl-drawarray-与-gl-drawelements"}},[t._v("#")]),t._v(" gl.drawArray 与 gl.drawElements")]),t._v(" "),a("p",[t._v("绘制立方体需要八个坐标，把以下坐标数据当成一个数据库")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//z为0.5时，xOy平面上的四个点坐标")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第一象限")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第二象限")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第三象限")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//第四象限")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//z为-0.5时，xOy平面上的四个点坐标,同理")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("使用 drawArray 的时候传入的数据是 数据库中"),a("strong",[t._v("连续")]),t._v("的一段"),a("strong",[t._v("坐标")]),t._v("数据\n但是连续的数据无论用哪种绘制模式，都没办法绘制完整的立方体，所以数据库中会出现重复的数据"),a("br"),t._v("\n延伸出另一个数据库，数据库中存放的是索引")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" indexes "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Uint8Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//前四个点对应索引值")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//后四个顶点对应索引值")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// x0y 平面两两对称点（第一象限）")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// x0y 平面两两对称点（第二象限）")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// x0y 平面两两对称点（第三象限）")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// x0y 平面两两对称点（第四象限）")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("使用 drawElements 的时候传入的数据是 索引数据库中"),a("strong",[t._v("连续")]),t._v("的一段"),a("strong",[t._v("索引")]),t._v("数据\n这样不用重复定义坐标了")])])}),[],!1,null,null,null);s.default=r.exports}}]);