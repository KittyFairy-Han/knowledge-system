<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-24 11:07:56
 * @LastEditors: your name
 * @LastEditTime: 2021-08-22 18:41:52
 * @Description: webpack chunk 相关的知识点和实战例子
-->

# webpack chunk

## 划分chunk的意义（why）

因为最终输出的文件 bundle 很大程度上取决于 chunk，可以看作是一一对应，所以。。。

## chunk 来源（how）

1. webpack 配置中的 entry(入口) 选项
2. import() 异步加载函数
> import 命令、require() 函数不会产生chunk。具体见[import()、import、require() 工作原理和区别](https://kittyfairy-han.github.io/knowledge-system/engineering/design/modularity.html#六、额外说明)
3. webpack 配置中的 optimization.splitchunk 选项

#### 默认情况下 splitchunk 配置的规则：

- 在异步形成的 chunk 中，引用 node_modules 中的代码会产生一个 chunk、
- 在异步形成的 chunk 中，有公共引用的代码会单独抽出产生一个 chunk


## 逐一介绍

### entry
每一个入口就会对应的形成一个chunk。  
#### 那么entry配置方式是怎么样的呢？  
entry 可以配置为字符串、数组、对象。[详细写法说明](https://webpack.docschina.org/concepts/entry-points/#root)。前两种都是单入口，用对象形式配置的时，是多入口，每个属性就是一个入口。  
#### 什么情况会用到多入口?
默认情况是单入口，当项目设计方案为多页应用的时候会配置多入口。

### import() 

假设我的目录结构是  

```code
  src
  ├── main.js
  ├── ...
  ├── skin
  |   ├── green
  |   |   ├── theme.less # 定义一些主题通用的变量
  |   |   ├── demo-vars.less # 定义一些业务相关的变量
  |   |   └── index.less # green 主题的主人口
  |   ├── blue
  |   |   ├── theme.less # 定义一些主题通用的变量
  |   |   ├── demo-vars.less # 定义一些业务相关的变量
  |   |   └── index.less # blue 主题的主人口
  |   └── style
  |       └── demo.less # demo 使用对应的业务变量或者直接引用主题变量定义样式
  └── ...

```
我想要把每个主题形成一个chunk

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

> ?这里有个不完美的地方，魔法注释怎么使用变量，使得打包后的皮肤文件分别为 global-themes-green.css、global-themes-blue.css

#### 在入口 html 中引用的方式

```html
<link href=assets/css/global-themes0.css rel=prefetch> <link href=assets/css/global-themes1.css rel=prefetch>
```

分成两个包后，html 初始化时，本身时没有引入主题样式的，客户端与 web 通信（即调用 window.clientCallJs)，然后浏览器去获取对应的 css 文件内容。

### 配置 optimization.splitchunk.cacheGroup 例子

#### 写法

```js
// pages/demo/home/client-call.js
function setSkin(skin) {
  require(`../../skin/${skin}/index.less`);
}
// vue.config.js
chainWebpack: (webpackConfig) => {
  webpackConfig.optimization.splitChunks({
    cacheGroups: (() => {
      let skinsPath = path.resolve(__dirname, "../src/skin");
      let skinKeyList = fs.readdirSync(skinsPath);
      skinKeyList = skinKeyList.filter((item) => item != "style");
      let obj = {};
      for (const skinKey of skinKeyList) {
        obj[skinKey] = {
          name: "global-themes-" + skinKey, //最后形成chunk的名称
          chunks: "initial", //对entry产生的chunk继续分割
          test: new RegExp(`[\\\\/]src[\\\\/]skin[\\\\/]${skinKey}[\\\\/]`), //匹配对应的目录
          minSize: 0, //不限制块的大小，只要满足匹配就独立出chunk
          reuseExistingChunk: true, // 如果当前的 chunk 已被从 split 出来，那么将会直接复用这个 chunk 而不是重新创建一个
        };
      }
      return obj;
    })(),
  });
};
```

#### 打包后两个皮肤文件分别为 global-themes-blue.css、global-themes-green.css

> 文件内容与使用 import 方式打包出来的一样

```css
/* global-themes-green.css */
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* global-themes-blue.css */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

#### html 中的引用方式

```html
<link href=assets/css/global-themes-blue.css rel=preload as=style> <link href=assets/css/global-themes-green.css
rel=preload as=style>
```

### 比较

这两种方案打包后的差别就在于 html 引用时 rel 属性的值，一个是 prefetch(import 方案)一个是 preload(splitchunks 方案)。他们的差别如下

- preload chunk 会在父 chunk 加载时,以并行方式开始加载。也就是说在加载 主入口形成的 chunk 的同时,浏览器同时请求了两套皮肤文件的内容。
- prefetch chunk 会用于未来的某个时刻,在浏览器闲置时下载。也就是说在加载 主入口形成的 chunk 的时候,浏览器没有请求两套皮肤文件的内容，当 setSkin 方法调用时,才去请求某一个皮肤文件的内容。

