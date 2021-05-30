<!--
 * @Author: 鱼小柔
 * @Date: 2021-05-30 18:03:32
 * @LastEditors: your name
 * @LastEditTime: 2021-05-30 18:05:49
 * @Description: css 属性考点
-->

# 属性考点

## 对比 opacity=0、visibility=hidden、display=none

|              | opacity:0       | visibility:hidden            | display:none       |
| ------------ | --------------- | ---------------------------- | ------------------ |
| 保留空间     | √               | √                            | √                  |
| 事件响应     | √               | ×                            | ×                  |
| 对子元素影响 | 设置非 0 不生效 | 设置 visibility:visible 生效 | 设置非 none 不生效 |
| reflow       | ×               | ×                            | √                  |

> visibility:collapse 用于 table 元素与 display:none 效果相当；用于其它元素与 visibility:hidden 效果相当

## position 属性

- 一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上

## float

## border 属性

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

### 用 border 画三角形

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


