# 带你入门 web3d 开发

先看一下案例：  
【gif 演示】
分为模型显示、数据与模型结合、简单交互三部分内容。web 3d 开发的基础部分都涉及到啦，内容优点杂，但不深。带大家入入门。

## 介绍

场景搭建：采用“面片系统”(几何结构+烘焙贴图)的方案搭建场景，避免纯模型加载导致的性能过载又保持了结构丰富美观的优点。  
动态数据与模型融合：动态数据指用户上传的图片，画框是模型中的一部分。上传后两者要相互适应，图片数据与模型融合。  
交互系统：垂直空间结合单指滑动、双指缩放的交互模式浏览馆内。

## three api

- update 函数 帧的概念
- 物体 position、rotation
- camera position、rotation
- 加载外部模型 loader

#### 3d 空间中的物体

创建、变换

#### 加载外部资源的 loader

加载模型

## 场景搭建：模型显示

首先得准备几个东西：相机、物体、场景、canvas
能否看到物体，取决于物体是否在相机的空间内。（3d 空间最常用的是透视相机，下文所述“相机”都是指透视相机）。反应到代码中相机的位置、物体的位置、相机空间的大小就很重要。  
相机空间示意图：

<!-- ![相机空间示意图](./assets/space_camera.webp) -->

#### 举个例子

实现这样的效果：
【立方体里相机、立方体图和代码，注释位置空间啥的】

### 实际工作中的小技巧 or 注意点

如果模型是动态数据，并且存在组合情况，比如我的项目中整体呈现的是一座楼，每一层都有一个独立的模型文件，层层之间自由组合形成不同的楼。  
以下称模型文件中楼层主体部分为“楼层主体”，整个模型的空间成为“世界空间”。

- 在模型软件中，不同模型文件的世界空间原点相对于楼层主体都在类似位置。不能 a 模型文件的原点在楼层的房顶左上角，b 模型文件的原点在楼层的地面中间，这样杂乱的原点在组合楼层时需要每个楼层单独位移调整，徒增麻烦。
- 模型软件与 three 坐标轴不一样，需要模型设计师制作模型的时以 three 的坐标轴为准。比如 blender 中 z 轴朝上，而在 three 中 y 轴朝上。并且需要楼层正面保持统一性。不能 a 楼层的正面是朝 z 轴正方向，b 楼层的正面朝 x 轴的负方向。
- 不同模型文件楼层主体尺寸应该保持差不多的尺寸。不能 a 的楼层主体是 5m\*5m\*5m，b 的楼层主体是 500m\*500m\*500m。这样组合时，楼层堆叠就很不协调，而且可能会超出相机空间或显示太小。

## 动态数据与模型融合：画作处理

### 射线检测

3d 空间的物体不像 dom 可以绑定各种事件监听（比如点击），而是用射线检测对物体进行拾取。  
下面是一个基础示例：

```js
```

### 图片数据与模型的融合方案

具体的处理流程如下：  
模型中的相框部分单独作为一个 glb 文件，与其他部分（墙壁、房顶、底面、摆件等）剥离开来，方便解析。
解析模型数据，得到相框的位置、旋转量、尺寸。从后端获取图片 url。根据这些信息去创建新的相框物体、图画物体。
![阶段三数据交互示意图](./assets/ag_exhibit_3.png)
通过 loader 加载模型后，查看相框模型的数据，如图:  
![模型原始数据](./assets/ag_exhibit_03_1.png)
可以看到相框的位置和旋转量容易获取分别是 position、rotation。但是相框的大小不好获取，没有边长参数而是一组顶点数据如图：
![模型原始数据](./assets/ag_exhibit_3_2.png)
那怎么从这些数字中计算出画框的长宽呢，利用正方形的几何特点，取巧的解析了边长数据。如图一看便知  
![模型原始数据](./assets/ag_exhibit_3_3.png)
![模型原始数据](./assets/ag_exhibit_3_4.png)
所以边长其实就是：2*|position[0]| 即：Math.abs(position[0])*2

```js
//关键代码和注释

// 思路：模型提供空位，图片不超过空位范围，类似 object-fit：contain 的效果。关键在于实现 contain 效果，得知道：

// 模型是个黑盒，怎么知道模型中哪些是相框
//  相框的大小是多少，上传的图片比例是多少
//   然后
//   图片等比缩放到相框中
```

### 为什么不呢？

#### 另一种方案

相框的位置、旋转量、尺寸、图片的 url、尺寸都是来自后端的 json，根据这些信息去创建画作(3d object)，而不需要解析模型数据。  
![交互示意图](./assets/ag_exhibit_1.png)  
这个方案符合常规的开发思路，对前端来说是最友好最方便的。但实际上可行性差，因为模型软件不具备直接导出部分 json 数据的能力，模型导出的数据是二进制文件或者类似这样的 json：![模型软件导出的文件](./assets//ag_exhibit_1_1.png)是很不直观的，不满足我们所需的数据结构。  
如果偏要模型导出指定的数据结构，还需要针对模型软件开发一个插件，成本更大不如用上面的 loader 方式解析 glb 二进制数据。

#### 另二种方案

不用解析每个相框的定位、边长等信息，直接把相框的几何体按照图片的比例收缩，然后把图片纹理贴到相框上并留些边框的距离。
![交互示意图](./assets/ag_exhibit_2.png)
这个方案复用了模型中的 3d 相框的位置、旋转量、几何体，看起来不用读取顶点数据了，少了计算，省了事儿。但局部纹理贴图（需要留边距）还是需要计算出边长的具体值，three 里可没有 css 的 calc(100%-边距 px)这样的算法。
就算不考虑边距，复用几何体对模型的依赖比较大，可能出现如下的情况。  
期望：
![正常情况](./assets/ag_exhibit_2_suc.png)
可能的错误情况：
![错误情况](./assets/ag_exhibit_2_error.png)  
要避免这种情况，需要模型设计师有一定的纹理映射知识，这对于模型制作者来说会有一定的学习成本，增加了工作流程中的沟通成本。所以这个方案可行性也不高。

## 交互：相机运动

首先要有一个基础认知那就是在 3D 空间浏览场景通常是相机运动而不是模型运动，所以主体思路就是识别移动端的手势（在 pc 端就是鼠标操作），根据手势滑动距离来控制相机的运动。  
虽然 three 有几个现成的 controller，但是都不满足我们要实现的效果，不过很多 3d 项目基本都是用相机轨道运动 orbitController 所以还是介绍一下 orbitController。

### orbitController

[官方例子](https://threejs.org/examples/?q=orb#misc_controls_orbit)  
默认的鼠标操作对应运动形式为：
首先想象相机在一个球面的某个位置，

- 左键水平拖动，相机的运动轨迹是类似经线一样的曲线运动。
- 左键竖直拖动，相机的运动轨迹是类似纬线一样的曲线运动。
- 鼠标滚轮滚动，相机的运动轨迹朝着球心远近平移。
  然后再想象相机在一个垂直于屏幕的平面上，
- 右键水平拖动，相机的运动轨迹是横向平移。
- 右键竖直拖动，相机的运动轨迹是远近平移。
- 可以通过配置，修改平面是平行于屏幕的，这样，右键竖直拖动，相机的运动轨迹是垂直平移。
  需要注意的是，相机曲线运动是围绕一个圆心的，而不是原地自转。

### 项目中的应用

实际项目中的交互可能无法复用 OrbitControl 等 three 封装好的组件，不过定义一套交互系统无外乎两个关键点。

- 移动端监听 touch 事件、pc 端监听鼠标键盘事件
- 控制相机运动

下面就用

- 单指水平滑动：相机原地自转
- 单指垂直滑动：相机沿着平行于 y 轴的方向平移
- 斜着滑：以上两种运动结合

这种效果结合代码举个例子



#### 基础示例

以  
单指左右滑动旋转，上下滑动平移  
为例子，结合代码讲一下。为了大多数人一下就能看懂就还是用原生的 touch。

```js
import { Vector2 } from "three";

/**
 * 自定义控制器
 * 单指滑动，水平分量负责绕y轴旋转，垂直分量负责y轴方向平移
 * object 就是相机
 * domElement 就是 canvas
 */
class CustomControls {
  constructor(object, domElement) {
    /* ==================== 实例属性 ==================== */
    // 控制的对象
    this.object = object;
    // canvas
    this.domElement = domElement;
    this.domElement.style.touchAction = "none"; // 禁用默认行为
    // 旋转速度
    this.rotateSpeed = 0.5;
    // 位移速度
    this.panSpeed = 5;
    // 控制的对象位移的最高位置
    this.panRangeMax = 5;
    // 控制的对象位移的最低位置
    this.panRangeMin = 0;
    // 阻尼系数 越小惯性越大 1的时候没有惯性效果
    this.dampingFactor = 0.05;
    // false的时候禁用controller
    this.enabled = true;

    /* ==================== 内部变量和方法 ==================== */

    const scope = this;
    let deltaPan = 0; //实时平移量
    let deltaRotate = 0; //实时旋转量
    let pointStart = new Vector2(); //上一次的touch位置

    function getSafePosY(oldY, panOffset) {
      if (oldY + panOffset > scope.panRangeMax) {
        return scope.panRangeMax;
      }
      if (oldY + panOffset < scope.panRangeMin) {
        return scope.panRangeMin;
      }
      return oldY + panOffset;
    }

    function onTouchStart(e) {
      // 非单指则不继续监听move和end事件，不触发后续相机运动的逻辑
      if (e.touches.length !== 1) return;
      scope.domElement.addEventListener("touchmove", onTouchMove);
      scope.domElement.addEventListener("touchend", onTouchEnd);
      const touch = e.touches[0];
      // 取出初始触控点，
      const { pageX, pageY } = touch;
      // 记录到pointStart中，作为初始向量
      pointStart.x = pageX;
      pointStart.y = pageY;
    }

    function onTouchMove(e) {
      // 非单指则停止更新内部变量，相机运动也停止
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      // 取出当前 move 时的触控点
      const { pageX, pageY } = touch;
      // 当前触控点  m
      const pointerMove = new Vector2(pageX, pageY);
      const deltaMove = new Vector2().subVectors(pointerMove, pointStart);

      deltaPan +=
        scope.panSpeed * ((deltaMove.y / scope.domElement.clientHeight) * 1); //速度为1时，竖向滑动为一屏距离则可以移动一米
      deltaRotate +=
        scope.rotateSpeed *
        ((deltaMove.x / scope.domElement.clientHeight) * 2 * Math.PI); //速度为1时，横向滑动为一屏距离则可以转一圈
      // 更新 pointStar 的值，为下次进入 move 事件做准备
      pointStart.copy(pointerMove);
    }

    function onTouchEnd(e) {
      scope.domElement.removeEventListener("touchmove", onTouchMove);
      scope.domElement.removeEventListener("touchend", onTouchEnd);
    }

    scope.domElement.addEventListener("touchstart", onTouchStart);

    this.update = function() {
      // console.log(deltaPan, deltaRotate);

      const stepPan = scope.dampingFactor * deltaPan; //当前帧位移
      const stepRo = scope.dampingFactor * deltaRotate;
      scope.object.position.y = getSafePosY(scope.object.position.y, stepPan);
      scope.object.rotateY(stepRo);
      deltaPan *= 1 - scope.dampingFactor;
      deltaRotate *= 1 - scope.dampingFactor;
    };

    this.update();
  }
}

export default CustomControls;
```

- 单指滑动有阻尼效果（手停了，但还在惯性运动），理解了“帧”的概念自然就会明白。
- scrollY

### 扩展
实际的移动端web应用交互会更复杂一些，欢迎体验  
![扫码体验一下](../artGallery/assets/p3_exmaple.png)  

手势操作与相机运动对应起来就是：

- 单指水平滑动：相机原地自转
- 单指垂直滑动：相机沿着平行于 y 轴的方向平移
- 斜着滑：以上两种运动结合
- 点击某一画框：相机平移到该位置并自转面向画框
- 双指扩张收缩：相机拉近拉远

关键技术点还是touch事件和控制相机运动，具体的实现可以结合一些第三方库，开发更便捷，体验更友好：  

- 移动端手势识别推荐 [hammer.js](https://hammerjs.github.io/) 代替原生 touch。
- 相机运动主要就用到 three Object 的两个属性的设置：camera.position.y=xxx（平移）、camera.rotation.y=xxx（自转）
- 点击后不是瞬移过去，是过度运动，需要结合 Tween.js，three里面集成了Tween.js，可以直接引用到。import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";



## 加载优化

业务场景说明：  
.gltf+.bin+图片  
是 3d 场景，是真实模型，但无光影信息，图片都是烘焙后的  
不追求写实效果，有氛围感就够了

#### 资源体积减小

纹理关联的图片资源尺寸减小，纹理贴图由 2048x2048 降低为 512x512，移动端 512 够用了。
有些烘焙是涉及光的，图片降为 512 后可能会有锯齿，模糊处理一下。
【2048 和 512】对比

#### 模型加载的前置资源处理

模型加载过程中有 loading 页面用于过度，loading 页面资源数量和体积应该小。否则会推迟模型开始加载资源的时间起点。

- 体积减小
  loading 不要太复杂，适当降帧
- 数量减少
  背景图片变为背景颜色

#### 去掉非必要的前置资源

- 图片纹理后置

#### 分批
