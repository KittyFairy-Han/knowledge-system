<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-24 11:07:56
 * @LastEditors: your name
 * @LastEditTime: 2021-01-24 15:06:04
 * @Description: webpack chunk 相关的知识点和实战例子
-->

# webpack chunk

## chunk 来源

1. entry 入口
2. import() 异步加载
3. webpack 配置中的 optimization.splitchunk.cacheGroup 选项

#### 在默认的配置下 optimization.splitchunk.cacheGroup

- 在异步形成的 chunk 中，引用 node_modules 中的代码会产生一个 chunk、
- 在异步形成的 chunk 中，有公共引用的代码会单独抽出产生一个 chunk
  > 注意！ import 是完全静态的（不能使用判断语句、不能使用变量），不会产生独立的 chunk。require 虽然可以动态加载（用 if else 语句控制动态加载、或者直接用变量控制动态加载）, 但是 require 并不会产生一个独立 chunk。import、require 的代码模块会合并到 entry 产生的 chunk 中。具体说明如下：

#### 对 require 的解释

```js
// pages/demo/home/main.js
// 根据客户端传参 params.skin 就是主题关键字
require(`../../skin/${params.skin}/index.less`);
```

编译后的代码输出在一个 css 文件中。具体流程是：main.js 作为多页应用的一个入口，编译后形成一个 chunk,chunk 中包含了 main.js 引入的所有模块(所有以 import、require方式引入的模块)，样式代码编译后就在 这个 chunk(假设叫 entry-js-chunk) 中。然后，把 chunk 中的所有样式代码都抽离出来形成一个单独的 chunk(假设叫 css-chunk-from-js)。最后entry-js-chunk和css-chunk-from-js分别输入对应的js和css文件。

```css
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* ==========以上是绿色主题生成的代码======== */
/* ==========以下是蓝色主题生成的代码======== */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

最后两套样式都会合并到一个文件，弊端一，如果皮肤样式有很多套，并且根据需求每次只使用一套，请求文件的体积过大，且大部分属于没有用到的样式。弊端二，样式发生了覆盖，除了最后一份主题，其他的主题永远不会生效，并没有办法动态的加载某一套主题。



## 方案比较

### import() 例子

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
