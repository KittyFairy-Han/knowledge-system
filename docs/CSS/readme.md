<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-28 10:32:11
 * @LastEditors: your name
 * @LastEditTime: 2021-04-14 20:56:04
 * @Description: css 考点
-->

# css 考点

## 三栏布局方案比较

| 方案             | 优点                         | 缺点                                     |
| ---------------- | ---------------------------- | ---------------------------------------- |
| 表格布局         | 兼容性最好，甚至可以兼容 IE8 | 不灵活(内部元素属性限制)、性能差(渲染慢) |
| 浮动解决方案     | 兼容性很好，比较灵活         | 清除浮动                                 |
| 绝对定位解决方案 | 兼容性比较好，使用灵活       | 脱离文档流，会有一些隐藏问题如高度塌陷   |
| flexbox 弹性布局 | 比较完美的解决方案           | /                                        |
| 网格布局         | 二维弹性布局，功能效果好     | 兼容性差                                 |

## display

|              | opacity:0       | visibility:hidden            | display:none       |
| ------------ | --------------- | ---------------------------- | ------------------ |
| 保留空间     | √               | √                            | √                  |
| 事件响应     | √               | ×                            | ×                  |
| 对子元素影响 | 设置非 0 不生效 | 设置 visibility:visible 生效 | 设置非 none 不生效 |
| reflow       | ×               | ×                            | √                  |

> visibility:collapse 用于 table 元素与 display:none 效果相当；用于其它元素与 visibility:hidden 效果相当

## position

- 一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上
## border

### border 赋值为 0 和 none 的区别

```css
div {
  boder: 0;

  /* 

    border-width:0 

    border-其他:initial 

    浏览器渲染，花费性能

    */
}

div {
  border: none;

  /* 

    boder-style:none

    border-width:0 

    border-其他:initial

    浏览器不渲染，不浪费性能

     */
}

/* 相同点是表现都是看不到边框 */
```

### 应用：画三角形

```css
div {
  width: 0px;

  height: 0px;

  border-top: 10px solid red;

  border-right: 10px solid transparent;

  border-bottom: 10px solid transparent;

  border-left: 10px solid transparent;

  /* 调整 boder 四个方向的 width 调整角度和三角形大小 */
}
```

## float

## 脱离文档流有高度坍塌的问题

position 不为 static 也不为 relative
float 不为 none

## 使用伪元素

### 注意

- content 一定要有
- dispaly 跟随父标签的默认 display

