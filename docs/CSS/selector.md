<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-08 13:22:12
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 09:54:32
 * @Description: file content
-->

# 选择器

## 选择器的优先级

### 权重

| selector                | 权重        |
| ----------------------- | ----------- |
| important               | ＋ infinite |
| inline style            | 1000        |
| id                      | 0100        |
| class、伪类、属性选择器 | 0010        |
| tag                     | 0001        |
| \*、>、\+           | 0000        |

### 运算

- .parent .child 加法
- .className1.className2 乘法

<!-- ## 伪元素

### 注意

- content 一定要有
- dispaly 跟随父标签的默认 display -->