<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 17:35:10
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 12:40:31
 * @Description: file content
-->

# WebWorker

## 是什么

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

## 限制

- 同源限制
- Dom 限制：不能操作 Dom
- 脚本限制：不能使用 alert confirm 等弹窗脚本
- 文件限制：不能读取本机文件系统

## 用法

- main.js

```js
let w = new Worker("child.js");
w.postMessage("Hello World");
w.terminate();
w.onmessage = (evt) => {
  console.log(evt.data); //'i am child i received'
};
```

- child.js

```js
self.onmessage = (evt) => {
  console.log(evt.data); //'Hello world'
  self.postMessege("i am child i received");
};
```

## 应用场景

- 使用专用线程进行数学运算<br>
Web Worker 最简单的应用就是用来做后台计算，而这种计算并不会中断前台用户的操作
- 图像处理<br>
通过使用从canvas或者video元素中获取的数据，可以把图像分割成几个不同的区域并且把它们推送给并行的不同 Workers 来做计算
- 大量数据的检索<br>
当需要在调用 ajax 后处理大量的数据，如果处理这些数据所需的时间长短非常重要，可以在 Web Worker 中来做这些，避免冻结 UI 线程。
- 背景数据分析<br>
由于在使用 Web Worker 的时候，我们有更多潜在的 CPU 可用时间，我们现在可以考虑一下 JavaScript 中的新应用场景。例如，我们可以想像在不影响 UI 体验的情况下实时处理用户输入。利用这样一种可能，我们可以想像一个像 Word（Office Web Apps 套装）一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。
- 图片预加载<br>

## 数据传输原理

通信方式有三种：

- Structured Clone

- Transfer Memory

- Shared Array Buffer

### Structured Clone

Structured Clone 是 postMessage 默认的通信方式，如下图所示，复制一份线程 A 的 js object 内存给到线程 B，线程 B 能获取和操作新复制的内存。
Structured Clone 通过复制内存的方式简单有效的隔离了不同线程的内存，避免冲突；且传输的 object 数据结构很灵活，但复制过程中，线程 A 要 同步执行 Object Serialization，线程 B 要 同步执行 Object Deserialization，如果 object 规模过大，会占用大量的线程时间。

### Transfer Memory

Transfer Memory 意味着转移内存，它不需要序列化和反序列化，能大大减少传输过程占用的线程时间。如下图所示，线程 A 将制定内存的所有权和操作权转交给线程 B，但转然后线程 A 无法在访问这块内存。

Transfer Memory 以失去控制权来换取高效传输，通过内存独占给多线程并发加锁，但只能转让 ArrayBuffer 等大小规整的二进制数据，对矩阵数据（比如 RGB 图片）比较适用，实践上要考虑从 js object 生成二进制数据的运算成本。

### Shared Array Buffers

Shared Array Buffers 是共享内存，线程 A 和线程 B 可以 同时访问和操作 同一块内存空间，数据都共享了，也就没什么传输的事了。

但多个并行的线程共享内存，会产生竞争问题，不像前两种传输方式默认加锁，Shared Array Buffers 把难题抛给了开发者，开发者可以用 Atomics 来维护这块共享的内存。作为较新的传输方式，浏览器兼容性可想而知，目前只有 Chrome 68+ 支持。
<br>
全浏览器兼容的 Structured Clone 是较好的选择，但要考虑数据传输的规模

Transfer Memory 兼容性也不错（IE11+），但数据独占和数据类型的限制，使得它是特定场景的最优解，而不是常规解；

Shared Array Buffers 当下糟糕的兼容性和线程锁的开发成本，建议先暗中观察。

数据传输规模

## WebWorker 与 异步

很多人觉得异步（promise async/await），都是通过类似 event loop 在平常的工作中已经足够，但是如果做复杂运算，这些异步伪线程的不足就逐渐体现出来，比如 settimeout 拿到的值并不正确，再者假如页面有复杂运算的时候页面很容易触发假死状态，
为了有多线程功能，webworker 问世了。不过，这并不意味着 JavaScript 语言本身就支持了多线程，对于 JavaScript 语言本身它仍是运行在单线程上的， Web Worker 只是浏览器（宿主环境）提供的一个能力／API。

## 各种 webworker
- Dedicated Worker：这是最常见的 worker 类型，它只能由创建它的脚本访问。Dedicated Worker 是在后台运行的一个单独的 JavaScript 线程，它可以执行耗时的任务而不阻塞 UI。

- Shared Worker（应用多标签页的信息同步）：这种类型的 worker 可以被多个脚本（即使这些脚本来自不同的窗口、IFrame 或者甚至是不同的域）共享。Shared Worker 可以用于在这些脚本之间共享数据和同步状态。

- Service Worker（应用网络层面的请求数据保存）：这种类型的 worker 主要用于实现离线体验和网络请求的拦截和控制。Service Worker 可以拦截网络请求，并从缓存中提供资源。它还可以在后台同步数据，即使用户已经关闭了页面。

- Audio Worklet：这种类型的 worker 是 Web Audio API 的一部分，用于处理音频处理任务。Audio Worklet 运行在音频渲染线程上，可以实现高性能的音频处理。

- Paint Worklet：这种类型的 worker 是 Houdini CSS 的一部分，用于自定义 CSS 的绘制过程。Paint Worklet 可以用于创建自定义的 CSS 图片、背景或者边框。

> share worker 和 broadcast channel api 好像功能一样呀？
是的，Shared Worker 和 Broadcast Channel API 都可以用于在同源的多个上下文（例如窗口、标签页、iframe 或者 worker）之间进行通信。但是，它们的工作方式和使用场景有所不同。  

Shared Worker 是一个在后台运行的 JavaScript 线程，它可以被多个上下文共享。Shared Worker 可以用于在这些上下文之间共享大量数据，或者进行复杂的计算。但是，Shared Worker 的生命周期是由它的所有连接者共同控制的，只有当所有连接者都断开连接时，Shared Worker 才会被终止。  

Broadcast Channel API 提供了一种简单的方法来在同源的多个上下文之间发送消息。你可以创建一个 Broadcast Channel，然后在任何上下文中向这个 Channel 发送消息，所有连接到这个 Channel 的上下文都会接收到这个消息。但是，Broadcast Channel API 只用于发送消息，它不能用于共享数据或者进行复杂的计算。  

总的来说，如果你需要在多个上下文之间共享大量数据，或者进行复杂的计算，那么 Shared Worker 可能是一个好的选择。如果你只需要在多个上下文之间发送消息，那么 Broadcast Channel API 可能更适合你。  

