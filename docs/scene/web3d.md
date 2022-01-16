<!--
 * @Author: 鱼小柔
 * @Date: 2022-01-09 16:31:10
 * @LastEditors: your name
 * @LastEditTime: 2022-01-16 18:12:37
 * @Description: web3d
-->

# web3d

## 从最简单的css3切入
眼睛、视口、物体。与css属性perspective、perspective-origin的关系如图
以屏幕为视口，从屏幕的 perspective-origin 位置为出发点，以perspective为长度，向屏幕的正前方做垂线， 垂线的另一端为视点所在位置。视点与屏幕四个顶点分别连线，形成了一个棱锥的透视空间，就像我们现实生活中眼睛看到的空间范围。
![关系]('./static/web3d-1.png')
## web 3d 四要素
四要素分别是：场景(舞台)、相机、光照、物体(演员)。

## 常见库


### threeJs 3d库
简单demo：https://www.imooc.com/learn/1267
深入讲解到three原理、webgl、浏览器等：https://coding.imooc.com/class/chapter/282.html#Anchor
场景、灯光、摄像机等js创建。html 就用到一个 canvas 标签。
没有 ar 能力
### aframe 3d+ar库
https://www.imooc.com/learn/1267
在 three 基础上封装的？
场景、灯光、摄像机是标签式的写法。
结合 ar.js 实现AR效果。环境来自摄像头拍摄的真实场景，模型来自代码，它们之间的纽带是一个标记。把标记放到真实场景中，让数字模型与真实场景融合。
### playcanvas.js
### Babylon.js