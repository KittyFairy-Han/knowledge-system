<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-24 11:07:56
 * @LastEditors: your name
 * @LastEditTime: 2021-08-22 18:41:52
 * @Description: webpack chunk 相关的知识点和实战例子
-->

# webpack chunk

## 划分 chunk 的意义（why）

先说一个概念 code splitting  
代码分割（code splitting）和首屏加载优化有紧密的关系，利用 code splitting 的思想把一些首次加载不会用到的代码单独抽离出来，页面首次加载时不去请求这部分代码，进而提高首屏加载的速度。  
那和 chunk 有什么关系呢？  
webpack 最后输出的文件是 bundle，chunk 是 bundle 的前身。所以划分 chunk 很大程度上决定了最后 bundle 是如何进行 code splitting 输出多个文件的

## chunk 来源（how）

1. webpack 配置中的 entry(入口) 选项
2. import() 异步加载函数
   > import 命令、require() 函数不会产生 chunk。具体见[import()、import、require() 工作原理和区别](https://kittyfairy-han.github.io/knowledge-system/engineering/design/modularity.html#六、额外说明)
3. webpack 配置中的 optimization.splitchunk 选项

#### 默认情况下 splitchunk 配置的规则：

- 在异步形成的 chunk 中，引用 node_modules 中的代码会产生一个 chunk、
- 在异步形成的 chunk 中，有公共引用的代码会单独抽出产生一个 chunk

## 举个栗子

假设我的目录结构是

```code
  src
  ├── main.js
  ├── ...
  ├── skin
  |   ├── green.less 绿色主题样式文件
  |   └── blue.less 蓝色主题样式文件
  └── ...

```

我想要把每个主题形成一个 chunk

### entry

每一个入口就会对应的形成一个 chunk。

entry 可以配置为字符串、数组、对象。[详细写法说明](https://webpack.docschina.org/concepts/entry-points/#root)。前两种都是单入口，用对象形式配置的时，是多入口，每个属性就是一个入口。

### import()

import() 必须至少包含一些关于模块的路径信息，打包可以限定于一个特定的目录或文件集。也就是说 import(变量/xxx/xxx) 是不允许的，但是 import(常量字符串路径/xxx/xxx) 是允许的。  
例如， import(`src/skin/${color}.less`) 会把 src/skin 目录中的每个 .less 文件打包到新的 chunk 中。在运行时，计算完变量 color 后，就可以使用像 blue.less 或 green.less 的任何文件。

```js
function setSkin(skin) {
  import(`../../skin/${skin}/index.less`);
}
```

另外，我们可以通过魔法注释对代码分割后的 chunk 有更多的控制权，可配置项有:webpackInclude、webpackExclude、webpackChunkName、webpackMode、webpackPrefetch、webpackPreload。[配置项含义和可接受的值看这里](https://webpack.docschina.org/api/module-methods/)

> 如果不使用变量，就是引入一个具体的文件，可配置项有 webpackChunkName、webpackMode、webpackExports。

结合本例，解释一下与分割 chunk 相关的几个选项：

- webpackInclude、webpackExclude 是用来对目录下文件进行一些筛选过滤，不配置的（默认的）情况下，skin 目录下的所有 less 文件都会被打包，本例和默认情况一致，所以没有配置这两项。
- webpackChunkName 为打包后的文件命名。
- webpackMode 是如何划分 chunk 的一个关键选项。有四个值可选  
  ① 'lazy' 每个文件都生成一个独立的懒加载 chunk。blue.less->blue.css,green.less->green.css。懒加载的含义在于，执行 setSkin 的时候才去加载具体的文件。  
  ② 'lazy-once' 只生成一个独立的懒加载 chunk。也就是说 blue.less、green.less 会打包到一个 css 文件中。执行 setSkin 的时候才去加载这个文件。  
  ③ 'eager' 不会生成独立的 chunk。如果 setSkin 这个函数是在 main.js 中定义的，那么 blue.less、green.less 会打包到主包中。
  
  > 与 静态 import 的区别？
  > 对于 less 文件来说和静态的 import 没有区别。但是对于 js 则表现不一样，假设 import() 的是一个 js 文件，那么执行 setSkin 的时候才把该 js 文件的内容执行一遍。

  ④ 'weak' 官网的解释没看懂 o(╥﹏╥)o。自己试验的过程中发现 green.less,blue.less 没有被打包进主包，也没有独立形成 chunk，调用 setSkin 的时候发生了报错。  
  
  通过上面的分析 webpackMode = 'lazy' 满足独立分包的需求。默认配置也是 'lazy'。所以这项也可以不配置~  

折腾了半天，其实只需要给 chunk 起个名字就好，其他都用默认的就行啦

```js
function setSkin(skin) {
  /* webpackChunkName: "global-theme-" */
  import(`../../skin/${skin}/index.less`);
}
```

这样使用后，打包出来两个主题文件，名称为

```js
function setSkin(name) {
  //这里就两个皮肤，所以使用了if else，比较多的时候用switch更好一点
  if (name === "green") {
    import(
      /* webpackChunkName: "global-theme-green" */
      `../../skin/green.less`
    );
  } else if (name === "blue") {
    import(
      /* webpackChunkName: "global-theme-blue" */
      `../../skin/blue.less`
    );
  } else {
    import(
      /* webpackChunkName: "global-theme-blue" */
      `../../skin/blue/index.less`
    );
  }
}
// 使用魔法注释为chunk命名,这样打包出来的文件名就是global-theme-green、global-theme-blue、...
```

打包后两个皮肤文件分别为 global-theme-green.css(绿色主题对应的 css)、global-theme-blue.css (蓝色主题对应的 css)

```css
/* global-theme-green.css 绿色主题对应的css */
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* global-theme-blue.css 蓝色主题对应的css */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

打包后,在入口 html 中引用的方式

```html
<link href=assets/css/global-theme-green.css rel=prefetch> <link
href=assets/css/global-theme-blue.css rel=prefetch>
```

分成两个包后，html 初始化时，本身时没有引入主题样式的，当执行 setSkin 函数的时候，浏览器去获取对应的 css 文件内容。

### 配置 optimization.splitchunk.cacheGroup 例子

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
      skinKeyList = skinKeyList.filter((item) => item != "style"); //动态读取到 src/skin 下的目录
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

打包后两个皮肤文件分别为 global-themes-blue.css、global-themes-green.css

> 文件内容与使用 import() 方式打包出来的一样

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
<link href=assets/css/global-themes-blue.css rel=preload as=style> <link
href=assets/css/global-themes-green.css rel=preload as=style>
```

### 比较

这两种方案打包后的差别就在于 html 引用时 rel 属性的值，一个是 prefetch(import 方案)一个是 preload(splitchunks 方案)。他们的差别如下

- preload chunk 会在父 chunk 加载时,以并行方式开始加载。也就是说在加载 主入口形成的 chunk 的同时,浏览器同时请求了两套皮肤文件的内容。
- prefetch chunk 会用于未来的某个时刻,在浏览器闲置时下载。也就是说在加载 主入口形成的 chunk 的时候,浏览器没有请求两套皮肤文件的内容，当 setSkin 方法调用时,才去请求某一个皮肤文件的内容。
