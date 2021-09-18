<!--
 * @Author: 鱼小柔
 * @Date: 2020-12-14 21:01:05
 * @LastEditors: your name
 * @LastEditTime: 2021-09-13 01:25:47
 * @Description: file content
-->

# 标题没想好

## 需求

1. 插件化。客户端有多个标签(可以理解为几个功能按钮的组合体)，标签类型有多种，从业务角度来讲，是对应多种不同的监控摄像头，从代码角度来讲，是对应多个 iarrm 插件。多个插件要完全独立，可以单独安装使用。点击一个标签中的一个按钮，根据当前标签的类型和点击的按钮，唤起对应的 web 页面, 相当于浏览器打开一个新的标签页。  
   例如，安装了人脸插件的客户端，就携带有查看人脸抓拍历史、人脸实时抓拍情况、人脸数据统计图等功能。当点击人脸标签上的人脸历史按钮时，就打开人脸历史的 web 页面，使用其中的功能。
   ![f1](./static/app-demo-f1.png)

2. 支持多主题。客户端唤起网页时，通知 web 当前使用的主题，web 全局应用该主题。
   ![f2](./static/app-demo-f2.png)

3. 要提供一个脚手架（公司内部前端工程都是 webpack+vue）给分公司，当新增标签类型时，尽量能够复用组件，只开发业务。

根据需求可以分析出来几个技术点：1 插件化 2 多主题 3 客户端与 web 通信 4 脚手架。下面就逐一击破吧~

## 插件化

### 基本思路

“插件化” 这个概念映射到前端工程代码，该怎么理解呢？

① 根据需求多个插件完全独立，就说明每个插件~完整前端应用包

> TIPS  
> 准确来讲每个插件对应前端应用包+后端应用包，但是我们这里不讨论后端。  
> 下文前端应用包或插件会使用 app 代指

这些插件对于前端开发来说，大多数的依赖和使用的组件都是相同的（比如上图的人脸、卡口插件都包含历史这个页面，页面上的具体功能都差不多。)
所以正确的方案应该是一个前端工程，可以输出多个不同的 app。这样更方便的实现组件的复用，也更方便项目的维护。

② 根据需求，客户端标签中的每个按钮都会唤起一个 web 页面，所以每个 app 都包含多个 page，这是典型的 MPA。  
所以我们的每个 app 都是一个 MPA。

### 具体方案

假设我们的需要输出两个两个插件，demo 和 other，demo 包含两个页面 home 和 about，other 包含一个页面 home

```code

iarrm
  ├── demo
  |   ├──home
  |   └──about
  └── other
      └──home
```

我们期望生成的目录是这样滴，并且希望可以单独输出一个插件或多个插件一起输出

```
 plugins
      └── demo
      |   ├── demo-home.html
      |   ├── demo-about.html
      |   └── assets
      |       ├── js
      |       ├── css
      |       └── img
      └── other
          ├── other-home.html
          └── assets
              ├── js
              ├── css
              └── img

```

那么，在源码中，目录的基本骨架可以这样设置

```
project
├── ...
└──src
  └── apps
      ├── demo                 // ~ app
      |   ├── home             // ~ page
      |   |   ├──main.js
      |   |   └──App.vue
      |   └── about            // ~ page
      |       ├──main.js
      |       └──App.vue
      └── other                // ~app
          └── home            // ~ page
              ├──main.js
              └──App.vue


```

通过命令行去控制具体输出某一个或多个 app  
配置命令行，关键点是 set PLUGIN_KEY=xxx

```json
//package.json
"scripts": {
    "build:demo": "set PLUGIN_KEY=demo&&vue-cli-service build", //想要输出demo插件则执行这个命令
    "build:other": "set PLUGIN_KEY=other&&vue-cli-service build",//想要输出other插件则执行这个命令
    "build": "npm run build:demo&&npm run build:other",//想要依次输出多个插件则用&&相连命令行
  }
```

为每个插件配置输出位置

```js
module.exports = {
  outputDir: `dist/${process.env.PLUGIN_KEY}`,
};
```

配置 MPA，即为每个插件配置多页面。

```js
const apps = {
  demo: {
    home: {
      entry: `src/apps/demo/home/main.js`, // page 的入口(相对于项目的根目录)
      template: `src/common/template/index.html`, // 模板来源(相对于项目的根目录)
      filename: `demo-home.html`, // 输出位置(相对于 outputDir
    },
    about: {
      entry: `src/apps/demo/about/main.js`,
      template: `src/common/template/index.html`,
      filename: `demo-about.html`,
    },
  },
  other: {
    home: {
      entry: `src/apps/other/home/main.js`,
      template: `src/common/template/index.html`,
      filename: `other-home.html`,
    },
  },
};
module.exports = {
  pages: apps[process.env.PLUGIN_KEY],
  //当 PLUGIN_KEY 为 demo 的时候，打包 demo 下的页面。
  //    ......       other     .....  other
};
```

以输出 demo 插件为例，流程可以概括为  
![app-demo-flow](./static/app-demo-flow.png)

打包出来的目录结构

```code
 dist
  └── demo
      ├── demo-home.html
      ├── demo-about.html
      └── assets
```

有图有真相  
![打包demo录屏](./static/app-demo-flow_demo.gif)

那如果 npm run build 是怎样的呢，看图就知道啦  
![打包录屏](./static/app-demo-flow_all.gif)

直接打开 html 文件
![运行录屏](./static/app-demo-flow_prod.gif)

结果就是依次启动两次打包流程，相当于  
① 手动 npm run build:demo 输出文件后。  
② 然后再手动 npm run build:other 输出文件。

以上已经能达到插件化的基本需求，对于生产环境来说没什么问题。但是对于开发环境下可能会不太方便，我们可能需要同时开发多个插件的多个页面。  
开发环境下我们就不分插件，让 apps 下面的所有 page 都参与打包。所以我们需要修改一下 pages 配置项，其他配置项不变。

```js
const pages = {
  demoHome: {
    entry: `src/apps/demo/home/main.js`, // page 的入口(相对于项目的根目录)
    template: `src/common/template/index.html`, // 模板来源(相对于项目的根目录)
    filename: `demo-home.html`, // 输出位置(相对于 outputDir
  },
  demoAbout: {
    entry: `src/apps/demo/about/main.js`,
    template: `src/common/template/index.html`,
    filename: `demo-about.html`,
  },
  otherHome: {
    entry: `src/apps/other/home/main.js`,
    template: `src/common/template/index.html`,
    filename: `other-home.html`,
  },
};
module.exports = {
  pages: pages,
  // apps下所有page
};
```

然后我们 npm run serve 启动项目  
可以正常运行
![dev环境](./static/app-demo-flow_dev.gif)

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
