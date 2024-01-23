# vite

## 为什么不同环境不同工具

基于 esbuild 和 rollup  
Vite 选择在不同环境中使用不同的工具，是为了在开发效率和生产效率之间找到一个平衡。sbuild 的快速编译是以牺牲一些代码优化为代价的，因此，esbuild 生成的代码可能不如其他工具生成的代码那么小或者那么高效。Rollup 是一个非常强大的打包工具，它对 ES Modules 的支持非常好，可以有效地实现 tree-shaking，生成更小的代码。因此，Vite 在生产环境中选择使用 Rollup 进行打包和优化。


## 对比 webpack

- 构建速度方面：本地开发热更新快，由于 Vite 是基于 ESM 和 esbuild 的，利用 ESModule 的特性，浏览器可以按需加载，不需要重新构建整个应用。又因为 esbuild 是 go 编写的，多核心并行处理所以快。而 webpack 是 js。
- 构建速度方面：本地开发冷启动快，原理和上面一样
- 构建速度方面：生产环境是基于 Rollup 的，Rollup 的 three shaking 比 webpack 好。
- 开发者体验方面：vite 预设了一些 loader 和 plugin，上手快做到了 0 配置启动。webpack 预设的很少，但更灵活，更强大，生态更完善，适合大型复杂项目。
  > vite 对比 webpack 就像 vue 对比 react,Vite 和 Vue 都强调开箱即用和开发者体验.而 Webpack 和 React 则更强调灵活性和可配置性.
- 生态方面：webpack 生态更完善，插件丰富，适合复杂高定制大型项目。
- 兼容性方面：vite 兼容性不如 webpack

## vite 热更新原理

1. Vite 本地启动时会创建一个 WebSocket 连接，同时去监听本地的文件变化
2. 当用户修改了本地的文件时，WebSocket 的服务端会拿到变化的文件的 ID 或者其他标识，并推送给客户端
3. 客户端获取到变化的文件信息之后，便去请求最新的文件并刷新页面



## 优化
