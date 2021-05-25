<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-14 20:51:27
 * @LastEditors: your name
 * @LastEditTime: 2021-04-20 17:53:54
 * @Description: css 尺寸
-->

# CSS 尺寸

## 百分比

### css 百分比相对于谁？（非 flex 布局）

| 属性  | 相对于？     |
| ----- | ------------ |
| width | parent-width |
|height| (child absolute,parent relative) parent-height 否则不生效|
|padding| margin parent-width|
| left 、 right |parent-width|
|top 、 bottom| parent-height|

### 应用

- 利用 padding 都是相对于 width 实现一个固定长宽比的长方形

## css 单位、响应式布局

1. 百分比缺点

- 各个属性中如果使用百分比，相对父元素的属性并不是唯一的（如上），造成我们使用百分比单位容易使布局问题变得复杂。

- 就算用百分比按照设计稿，必须手动换算成百分比单位。因为百分比是相对于父级的，而不是整个设计稿的大小。

2. rem 缺点

- 在响应式布局中，必须通过 js 来动态控制根元素 font-size 的大小，也就是说 css 样式和 js 代码有一定的耦合性。必须将改变 font-size 的代码放在 css 样式之前。

3. vw vh 缺点

- 兼容性

  > 视口上的宽度和高度比例不一定是 1:1 的，一般来说，vh 和 vw 不用同时使用，使用 vw 一般就满足移动端适配的要求了。
