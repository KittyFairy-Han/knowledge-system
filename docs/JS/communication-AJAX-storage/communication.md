# 通信

## 同源策略

### 是什么

协议、域名、端口 都相同的称为同源

### 非同源有哪些障碍

- cookie localStorage IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

## 如何通信

### AJAX

#### 特点：

- 短连接
- 不能跨域
- 浏览器可以发出 HTTP 请求与接收 HTTP 响应，实现在页面不刷新的情况下和服务端进行数据交互。
- 提高用户体验，较少网络数据的传输量。

#### 实现过程：

1. 创建 XMLHttpRequest 对象（异步调用对象）
   let xhr = new XMLHttpRequest()
2. 创建新的 Http 请求（方法、URL、是否异步）
   xhr.open(‘get’,’example.php’,false);
3. 设置响应 HTTP 请求状态变化的函数。
   onreadystatechange 事件中 readyState 属性等于 4。响应的 HTTP 状态为 status==200(OK)或者 304(Not Modified)。
4. 发送 http 请求
   xhr.send(data);
5. 获取异步调用返回的数据

- 完整代码简易版本

```js
function ajax(obj) {
  //method为ajax提交的方式，默认为'get'方法
  obj.method = obj.method || "get";
  //创建xhr对象
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //异步接受响应
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status === 304) {
        //callback为回调函数，如果不设置则无回调
        obj.callback && obj.callback(xhr.responseText);
      }
    }
  };
  //创建数据字符串，用来保存要提交的数据
  var strData = "";
  if (obj.method == "post") {
    for (var key in obj.data) {
      strData += "&" + key + "=" + obj.data[key];
    }
    //去掉多余的'&'
    strData = strData.substring(1);
    xhr.open("post", obj.url, true);
    //设置请求头
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //发送请求
    xhr.send(strData);
  } else {
    //如果是get方式，则对字符进行编成
    for (var key in obj.data) {
      strData += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(obj.data[key]);
    }
    //去掉多余的'&'，并增加随机数，防止缓存
    strData = strData.substring(1) + "&" + Number(new Date());
    xhr.open("get", obj.url + "?" + strData, true);
    //发送请求
    xhr.send();
  }
}
```

### WebSocket

[Websocket【参考资料】](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

#### 特点

- 客户端与服务端的双向长连接通信
- 不受同源策略限制
- 实时通信
- 协议标识符是 ws（如果是加密，则为 wss），服务器网址就是 URL

#### 实现过程

1. 创建
   let sct = new WebSocket(url,[protocol])
2. 连接成功监听
   sct.onopen()
3. 接收/监听
   sct.onmessage(function(){})
4. 发送
   sct.send()
5. 关闭
   sct.close()

```js
let sct = new WebSocket(url, [protocol]);
sct.onopen();
sct.onmessage(function() {});
sct.send();
sct.close();
```

### CORS

> 是一种通信方式更是 ajax 跨域通信方案，可以理解为 ajax 的一个变种通信方式

## 如何跨域通信

### JSONP

#### 特点

- 利用 script 标签不受同源限制的特点，异步加载 script 标签实现跨域
- 只支持 GET 请求
- 跨域请求需要服务端配合，设置 callback，才能完成跨域请求。

#### 流程

```js
function callbackFunction(response) {
  console.log(response);
}
function loadScript(url, callbackName) {
  let script = document.createElement("script");
  script.src = url + "?jsoncallback=" + callbackName;
  document.body.appendChild(script);
}
let url = "http://www.runoob.com/try/ajax/jsonp.php";
let callbackName = "callbackFunction";
loadScript(url, callbackName);
```

### iframe Hash

```js
// 利用hash，场景是当前页面 A 通过iframe或frame嵌入了跨域的页面 B
// 在A中伪代码如下：
var B = document.getElementsByTagName("iframe");
B.src = B.src + "#" + "data";
// 在B中的伪代码如下
window.onhashchange = function() {
  var data = window.location.hash;
};
```

### postMessage

```js
// postMessage
// 窗口A(http:A.com)向跨域的窗口B(http:B.com)发送信息
Bwindow.postMessage("data", "http://B.com");
// 在窗口B中监听
Awindow.addEventListener(
  "message",
  function(event) {
    console.log(event.origin);
    console.log(event.source);
    console.log(event.data);
  },
  false
);
```

## 跨域通信-CORS

[CORS【参考资料】](http://www.ruanyifeng.com/blog/2016/04/cors.html)

#### 是什么

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。

#### 为什么

是一种通信方式更是解决 ajax 不能跨域的方案，可以理解为 ajax 的一个变种通信方式

#### 原理

- 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。
- 浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
- 因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

### 简单请求

- 简单请求：方法仅限于 ：GET POST HEAD、http头信息仅限于：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type(只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)
>HEAD请求一般可以用在很多并不真正需要资源的场景，避免传输 body 数据造成不必要的资源浪费。如检查一个文件是否存在可以用 HEAD 请求，没有必要用 GET 把整个文件都取下来。
- 请求头关键字段：Orign
- 返回头关键字段：Access-Control-Allow-Origin

### 非简单请求

- 非简单请求：PUT DELETE 等
- 发出预检请求 Option
- 预检请求请求头关键字段：Orign 、Access-Control-Request-Method 、Access-Control-Request-Headers
- 返回头关键字段：Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers
