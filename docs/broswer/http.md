<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-28 20:31:38
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 23:41:32
 * @Description: http 基础知识
-->

# http 基础


## 网络七层模型

[详细讲解](https://www.liaoxuefeng.com/wiki/1016959663602400/1017787663253120)

| OSI 七层模型 | 物理设备           | 功能                               | TCP/IP 协议(用来定义作用的规范) | 数据单元      |
| ------------ | ------------------ | ---------------------------------- | ------------------------------- | ------------- |
| 7 应用层     | 文件服务、虚拟终端 |                                    | http、FTP、DNS                  | 消息          |
| 4 传输层     | /                  | 负责建立连接、发送数据以及断开连接 | TCP、UDP                        | fragment 段   |
| 3 网络层     | 路由器             | 为数据包进行 IP 选址和选择路由     | IP                              | packet/数据包 |
| 2 数据链路层 | 以太网交换机       | 传输有地址的帧以及错误检测功能     | (几乎用不到 )                   | 帧            |
| 1 物理层     | 光纤               | 以二进制形式在物理媒介上传输数据   | (几乎用不到)                    | bit/比特      |

7 应用层、6 表示层（数据格式化、数据加密、代码转换）、5 会话层（建立、维护、解除会话）统称为应用层


## http 协议

### 特点

- 简单快速
- 灵活
- 无连接：连接一次完成任务之后就断掉 不会保持
- 无状态：服务端无法识别本次连接和上次连接的客户端是否为同一客户端

### http 报文

- 请求报文在谷歌开发者工具中 network 选项中的对应
- - 请求行：GET/http/1.1
- - 请求头：Request Headers
- - 空行 用来分割请求头与请求体
- - 请求体：Request Body
- 响应报文在谷歌开发者工具中 network 选项中的对应
- - 状态行：http/1.1(也有可能是 keep-alive) 200 OK
- - 响应头：Response Headers
- - 空行 用来分割响应头与响应体
- - 响应体：Response/Preview

### http 请求方法

- 请求方法包括：（后三个不常用）
- - GET
- - POST
- - PUT 更新资源
- - DELETE 删除资源
- - HEAD 获得报文首部
- GET POST 区别
- - GET 请求会被浏览器主动缓存，而 POST 不会，除非手动设置
- - GET 在浏览器回退时时无害的，POST 会再次提交请求
- - GET 请求在 URL 中传送的参数是有长度限制的，POST 没有
- - GET 通过 URL 传递参数，POST 放在 请求体 中，GET 安全性低
- - GET 请求参数会被完整的保留在浏览器历史记录里，而 POST 得参数不会被保留

### http 状态码

- 1\*\* 提示信息-表示请求已接收，继续处理
- 2\*\* 表示请求成功
- - 200 客户端请求成功
- - 206 客户端发送了一个带有 Range 头的 GET 请求，服务端完成了他。当视频音频等文件过大时。
- 3\*\* 进行进一步操作
- - 301 请求的页面永久转移至新的 url:被请求的资源已永久移动到新位置。服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。

- - 302 所请求的页面已临时转移到新的 url：请求的资源临时从不同的 URI 响应请求，但请求者应继续使用原有位置来进行以后的请求。
- - 304 已有缓存了 不用重新请求
- 4\*\* 客户端错误
- - 400
- - 401 未授权
- - 403
- - 404
- 5\*\* 服务端错误

### http 持久连接

从 1.1 版本开始支持持久连接，使用 keep-alive 模式（持久连接、连接重用）时，keep-alive 功能使客户端到服务端的连接持久有效，当出现服务的后继请求时，keep-alive 功能避免了建立或者重新建立连接。

### http 管线化

使用持久连接的情况下，某个连接上的消息传递由
请求 1 > 响应 1 >请求 2 > 响应 2 > 请求 3 > 响应 3
变成了类似这样
请求 1 > 请求 2 > 请求 3 > 响应 1 > 响应 2 > 响应 3

- 管线化前提是 开启持久连接
- 管线化 GET HEAD 请求支持 POST 有所限制
- 初次创建连接时不应启动管线机制，因为服务器不一定支持 http/1.1 版本的协议

### 一次完整的 http 请求流程

1. 域名解析 即 解析例如 www.baidu.com 所对应的 IP 地址
2. 三次握手
3. 建立连接发起 http 请求

- 2-3 详细流程：请求——路由——>网卡——>TCP 协议---防火墙--->WEB 程序——>成功建立连接

4. 服务器响应 http 请求 给浏览器返回 数据
5. 浏览器解析数据
6. 渲染页面

### http1.0 -> http1.x-> http2

|                | http1.x    | http2              |
| -------------- | ---------- | ------------------ |
| 协议层级       | tcp->http  | tcp->ssl/tls->http |
| 传输格式       | 文本       | 二进制             |
| 复用           | keep-alive | 多路复用（隐含了keep-alive的功能，又解决了队头阻塞的问题）           |
| 服务端推送能力 | 无         | 有                 |

- 多路复用：一个 request 对应一个 id，这样一个连接上可以有多个 request，每个连接的 request 可以随机的混杂在一起，接收方可以根据 request 的 id 将 request 再归属到各自不同的服务端请求里面。

### http VS https

|          | http      | https          |
| -------- | --------- | -------------- |
| 协议层级 | tcp->http | tcp-ssl->https |
| 安全性   | 明文传输  | 加密传输       |

- 为什么 https 更安全？
  [【https 加密的发展之路】](https://zhuanlan.zhihu.com/p/40902149)
  [【https 加密的发展之路】](http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)
  因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用 httpS，密钥在你和终点站才有。https 之所以比 http 安全，是因为他利用 ssl/tls(现在都用 TLS 协议了)协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer 传递等。保障了传输过程的安全性

### 请求速度

https(2)>http(1.x)>https(1.x)<br>
https 开头的请求，可以是用 http1.x 协议，也可以用 http2 协议的。<br>
http 开头的请求是 http1.x 协议（因为只要用 2 必须是 https ，所以不存在 http(2)）<br>

## TCP 和 UDP

TCP 用于在传输层有必要实现可靠传输的情况；UDP 主要用于那些对高速传输和实时性有较高要求的通信或广播通信。  
TCP ：手机电话  
UDP ：手机短信  


## 考点
### 三次握手失败，客户端服务端做何反应
- 1、2 次握手失败，客户端会在超时后重新发包
- 第 3 次握手失败，服务端会在超时后关闭连接