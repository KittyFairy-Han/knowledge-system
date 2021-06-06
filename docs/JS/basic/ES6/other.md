<!--
 * @Author: 鱼小柔
 * @Date: 2021-06-06 11:00:11
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 11:09:10
 * @Description: file content
-->
# ES6 其他常用语法

- let const
- 块级作用域
- 字符串模版
- 扩展运算符
- 解构赋值
- 函数可以指定默认参数

## let const 与 var

> 查看作用域章节

## 解构赋值

- 对象解构
- 数组解构
- 混合解构
- 字符串解构

### 应用

- 互换值
- 复制数组
- 函数传参列表不定长度时

```js
//1
[a, b] = [b, a];
//2
const colors = [1, 2, 3];
const [...copyColors] = colors;
copyColors; //[1,2,3]
//3 
function f(...args) {}
f(1);
f(1, 2);
f(1, 2, 3);
```

