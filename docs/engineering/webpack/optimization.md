<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-25 00:11:25
 * @LastEditors: your name
 * @LastEditTime: 2021-01-25 00:11:29
 * @Description: file content
-->
# webpack 优化
## 运行时的优化

### 减少打包文件的体积，减少请求时间

#### 去除冗余 css

#### tree-shaking

webpack4 自动开启了 tree-shaking

- import export 语法才能 tree-shaking
- require 不可以

#### 压缩

webpack 自动压缩

### 提高缓存命中率，减少请求次数

#### webpack 默认的 splitchunk

- webpack 默认提取了 node_modules 引用的模块形成一个独立的 chunk 其实就是提高了缓存命中率
- 对于重复引用的也进行了提取形成一个独立的 chunk，也是提高了缓存命中率

#### 适当的手动配置 splitchunk 可以进一步优化


## 构建时的优化

### happypack 多进程打包

[happypack 多进程]("https://juejin.cn/post/6911519627772329991#heading-2")