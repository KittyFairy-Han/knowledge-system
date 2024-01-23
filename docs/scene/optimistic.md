<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-08 17:26:36
 * @LastEditors: your name
 * @LastEditTime: 2021-04-08 17:48:56
 * @Description: file content
-->

## 骨架图

1. 首屏时展示默认的区块以灰色背景为主、展示默认的图片
2. 请求成功隐藏这部分节点

## 上报日志（跨域的问题）

- img、script 标签的方式

## 防刷

### 防机器刷

图片验证码。

### 防人为

记录手机号，记录 ip。一定时间内不让请求。

## 面试题

### 首屏加载速度

- spa -> mpa
- code splitting 按需加载
- 懒加载
- 优化静态资源 webp cdn 合并、压缩代码
- 服务端渲染

### 卡了怎么办
1. 监测到，可以使用的工具
 performance 面板、
 Performance API、
 Lighthouse 是一个开源的自动化工具，可以用来评估页面的性能、可访问性、最佳实践等。

2. 优化代码
代码内存泄漏了改代码、代码没问题确实计算量大使用 webworker

3. 优化请求和渲染
类似首屏加载速度的优化