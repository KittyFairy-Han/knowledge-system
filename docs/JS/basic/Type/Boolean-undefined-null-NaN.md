<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-22 11:00:29
 * @LastEditors: your name
 * @LastEditTime: 2021-04-05 16:37:43
 * @Description: file content
-->

# Boolean 类型

```js
Boolean(undifined);
Boolean(null);
Boolean(0);
Boolean("");
Boolean(NaN);
//除了以上和false都是true
//比如
Boolean(" "); //true
```

> 注意：Number(" ")得到 0，但是 Boolean(" ")得到 true

# 特殊值 undefined 、 null 、 NaN

## undefined 和 null 出现的场景

### 报 undefined （未定义） 错：

- 未定义的变量
- 函数实参传值类似 (,x,y)
  > 使用 typeof 可以避免报错

### 不报错但值是 undefined ：

- 未初始化的变量
- 函数有形参但是无实参传入类似(x,y)
- 函数没有返回值
  > 注意 使用 var 时有变量提升 声明在打印之后 也不是报错

### 不报错但值是 null

- 赋值为 null

## undefined 和 null 相同相异点

| 过程           | undefined | null   |
| -------------- | --------- | ------ |
| 转换为 Number  | NaN       | 0      |
| 用 typeof      | undefined | object |
| 转换为 Boolean | false     | false  |

```js
undefined == null; //true
undefined === null; //false
```

## NaN 出现的场景

NaN 即 not a number

- 其他类型转换为数字出错的时候则得到的值为 NaN
- 数学运算出现错误的时候如 0 做除数得到的值为 NaN

## NaN 的特点、性质

- 任何数(包括 ±Infinity) 与 NaN 进行比较 都返回 false
- 任何数与 NaN 进行四则计算都得 NaN
- NaN !== NaN

## Infinity 使用场景

- 正无穷 Infinity
- 负无穷 -Infinity

## Infinity 运算

四则运算和数学的 正负无穷 一样 以下三种情况需要特殊注意一下

```js
0 * Infinity = NaN;
Infinity / Infinity = NaN;
Infinity - Infinity = NaN;
```

> 正负溢出返回 ±Infinity，所以单纯数学计算不会引起报错
