# 数据类型

Number（包括 NaN）、String、Boolean、复合类型（Array 、Object 、Function、null） 、undefined

## 判断数据类型的方法

### typeof 运算符

- 用法: typeof A
- 返回值: String

| 测试值    | 返回值      |
| --------- | ----------- |
| Number    | "number"    |
| String    | "string"    |
| Boolean   | "boolean"   |
| Object    | "object"    |
| Array     | "object"    |
| null      | "object"    |
| Function  | "function"  |
| undefined | "undefined" |

### instanceof 运算符

- 用法: A instanceof B
  用来判断 A 是否在 B 的原型链上 , 所以只对复合类型有效
- 返回值: trule/false

### Object.prototype.toString() 函数

- 用法: Object.prototype.toString.call(A)
- 返回值: String

| 测试值    | 返回值               |
| --------- | -------------------- |
| Number    | "[Object Number]"    |
| String    | "[Object String]"    |
| Boolean   | "[Object Boolean]"   |
| Object    | "[Object Object]"    |
| Array     | "[Object Array]"     |
| null      | "[Object Null]"      |
| Function  | "[Object Function]"  |
| undefined | "[Object Undefined]" |
| Error     | "[Object Error]"     |
| Math      | "[Object Math]"      |
| Date      | "[Object Date]"      |
| 正则      | "[Object RegExp]"    |

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
