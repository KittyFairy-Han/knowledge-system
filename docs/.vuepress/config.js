/*
 * @Author: 鱼小柔
 * @Date: 2020-11-07 17:36:39
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 12:44:03
 * @Description: file content
 */

module.exports = {
  base: "/knowledge-system/",
  dest: "./dist", // 设置输出目录
  head: [["link", { rel: "icon", href: "image/logo.png" }]],
  themeConfig: {
    sidebarDepth: 2, //提取到 h3
    nav: [
      { text: "Home", link: "/" },
      { text: "CSS", link: "/CSS/layout/" },
      { text: "JS", link: "/JS/" },
      { text: "浏览器", link: "/broswer/" },
      { text: "工程化", link: "/engineering/" },
    ],
    sidebar: {
      "/html/": [["/html/mianjing", "面经"]],
      "/CSS/": [
        ["/CSS/selector", "选择器"],
        ["/CSS/size", "尺寸"],
        ["/CSS/props", "属性"],
        ["/CSS/layout", "布局"],
        ["/CSS/strange-style", "冷门样式"],
      ],
      "/JS/": [
        {
          title: "数据类型", // 必要的
          path: "/JS/basic/Type", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            ["/JS/basic/Type/Boolean-undefined-null-NaN", "特殊值"],
            ["/JS/basic/Type/Number", "Number"],
            ["/JS/basic/Type/String", "String"],
            ["/JS/basic/Type/Array", "Array"],
            ["/JS/basic/Type/Symbol", "Symbol"],
          ],
        },
        {
          title: "ES6", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            ["/JS/basic/ES6/Proxy+Reflect", "Proxy和Reflect"],
            ["/JS/basic/ES6/fetch", "fetch"],
            ["/JS/basic/ES6/other", "其他"],
          ],
        },
        {
          title: "闭包、作用域和 this 关键字", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            ["/JS/Closure-scope-context/Closure", "闭包"],
            ["/JS/Closure-scope-context/scope", "作用域"],
            ["/JS/Closure-scope-context/context", "上下文this"],
          ],
        },
        {
          title: "原型链、类和继承", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            ["/JS/prototype-chain-class-extends/prototype-chain", "原型链"],
            ["/JS/prototype-chain-class-extends/class-extends", "继承"],
          ],
        },
        {
          title: "单线程、异步和事件轮询", // 必要的
          path: "/JS/single-thread-async-event-loop",
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            ["/JS/single-thread-async-event-loop/async","异步"],
            ["/JS/single-thread-async-event-loop/event-loop","事件轮询"],
            ["/JS/single-thread-async-event-loop/WebWork","WebWork"]
          ],
        },
        {
          title: "通信(跨域)、Ajax 和存储", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: ["/JS/communication-AJAX-storage/communication", "/JS/communication-AJAX-storage/storage"],
        },
        {
          title: "模块化、组件化和设计模式", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/modularity-componential-design-patterns/modularity",
            "/JS/modularity-componential-design-patterns/componential",
            "/JS/modularity-componential-design-patterns/design",
          ],
        },
        ["/JS/BOM/","浏览器对象"],
        ["/JS/DOM/","文档对象"],
        ["/JS/monitor-security/","错误监控"],
      ],
      "/engineering/": [
        {
          title: "Vue",
          collapsable: false,
          children: ["/engineering/Vue/use", "/engineering/Vue/principle", "/engineering/Vue/Vue3"],
        },
        ["/engineering/vdom/", "vdom"],
        {
          title: "webpack",
          collapsable: true,
          children: [
            "/engineering/webpack/",
            "/engineering/webpack/chunk",
            "/engineering/webpack/SPA-MPA-MB",
            "/engineering/webpack/optimization",
            "/engineering/webpack/app-demo",
          ],
        },
      ],
      "/broswer/": [
        ["/broswer/work", "浏览器的工作原理"],
        ["/broswer/http", "http"],
        ["/broswer/cache", "浏览器缓存"],
        ["/broswer/memory", "内存"],
        ["/broswer/security", "安全"],
        ["/broswer/render", "网页渲染"],
      ],
    },
  },
};
