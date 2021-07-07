<!--
 * @Author: 鱼小柔
 * @Date: 2021-07-04 09:26:36
 * @LastEditors: your name
 * @LastEditTime: 2021-07-04 22:43:04
 * @Description: file content
-->
# Lottie 常见应用
这篇分享是基于[如何制作 Lottie 动画并应用在前端项目](https://kms.netease.com/article/36099)的续集，所以这里不会再介绍引用和加载动画，是对进一步使用的介绍。<br>
以如下JSON动画为例进行介绍([源文件]())<br>
![开奖](./static/lottery.gif)

## 灵活的控制动画播放
有一些业务需求中会出现比较复杂的动画适合用Lottie来实现，比如抽奖活动，抽奖过程中一些物理碰撞的动画和展示结果前的一些过度的魔法光效。在前端开发中，通常都是调用后端接口（获取抽奖结果）的同时播放一些过度的动画，获取到结果后，停止动画并展示结果。理想的效果是获取到结果刚好动画播放结束。但是接口请求时间终究是不可控的，所以这就需要对动画播放过程和播放时间做一些处理来配合接口请求时间。<br>
官方提供了一些控制播放的api[传送门](http://airbnb.io/lottie/#/web?id=usage)<br>
以上面的红包动画为例子，红包放大和旋转为过渡动画，此时接口返回结果，然后渐显“金额”。(在具体的业务场景中，“金额”应该替换为具体的结果数字，这个我们后面会讨论到，暂先不讨论。)
### 情况1 动画播放时间>接口请求时间
这种情况下，发送请求同时开始播放动画
### 情况2 动画播放时间<接口请求时间
## 替换
有些业务场景中，会需要替换动画中的文字和图片。[例如](https://cloud.video.taobao.com/play/u/270923/p/1/d/hd/e/6/t/1/250398793745.mp4?auth_key=YXBwX2tleT04MDAwMDAwMTImYXV0aF9pbmZvPXsidGltZXN0YW1wRW5jcnlwdGVkIjoiNTE0YzYwMjY4NmU3NDlmN2VhNGQ2MDY4YmY4NjE4MWYifSZkdXJhdGlvbj0mdGltZXN0YW1wPTE2MjUxOTEyMjQ=)。这段动画中的 「3.39%」「2.43%」以及「1000 万」都属于业务数字，数字变化频率高，如果每次数字变化要重新导出视频效率太低，这种场景下就需要动态替换动画中数字。
动态替换又进一步分为，① 动画初始化之前替换一次，播放动画时动画中的文字或图片内容不变（下文称为静态替换）;② 动画播放时，改变动画中的文字或图片（下文称之为动态替换）。

下面以如图所示的 JSON 数据作为例子。(笔者是在 vue 中学习使用 lottie 的)

- 动画截图

- JSON 源码数据

### 静态替换文字

静态替换文字，主要有两种方式。一种是把接口返回的数据解析成 JS 对象，然后找到要替换的位置，重新赋值。另外一种就是把接口返回的 JSON 数据转换为字符串然后替换文字。

#### 改变 JS 对象中的属性值

- 这是一个公用的方法

```js
function loadLottieAnimation(data) {
  lottie.loadAnimation({
    container: this.$refs.lottieDom, //挂在到对应的dom节点
    renderer: "svg",
    loop: true,
    animationData: data,
  });
}
```

```js
const path =
  "https://gw.alipayobjects.com/os/finxbff/2d0c4a95-568f-4923-bef0-e20fca6018ca/7abc1e3d-c381-49ed-ad54-3a48366f0180.json";
const resp = await fetch(path);
const data = await resp.json(); //转换为js对象
data.assets[0].layers[0].t.d.k[0].s.t = "new text"; //找到对应的属性，改变属性的值
loadLottieAnimation(data);
```

这种方式的有一个致命的缺点，就是需要把 JSON 数据格式化后，一层一层的人肉查找要修改的内容在哪里，然后再去赋值。

#### 字符串替换

```js
const path =
  "https://gw.alipayobjects.com/os/finxbff/2d0c4a95-568f-4923-bef0-e20fca6018ca/7abc1e3d-c381-49ed-ad54-3a48366f0180.json";
const resp = await fetch(path);
const str = await resp.text(); //转换为字符串
const newStr = str.replace("${文本}", "new text"); //找到对应的属性，改变属性的值
const lottieAnim = loadLottieAnimation(JSON.parse(newStr));
```

这种方式看起来比上一个方便一些，但是这是需要设计师高度配合的，要先和设计师沟通，把需要替换的部分做一个特殊的标识'${}'，所以这也是存在不确定性的方法。
修改 lottie 解析后的运行时 JS 对象，理论上一样可以修改文本，官方其实提供了相应的 API，仔细查找的话在 lottie-web 的官方文档里有提及，请看 https://github.com/airbnb/lottie-web/wiki/TextLayer.updateDocumentData


### 动态替换文字


### 动态替换图片
