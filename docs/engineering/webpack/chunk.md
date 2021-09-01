<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-24 11:07:56
 * @LastEditors: your name
 * @LastEditTime: 2021-08-29 13:53:18
 * @Description: webpack chunk 相关的知识点和实战例子
-->

# webpack chunk

## 划分 chunk 的意义（why）

先说一个概念 code splitting  
代码分割（code splitting）① 和首屏加载优化有紧密的关系，利用 code splitting 的思想把一些首次加载不会用到的代码单独抽离出来，页面首次加载时不去请求这部分代码，进而提高首屏加载的速度。② 再比如，很多地方都用到了一些相同的代码，并且这个代码体积比较大，这个时候把这部分代码单独抽离出来，就可以减少引用这部分代码的文件的体积。并且单独抽离出文件也可以提高缓存的命中率。  
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

## entry

每一个入口就会对应的形成一个 chunk。

entry 可以配置为字符串、数组、对象。[详细写法说明](https://webpack.docschina.org/concepts/entry-points/#root)。前两种都是单入口；用对象形式配置的时，是多入口，每个属性就是一个入口。

单页应用 SPA 就采用单入口的配置形式。多页面的应用 MPA 就采用多入口的配置形式。假设我想构建一个多页应用，有两个页面 home 和 about

那么目录结构就可以这样拟定

```code
  src
  ├── ...
  ├── pages
  |   ├── home
  |   |    ├── main.js
  |   |    └── ...
  |   └── about
  |        ├── main.js
  |        └── ...
  └── ...

```

webpack.config.js 中的配置

```js
// webpack.config.js
module.exports = {
  entry: {
    home: "./src/pages/home/main.js",
    about: "./src/pages/about/main.js",
  },
};
```

最后会对应的输出 2 个 html 和 2 个主要 js

```code
  dist
  ├── assets/js
  |    ├── home.js //home.html 引入的主要js
  |    └── about.js //about.html 引入的主要js
  |
  ├── home.html
  └── about.html

```

### 小结

通过 entry 去划分 chunk 的方式，是为了构建 MPA，每次不仅 js 分割出来同时会对应有两个 html。

> TIPS  
> entry.home、entry.about 可以配置为一个对象，支持的选项与划分 chunk 没关系，所以这里就不介绍了。  
> 最后打包生成的目录结构是、目录中文件的名称是 output 选项控制的，这里也不介绍了。

## import()

import() 一个具体的路径会把该模块静态引入的所有模块一起划分为一个独立的 chunk  
import() 也可以是固定目录下，不固定的文件。  
例如， import(`src/skin/${color}.less`) 会把 src/skin 目录中的每个 .less 文件打包到新的 chunk 中。在运行时，计算完变量 color 后，就可以使用像 blue.less 或 green.less 的任何文件。

import() 必须至少包含一些关于模块的路径信息，打包可以限定于一个特定的目录或文件集。也就是说 import(变量/xxx/xxx) 是不允许的，但是 import(常量字符串路径/xxx/xxx) 是允许的。

假设我现在有一个多皮肤的需求，每次只需要用到一套皮肤。目录结构如下

```code
  src
  ├── main.js
  ├── ...
  ├── skin
  |   ├── green.less 绿色主题样式文件
  |   └── blue.less 蓝色主题样式文件
  └── ...

```

这种情况就很适合用 import() 把每个主题形成一个 chunk 然后按需(异步)加载

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

- webpackPrefetch、webpackPreload 与划分 chunk 的关系不大。不论设置 webpackPrefetch 为 true；还是设置 webpackPreload 为 true 都对划分 chunk 没影响，这两项主要是影响文件的加载时机。所以也不用配置，默认是 webpackPrefetch:true。

折腾了半天，其实只需要给 chunk 起个名字就好，其他都用默认的就行啦

```js
function setSkin(color) {
  /* webpackChunkName: "global-theme-" */
  import(`../../skin/${color}/index.less`);
}
```

这样使用后，打包出来两个主题文件，名称为 global-theme-0.css、global-theme-1.css  
文件

```css
/* global-theme-1.css 绿色主题对应的css */
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* global-theme-0.css 蓝色主题对应的css */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

在入口 html 中引用的方式

```html
<link href=assets/css/global-theme-green.css rel=prefetch> <link
href=assets/css/global-theme-blue.css rel=prefetch>
```

prefetch 的表现：html 初始化时，本身时没有引入主题样式的，当执行 setSkin 函数的时候，浏览器去加载了对应的 css 文件内容。  
preload 的表现：html 初始化时，就去加载了 css 文件内容，当执行 setSkin 函数的时候，使对应的 css 文件生效。所以用 preload 可能会浪费一定的请求次数。

### 小结

import() 适用于非多页面，但是想要单独提取出一个异步加载的 chunk 的情景。

## optimization.splitchunk

splitchunk 有很多配置项，其中 splitchunk.cacheGroups 的每个属性对应一个 chunk。   


splitchunk 可以更加细粒度的划分 chunk，可以对 entry 形成的同步 chunk 和 import()形成的异步 chunk，再进行抽离和提取。比如多页面 home、page 都引用了 react，本来入口形成的 chunk 都包含了 react，通过 splitchunk 可以把 react 抽离出来形成一个 chunk，避免重复的代码。  
optimization.splitchunk 是 webpack4+ 的一个内置插件，专门用来让开发者更细粒度的控制 chunk。（webpack4 之前是 CommonsChunkPlugin）。默认情况下，它只会影响到按需加载的 chunks(也就是通过 import()抽离的异步 chunk)，拆分 chunk 的规则如下：

1. 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
2. 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
3. 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
4. 当加载初始化页面时，并发请求的最大数量小于或等于 30
5. 当尝试满足 3、4 条件时，最好使用较大的 chunks。




