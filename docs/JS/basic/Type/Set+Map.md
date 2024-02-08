<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 18:17:26
 * @LastEditors: your name
 * @LastEditTime: 2021-03-28 11:12:05
 * @Description: file content
-->

# Set Map 数据类型

- Set 类似数组，内部没有重复的成员
- Set 内部用 === 判断， NaN 看做相等
  > NaN 自身不等，只是在 Set 这种数据结构中看作相等
- Map 是更完善的 hash 结构，键（key）值（value）对的键也可以是对象

## 构造

```js
const s = new Set(likeArray);
const m = new Map(Object | `双元素的二维数组`); //  参数：[[a,1],[b,2],[c,3]] 映射结果： a=>1 b=>2 c=>3
```

## 实例属性和方法

- element 表示成员、key 表示 Map 的键、value 表示 Map 的值
- set get map 是 Map 独有的方法
- Set 没有 set get 方法 所以获取和修改 Set 的值 可以把它转成数组去操作然后在转回来

| name     | arguments    | return                         | 描述                                |
| -------- | ------------ | ------------------------------ | ----------------------------------- |
| 属性     | ============ | ================               | ==================                  |
| size     | /            | lenght:Number                  | 获取成员数                          |
| 操作成员 | ============ | ================               | ==================                  |
| add      | element      | Boolean                        | 增，返回是否成功                    |
| delete   | element/key  | Boolean                        | 删，返回是否成功                    |
| has      | element      | element/key                    | 判断是否有该成员                    |
| clear    | /            | /                              | 清空成员                            |
| set      | key,value    | 修改后的 Map 对象              | 设置成员值                          |
| get      | key          | value                          | 获取成员值                          |
| 遍历     | ============ | ================               | ==================                  |
| keys     | /            | 值:SetInterator/键:MapIterator | 返回所有的键，对于 Set 来说键就是值 |
| values   | /            | 值:SetInterator/值:MapIterator | 返回所有的值                        |
| entries  |              |                                |                                     |
| forEach  |              |                                |                                     |
| for of   |              |                                |                                     |

```js
let set = new Set(["sa", "sb", "sc"]);
let map = new Map([
  ["m1", "ma"],
  ["m2", "mb"],
  ["m3", "mc"],
]);
set.forEach((value, key, set) => {
  console.log(key, value); // 第一次循环输出 sa,sa
});
map.forEach((value, key, map) => {
  console.log(key, value); // 第一次循环输出 m1,ma
});

for (let value of set) {
  console.log(value); //第一次循环输出 sa
}
for (let [key, value] of map) {
  console.log(key, value); //第一次循环输出 m1,ma
}
```

## 应用

> 利用 Set 为数组去重，章节：Array-考点-去重

## 考点
- Set 比 数组：不重复，不连续性能好
- Map 比 Object：键可以是任意类型，有序，大量数据性能好
