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
以屏幕为Z=0的平面，从屏幕的 perspective-origin 位置为出发点，以perspective为长度，向屏幕的正前方做垂线， 垂线的另一端为视点所在位置。视点与屏幕四个顶点分别画射线，形成了一个透视空间，就像我们现实生活中眼睛看到的空间范围。  
![关系]('./static/web3d-1.png')  
改变perspective-origin，会产生物体在移动的视觉效果，其实这是因为视点与物体产生了相对运动，物体没有动，但是看起来是动的。当视点向左移动时，物体相对向右运动，视点向右移动，物体反之。垂直方向也是同理的。
改变perspective，perspective的值越小，离Z平面越近，透视效果更明显。
translateZ代表物体离屏幕的距离，当translateZ越大则说明离屏幕越近，离视点越近，所以物体会逐渐变大。当translateZ>perspective时，说明物体在视点的背后了，这个时候物体会消失，因为已经超出了视野范围。
[体验](https://3dtransforms.desandro.com/perspective)
## web 3d 四要素
四要素分别是：场景(舞台)、相机、光照、物体(演员)。
图形学中相机有透视相机会和正交相机两种，对应的投影也有透视投影和正交投影两种。在实际的应用中，已透视投影为主，正交投影的方式一般只应用于3d游戏的一些2d关卡中。
图形
## 常见库


### threeJs 3d库
简单demo：https://www.imooc.com/learn/1267
深入讲解到three原理、webgl、浏览器等：https://coding.imooc.com/class/chapter/282.html#Anchor
场景、灯光、摄像机等js创建。html 就用到一个 canvas 标签。
没有 ar 能力

世界坐标原点是canvas元素中央位置。
### aframe 3d+ar库
https://www.imooc.com/learn/1267
在 three 基础上封装的？
场景、灯光、摄像机是标签式的写法。
结合 ar.js 实现AR效果。环境来自摄像头拍摄的真实场景，模型来自代码，它们之间的纽带是一个标记。把标记放到真实场景中，让数字模型与真实场景融合。
### playcanvas.js
### Babylon.js