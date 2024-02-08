<!--
 * @Author: 鱼小柔
 * @Date: 2021-07-19 01:21:52
 * @LastEditors: your name
 * @LastEditTime: 2021-07-25 13:48:28
 * @Description: file content
-->

# webpack

## 为什么要打包和构建

- 代码转换 （loader）
- 代码优化
- 流程自动化
- 流程规范：统一的构建流程和产出标准，有利于团队协作

## 做了哪些代码优化和流程自动化

- 并发构建 thread-loader -> 加快构建速度 （没有 thread-loader 的时候大家都用 happypack）
- 体积减小 tree-shaking、code-splitting、压缩 -> （webpack 4 也有这两个能力，但是 webpack5 做的更好）
- 次数减少 持久化缓存（persist-caching）、模块联邦（modules-federation） ->（原来 webpack4 需要用 dllplugin+cache-loader 这些插件以达到目的）

> 开发时，更讲究构建快。生产时，更讲究产物体积小、次数少。所以开发环境默认没有用 tree-shaking 和 压缩

## webpack 4.x -> webpack 5

- 持久化缓存：Webpack 5 引入了持久化缓存，可以在多次构建之间保留一些构建结果，从而提高重复构建的速度。
- 模块联邦（Module Federation）：这是 Webpack 5 的一项重大特性，允许多个独立的构建共享 JavaScript 模块。
- 改进了长期缓存（Long Term Caching）：Webpack 5 对文件名的 hash 算法进行了改进，只有当文件内容改变时，文件名的 hash 才会改变。
- 更好的 Web 兼容性：Webpack 5 改进了对于各种 Web 环境的兼容性，例如浏览器、Worker 环境等。
- 实验性的支持 WebAssembly：Webpack 5 实验性地支持了 WebAssembly 模块。

## 对比其他

### vite

- 构建速度方面：本地开发热更新快，由于 Vite 是基于 ESM 和 esbuild 的，利用 ESModule 的特性，浏览器可以按需加载，不需要重新构建整个应用。又因为 esbuild 是 go 编写的，多核心并行处理所以快。而 webpack 是 js。
- 构建速度方面：本地开发冷启动快，原理和上面一样
- 构建速度方面：生产环境是基于 Rollup 的，Rollup 的 three shaking 比 webpack 好。
- 开发者体验方面：vite 预设了一些 loader 和 plugin，上手快做到了 0 配置启动。webpack 预设的很少，但更灵活，更强大，生态更完善，适合大型复杂项目。
  > vite 对比 webpack 就像 vue 对比 react,Vite 和 Vue 都强调开箱即用和开发者体验.而 Webpack 和 React 则更强调灵活性和可配置性.
- 生态方面：webpack 生态更完善，插件丰富，适合复杂高定制大型项目。
- 兼容性方面：vite 兼容性不如 webpack

## 对比 esbuild 和 rollup

- webpack 的兼容性更好：各种模块格式，所有类型项目都能用它
- webpack 的生态系统更好：插件多、文档资料多
- esbuild：快，构建更快
- rollup：对 es 支持更好，打包更小

#### -
算法不同，一个激进，一个保守  

Webpack 和 Rollup 的 tree-shaking 算法在处理 "副作用(side effects)" 时有所不同。在 JavaScript 中，一个模块可能会有副作用，例如修改全局变量。这些副作用可能会影响到其他模块，因此不能被 tree-shaking 删除。  

Webpack 在处理副作用时比较保守。默认情况下，它会假设所有模块都可能有副作用，除非你在 package.json 中明确指定 "sideEffects": false。这意味着，如果你没有正确配置 sideEffects 选项，webpack 的 tree-shaking 可能不会生效。  

相比之下，Rollup 的处理方式更加激进。它会假设所有模块都没有副作用，除非你明确指定了副作用。这意味着，即使你没有正确配置副作用，Rollup 的 tree-shaking 也可能生效。  
