/*
 * @Author: 鱼小柔
 * @Date: 2020-11-07 17:36:39
 * @LastEditors: your name
 * @LastEditTime: 2022-06-25 07:50:06
 * @Description: file content
 */

module.exports = {
  base: "/knowledge-system/",
  dest: "../dist", // 设置输出目录
  head: [["link", { rel: "icon", href: "image/logo.png" }]],
  plugins: [["image"]],
  themeConfig: {
    sidebarDepth: 2, //提取到 h3
    nav: [
      { text: "Home", link: "/" },
      { text: "CSS", link: "/CSS/layout/" },
      { text: "JS", link: "/JS/" },
      { text: "React", link: "/React/" },
      { text: "Vue", link: "/Vue/" },
      { text: "浏览器", link: "/broswer/work/" },
      { text: "工程化", link: "/engineering/" },
      { text: "其他", link: "/scene/lottieUsage/" },
      { text: "web3d", link: "/web3d/" },
    ],
    sidebar: {
      "/html/": [["/html/mianjing", "面经"]],
      "/CSS/": [
        ["/CSS/selector", "选择器"],
        ["/CSS/size", "尺寸"],
        ["/CSS/props", "属性"],
        ["/CSS/tailwind", "tailwind"],
      ],
      "/JS/": [
        {
          title: "数据类型", 
          path: "/JS/basic/Type", 
          collapsable: false, 
          children: [
            ["/JS/basic/Type/Boolean-undefined-null-NaN", "特殊值"],
            ["/JS/basic/Type/Number", "Number"],
            ["/JS/basic/Type/String", "String"],
            ["/JS/basic/Type/Array", "Array"],
            ["/JS/basic/Type/Symbol", "Symbol"],
          ],
        },
        {
          title: "ES6", 
          collapsable: false, 
          children: [
            ["/JS/basic/ES6/Proxy+Reflect", "Proxy和Reflect"],
            ["/JS/basic/ES6/fetch", "fetch"],
            ["/JS/basic/ES6/other", "其他"],
          ],
        },
        {
          title: "闭包、作用域和 this 关键字", 
          collapsable: false, 
          children: [
            ["/JS/Closure-scope-context/Closure", "闭包"],
            ["/JS/Closure-scope-context/scope", "作用域"],
            ["/JS/Closure-scope-context/context", "上下文this"],
          ],
        },
        {
          title: "原型链、类和继承", 
          collapsable: false, 
          children: [
            ["/JS/prototype-chain-class-extends/prototype-chain", "原型链"],
            ["/JS/prototype-chain-class-extends/class-extends", "继承"],
          ],
        },
        {
          title: "单线程、异步和事件轮询", 
          path: "/JS/single-thread-async-event-loop",
          collapsable: false, 
          children: [
            ["/JS/single-thread-async-event-loop/async", "异步"],
            ["/JS/single-thread-async-event-loop/event-loop", "事件轮询"],
            ["/JS/single-thread-async-event-loop/WebWork", "WebWork"],
          ],
        },
        {
          title: "通信(跨域)、Ajax 和存储", 
          collapsable: false, 
          children: [
            ["/JS/communication-AJAX-storage/communication", "通信"],
            ["/JS/communication-AJAX-storage/storage", "存储"],
          ],
        },
        
        ["/JS/memory", "内存"],
        ["/JS/BOM/", "浏览器对象"],
        ["/JS/DOM/", "文档对象"],
        ["/JS/monitor-security/", "错误监控"],
      ],
      "/React/": [
        {
          title: "七七八八",
          collapsable: false,
          children: [
            [
              "/React/7788/set-interval",
              "functional component 中的 setInterval",
            ],
            ["/React/7788/react-etc", "react相关技术栈"],
          ],
        },
        {
          title: "状态管理",
          collapsable: false,
          path: "/React/state-management/",
          children: [
            ["/React/state-management/context-vs-redux", "redux基础"],
            [
              "/React/state-management/redux-combine-and-saga",
              "redux的combineReducer和中间件",
            ],
            // ["/React/state-management/recoil", "recoil"],
            // ["/React/state-management/mobx", "mobx"],
            ["/React/state-management/zustand", "zustand"],
            ["/React/state-management/jotai", "jotai"],
          ],
        },
        {
          title: "动画库",
          collapsable: false,
          path: "/React/animate/",
          children: [
            
          ],
        },
      ],
      "/Vue/": [
        ["/Vue/use", "使用"],
        ["/Vue/principle", "原理"],
        ["/Vue/Vue3", "Vue3"],
        ["/Vue/how-about-Vue3", "how-about-Vue3"],
      ],
      "/engineering/": [
        
        {
          title: "模块化、组件化和设计模式",
          collapsable: false,
          children: [
            ["/engineering/design/modularity", "模块化"],
            ["/engineering/design/componential", "组件化"],
            ["/engineering/design/design-pattern", "设计模式"],
          ],
        },

        
        {
          title: "webpack",
          path: "/engineering/webpack/",
          collapsable: false,
          children: [
            ["/engineering/webpack/main-flow", "主流程（主线剧情）"],
            ["/engineering/webpack/chunk", "chunk"],
            ["/engineering/webpack/SPA-MPA-MB","SPA-MPA-MB"],
            ["/engineering/webpack/pluggable", "one-project-to-multiple-app"],
          ],
        },
        ["/engineering/vite/", "vite"],
      ],
      "/broswer/": [
        ["/broswer/work", "浏览器的工作原理"],
        ["/broswer/http", "http"],
        ["/broswer/cache", "浏览器缓存"],
        ["/broswer/security", "安全"],
        ["/broswer/render", "网页渲染"],
      ],
      "/scene/": [
        ["/scene/optimistic", "前端性能优化"],
        ["/scene/upload", "上传"],
        ["/scene/lottieUsage", "lottie的应用场景"],
        ["/scene/screenshoots", "前端截屏方案"],
        ["/scene/modelViewer", "modelViewer"],
        ["/scene/cli", "脚手架工具"],
        ["/scene/vscode-extension", "vscode插件"],
        ["/scene/pay", "支付"],
        ["/scene/miniprogram", "小程序"],
      ],
      "/web3d/": [
        ["/web3d/demoStart/", "3d入门之空间与模型"],
        ["/web3d/demoInteraction/", "3d入门之交互"],
        ["/web3d/PORender/", "web3d性能优化-渲染"],
        ["/web3d/POLoad/", "web3d性能优化-加载"],
        ["/web3d/ARStart/", "入门AR"],
      ],
    },
  },
};
