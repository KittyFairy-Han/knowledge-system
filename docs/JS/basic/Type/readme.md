<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 18:16:35
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 11:14:03
 * @Description: file content
-->

# 数据类型

Number（包括 NaN）、String、Boolean、复合类型（Array 、Object 、Function、null） 、undefined

## 判断数据类型的方法

### typeof 运算符

- 用法: typeof A
- 返回值: String

| 测试值                            | 返回值      |
| --------------------------------- | ----------- |
| Number                            | "number"    |
| String                            | "string"    |
| Boolean                           | "boolean"   |
| Symbol                            | "symbol"    |
| Object(包含 Set Map Date Math 等) | "object"    |
| Array                             | "object"    |
| null                              | "object"    |
| Function                          | "function"  |
| undefined                         | "undefined" |

### instanceof 运算符

- 用法: A instanceof B
  用来判断 A 是否在 B 的原型链上 , 所以只对复合类型有效
- 返回值: trule/false

### Object.prototype.toString() 函数

- 用法: Object.prototype.toString.call(A)
- 返回值: String

| 测试值    | 返回值               |
| --------- | -------------------- |
| Number    | "[object Number]"    |
| String    | "[object String]"    |
| Boolean   | "[object Boolean]"   |
| Symbol    | "[object Symbol]"    |
| Object    | "[object Object]"    |
| Array     | "[object Array]"     |
| null      | "[object Null]"      |
| Function  | "[object Function]"  |
| undefined | "[object Undefined]" |
| Error     | "[object Error]"     |
| Math      | "[object Math]"      |
| Date      | "[object Date]"      |
| Set       | "[object Set]"       |
| Map       | "[object Map]"       |
| 正则      | "[object RegExp]"    |

## 类型转换

- 数据类型转换的原理是 toString() 和 valueOf()
  > undefined 和 null 不能直接调用这两个方法

### 自动转换

- ——> Boolean:
  条件语句、三元运算、非运算
- ——> String:
  字符串与其他类型用 “+” 连接时
- ——> Number:
  除了以上的运算方式，其他运算方式如 + - \* / == 等，都会转换为数字类型进行计算

### 强制转换

- ——> Number:
  Number()
- ——> String:
  String()
- ——> Boolean:
  Boolean()

## 写正则表达式

1. 用正则表达式匹配字符串，以字母开头，后面是数字、字符串或者下划线，长度为 9-20

```js
new RegExp("^[a-zA-Z][a-zA-Z0-9_]{8,19}$");
```
## 基础类型和引用类型的值内存中的位置

- 基础类型变量存在栈，值也存在栈
- 引用存在栈，但它指向的值存在堆

## Object、Map

- key 的类型不同。Object 只能是 string 或者 Symbol
- Object 遍历时候顺序不能保证、Map 保证按照设置的顺序

```js
let obj = { abc: "我的key是字符开头", "1": "我的key是数字开头" };
//再次打印:{1: "我的key是数字开头", abc: "我的key是字符开头"}
let map = new Map([
  ["a", "我的key是字符开头"],
  [1, "我的key是数字开头"],
]);
//{"a" => "我的key是字符开头", 1 => "我的key是数字开头"}

```
- Map 用起来更优雅
- Map 的性能收益，大量增删操作时速度快，储存大量的数据时占用的内存更小。
- 数据量小的时候 Object 占用的内存更小，新建时 Object 更快

