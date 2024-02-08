<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-14 20:51:27
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 09:59:02
 * @Description: css 尺寸
-->

# CSS 尺寸

## 百分比

### css 百分比相对于谁？

| 属性            | 相对于          |
| --------------- | --------------- |
| width           | parent's width  |
| height          | parent's height |
| padding、margin | parent's width  |
| left 、 right   | parent's width  |
| top 、 bottom   | parent's height |

>parent **不一定**是 child **最近的祖先**元素，如下：

| child's position | parent                     |
| -------- | -------------------------- |
| static   | 最近的祖先元素             |
| relative | 最新的祖先元素             |
| absolute | 最近的非 static 的祖先元素 |
| fixed    | 视口                       |

> child 为 static 时，left、right、top、bottom 不生效 。<br>
> parent flex 布局会改变子元素的预设大小和边距。以上规律不适用于弹性布局。

### 应用

- 利用 padding 都是相对于 width 实现一个固定长宽比的长方形

## rem、em

- rem ：相对的只是 HTML 根元素的字体尺寸。
- em ： 相对于当前对象内文本的字体尺寸。字体尺寸没有直接设置，是继承父元素的。

## vw、vh

- vw:1vw 等于视口宽度的 1%
- Vh:1vh 等于视口高度的 1%
- vmin: 选取 vw 和 vh 中最小的那个,即在手机竖屏时，1vmin=1vw
- vmax:选取 vw 和 vh 中最大的那个 ,即在手机竖屏时，1vmax=1vh


