## web components
model-viewer 基于 web components 实现的。   
### 是什么
MDN 上的解释：Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。  
简而言之就是自定义的html标签。
### 特性
web components 内部元素的样式通过外部是无法修改的，选择器选不到内部元素。
## model-viewer 基本使用
（任何属性不启用的时候就不写就行了 不要 some = false 这样还是会启用）
camera-controls 旋转和缩放
disable-zoom 关闭缩放
auto-rotate 自动旋转
auto-rotate-delay
enable-pan 位移
camera-orbit 设置0~3.5m生效，大于3.5m不生效
skybox-image 天空盒
custom-prompt 自定义操作
## model-viewer 白底优化

看起来就是配置 model-viewer 的 poster 属性，然后 css 里面写上 model-viewer{--poster-color: transparent;} 就行了。


### 原因

model-viewer 在模型加载之前会有一个海报占位区域，本质上是一个 background-color 为白色的 button。配置了 poster 属性(一个图片 url)后，这个 button 的 background-image 就是 poster。如果 poster 有透明的部分，那么白色的 background-color 还是会露出来。

### 踩坑过程中学到的
- 模型的加载不是 model-viewer 这个 dom 节点的 onload 事件,模型加载完成是一定晚于 onload 事件的！
- model-viewer 没有提供模型加载的钩子，所以业务页面无法监听到模型加载完成事件
- model-viewer 有 poster 属性用来配置海报展位图、设置海报的背景颜色用 css 变量。[例子](https://modelviewer.dev/examples/loading/)
- 修改shadowRoot内部的样式
外部直接写css不管用，得通过插style标签到shadowRoot内部去设置样式
``` js
const styleStr = `
#default-poster {
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: none;
  height: 102%;
}`
const styleTag = document.createElement('style')
    styleTag.textContent = styleStr
    const shadow = document.getElementById('modelBox').shadowRoot
    console.log('🚀 ~ file: index.jsx ~ line 99 ~ setStyle ~ shadow', shadow)
    shadow && shadow.appendChild(styleTag)
```
- react中在render中添加style标签
```js
<style dangerousSetInnerHTML={{_html:``}}></style>
```

