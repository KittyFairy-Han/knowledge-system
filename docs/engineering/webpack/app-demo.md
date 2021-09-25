<!--
 * @Author: 鱼小柔
 * @Date: 2020-12-14 21:01:05
 * @LastEditors: your name
 * @LastEditTime: 2021-09-25 11:16:22
 * @Description: file content
-->

# 标题没想好

## 需求

1. 插件化。  
客户端有多个标签(可以理解为几个功能按钮的组合体)，标签类型有多种，从业务角度来讲，是对应多种不同的监控摄像头，从代码角度来讲，是对应多个 iarrm 插件。多个插件要完全独立，可以单独安装使用。点击一个标签中的一个按钮，根据当前标签的类型和点击的按钮，唤起对应的 web 页面, 相当于浏览器打开一个新的标签页。  
   例如，安装了人脸插件的客户端，就携带有查看人脸抓拍历史、人脸实时抓拍情况、人脸数据统计图等功能。当点击人脸标签上的人脸历史按钮时，就打开人脸历史的 web 页面，使用其中的功能。
   ![f1](./static/app-demo-f1.png)

2. 支持多主题。  
客户端唤起网页时，通知 web 当前使用的主题，web 全局应用该主题。
   ![f2](./static/app-demo-f2.png)

3. 提供一个脚手架    
要提供一个脚手架（公司内部前端工程都是 webpack+vue）给分公司，当新增标签类型时，尽量能够复用组件，只开发业务。

根据需求可以分析出来几个技术点：1 插件化 2 多主题 3 客户端与 web 通信 4 脚手架。下面就逐一击破吧~

## 插件化


## 与客户端通信

在这个项目中，通信这个功能，主要是客户端向 web 传达一些信息，web 是不需要主动调用客户端的功能的。所以只要弄明白 client 如何调用 js 就行了。  
其实 client->js 已经有了成熟的技术方案，前端需要做的就是在 window 上注册一个方法，client 调用这个方法进行一些信息的传达。  
每个页面功能不同，但都会传达的一个信息就是当前使用的主题，所以我们就以传递主题信息为例子。

```js
// apps/demo/home/main.js
window.clientCallJs = function(params) {
  {skin} = JSON.parse(params);
  setSkin(skin)
};
function setSkin(skin){
  // 设置主题
  // 下面小节将补充这个函数
}
```

这样，当客户端调用 clientCallJs 方法时，就会进入 js 内部的逻辑。我们根据 params 传参去做一些后续的事情。

## 多主题功能

### 基本思路

结合这个项目的特点，多主题每次只会应用其中的一种，不需要在线换肤。所以采用的技术方案是，把多个主题分包，根据客户端传参去加载对应的文件，其他主题包不会用到，不需要去加载避免浪费资源。  
这里的关键点是分包，分包的方式有多种，[可以查看这篇文章：webpack chunk](https://juejin.cn/post/7004790532916379655)。结合这个项目的需求，采用 import() 函数这种分包方式，达到拆分和异步加载的目的。
假设 demo 插件有两种色系的主题，蓝色和绿色。以demo-home页面为例子，源码目录大概就是这样的：

```
project
  └── ....
      ├── demo
      |   ├── home
      |   |   ├──main.js
      |   |   ├──themes
      |   |   |   ├──blue.less      //home页面蓝色主题样式定义在这里
      |   |   |   └──green.less     //home页面蓝色主题样式定义在这里
      |   |   └──App.vue
      |   └── ...
      └── ....
```

引入皮肤的代码雏形大概就是这样的

```js
// apps/demo/home/main.js
function setSkin(skin) {
  /* webpackChunkName: "themes-" */
  import(`./themes/${skin}.less`);
}
```

为了后面更加方便的介绍。我把 App.vue、blue.less、green.less 的代码贴一下
``` vue

```


### 目录结构以及使用示例

```code
  src
  ├── main.js
  ├── ...
  ├── skin
  |   ├── green
  |   |   ├── theme.less # 定义一些主题通用的变量
  |   |   ├── demo-vars.less # 定义一些业务相关的变量
  |   |   └── index.less # green 主题的主人口 里面引用了green/theme.less、green/demo-vars.less、style/demo.less
  |   ├── blue
  |   |   ├── theme.less # 定义一些主题通用的变量
  |   |   ├── demo-vars.less # 定义一些业务相关的变量
  |   |   └── index.less # blue 主题的主人口 blue/theme.blue/demo-vars.less、style/demo.less
  |   └── style
  |       └── demo.less # demo 使用对应的业务变量或者直接引用主题变量定义样式
  └── ...

```

- green

```less
// green/theme.less
@main-color: #08ff70;
@main-act-color: #e6941a;
@text-color: white;
//green/demo-vars.less
@demo-home-border-color: lightgreen;
// green/index.less 顺序必须是先引入变量文件然后引入业务代码
@import "./theme.less";
@import "./demo-vars.less";
@import "../style/demo.less";
```

- blue

```less
//blue/theme.less
@main-color: #1a68c2;
@main-act-color: #e3e61a;
@text-color: white;
//blue/demo-vars.less
@demo-home-border-color: skyblue;
//blue/index.less 顺序必须是先引入变量文件然后引入业务代码
@import "./theme.less";
@import "./demo-vars.less";
@import "../style/demo.less";
```

- style

```less
//style/demo.less
.demo-home-root {
  background-color: @main-color;
  border: 5px solid @demo-home-border-color;
  &:hover {
    background-color: @main-act-color;
  }
}
```

### how to 分 chunk

引入 模块的几种方式 import、require、import()。这几种方式只有 import() 能实现自动划分 chunk，如果使用 import 或者 require 需要手动配置 splitChunk，所以采用了 import() 的方式。如果想要了解配置 splitChunk 主动划分移步 chunk 章节。

> (webpack 官方提示：可以自己配置分包，但是不要在没有实践测量的情况下，尝试手动优化这些参数。默认模式是经过千挑万选的，可以用于满足最佳 web 性能的策略。)

#### 写法

```js
// apps/demo/home/main.js
function setSkin(skin) {
  /* webpackChunkName: "global-themes-" */
  import(`./themes/${skin}.less`);
}
// 使用魔法注释为chunk命名,这样打包出来的文件名就是global-themes0、global-themes1、...
```

#### 打包后两个主题文件分别为 global-themes0.css(绿色主题对应的 css)、global-themes1.css (蓝色主题对应的 css)

```css
/* global-themes0.css 绿色主题对应的css */
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* global-themes1.css 蓝色主题对应的css */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

##

```js
const path = require("path");
const fs = require("fs");
let pages = {};
// vue.config.js -- 在生产环境下 ===== start
// 当前的 process.env.PLUGIN_KEY值是 demo
// 读取 src/pages/demo 下面的的所有目录，也就是 home、about
const pageNameList = fs.readdirSync(
  path.resolve(__dirname, `src/pages/${process.env.PLUGIN_KEY}`)
);
// 设置当前plugin所有page下面的main.js为入口，也就是 home、about 目录下的 main.js 为两个入口
pageNameList.forEach((pageName) => {
  pages[
    `${pluginKey}-${pageName}`
  ] = `src/pages/${pluginKey}/${pageName}/main.js`;
});
// 最后形成的多页面配置项是这样的
// pages:{
//   "demo-home":"src/pages/demo/home/main.js",
//   "demo-about":"src/pages/demo/about/main.js"
// }
// vue.config.js -- 在生产环境下 ===== end
// vue.config.js -- 在开发环境下 ===== start
const pluginKeyList = fs.readdirSync(path.resolve(__dirname, `src/pages`));
pluginKeyList.forEach((pluginKey) => {
  const pageNameList = fs.readdirSync(
    path.resolve(__dirname, `src/pages/${pluginKey}`)
  );
  pageNameList.forEach((pageName) => {
    pages[
      `${pluginKey}-${pageName}`
    ] = `src/pages/${pluginKey}/${pageName}/main.js`; //根据pluginKey去配置pages选项
  });
});
// vue.config.js -- 在开发环境下 ===== end
module.exports.pages = pages;
```

process.env.PLUGIN_KEY 拿到命令行中 PLUGIN_KEY=xxx 的 xxx。然后根据 process.env.PLUGIN_KEY 去 pages 对应的目录下找 main.js,配置 vue.config.js 中的 pages 选项。在开发环境下，是没有 process.env.PLUGIN_KEY 的，那么就是把 pages 下所有目录中的 main.js 都找到配置 vue.config.js 中的 pages 选项。
