<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 18:17:26
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 10:50:12
 * @Description: file content
-->

# Object 类型

> typeof null === "object" 但这里的 Object 不包括 null

## 如何创建对象

- 字面量 let obj = {...}
- 构造函数 let obj = new SomeConstructor()
- Object.create(somePrototype)

## 运算和操作

- . 点运算

- [ ] 方括号运算

```js
let obj = { 1: "a", 2: "b" };
//这种情况只能方括号运算不能点运算,
//obj.1 错误写法
obj["1"]; //'a'
```

- delete 命令用来删除对象的某个属性

- in 运算判断对象是否拥有某个属性

  - in 运算符不区分属性是自身的还是继承的，也不区分是否可以遍历

- for in 遍历对象属性
  - 不区分自身还是继承，只对可遍历的属性才有效

```js
const obj = { name: "miaomiaomiao" };
for (key in obj) {
  obj[key]; //key=name时，miaomiaomiao
}
obj.name; //miaomiaomiao
obg["name"]; //miaomiaomiao
"name" in obj; //true
delete obj.name;
```

## 静态方法 Object.

- create(obj) 创建对象
- assign(ob1,ob2,...) 合并对象，返回一个拥有 ob1 ob2 的所有属性的新对象 第一层属性是深拷贝 其余是浅拷贝
- getPrototypeOf(obj) <=> obj.\_\_proto\_\_ 获取 obj 的原型
- setPrototypeOf(B,A) 把 B 的原型设置为 A
- is 对比两个对象的地址是否是同一个,返回 Boolean
- getOwnPropertyDescriptor、getOwnPropertyDescriptors、defineProperty、defineProperties、 用法如下

  ```js
  let obj = {};
  Object.defineProperties(obj, {
    property1: {
      value: true,
      writable: true,
    },
    property2: {
      value: "Hello",
      writable: false,
    },
    // etc. etc.
  });
  Object.defineProperty(obj, "property3", {
    value: 42,
    writable: false,
  });
  Object.getOwnPropertyDescriptor(obj, "property3");
  /* {
    value: 42,
    writable: false
  } */
  ```

- getOwnPropertyNames(obj) - 自身属性名称 - Array
- keys(obj) - 可枚举且自身的 key - Array
- values(obj) - 可枚举且自身的 value -Array

## 实例方法 Array.prototy.

- valueOf
- toString
  > x.toString() 与 String(x) 不同。undefiend、null 不能调用 toString 方法,但是可以作为参数传入 String()。其余情况与String(x)的结果一样。
- A.isPrototypeOf(B) 判断 A 是否是 B 的原型 - Boolean
- hasOwnProperty(p) p 是否为非继承属性 - Boolean
- propertyIsEnumberal(p) p 是否为可枚举属性 - Boolean
