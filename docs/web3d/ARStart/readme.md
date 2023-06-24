# 前端 coder 入门 AR 开发

AR 增强现实，是指在真实世界的基础上，通过计算机生成的虚拟信息，将虚拟信息与真实世界进行融合，从而达到增强现实的效果。

## 核心技术及相关技术栈

想要实现 WebAR 效果，四个步骤：读取、识别、跟踪、3D 物体的渲染。
![粗略流程图](./readme/1.png)


### 读取

- 浏览器中：WebRTC.js 

- 微信小程序中：腾讯视频云的 liteavsdk

> [微信官方总结两者区别](https://developers.weixin.qq.com/community/develop/article/doc/0008ae6f288ee85cb1f7344f35b413)

### 识别与跟踪



#### 浏览器中可用的库

JSARToolKit、Tracking.js、jsFeat、js-aruco

- JSARToolKit 和 js-aruco 都是基于特定的标记去跟踪的，而不能像 Tracking.js 那样进行特征检测。它们依赖于事先印刷好的标记，通过检测标记的位置和方向，从而定位和跟踪物体。在使用这些库时，需要将标记嵌入到需要跟踪的物体上，因此它们更适用于需要定向和固定跟踪的应用场景。
- Tracking.js 和 jsFeat 等库则使用计算机视觉算法进行特征检测和跟踪，可以在图像中检测和跟踪目标对象，而不需要特定的标记。这些库更适用于需要动态跟踪的场景，例如目标跟踪和手势识别等应用。web 端来说，算力可能跟不上。
> AR 中最难部分就是跟踪

#### 微信小程序中可用的库

Vision Kit 使用一些深度学习框架 （如 TensorFlow） 进行深度学习的训练和推断，结合一些计算机视觉算法（如 OpenCV），形成了一个很好的识别与追踪库。具备了平面检测、人脸识别、手势识别等与跟踪的能力。

### 渲染

#### 浏览器中可用的库

Three.js、Babylon.js、playCanvas、pixi.js(2d)

- Three.js 是最早出现的 WebGL 库之一，提供了丰富的 3D 渲染和动画功能，支持多种 3D 模型格式和材质。
- Babylon.js 是由微软开发的 3D 游戏引擎，也提供了类似的 3D 渲染和动画功能，并支持物理引擎和多人游戏等高级特性。
- playCanvas 则是一款基于 WebGL 的在线游戏开发平台，提供了完整的游戏开发工具和游戏发布服务，可以方便地在 Web 浏览器中创建和发布高品质的 3D 游戏。

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

#### 微信小程序 
小程序中的 vision kit 能力 + 渲染库结合使用

## 技术方案

AR 中最难部分就是跟踪，下面暂不考虑跟踪能力

#### AR.js

✅ 特定图像识别\
❌ 特征检测\
？ 前置摄像头
✅ 性能\
不需要特征检测时是 web 端最好的选择了

#### WebRTC + trackingJS + ThreeJS

✅ 特定图像识别\
✅ 特征检测\
✅ 前置摄像头
❌ 性能\
web 端需要进行特征检测时，可以尝试使用，但估计性能扛不住

#### video 标签 + ThreeJS + 陀螺仪

其中陀螺仪需要 window\.DeviceOrientationEvent 结合 ThreeJs 官方的控制器 DeviceOrientationControls\
❌ 特定图像识别\
❌ 特征检测\
✅ 前置摄像头
✅ 性能\
虽然模型（or 虚拟场景）与真实场景融合，但不具备识别与跟踪能力，伪 AR。适合模型加载后不关联场景中的物体这种情景，因为物体动了它也没办法识别和跟踪到。

以上三种都是针对 h5 环境

#### 微信小程序 vision kit + threejs-miniprogram

✅ 特定图像识别\
✅ 特征检测\
❌ 前置摄像头
✅ 性能

#### 其他小程序？

## 项目实践

关键点：识别现实世界中的平面，将一个 3D 人物模型“放置”在平面上。为 3D 模型添加阴影效果，对 3D 模型可进行简单的平移、旋转、缩放操作以便于完成虚拟人物与现实中的人合影。\
因为需要 “识别现实世界中的水平面”，也就是说需要特征检测，所以最（wu）后（nai）选择了微信小程序，采用 vision kit + threejs-miniprogram 的技术方案。

## 微信小程序中的 AR 平面检测能力

！！！画图六边形图

vision kit 有 v1 v2 两个版本，高版本不一定更好哦，下面先介绍一下差异性。

#### API（能力）

v2 肯定比 v1 多喽～

- v1 调用 hitTest 进行平面检测。
- v2 除了 hitTest，还增加了实时监听平面的功能，事件有：'addAnchors'、'updateAnchors'、'removeAnchors'
- v1 只能检测水平面
- v2 除了水平面，也可以识别竖平面

#### 稳定性

v1 版本不如 v2 版本稳定。

- v1 版本有动态物体从镜头前经过就会把 3D 模型带走，v2 版本不会。
- 但当镜头晃动速率较高的时候，不论哪个版本，模型还是会漂移。

> 官方说法\
> V1 版，当手机摄像头没有朝向地面时，3D 模型会漂移、忽大忽小、无法停留在开始的位置。原因是 AR 以地面为跟踪目标，如果地面从手机画面中消失，V1 版 AR 就无法正常运行。\
> V2 版，AR 以房间环境为跟踪目标，不会因为手机姿态造成 3D 模型漂移。但遮住手机摄像头，V2 版 AR 也无法正常运行。

#### 准确性与成功率

v2 检测准确性高于 v1，但成功率低于 v1，具体难度取决于手机。\
通过项目实践的经验，个人认为：
v2 是真的检测现实中的平面，如果对准的位置是墙，那一定是检测不到的（准确高），但有些手机对准地面可能需要手机放平才检测到（难度高）。\
v1 之所以容易，是因为 v1 并没有识别现实场景，而是直接去生成一个水平面。所以 v1 几乎每次都成功（难度低），但手机不对着地面的时候，模型会悬空（准确低）。

#### 兼容性

v2 兼容性挺低的，毕竟去年 12 月才推出的。经过我们的实验，大部分安卓机都是只能用 v1 版本，iphone8 以上可用 v2 版本。

> 官方数据：
> [对微信版本要求、不同手机支持程度](https://zhuanlan.zhihu.com/p/544052686)

#### 世界坐标系原点的变化

v1 以识别成功的平面中心点，为世界坐标系原点。也就是说每次 hitTest 世界坐标的原点都更新了。\
v2 以手机相机的开始位置，为世界坐标系原点。也就是说 createSession 运行成功的瞬间，出现相机画面，屏幕中心点为世界坐标原点。后面 hitTest 再也不变了。

## 流程代码

！！！画图

[官方代码](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/base.html)

## 难点 or 坑点

### 向后兼容

1.  由于我们是线下活动，人来人往，对稳定性要求极高，否则模型经常飘走无法完成拍照功能，所以我们需要优先使用 v2。
2.  但由于部分手机（比如 iphone13 mini）检测成功率低，总是无法放置模型体验也不好，所以我们做了版本降级的逻辑：当 v2 连续 x 次检测不到时，切换为 v1 版本。
3.  对于根本无法支持 AR 功能的情况，我们提供了自拍模式，用相机画面+动态贴图的方式来实现合影。
> 有些手机，系统版本支持，但是硬件不支持，无法通过版本提前预判，只能在创建AR会话的回调函数中感知。
``` ts
function compareVersion(targetVersion) {
  let fn = Taro.getAppBaseInfo ? Taro.getAppBaseInfo : Taro.getSystemInfoSync;
  let cur = fn().SDKVersion as string;
  let v1 = cur.split(".");
  let v2 = targetVersion.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
enum VkVersion {
  V0 = "v0",
  V1 = "v1",
  V2 = "v2",
  V2_1 = "v2_1",
  Error = "v_error",
}
function setSupportVK () {
  let canUseV;
  if (compareVersion("2.20.0") < 0) {
    console.log("系统版本低，不支持 ar");
    canUseV = VkVersion.V0;
    showCantArToast(); //toast 提示用户不支持 AR
  } else {
    if (compareVersion("2.22.0") >= 0 && Taro.isVKSupport(VkVersion.V2)) {
      console.log({ title: "当前系统支持高版本AR", icon: "success" });
      canUseV = VkVersion.V2;
    } else {
      console.log("系统支持低版本 ar");
      canUseV = VkVersion.V1;
      showLowVersionModal(); //弹窗 提示用户使用低版本或使用自拍
    }
  }
  Taro.setStorageSync(VK_STORAGE_KEY, canUseV); //本地存储
  return canUseV
};
function setErrSupportVK () {
  console.log("微信 api 识别支持，但是创建 ar 失败了");
  showCantArToast(); //toast 提示用户不支持 AR
  Taro.setStorageSync(VK_STORAGE_KEY, VkVersion.Error); //本地存储
};
```

### 模型效果（阴影等）

### 重置与平移

开发过程中遇到，重置与平移功能无法完美共存的问题。以手指向左滑动，模型左移为例子来进行下面的说明。

#### 问题描述

相机打开瞬间创建了世界坐标系，模型刚好朝着相机，监听 onTouchMove，获取手指滑动距离 dir，调用 model.position.x=model.position.x-dir。模型的表现为向左平移。
当手机姿态发生改变，比如朝向打开瞬间的背后方向重新检测，放置模型。模型会朝着相机，但是手指向左滑动时，模型向右移动。

#### 解决方案-实时计算正确方位

拿到相机和模型在 3d 空间的坐标，根据模型与相机的位置关系实时计算模型应该移动的方向。以模型位置指向相机位置的向量为模型的前方，后、左、右依次类推。手指上、下、左、右滑动时，对应的模型平移方向分别为前方，后、左、右。
然后踩坑了，相机和模型拿到的位置坐标永远都是 0 0 0，大无语。

#### 解决方案-反复销毁创建 AR 场景

每次放置模型时，都重新创建 AR 场景，创建完立刻执行 hitTest，把模型加到场景中。方向是对了。\
但是！销毁创建会导致画面闪烁，并且那些不容易检测的手机再也检测不到平面了。

#### 解决方案-刷新

一切重来！对模型数据进行缓存，每次放置模型时都刷新一次页面，重新创建 AR 场景，创建完立刻执行 hitTest。方向肯定是对的啦，也不会画面闪烁。
但那些不容易检测的手机还是再也检测不到平面。

#### 结论：无解

### 内存优化

1. AR 场景

```js
if (session) {
  webglBusiness.dispose();
  session.destroy();
  session = null;
}
```

2. 3d 渲染
   three.js 会创建在渲染中所必需的特定对象，这些对象并不会被自动释放；相反，应用程序必须使用特殊的 API 来释放这些资源。[官方说明在这里](https://threejs.org/docs/index.html#manual/zh/introduction/How-to-dispose-of-objects)

```js
if (renderer) {
  renderer.dispose();
  renderer = null;
}

if (modelGroup) {
  // 清除模型和阴影（modelGroup包含gltf模型和程序添加的阴影）
  modelGroup.traverse((object) => {
    if (object.isMesh) {
      const { geometry, material } = object;
      // console.log(object)
      geometry.dispose();
      material.dispose();
      Object.keys(material).forEach((propName) => {
        const propValue = material[propName];
        if (propValue && propValue.isTexture) {
          propValue.dispose();
        }
      });
    }
  });
  scene && scene.remove(modelGroup);
  modelGroup = null;
}

if (scene) {
  // 清除场景本身
  scene.dispose();
  scene = null;
}
```
3. 
即使做了以上这些卸载，还是会报运行内存不足的错误。