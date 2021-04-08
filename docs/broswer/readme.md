<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-05 18:20:54
 * @LastEditors: your name
 * @LastEditTime: 2021-04-08 14:12:16
 * @Description: file content
-->

# 浏览器工作原理

## 内核线程

浏览器内核中有 3 个最主要的线程：JS 线程，UI 渲染线程，事件处理线程。此外还有 http 网络线程，定时器任务线程，文件系统处理线程等等。

### JS 线程

JS 线程负责 JS 代码解析编译执行，称为主线程。<br>
JS 线程核心是 js 引擎 （IE9+: Chakra firefox:monkey chrome:v8）。<br>
webworker 可以创建多个 js 线程，但是受主线程控制，主要用于 cpu 密集型计算。<br>
主线程执行同步任务，会阻塞 UI 渲染线程。

### UI 线程

UI 渲染线程当然是负责构建渲染树，执行页面元素渲染。<br>
核心是渲染引擎（firefox：gecko、chrome/safari：webkit）<br>
由于 JS 可以操作 DOM 元素处理样式等，JS 主线程是执行同步任务的，所以设计上 JS 引擎线程和 GUI 渲染线程是互斥的。 也就是说 JS 引擎处于运行状态时，GUI 渲染线程将处于冻结状态。

### 事件处理线程

事件处理线程用来控制事件回调处理，浏览器触发某个事件后会把事件回调函数放到任务队列中。

### 其他线程

其他线程统称工作线程，如处理 ajax 的线程，dom 事件线程、定时器线程、读写文件的线程等，工作线程的任务完成之后， 会推入到一个任务队列（task queue）
