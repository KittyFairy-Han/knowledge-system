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

// 宏任务和微任务的区分，使得 JavaScript 引擎可以在处理异步任务时，更好地控制任务的执行顺序和优先级，从而提高代码的性能和响应性。

// 加密、数据流、多路复用、服务端推送

// TCP：TCP 是一种面向连接的协议，它提供一种可靠的字节流服务。在 TCP 连接中，发送方和接收方都需要维护一定的控制信息，以保证数据能够可靠地传输。TCP 通过校验和、序列号、确认应答、重传机制、流量控制等方式，保证了数据传输的可靠性。
// UDP：相比之下，UDP 是一种无连接的协议，它提供一种不可靠的数据报服务。在 UDP 传输中，发送方只管发送，不确认接收方是否成功接收。因此，UDP 不能保证数据能够可靠地到达接收方。
// TCP+SSL+Http = https

// 前端History路由配置 nginx
// 在使用 HTML5 History API 的单页应用（SPA）中，所有的路由都是前端路由，也就是说，所有的 URL 都应该返回同一个 HTML 文件。在 Nginx 中，可以通过配置 try_files 指令来实现这个功能。
// try_files $uri /index.html; 这行代码的意思是，Nginx 会先尝试去找 URL 对应的文件，如果找不到，就返回 index.html 文件。这样，无论 URL 是什么，用户都会得到同一个 HTML 文件，然后前端路由会根据 URL 来显示不同的内容。

//QPS（每秒查询率）达到峰值意味着你的服务器在处理的请求数量已经达到了极限。这种情况下，你可以采取以下一些措施来优化：
// 负载均衡、扩容、缓存、限流、代码层面提高查询速度

// react-hok
// useMemo、useCallback、useRef、useReducer、useImperativeHandle、
// useReducer 场景：一个倒计时组件，有两个模式，增和减，规0，规60.mode 和 count 两个状态，用useReducer比用useState+useEffect更好

// React 性能优化
// React.memo - 比如一个订单倒计时页面，每秒都会更新，但是页面上的其他内容并不会变化，这时候就可以使用 React.memo 来避免不必要的渲染。
// useCallback - 一些传递给子组件的事件会用 useCallback，避免触发不必要的子组件重新渲染。
// useMemo - 一些计算量比较大的函数，可以用 useMemo 来缓存计算结果，避免重复计算。

// hook 顶层调用：React 的 Hook 底层是链表，每一个 Hook 的 next 是指向下一个 Hook 的，if 会导致顺序不正确，导致 React 无法正确地追踪 Hooks 的状态，状态错乱。

// 父组件和子组件渲染过程
// 父变子就变，           因为diff时，只进行同级比较,使用 React.PureComponent 或 React.memo
// commit 阶段先渲染子组件，再渲染父组件

// antd
// Form 和 Form.Item 通过 Context 传递了一些方法和属性，这些方法和属性会被 Form.Item 内部的组件所使用，这就是为什么 Form.Item 必须包裹在 Form 组件内部的原因。


// 浏览器中跨页面通信主要有以下几种方式：
// 基于数据的：localStorage 和 sessionStorage：当 localStorage 或 sessionStorage 更新时，会触发 storage 事件。我们可以监听这个事件来获取存储的数据。但是，这种方式只能在同源的页面标签页、iframe 或者 worker 之间通信。
// 基于数据的：Cookie 数据可以在不同的页面之间共享，但是由于 Cookie 的大小限制，所以不适合传输大量数据。
// 基于消息的：Window.postMessage：postMessage 方法允许来自不同源的窗口进行通信。
// 基于消息的：BroadcastChannel API：BroadcastChannel API 允许同源的不同标签页、iframe 或者 worker 之间进行通信。
// 基于线程的：SharedWorker：生命周期取决于所有使用它的页面，当没有页面使用它时，会被终止。
// 基于线程的：Service Worker：是浏览器的线程，多个页面可以共享。在不活动时会被浏览器终止，下次使用时再次启动


