/*
 * @Author: 鱼小柔
 * @Date: 2020-11-07 17:36:39
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 00:41:40
 * @Description: file content
 */

module.exports = {
  themeConfig: {
    sidebarDepth: 2,//提取到 h3
    sidebar: {
      "/JS/": [
        {
          title: "数据类型", // 必要的
          path: "/JS/basic/Type", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/basic/Type/Boolean-undefined-null-NaN",
            "/JS/basic/Type/Number",
            "/JS/basic/Type/String",
            "/JS/basic/Type/Array",
            "/JS/basic/Type/Object",
            "/JS/basic/Type/Function",
            "/JS/basic/Type/Set+Map",
          ],
        },
        ["/JS/basic/ES6","ES6"],
        {
          title: "闭包、作用域和 this 关键字", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/Closure-scope-context/Closure",
            "/JS/Closure-scope-context/scope",
            "/JS/Closure-scope-context/context",
          ],
        },
        {
          title: "原型链、类和继承", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/prototype-chain-class-extends/prototype-chain",
            "/JS/prototype-chain-class-extends/class-extends",
          ],
        },
        {
          title: "单线程、异步和事件轮询", // 必要的
          path: "/JS/single-thread-async-event-loop",
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/single-thread-async-event-loop/WebWork",
            "/JS/single-thread-async-event-loop/async",
            "/JS/single-thread-async-event-loop/event-loop",
          ],
        },
        {
          title: "通信(跨域)、Ajax 和存储", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            "/JS/communication-AJAX-storage/communication",
            "/JS/communication-AJAX-storage/storage",
          ],
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
        // ["/JS/BOM","浏览器对象"],
        // ["/JS/DOM","文档对象"],
        // ["/JS/monitor","错误监控"],
      ],
      "/engineering/":[
        {
          title: "Vue", 
          collapsable: false, 
          children: [
            "/engineering/Vue/",
          ],
        },
        {
          title: "虚拟 dom", 
          collapsable: false, 
          children: [
            "/engineering/vdom/",
          ],
        },
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
      "/CSS/":[
        ["/CSS/layout","页面布局"],
      ],
      "/broswer/":[
        ["/broswer/http","http"],
        ["/broswer/cache","浏览器缓存"]
      ]
    },
  },
};
 
// let person = {
//   family:{
    
//   }
// }
// function test(familyOFperson){
//   familyOFperson = {
//     mom:'li',
//     dad:'zhang'
//   }
// }
// test(person.family)
// console.log(person)