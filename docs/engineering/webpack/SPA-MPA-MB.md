<!--
 * @Author: 鱼小柔
 * @Date: 2021-01-24 20:02:39
 * @LastEditors: your name
 * @LastEditTime: 2021-01-24 20:02:40
 * @Description: 理解单页面、多页面、多包
-->
# SPA-MPA-MB
## 多页面、分包

### SPA 单页面

- 一个入口一个依赖树，一个包，数据都能共享，通信方便，多页面或者分包，因为不是一个 html 了数据不共享。

### MPA  多页面

- 多页面多个入口形成多个依赖树，但是输出还是一个包，index.html 是两个，对应的 js 是两个，但是映射文件是一个，static 资源文件夹也是一个。本质上还是一个应用，适用于想要多个 html 同时使用的情况下，但是不需要频繁通信，首屏加载比都在一个 html 中要快，两个页面不能通信，但是资源文件用的是一份是共用的。

### 多个包

- 一个工程可能组件啥的要共用了，但是有多个页面，输出多个包，映射文件也是多个，静态资源也是多个。本质上已经是两个完全不相关的应用了，只是开发的时候有很多组件要复用，用一个工程比较方便。适用于多个应用，多个 html 就是多个独立的应用。
