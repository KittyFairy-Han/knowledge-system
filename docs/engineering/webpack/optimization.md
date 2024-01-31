<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-25 00:11:25
 * @LastEditors: your name
 * @LastEditTime: 2021-01-25 00:11:29
 * @Description: file content
-->

# webpack 优化




- 并发构建 thread-loader -> 加快构建速度 （没有thread-loader的时候大家都用happypack）
- 体积减小 tree-shaking、code-spliting、压缩 -> 加快请求速度 （webpack 4 也有这两个能力，但是 webpack5 做的更好）
- 次数减少 持久化缓存、模块联邦 -> 减少请求次数 （原来 webpack4 需要用 dllplugin+cache-loader 这些插件以达到目的）
