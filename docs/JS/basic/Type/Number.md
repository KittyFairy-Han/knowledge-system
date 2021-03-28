<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 18:17:26
 * @LastEditors: your name
 * @LastEditTime: 2021-03-27 18:53:04
 * @Description: file content
-->

# Number 类型

## 属性
> _(平时用的并不多)_

```js
Number.MAX_VALUE = 1.7976931348623157e308;
Number.MIN_VALUE = 5e-324;
Number.MAX_SAFE_INTEGER = 9007199254740991;
Number.MIN_SAFE_INTEGER = 9007199254740991;
```

## 相关方法

### isNaN() 判断一个变量是否为 NaN

```js
// examples
Number.isNaN(NaN); // true
Number.isNaN("abcde"); //false
Number.isNaN(100); //false
```

### isFinity() 判断一个变量是否有穷

```js
Number.isFinite(1); //true
Number.isFinite(Infinity); //false
Number.isFinite(NaN); //false
```

### parseInt(any,10) 和 Number(any)

| 值        | parseInt | Number |
| --------- | -------- | ------ |
| 1         | 1        | 1      |
| 0         | 0        | 0      |
| 1.1       | 1        | 1.1    |
| true      | NaN      | 1      |
| false     | NaN      | 0      |
| undefined | NaN      | NaN    |
| null      | NaN      | 0      |
| ''        | NaN      | 0      |
| '123'     | 123      | 123    |
| '123abc'  | 123      | NaN    |
| []        | NaN      | 0      |
| [1]       | 1        | 1      |
| [1,2,3]   | 1        | NaN    |
| {}        | NaN      | NaN    |
| 其他      | NaN      | NaN    |

### toString(radix) 把十进制数转换为相应的进制数 返回字符串

```js
const number = 8;
number.toString(10);
// "8"
number.toString(8);
// "10"
number.toString(2);
// "1000"
```

### toFixed(num) 把数字转换为保留相应位数的小数 返回字符串

> 参数为 0 ~ 20 之间,不传则为 0 ,转换法则是直接抹去非四舍五入

## 考点

### 0.1+0.2！=0.3

- 在计算机中所有的运算都是先转换成二进制计算的
- 0.1 转换成二进制是 0.0001100110011001100...（1100 循环）
- 0.2 转换成二进制是 0.00110011001100...（1100 循环）
- JS 存储小数的位有限，采用了 1 进 0 舍。所以 JS 中
- 0.1 是这样的：0.00011001100110011001100110011001100110011001100110011010
- 0.2 是这样的：0.0011001100110011001100110011001100110011001100110011010
- 相加之后再转换为十进制就等于 0.30000000000000004 了
- 其实这个现象 Java Ruby Pathon 也存在
  [详细解释]('https://juejin.im/post/6844903700356399112')

### 判断小数是否相等

```js
var delta = 1e-5; // 定义精度精确到0.00001
var a = 0.1;
var b = 0.2;
var sum = 0.3;
// 判断相差小于精度就认为相等
if (a + b - sum < delta) {
  console.log("a + b == sum");
}
```
