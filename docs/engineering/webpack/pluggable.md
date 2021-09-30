<!--
 * @Author: 鱼小柔
 * @Date: 2021-09-25 11:04:00
 * @LastEditors: your name
 * @LastEditTime: 2021-09-25 16:04:27
 * @Description: file content
-->

# 一个工程多个app包

## 背景

工作项目中遇到过一个这样的需求：一个前端工程输出多个应用包，多个应用包是完全独立的。所以研究了一下一份前端工程代码(project)如何输出多个应用包(app)。

## 概念的理解与区分

- SPA 单页面

一个入口，一个包，可以共享store数据，通信方便。非SPA数据不共享。

- MPA  多页面

多个入口输出还是一个包，有多个 html，资源文件夹共享，store数据不能共享。本质上只有一个 app。

- 多个app

本质上已经是完全不相关的app了，不涉及任何的资源文件夹共享，多个页面之间不能通信。


## 具体方案

我们以要输出 demo、other 两个插件为例，继续往下说~  
具体：demo 和 other，demo 包含两个页面 home 和 about，other 包含一个页面 home。

### 目录定制

#### 插件结构

```code
iarrm
  ├── demo
  |   ├──home
  |   └──about
  └── other
      └──home
```

#### 打包后输出目录

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

#### 源码中的目录

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

文件内容
![app-demo-src](./static/app-demo-src.png)
![app-demo-src2](./static/app-demo-src2.png)

### 打包配置

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

### 实现效果

运行 npm run build:demo 试一下吧  
![打包demo录屏](./static/app-demo-flow_demo.gif)

那如果 npm run build 是怎样的呢，看图就知道啦  
![打包录屏](./static/app-demo-flow_all.gif)

依次启动两次打包流程，相当于  
① 手动 npm run build:demo 输出文件后。  
② 然后再手动 npm run build:other 输出文件。

打包后的目录  
![app-demo-flow](./static/app-demo-dist.png)

直接打开 html 文件，看看能否正常加载到资源正常运行  
![运行录屏](./static/app-demo-flow_prod.gif)

大功告成！  
以上已经能达到插件化的基本需求，对于生产环境来说没什么问题。但是对于开发环境下可能会不太方便，我们可能需要同时开发多个插件的多个页面。应该怎么做呢？

### 针对开发环境的改造

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
这样就可以同时开发多个插件了

### 更自动化

上面的方案，每次新增插件或者页面的时候都需要重新配置。如果想要更自动化一点，可以利用 node 去读取固定目录下的文件，自动生成 pages。
在 vue.config.js 同级位置增加一个 config 目录

```code
project
  ├── ...
  ├── config
  |    ├── dev.js
  |    ├── prod.js
  |    └── util.js
  └── vue.config.js

```

util.js 中定义一些公用的 node 方法

```js
const path = require("path");
const fs = require("fs");

function getAppKeys() {
  const pluginsPath = path.resolve(__dirname, "../src/apps");
  const appKeys = fs.readdirSync(pluginsPath);
  return appKeys;
}
function getPageNames(appKey) {
  const pagesPath = path.resolve(__dirname, `../src/apps/${appKey}`);
  const pageNames = fs.readdirSync(pagesPath);
  return pageNames;
}

function setPage(appKey, pageName) {
  return {
    // page 的入口(相对于项目的跟目录)
    entry: `src/apps/${appKey}/${pageName}/main.js`,
    // 模板来源(相对于项目的跟目录)
    template: `src/common/template/index.html`,
    // 输出位置(相对于 outputDir
    filename: `${appKey}-${pageName}.html`,
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: `${appKey}标签${pageName}页面`,
  };
}
module.exports = {
  getAppKeys,
  getPageNames,
  setPage,
};
```

dev.js 中是针对开发环境的配置

```js
const { getAppKeys, getPageNames, setPage } = require("./utils");
const getAllPages = () => {
  const pages = {};
  const pluginKeys = getAppKeys();
  for (const pluginKey of pluginKeys) {
    const pageNames = getPageNames(pluginKey);
    for (const pageName of pageNames) {
      pages[`${pluginKey}-${pageName}`] = setPage(pluginKey, pageName);
    }
  }
  return pages;
};

module.exports = {
  publicPath: "/",
  // ...
  pages: getAllPages(),
};
```

prod.js 中是针对生产环境的配置

```js
/*
 * @Author: 鱼小柔
 * @Date: 2020-12-26 15:30:15
 * @LastEditors: your name
 * @LastEditTime: 2021-09-25 15:21:24
 * @Description: 开发环境配置，会被vue.config.js引入和使用
 */
const { getPageNames, setPage } = require("./utils");
const getPagesFrom = (appKey) => {
  const pages = {};
  const pageNames = getPageNames(appKey);
  for (const pageName of pageNames) {
    pages[`${appKey}-${pageName}`] = setPage(appKey, pageName);
  }
  return pages;
};

module.exports = {
  publicPath: "./",
  // ....
  outputDir: `dist/${process.env.PLUGIN_KEY}`,
  pages: getPagesFrom(process.env.PLUGIN_KEY),
};
```

vue.config.js 中根据环境变量进行区分，引入相应的配置

```js
const config =
  process.env.NODE_ENV === "production"
    ? require("./config/prod.js")
    : require("./config/dev.js");



module.exports = {
  // html中资源引入时的根路径
  publicPath: config.publicPath,
  // 输出包的根目录(相对于项目根目录
  outputDir: config.outputDir,
  // 静态资源目录（相对于outputDir
  assetsDir: "assets",

  pages:config.pages,

  // ...
};
```
## 资料
[完整的代码在这里](https://github.com/KittyFairy-Han/pluggable-MPA/tree/learning/multiple-MPA)
