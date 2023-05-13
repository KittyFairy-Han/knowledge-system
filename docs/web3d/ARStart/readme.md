# 前端 coder 入门 AR 开发

## 核心技术

想要实现 WebAR 效果，四个步骤：读取、识别、跟踪、3D 物体的渲染。
关系图https://pic2.zhimg.com/80/v2-927fa334249cb1dccb9e0256853def45_1440w.webp

## 技术栈

### 读取

#### 浏览器中：WebRTC.js

#### 微信小程序中

### 识别与跟踪

AR 中最难得部分就是跟踪

#### 浏览器中可用的库

JSARToolKit、Tracking.js、jsFeat、js-aruco  
JSARToolKit 和 js-aruco 都是基于特定的标记去跟踪的，而不能像 Tracking.js 那样进行特征检测。它们依赖于事先印刷好的标记，通过检测标记的位置和方向，从而定位和跟踪物体。在使用这些库时，需要将标记嵌入到需要跟踪的物体上，因此它们更适用于需要定向和固定跟踪的应用场景。  
Tracking.js 和 jsFeat 等库则使用计算机视觉算法进行特征检测和跟踪，可以在图像中检测和跟踪目标对象，而不需要特定的标记。这些库更适用于需要动态跟踪的场景，例如目标跟踪和手势识别等应用。web 端来说，算力可能跟不上。

#### 微信小程序中可用的库

Vision Kit 使用一些深度学习框架 （如 TensorFlow） 进行深度学习的训练和推断，结合一些计算机视觉算法（如 OpenCV），形成了一个很好的识别与追踪库。具备了平面检测、人脸识别、手势识别等与跟踪的能力。

### 渲染

#### 浏览器中可用的库

Three.js、Babylon.js、playCanvas、pixi.js(2d)  
 Three.js 是最早出现的 WebGL 库之一，提供了丰富的 3D 渲染和动画功能，支持多种 3D 模型格式和材质。  
 Babylon.js 是由微软开发的 3D 游戏引擎，也提供了类似的 3D 渲染和动画功能，并支持物理引擎和多人游戏等高级特性。  
 playCanvas 则是一款基于 WebGL 的在线游戏开发平台，提供了完整的游戏开发工具和游戏发布服务，可以方便地在 Web 浏览器中创建和发布高品质的 3D 游戏。

#### 微信小程序中可用的库（几乎都是 three 的微信小程序定制版）

[three.weapp](https://github.com/yannliao/threejs.miniprogram)
[threejs-miniprogram](https://github.com/wechat-miniprogram/threejs-miniprogram)
[threejs-wx](https://github.com/amorwilliams/threejs-wx)

### 框架

#### web 端主流 AR.js

- WebRTC：获取视频流（最关键的 API 方法是 getUserMedia() ，实时获取摄像头的视频流）
- JSARToolKit：主要提供了识别和追踪 marker 的功能。（1999 年发布，一直更新至今）
- Three.js、Babylon.js、A-Frame（这几个都是基于 WebGL 的渲染库）
  > 不具备特征检测的功能，也就是说无法进行平面检测、人脸识别、手势识别等

#### 微信小程序？

微信小程序无完整框架可用，都是要小程序中的 vision kit + 渲染库结合使用

## 技术方案

### web 端

#### AR.js

✅ 特定图像识别与跟踪
❌ 特征检测
✅ 性能
不需要特征检测时是 web 端最好的选择了

#### WebRTC + trackingJS + ThreeJS

✅ 特定图像识别与跟踪
✅ 特征检测
❌ 性能
web 端需要进行特征检测时，可以尝试使用，但估计性能扛不住

#### video 标签 + ThreeJS + 陀螺仪

其中陀螺仪需要 window.DeviceOrientationEvent 结合 ThreeJs 官方的控制器 DeviceOrientationControls  
❌ 特定图像识别与跟踪
❌ 特征检测
✅ 性能
虽然模型（or 虚拟场景）与真实场景融合，但不具备识别与跟踪能力，伪 AR。适合模型加载后不关联场景中的物体这种情景，因为物体动了它也没办法识别和跟踪到。

### 微信小程序

#### vision kit + threejs-miniprogram

✅ 特定图像识别与跟踪
✅ 特征检测
✅ 性能
