<!--
 * @Author: 鱼小柔
 * @Date: 2020-12-14 21:01:05
 * @LastEditors: your name
 * @LastEditTime: 2021-02-07 22:14:36
 * @Description: file content
-->

# 标题没想好

## 背景

之前工作中遇到过这样的一个项目（下文称之为 iarrm ），需求点如下

1. 插件化：iarrm 整体是嵌在PC客户端里面的，客户端有标签(可以理解为几个功能按钮的组合体)，标签类型有多种，对应多个业务类型，对应多个 iarrm 插件。多个插件要完全独立，单独安装某个插件，该插件就包含了它自己所有的逻辑、资源、数据等等。
2. 点击一个标签中的一个按钮，则唤起 web 页面, 相当于浏览器打开一个新的标签页，根据当前标签的类型和点击的按钮，渲染对应的插件和插件中对应的页面。
3. 要提供一个脚手架给业务中心的人用，当新增标签类型时，尽量少配置，只开发业务就行。
4. 支持多皮肤，打开客户端之前选择一套皮肤，切换皮肤需要重启客户端。所以每次打开网页其实只会使用一套皮肤，不会出现动态切换。

（公司内部前端工程都是 webpack+vue）

## 插件化

### 总体方案

1. 根据需求多个插件完全独立，就说明多个插件对应多个 app，也就是多个前端包。但是这些插件对于前端开发来说，大多数的依赖和使用的组件都是相同的（比如人脸插件、人体插件都有用到轮播）。而且标签类型很多。所以每个标签用一个前端工程不好管理，开发效率太低，后期也不好维护。还是要用一个工程输出多个包。
2. 标签中的每个按钮点击都相当于在浏览器打开一个新的标签页。有两个方案，1 多页应用（每个按钮对应 webpack 中的多页的一个 page），2 单页应用结合路由懒加载（每个按钮对应 vue 的一个 router，结合路由懒加载。）。单页应用的优势就是在一个页面进行前端路由跳转，页面更新快，因为不用发 http 请求通过后端去返回一个新的页面了，转场动画页容易实现。但是对于这个需求来说，每次点击一个按钮都是重新打开一个标签页，无论如何都是发起一次 http 请求了，也不需要转场动画。所以单页应用的优势基本是没有应用到的。所以采用多页应用的形式。
   > 单页应用、多页应用、多个包、路由分割和懒加载详细对比见 SPA-MPA-MB 章节

### how to 1 个工程->N 个包

#### 目录结构(关键部分，不包含任何业务相关的目录)

```
src
  └── pages
      └── demo # 对应一个 app
          ├── home #对应一个 page
          |   ├──main.js
          |   └──App.vue
          └── about #对应一个 page
              ├──main.js
              └──App.vue


```

```
 plugins
      └── demo # app 根目录
          ├── demo-home.html # page：home
          ├── demo-about.html # page：about
          └── assets
              ├── js # 脚本资源目录
              ├── css # 样式资源目录
              └── img # 图片资源目录



```

#### 通过命令行控制

> STEP 1

set PLUGIN_KEY=xxx

```json
//package.json
"scripts": {
    "build:demo": "set PLUGIN_KEY=demo&&vue-cli-service build",
  }
```

> STEP2

process.env.PLUGIN_KEY 拿到命令行中 PLUGIN_KEY=xxx 的 xxx。然后根据 process.env.PLUGIN_KEY 去 pages 对应的目录下找 main.js,配置 vue.config.js 中的 pages 选项。在开发环境下，是没有 process.env.PLUGIN_KEY 的，那么就是把 pages 下所有目录中的 main.js 都找到配置 vue.config.js 中的 pages 选项。

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

## 与客户端通信

在 window 上注册一个方法供客户端调用，通过客户端传参设置皮肤等信息

```js
// pages/demo/home/client-call.js
window.clientCallJs = function(params) {
  {skin,data} = JSON.parse(params);
  if (!(skin && data)) {
    console.error("客户端传参不完整");
  }
  setSkin(skin)
};
function setSkin(skin){
  // 设置皮肤
  // 下面小节将补充这个函数
}
```

## 换肤功能

根据需求，多套皮肤每次需要根据客户端传参来决定使用其中的一套，也就是说可能有 5 套皮肤代码，但是其实浏览器中只需要用到 1/5。所以 5 套皮肤需要分 5 个文件，每次去加载其中 1 个文件，这样才合理。 如果全部都在一份文件中，那么一份文件体积过大，且实际用到的只是很小一部分，会造成浪费。在 webpack 中，最后的产生的文件都来源于 chunk，所以分文件就要知道怎么分 chunk。

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
// pages/demo/home/client-call.js
function setSkin(skin) {
  /* webpackChunkName: "global-themes" */
  import(`../../skin/${skin}/index.less`);
}
// 使用魔法注释为chunk命名,这样打包出来的文件名就是global-themes0、global-themes1、...
```

#### 打包后两个皮肤文件分别为 global-themes0.css(绿色主题对应的 css)、global-themes1.css (蓝色主题对应的 css)

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

## webpack 通用优化

移步 webpack 优化章节

## 规范性方面

> 如何自定义打包后的文件名称？

### css 文件

通过上文知道 css 文件就两种，一个是通过主入口 js 提取出来的 css，一个是异步 css。在 vue.config.js 中，前者命名配置 css.extract 选项，后者可以通过魔法注释。

#### 如果是异步 import 产生的 chunk

[webpack 魔法注释](https://webpack.docschina.org/api/module-methods/#magic-comments)

```js
// src/pages/demo/home/main.js
// 就拿换肤那段代码举例子，可以这样写
import(
  /* webpackChunkName: "global-themes" */
  `../../skin/${params.tag}/index.less`
);
```

输出 global-themes0.css、global-themes1.css

#### css.extract 的配置

```js
// vue.config.js
module.exports.css.extract = {
  // 入口js生成的chunk中提取出的css后，为css文件命名
  // [name] 就是入口的key，src/pages/demo/home/main.js 配置pages选项的时候key是demo-home
  filename: `assets/css/[name].css`,
  // 非入口文件生成chunk后，设置css文件名。
  // 该项目中，非入口文件生成的css就是异步引入皮肤样式代码产生的，
  // 在import()时使用了魔法注释，形成chunk时，名称就是遵照魔法注释来的，
  // 我们希望最后生成的文件名与形成 chunk 时一致，所以仍然是 "assets/css/[name].css"
  // 如果这一项不配置则会取 filename 的值，所以我们得配置为默认的 "assets/css/[name].css"
  chunkFilename: `assets/css/[name].css`,
};
```

输出 demo-home.css

### js 文件

通过上文，没有配置特定的插件，没有使用 splitChunk，输出的 js 来源也是只有两种，一个是主入口形成的，一个是懒加载的。懒加载的同 css 使用魔法注释。来源于主入口的可以通过配置 webpack 原生的 output 选项。

```js
//vue.config.js
module.exports.chainWebapck = (config) => {
  // [name] 就是入口的key，src/pages/demo/home/main.js 配置pages选项的时候key是demo-home
  config.output.filename(`assets/js/[name].js`).end();
};
```
