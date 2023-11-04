(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{377:function(t,s,e){"use strict";e.r(s);var a=e(14),n=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"fetch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fetch"}},[t._v("#")]),t._v(" fetch")]),t._v(" "),s("h3",{attrs:{id:"fetch-vs-xmlhttprequest"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fetch-vs-xmlhttprequest"}},[t._v("#")]),t._v(" fetch VS XMLHttpRequest")]),t._v(" "),s("p",[t._v("fetch()是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。\n浏览器原生提供这个对象。---阮一峰博文")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th"),t._v(" "),s("th",[t._v("fetch")]),t._v(" "),s("th",[t._v("XMLHttpRequest")]),t._v(" "),s("th",[t._v("基于 xhr 封装的库 axios")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("基于")]),t._v(" "),s("td",[t._v("原生 js 采用了 Promise")]),t._v(" "),s("td",[t._v("原生 js 采用了 callback")]),t._v(" "),s("td",[t._v("基于 xhr 结合了 Promise")])]),t._v(" "),s("tr",[s("td",[t._v("API 设计")]),t._v(" "),s("td",[t._v("符合模块化设计(说明 1)")]),t._v(" "),s("td",[t._v("API 设计并不是很好(说明 2)")]),t._v(" "),s("td",[t._v("符合模块化设计")])]),t._v(" "),s("tr",[s("td",[t._v("传输数据")]),t._v(" "),s("td",[t._v("通过数据流（Stream 对象）处理数据(说明 3)")]),t._v(" "),s("td",[t._v("不支持数据流(说明 4)")]),t._v(" "),s("td",[t._v("不支持数据流")])]),t._v(" "),s("tr",[s("td",[t._v("报错")]),t._v(" "),s("td",[t._v("只有网络错误，或者无法连接时，才报错(rejected)(说明 5)")]),t._v(" "),s("td",[t._v("非 200 都会进 error 回调")]),t._v(" "),s("td",[t._v("非 200 都会 reject")])]),t._v(" "),s("tr",[s("td",[t._v("跨域")]),t._v(" "),s("td",[t._v("设置 no-cors 属性就能跨域")]),t._v(" "),s("td",[t._v("不能跨域")]),t._v(" "),s("td",[t._v("不能跨域，但是通常项目中有 node 后端代理可以跨域")])])])]),t._v(" "),s("ul",[s("li",[t._v("说明 1 API 分散在多个对象上（Response 对象、Request 对象、Headers 对象）")]),t._v(" "),s("li",[t._v("说明 2 输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。")]),t._v(" "),s("li",[t._v("说明 3 可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。")]),t._v(" "),s("li",[t._v("说明 4 所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。")]),t._v(" "),s("li",[t._v("说明 5 只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。"),s("br"),t._v("\n这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected 状态）。"),s("br"),t._v("\n只有通过 Response.status 属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。或者 response.ok 是否为 true 判断请求是否成功")])]),t._v(" "),s("h3",{attrs:{id:"response-headers-属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-headers-属性"}},[t._v("#")]),t._v(" Response.headers 属性")]),t._v(" "),s("p",[t._v("是一个 Map 对象，可以使用 Map 数据结构可以采用的 API")]),t._v(" "),s("h3",{attrs:{id:"response-读取内容的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-读取内容的方法"}},[t._v("#")]),t._v(" Response 读取内容的方法")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//得到文本字符串。")]),t._v("\nresponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("json")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//得到 JSON 对象。")]),t._v("\nresponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("blob")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//得到二进制 Blob 对象。")]),t._v("\nresponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("formData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//得到 FormData 表单对象。")]),t._v("\nresponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("arrayBuffer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//得到二进制 ArrayBuffer 对象。")]),t._v("\n")])])]),s("ul",[s("li",[t._v("response.formData()主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。")]),t._v(" "),s("li",[t._v("response.blob()用于获取二进制文件。 比如拿到图片的二进制数据然后渲染到网页上。")]),t._v(" "),s("li",[t._v("response.arrayBuffer()主要用于获取流媒体文件。比如音频、视频\n"),s("blockquote",[s("p",[t._v("数据流只能读取一次，一旦读取，数据流就空了。再次读取就不会得到结果。解决方法是在读取之前，先使用.clone()方法，")])])])])])}),[],!1,null,null,null);s.default=n.exports}}]);