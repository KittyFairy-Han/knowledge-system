<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 18:17:26
 * @LastEditors: your name
 * @LastEditTime: 2021-03-27 19:30:43
 * @Description: file content
-->

# String 类型

## 属性

- String.prototype.length

## 相关方法

### String

| 转换前                      | 转换后                               |
| --------------------------- | ------------------------------------ |
| undefined                   | "undefined"                          |
| null                        | "null"                               |
| Boolean                     | "true"/"false"                       |
| Number(包括 NaN、±Infinity) | "原来的值"                           |
| []                          | ""                                   |
| Array                       | 脱掉方括号披上引号即"数组拍平后的值" |
| Function                    | "函数代码"                           |
| Object                      | "[Object,Object]"                    |

### 静态方法 String.

#### fromCharCode()

#### fromCodePoint()

```js
for (let i = 8000; i < 10000; i++) {
  console.log(i, String.fromCharCode(i), String.fromCodePoint(i));
}
```

### 实例方法 String.prototype.

- String 实例方法都**不改变**原来的字符串
  | idx | how to use | arguments | return |
  | --- | ----------- | --------------------------------- | -------------------------------------------------------------------------------- |
  | 1. | charAt | position | position 位置的字符 : String |
  | 2. | charCodeAt | position | position 位置字符的 Unicode : Number |
  | 3. | pointCodeAt | position | position 位置字符的 Unicode 编码点值的非负整数 |
  | 4. | indexOf | searchValue[, fromIndex] | 从 fromIndex ——>找,首次匹配 searchValue 时的开始 position |
  | 5. | lastIndexOf | searchValue[, fromIndex] | 从 fromIndex **<——**找,首次匹配 searchValue 时的开始 position |
  | 6. | search | searchString | regexp | 从 fromIndex ——>找，str 首次匹配 searchString 成功时的开始位置 : position |
  | 7. | match | regexp | 匹配，规则复杂看官方技术文档。返回 :position | Object | Array |
  | 08. | matchAll | regexp | 匹配所有，规则复杂看官方技术文档。返回 :Iterator |
  | 09. | slice | [beginIndex, endIndex] | 截取 str 从 beginIndex 到 endIndex 之间的字符串,左闭右开 |
  | 10. | substring | [startIndex, endIndex] | 截取 str 从 startIndex 到 endIndex 之间的字符串,左闭右开 |
  | 11. | replace | regexp | substr, newSubStr | function | 替换，规则复杂看官方技术文档。返回 :String |
  | 12. | trim | | 去掉两边空格 :String |
  | 13. | toLowerCase | | 转换为小写 : String |
  | 14. | toUpperCase | | 转换为大写 : String |
  | 15. | split | [sperateString | sperateRegexp, limit] | 字符串被指定字符串或正则表达式分割后形成的数组 :Array |
  | 16. | contact | string2...stringN | N 个字符串连接后的新字符串 :String |
  | 17. | startsWith | searchString[, searchFromIndex] | 判断 str 从 searchFromIndex 位置向后的字符串是否以 searchString 开头的 : Boolean |
  | 18. | endsWith | searchString[, searchTotalLength] | 判断 str 的 searchTotalLength 长度范围内是否以 searchString 结尾的 : Boolean |
  | 19. | includes | searchString[, fromIndex] | 判断 str 从 searchFromIndex 位置向后的字符串是否包含 searchString : Boolean |

### indexOf,lastIndexOf,search

- 当没有匹配成功时，返回 -1

### search,match(regexp),matchAll(regexp)

- 当你想要知道字符串中是否存在某个模式（pattern）时可使用 search()，类似于正则表达式的 test() 方法。当要了解更多匹配信息时，可使用 match()（但会更慢一些），该方法类似于正则表达式的 exec() 方法。
- match 正则表达式带全局符号时，返回数组，否则返回对象

```js
const str = "my name is yu xiao rou , you can call me xiao rou yu or xiao rou";
const reg = /rou/
str.search(reg) //19
reg.test(str) //true
str.match(reg);//["rou", index: 19, input: "my name is yu xiao rou , you can call me xiao rou yu or xiao rou", groups: undefined]
reg.exec(str)//["rou", index: 19, input: "my name is yu xiao rou , you can call me xiao rou yu or xiao rou", groups: undefined]
str.matchAll(reg); //返回一个迭代器

str.match(/rou/g); // ['rou','rou','rou']
```

### slice

- beginIndex、endIndex < 0，则等同于 length+beginIndex，length+endIndex
- beginIndex 省略 则为 0
- endIndex 省略 则为 length-1

### substring

- startIndex、endIndex<0 转换为 0
- starIndex、endIndex>length 转换为 length
- startIndex 省略 转换为 0
- endIndex 省略 转换为 length - 1
- startIndex < endIndex 转换为 (endIndex,starIndex)
- slice 和 substring 提取**失败**返回**空字符串**,不报错

## 字符串与数组

- 可以根据下标取值
- 有 length 属性

```js
"hello"[0]; // 'h'
"hello".length; // 5
```
