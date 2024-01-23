// 上传优化
// 画海报优化
// 卡了怎么办
// 首屏速度优化
// 从输入url到页面展示
// redux 原理
// React Vue 对比

// bfc 是什么？块级格式化上下文
// 为什么干什么？ 清除浮动、高度坍塌、margin重叠
// bfc 不会被浮动元素覆盖
// bfc 区域把子浮动元素高度计算在内
// 两个相邻的bfc垂直方向上的margin不重叠

// set 集合
// 不重复，不连续性能好
// map 键值对
// 键可以是任意类型，有序，大量数据性能好，


// 多了 deactived、actived


// function this 调用时确定，严格模式下 undefined，非严格模式下 window
// 箭头函数 this 定义时确定，自己没有 this

//宏任务和微任务的区分，使得 JavaScript 引擎可以在处理异步任务时，更好地控制任务的执行顺序和优先级，从而提高代码的性能和响应性。


// 资源加载错误、网络请求错误都有对应的 onerrr 事件
// 语法错误 try catch
// window.onerror 是一个全局错误处理函数，它可以监听到上面两种类型的错误,需要注意的是，window.onerror 无法捕获 Promise 中未处理的错误。如果需要捕获这类错误，可以使用 window.onunhandledrejection 事件。
// 跨域脚本（第三方脚本）错误 window.onerror，但要记得在 script 标签上加上 crossorigin 属性
// performance.getEntries() // 获取所有成功资源的加载信息

// hook、compositionApi、setup、typescript

// 加密、数据流、多路复用、服务端推送

//TCP：TCP 是一种面向连接的协议，它提供一种可靠的字节流服务。在 TCP 连接中，发送方和接收方都需要维护一定的控制信息，以保证数据能够可靠地传输。TCP 通过校验和、序列号、确认应答、重传机制、流量控制等方式，保证了数据传输的可靠性。
//UDP：相比之下，UDP 是一种无连接的协议，它提供一种不可靠的数据报服务。在 UDP 传输中，发送方只管发送，不确认接收方是否成功接收。因此，UDP 不能保证数据能够可靠地到达接收方。
// TCP+SSL+Http = https

// 前端History路由配置 nginx
// 在使用 HTML5 History API 的单页应用（SPA）中，所有的路由都是前端路由，也就是说，所有的 URL 都应该返回同一个 HTML 文件。在 Nginx 中，可以通过配置 try_files 指令来实现这个功能。
// ry_files $uri /index.html; 这行代码的意思是，Nginx 会先尝试去找 URL 对应的文件，如果找不到，就返回 index.html 文件。这样，无论 URL 是什么，用户都会得到同一个 HTML 文件，然后前端路由会根据 URL 来显示不同的内容。



//QPS（每秒查询率）达到峰值意味着你的服务器在处理的请求数量已经达到了极限。这种情况下，你可以采取以下一些措施来优化：
// 负载均衡、扩容、缓存、限流、代码层面提高查询速度


// 大数处理
// bigint 、 big.js、 字符串

// BOM 浏览器对象模型，常用的有 window、navigator、screen(deviceorientation 事件)、history、location、document
// DOM 文档对象模型，用于操作页面上的元素

//for...in 主要用于遍历对象的可枚举属性（包括自身的属性和原型链上的属性）
//for...of 则是用于遍历可迭代对象（如数组、字符串、Set、Map 等）的元素


// Fiber:
// 为什么？在旧的 React 架构中，一旦开始渲染就不能被打断，如果组件树很大，渲染过程可能会占用很长时间，导致浏览器无法及时响应用户的交互，从而影响用户体验。
// 是什么？
// 从使用者角度，Fiber 是 Vdom
// 从原理层面，是最小工作单元
// 怎么做？
// 1.Reconciliation 阶段：在这个阶段，React 会构建 Fiber 树
// 2.Commit 阶段：在这个阶段，React 会根据 Reconciliation 阶段计算出的结果来更一次性更新 DOM

// react-hok
// useMemo、useCallback、useRef、useReducer、useImperativeHandle、
// useReducer 场景：一个倒计时组件，有两个模式，增和减，规0，规60.mode 和 count 两个状态，用useReducer比用useState+useEffect更好

// react diff
// 1.同层比较
// 2.类型比较 
// 3.key比较
// // 类型不同时，React 会移除旧节点，创建并插入新节点
// // 类型和key相同的节点，会被认为是相同的节点，原地复用
// // 类型相同但key不同的节点，会被认为是不同的节点，移动复用。下标递增法移动复用。

// React 性能优化
// React.memo - 比如一个订单倒计时页面，每秒都会更新，但是页面上的其他内容并不会变化，这时候就可以使用 React.memo 来避免不必要的渲染。
// useCallback - 一些传递给子组件的事件会用 useCallback，避免触发不必要的子组件重新渲染。
// useMemo - 一些计算量比较大的函数，可以用 useMemo 来缓存计算结果，避免重复计算。

// zustand 优化
// 拆开 selector、派生属性拆分为一个 state





// hook 顶层调用：React 的 Hook 底层是链表，每一个 Hook 的 next 是指向下一个 Hook 的，if 会导致顺序不正确，导致 React 无法正确地追踪 Hooks 的状态，状态错乱。


// useEffect：这个 Hook 会在浏览器完成布局和绘制后，在一个延迟事件中被调用。因此，即使 effect 导致了额外的渲染，用户也不会感觉到。
// useLayoutEffect：这个 Hook 会在浏览器完成布局和绘制，但在新的绘制被显示在屏幕之前被调用。如果你的 effect 进行了 DOM 变更，而你希望在用户看到新的渲染之前就完成这个变更，那么应该使用 useLayoutEffect。
// 只有在需要同步修改 DOM，并且需要在用户看到新的渲染之前就完成这个修改的情况下，才应该使用

// 父组件和子组件渲染过程
// 父变子就变，           因为diff时，只进行同级比较,使用 React.PureComponent 或 React.memo
// commit 阶段先渲染子组件，再渲染父组件


// antd
// Form 和 Form.Item 通过 Context 传递了一些方法和属性，这些方法和属性会被 Form.Item 内部的组件所使用，这就是为什么 Form.Item 必须包裹在 Form 组件内部的原因。

// three 法向量
// 法向量是垂直于平面的向量，通常用于计算光照和碰撞。

// Canvas 是 HTML5 提供的一个元素,用来绘制图形
// 工作原理是基于像素的： 其他 element 是基于对象的，比如可以移动。canvas 需要重新绘制


