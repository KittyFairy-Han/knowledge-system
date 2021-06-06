<!--
 * @Author: 鱼小柔
 * @Date: 2021-06-06 10:20:54
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 10:20:54
 * @Description:
-->

# css 布局和经典考题

## 水平垂直居中方案

## 三栏布局方案

| 方案             | 优点                         | 缺点                                     |
| ---------------- | ---------------------------- | ---------------------------------------- |
| 表格布局         | 兼容性最好，甚至可以兼容 IE8 | 不灵活(内部元素属性限制)、性能差(渲染慢) |
| 浮动解决方案     | 兼容性很好，比较灵活         | 清除浮动                                 |
| 绝对定位解决方案 | 兼容性比较好，使用灵活       | 脱离文档流，会有一些隐藏问题如高度塌陷   |
| flexbox 弹性布局 | 比较完美的解决方案           | /                                        |
| 网格布局         | 二维弹性布局，功能效果好     | 兼容性差                                 |

## 高度坍塌问题

- position 不为 static 也不为 relative
- float 不为 none