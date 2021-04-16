# Array 类型

## new Array

```js
new Array(); // []
new Array(3); // [Empty,Empty,Empty]
new Array(1.5); // 报错
new Array(1, 2, 3); // [1,2,3]
```

## 静态方法 Array.

- isArray
  判断是否为数组
- from
  从一个类似数组或可迭代对象创建一个新的、浅拷贝的数组

```js
Array.from({ length: 3 }); //[undefinde,undefined,undefined]
```

- of

```js
// 与 new Array 作用类似，区别如下
Array.of(3); // [3]
Array.of(1.5); //[1.5]
Array.of(1, 2, 3); //[1,2,3]
```

## 实例方法 Array.prototy.

- push,pop,unshift,shift,sort,revert,forEach 改变 arr
  > forEach 不能跳出，for of 可以

| type | how to use                                     | return                                                                    |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| 创建 | fill(value[, start[, end]])                    | value 填充到 start 至 end 范围填充数组                                    |
|      | flat(depth)                                    | 拍平 depth 深度的数组并返回这个 newArr                                    |
|      | copyWithin(target[, start[, end]])             | **浅拷贝**数组 target 位置的元素 填充到 start 至 end 范围                 |
| 查找 | indexOf(searchElement[, fromIndex])            | -->找，首个和 searchElement 相同的元素的 position                         |
|      | lastIndexOf(searchElement[, fromIndex]         | <--找，首个和 searchElement 相同的元素的 position                         |
|      | findIndex(callback[, thisArg])                 | 首个满足 callback 条件的元素的 position                                   |
|      | .[position]                                    | position 位置的 targetElement                                             |
|      | find(callback[, thisArg])                      | 首个满足 callback 条件的 targetElement                                    |
|      | filter(callback[, thisArg])                    | 满足 callback 条件的 newArr                                               |
| 截取 | slice(beginIndex,endIndex)                     | 从 beginIndex 到 endIndex 截取形成 newArr                                 |
| 改变 | push((element1, ..., elementN))                | 从尾部追加后的长度                                                        |
|      | pop()                                          | 从尾部弹出的 element                                                      |
|      | unshift(element1, ..., elementN)               | 头部追加(element1, ..., elementN)后的长度                                 |
|      | shift()                                        | 头部弹出的 element                                                        |
|      | splice(start[, deleteCount[, item1,...,itemN]) | 过程看下面解释删除部分组成的数组                                          |
| 顺序 | reverse                                        | 颠倒顺序                                                                  |
|      | sort([compareFunction()])                      |                                                                           |
| 连接 | concat(array1,...,arrayN)                      | 多个数组连接后的 newArr                                                   |
|      | jion(separator)                                | str.spit 的逆向操作                                                       |
| 判断 | includes(valueToFind[, fromIndex])             | 从 fromIndex 开始找，有和 valueToFind 相同的元素，则返回 true，否则 false |
|      | every(callback[, thisArg])                     | arr 中所有 element 都满足 callback 条件，返回 true，否则 false            |
|      | some(callback[, thisArg])                      | arr 中有一个或者多个 element 都满足 callback 条件，返回 true，否则 false  |
| 遍历 | forEach(callback[, thisArg])                   | 返回 undefined                                                            |
|      | for curEle of arr                              | 运算                                                                      |
|      | map(callback[, thisArg])                       | 返回 newArr                                                               |
|      | reduce(reduceFunction[,initialValue])          | 函数累计处理的结果                                                        |

### flat

```js
let arr = [1, [2, [3, [4]]]];
arr.flat(); // [1,2,[3,[4]]]
arr.flat(1); // [1,2,[3,[4]]]
arr.flat(2); // [1,2,3,[4]]
arr.flat(3); // depth>=3 都返回 [1,2,3,4]
```

### indexOf,lastIndexOf,findIndex

- start 省略 则为 0
- 查找失败返回 -1

### slice

- 左闭右开
- beginIndex、endIndex < 0，则等同于 length+beginIndex，length+endIndex
- beginIndex、endIndex >= length，不报错
- beginIndex 省略 则为 0
- endIndex 省略 则为 length-1
- beginIndex > endIndex 返回 []
  > 常见应用：把 like - arr 转换为 arr

### push,pop,unshift,shift

```js
[1,2,3].unshift(4,5,6) // arr: [1,2,3,4,5,6]
[].shift() // undefined 不报错
[1,2,3].unshift() // arr不变 不报错

```

### splice

- 从 starIndex 开始删除 deleteCount 个元素并且追加 item1...itemN 这些元素，返回删除部分组成的数组

```js
// 参数缺省时 返回值 和 原数组 的情况
let arr = [1, 2, 3][(1, 2, 3)]
  .splice() // 返回[] arr不变
  [(1, 2, 3)].splice(0) // 返回[1,2,3] arr：[]
  [(1, 2, 3)].splice(0, 1); // 返回 [1] arr:[2,3]
```

### join，concat

- spector 省略时 为 “,” （逗号）
- spector 可以为 “''” （空字符串）
- concat 浅拷贝

### forEach,map,for...of

- 无法中断
- forEach 无返回值
- for...of 是一个遍历的运算不是原型上的方法

### sort

- 默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
- compareFunction(a,b)
  - 函数返回值< 0 时 顺序 :a,b
  - 函数返回值> 0 时 顺序:b,a
  - 函数返回值=0,位置不变

### 回调函数参数

- callback(curEle[, index[, array]])
- reduceFunction(accumulator, curEle[, index[, array]])

## 考点

### 数组元素 empty 和 undefined 什么区别

- 遍历跳过 empty 不输出，但是 undefined 会输出 undefined

```js
const arrEmptys = new Array(3);
arrEmptys[0]; //undefined
arrEmptys.forEach((item) => {
  console.log(item);
}); //不会输出任何值
const arrUndefineds = new Array(undefined, undefined, undefined);
arrUndefineds[0]; //undefined
arrUndefineds.forEach((item) => {
  console.log(item);
}); //undefined,undefined,undefined
```

### 生成数组值不为 empty 的固定长度的可遍历的数组

- 先生成 empty x 3 然后再转换成 [undeifned,undeifined,undefined]

```js
[...new Array(3)];
new Array(3).fill(1); //[1,1,1] 类似forEach、map等遍历的方法会跳过empty，但是fill可以生效。
Array.from(new Array(3));
```

- 把有 length 属性的对象转换成数组，数组元素是 undefined

```js
Array.apply(null, { length: 3 });
Array.from({ length: 3 });
Array.from(new Array(3));
// !!Array.prototype.slice.call 不行
```

### 生成一个元素为 0-100 的数组

> 上一个考点再结合 map 方法

```js
Array.from({ length: 100 }).map((v, i) => i);
```

### 判断数组类型

```js
let testVal = [1, 2, 3];
/* 最简洁的方法 */
Array.isArray(testVal);
/* 实例与构造函数的关系 */
testVal instanceof Array;
/* 实例与原型 */
testVal.__proto__ === Array.prototype;
Object.getProtoTypeOf(testVal) === Array.prototype; //Object.getProtoOf(testVal) 是 testVal.__proto__ 的显式写法
Array.prototype.isPrototypeOf(testVal);
/* 类型判断通用方法 */
Object.prototype.toString.call(testVal) === "[Object Array]"; //"[Object Array]"
```

### like-array to array

- 类数组对象(arguments、HTMLCollection、NodeList 等) -> Array

```js
//1 数组的方法如slice、splice等 结合 call
const arr1 = Array.prototype.slice.call(likeArr); //Array.prototype.splice.call(likeArr,0)
//2 es6新增Array静态方法 Array.from
const arr2 = Array.from(likeArr);
//3 扩展运算符
const arr3 = [...likeArr];
```

- Set -> Array

```js
//1 Array.prototype.slice.call 不行
//2 es6新增Array静态方法 Array.from
const arr1 = Array.from(set);
//3 扩展运算符
const arr2 = [...set];
```

### 数组去重

```js
//数组去重方案1 遍历
const uniqueArr1 = (arr) => {
  let obj = {};
  let result = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};

//数组去重方案2 遍历
const uniqueArr2 = (arr) => {
  let result = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    if (result.indexOf(arr[i]) < 0) {
      result.push(arr[i]);
    }
  }

  return result;
};

//数组去重方案3 Set
const uniqueArr3 = (arr) => {
  return [...new Set(arr)];
  //或者
  return Array.from(new Set(arr));
};

let orignArr = [1, 5, 3, 3, 4, 5];
```

### 拍平数组
- 利用String
```js
function linearizeArray(arr){
  const arrStr = String(arr) //arr里面的元素不能是Object
  const targetArr = arrStr.split(",")
  return targetArr
}
//test
linearizeArray([['a','b','c'],1,2,[3,4,[5]]]) //["a", "b", "c", "1", "2", "3", "4", "5"]
```
- 利用 JSON.striingfy
``` js
function linearizeArray(arr){
  const arrStr = JSON.stringify(arr).replace(/\[|\]/g,",")
  const targetArr = arrStr.split(",").filter(item=>item)
  return targetArr
}
```
- 利用递归
```js
function linearizeArray(current) {
  let arr = [];
  if (current instanceof Array) {
    for (let i = 0; i < current.length; ++i) {
      arr.push(...linearizeArray(current[i]));
    }
  } else {
    arr.push(current);
  }
  return arr;
}
let testArray = [1, 2, [[3, 4], 5], [6, 7, 8]];
linearArray = linearizeArray(testArray);
console.log(linearArray);
```

### reduce 写 map

```js
Array.prototype.myMap = function(operate) {
  let newArr = this.reduce((acc, cur, idx) => {
    newCur = operate(cur);
    console.log(idx, acc);
    // return acc.concat(newCur) //也可以
    return [...acc, newCur];
  }, []);
  return newArr;
};

let testArr = ["aaa", "bbb", "ddd", "ccc"];
let newArr = testArr.myMap((e) => {
  return e + 1;
});
console.log(newArr);

/**重点是reduce不设置初始值的话就从idx=1开始遍历而不是idx=0开始 */
```
