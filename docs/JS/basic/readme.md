<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 19:07:55
 * @LastEditors: your name
 * @LastEditTime: 2021-04-05 23:53:59
 * @Description: file content
-->

# JS 基础

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

