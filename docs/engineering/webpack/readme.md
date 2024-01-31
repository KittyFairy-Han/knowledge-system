<!--
 * @Author: 鱼小柔
 * @Date: 2021-07-19 01:21:52
 * @LastEditors: your name
 * @LastEditTime: 2021-07-25 13:48:28
 * @Description: file content
-->
# webpack 

## 为什么要打包和构建

#### 代码层面

- 体积更小-->加载更快：Tree-Shaking（去除冗余）、压缩、合并

- 编译高级的语言和语法：TS、ES6+、模块化、less、scss

- 兼容性和错误检查：Polyfill、postcss、eslint

#### 流程方面

- 更加统一和高效的 开发环境

- 统一的 构建流程和产出标准

- 更便捷的 集成公司的构建规范（提测、上线）

## webpack 4.x -> webpack 5 有哪些变更
- 持久化缓存：Webpack 5 引入了持久化缓存，可以在多次构建之间保留一些构建结果，从而提高重复构建的速度。
- 模块联邦（Module Federation）：这是 Webpack 5 的一项重大特性，允许多个独立的构建共享 JavaScript 模块。
- 改进了长期缓存（Long Term Caching）：Webpack 5 对文件名的 hash 算法进行了改进，只有当文件内容改变时，文件名的 hash 才会改变。
- 更好的 Web 兼容性：Webpack 5 改进了对于各种 Web 环境的兼容性，例如浏览器、Worker 环境等。
- 实验性的支持 WebAssembly：Webpack 5 实验性地支持了 WebAssembly 模块。

## 优化

- 并发构建 thread-loader -> 加快构建速度 （没有thread-loader的时候大家都用happypack）
- 体积减小 tree-shaking、code-splitting、压缩 -> 加快请求速度 （webpack 4 也有这两个能力，但是 webpack5 做的更好）
- 次数减少 持久化缓存（persist-caching）、模块联邦（modules-federation） -> 减少请求次数 （原来 webpack4 需要用 dllplugin+cache-loader 这些插件以达到目的）

> 开发时，更讲究构建快。生产时，更讲究产物体积小、次数少。所以开发环境默认没有用 tree-shaking 和 压缩
