# web3d

## three 渲染流程

1. 创建 3d 空间，5 要素
2. requestAnimationFrame 中 renderer.render 在 canvas 上进行像素级绘制

```js
this.canvas = document.getElementById("app-canvas");//舞台
this.renderer = App3dScene.createRenderer(this.canvas);//导演
this.scene = App3dScene.createScene();//演员
this.camera = App3dScene.createCamera();//相机
this.lights = //灯光
```

> 不涉及到 DOM 的改变，因此不会引发回流（reflow）或重绘（repaint）。

## webgl 工作流

首先创建并配置程序，然后创建并填充缓冲区。在绘制阶段，程序会使用缓冲区中的数据来计算顶点位置和像素颜色。   

- 创建 WebGL 上下文：首先，你需要在 HTML 的 canvas 元素上创建一个 WebGL 上下文。这个上下文提供了所有 WebGL API，你可以通过它来控制 GPU。
- 创建着色器（Shaders）：着色器是运行在 GPU 上的小程序，用于计算顶点位置和像素颜色。WebGL 需要两种着色器：顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）。
- 创建程序（Program）：程序是由顶点着色器和片元着色器链接在一起的对象。你需要将着色器附加到程序，然后链接它们。
- 创建缓冲区（Buffers）：缓冲区用于存储顶点数据和索引数据。你需要创建缓冲区，然后将数据上传到 GPU。
- 绘制：最后，你需要调用 gl.drawArrays 或 gl.drawElements 来绘制几何形状。这个过程会触发着色器，计算出每个像素的颜色。

## 常见概念

### 法向量
是垂直于平面的向量，通常用于计算光照和碰撞。

### 射线检测

二维坐标转换为三维坐标、空间中的点发射线（方向与相机的正方向相同）、最后进行线和面的交点计算

### 优化手段

- Bounding volumes：Three.js 使用边界体（如边界框（BoundingBox）和边界球（BoundingSphere））来进行初步的碰撞检测。边界体是围绕物体的简单形状，用于快速判断射线是否可能与物体相交。如果射线与物体的边界体没有交点，那么就可以立即排除这个物体，无需进行更复杂的检测。
- Octrees：Octree 是一种空间划分数据结构，可以将 3D 空间划分成八个子空间，然后递归地对每个子空间进行同样的划分。在射线检测中，可以先检测射线是否与 Octree 的节点相交，如果不相交，那么就可以排除这个节点以及它的所有子节点，从而大大减少需要检测的物体数量。
- Backface culling：在进行射线与三角形的交点检测时，Three.js 会忽略那些背向射线的三角形（也就是说，射线是从三角形的背面射向三角形的）。这是因为在大多数情况下，我们只关心射线从前面打到物体的情况。
  > Three.js 只做了第一个，所以更复杂的情况可能要用物理引擎
- 硬件上：射线检测的优化主要依赖于图形处理器（GPU）的并行处理能力，可以购置高端 GPU，它们有硬件加速的边界体检测、硬件加速的交点计算

### webgl 深度测试和模板测试

- 深度测试：遮挡关系。深度测试可以通过 WebGL 的 gl.enable(gl.DEPTH_TEST) 开启。
- 模版测试：模板测试是一种用于控制像素是否被绘制的技术。在渲染过程中，每个像素都会有一个模板值，这个值可以在渲染过程中被修改。然后，可以设置一个模板函数，这个函数会根据像素的模板值决定这个像素是否被绘制。模板测试可以用于实现一些高级的渲染效果，如镜面反射、阴影卷积等。模板测试可以通过 WebGL 的 gl.enable(gl.STENCIL_TEST) 开启。

> 这两种测试都是在片元着色器（Fragment Shader）阶段进行的，它们都可以用于控制像素是否被绘制，但是使用的方法和目的不同。

## webgpu vs webgl

- 设计理念：WebGL 是基于 OpenGL ES 的，它是一个已经存在了很长时间的、成熟的图形 API。WebGPU 则是一个全新的设计，它参考了现代的图形 API，如 Vulkan、Metal 和 Direct3D 12。

- 性能：WebGL 的性能受到了一些限制，因为它的设计并不完全适应现代的图形硬件。WebGPU 则是为了充分利用现代图形硬件的性能而设计的，它提供了更低级别的、更直接的硬件访问。

- 功能：WebGL 提供了一套相对简单的 API，它足够用于大多数的 3D 渲染需求。WebGPU 则提供了更多的功能，如计算着色器、多线程渲染和显存管理等。

- 安全性：WebGPU 在设计时考虑了更多的安全性问题，例如，它提供了更强大的错误检查和处理机制。

- 兼容性：目前，WebGL 的兼容性更好，因为它已经被广泛支持了很长时间。WebGPU 目前还在开发中，尚未被所有浏览器支持。

## 面试题

### requestAnimation

requestAnimationFrame 不是宏任务（macrotask）也不是微任务（microtask），它是浏览器提供的一个专门用于渲染动画的 API。它的执行时机是在每一帧的开始，也就是在所有的宏任务和微任务执行完毕，下一帧开始前。

### Canvas 和 其他有啥不同

Canvas 是 HTML5 提供的一个元素,用来绘制图形

- 工作原理是基于像素的： 其他 element 是基于对象的，比如可以移动。canvas 需要重新绘制。element 有事件委托，canvas 没有。
- 游戏用 Canvas，因为它基于像素性能好：  
  游戏通常需要频繁地更新图形和动画，这就需要大量的绘图和重绘操作。如果使用 DOM 来实现，每次更新都需要修改 DOM 元素，这会引发浏览器的重排和重绘，消耗大量的计算资源，导致性能下降。而 canvas 上重新绘制不发生 reflow 和 repaint  
  主要是时间上节省

### 为什么需要主动 GC

这些资源在 GPU 中被创建和使用，而不是在 JavaScript 的运行环境中。因此，JavaScript 的垃圾回收器无法自动管理这些资源。
