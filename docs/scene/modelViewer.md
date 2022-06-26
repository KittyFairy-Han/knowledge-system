<!--
 * @Author: 鱼小柔
 * @Date: 2022-06-25 07:30:39
 * @LastEditors: your name
 * @LastEditTime: 2022-06-26 18:45:17
 * @Description: file content
-->

## 先了解一下 web components

model-viewer 基于 web components 实现的。

### 是什么

MDN 上的解释：Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。  
简而言之就是自定义的 html 标签。

### 特性

web components 内部元素的样式通过外部是无法修改的，选择器选不到内部元素。

## model-viewer 基本使用

model-viewer 的文档对新手来说可读性和引导性一般，在做项目的时候去查文档效率比较低，有时会因为实现一个效果反复的试错。所以我才会写这一趴 ① 是因为文档不是教程式的，更适用于对于它整体都有一个了解之后，去查阅具体的写法，不太适合新手 ②

- 不启用某个属性,就不写这个属性,拿位移举个例子位移。

```jsx
// 特别要注意的是这种写法还是会启动这个属性
<model-viewer enable-pan={false} />
// 正确写法
<model-viewer />
```

### 控制相机
- camera-controls 开启用户交互：旋转和缩放
- enable-pan 开启交互：位移
- disable-zoom 关闭缩放的交互
- custom-prompt 自定义操作

自动旋转与交互手势旋转可以同时用
- auto-rotate 自动旋转
- auto-rotate-delay 自动旋转
- camera-orbit 设置 0~3.5m 生效，大于 3.5m 不生效

### 环境光
- skybox-image 应用背景并模拟出环境光
- environment-image 环境光但不应用于背景，通过配置一个图片去计算出环境光，不设置也有一个默认的环境光，另外有个内置的值neutral，
可以同时使用
环境图像应该不超过1k (1024x512)，因为它们在内部被固定到这个分辨率。
- exposure 曝光度
这些表现和模型表面的粗糙度有关系可以查看这个例子 https://modelviewer.dev/examples/lightingandenv/#anotherHDRExample

### 动画(针对内置了动画的模型)
- animationName 通过动画名称控制模型现在播放的动画，播放的同时改变动画时，它们会交叉淡出  
- autoplay 自动播放所有的动画，顺序就按内置的来
- animation-crossfade-duration 交叉变换的时间
- modelViewer.play() 函数主动触发播放函数
animationName配合autoplay或者modelViewer.play()使用时才会播放动画，否则动画处于暂停状态，会显示第一帧

### 模型变换
模型变换和相机变换不一样
- availableVariants 只读属性，读取模型变体
- variantName
- orientation 模型旋转
- scale 模型缩放
- updateFraming() 模型加载后改变orientation和scale需要调用这个方法，才生效

### 材质和纹理
model.getMaterialByName
modelviewer.createTexture
material[channel].setMetallicFactor - 材质的金属程度
setRoughnessFactor - 材质的粗糙程度



### 导出模型
主要依赖这个方法：
- exportScene()
[例子](https://modelviewer.dev/examples/scenegraph/#pickMaterialExample)

## 替换纹理

## model-viewer 白底优化

看起来就是配置 model-viewer 的 poster 属性，然后 css 里面写上 model-viewer{--poster-color: transparent;} 就行了。

### 原因

model-viewer 在模型加载之前会有一个海报占位区域，本质上是一个 background-color 为白色的 button。配置了 poster 属性(一个图片 url)后，这个 button 的 background-image 就是 poster。如果 poster 有透明的部分，那么白色的 background-color 还是会露出来。

### 踩坑过程中学到的

- 模型的加载不是 model-viewer 这个 dom 节点的 onload 事件,模型加载完成是一定晚于 onload 事件的！
- model-viewer 没有提供模型加载的钩子，所以业务页面无法监听到模型加载完成事件
- model-viewer 有 poster 属性用来配置海报展位图、设置海报的背景颜色用 css 变量。[例子](https://modelviewer.dev/examples/loading/)
- 修改 shadowRoot 内部的样式
  外部直接写 css 不管用，得通过插 style 标签到 shadowRoot 内部去设置样式

```js
const styleStr = `
#default-poster {
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: none;
  height: 102%;
}`;
const styleTag = document.createElement("style");
styleTag.textContent = styleStr;
const shadow = document.getElementById("modelBox").shadowRoot;
console.log("🚀 ~ file: index.jsx ~ line 99 ~ setStyle ~ shadow", shadow);
shadow && shadow.appendChild(styleTag);
```

- react 中在 render 中添加 style 标签

```js
<style dangerousSetInnerHTML={{ _html: `` }}></style>
```
