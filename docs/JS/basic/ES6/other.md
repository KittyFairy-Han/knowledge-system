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

- 作用域，let const 块级，var 没有块级
- 提升，let const 无，var 有。(function 也提升，function优先级更高)
- 重复声明，let 不可，var 可
- 全局对象属性，let 不挂在 window 下，var 挂

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

## 继承 ES5 vs ES6
- ES5 继承：ES5 使用原型链实现继承。在创建子类实例时，子类的原型会被设置为父类的一个新实例，这样子类就可以访问父类的属性和方法。这些属性和方法在创建父类实例时被添加到父类实例上。
- ES6 引入了 class 和 extends 关键字来实现继承。在创建子类时，子类的原型会被设置为父类的原型，这样子类就可以访问父类的属性和方法。这些属性和方法在定义类时被添加到类的原型或类本身上。
- 在 ES5 和 ES6 中，实例属性和方法在创建实例时被添加到实例上，静态属性和方法在定义类或函数时被添加到类或函数本身上。在 ES6 中，通过 extends 关键字继承的子类可以访问父类的所有静态和实例属性和方法。
