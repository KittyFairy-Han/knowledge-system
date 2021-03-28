# 类和继承

## 什么是类

class 实际是一种语法糖，对于模块化来说写起来更容易，本质还是原型链，构造函数那些
- 必须与 new 连用
- 不存在变量提升
- 内部方法不可枚举

## 如何声明类

```js
class A {
  constructor(name) {
    this.name = name;
  }
}
```

## 类的使用

- 类中的静态方法，实例无法调用到

```js
class Person {
  static sfn() {
    console.log(this); //类本身
  }
  efn() {
    console.log(this); //当前实例
    console.log(Person); //类本身
  }
}
let someone = new Person();
Person.sfn();
someone.efn();
// someone.Sfn()报错
```

## 什么是继承

比如 B 继承 A，b 拥有 B 的 prototype 属性上的所有属性和方法，同时拥有 A 的 prototype 属性上的所有属性和方法

```js
class A {}
class B extends A {}
const a = new A();
const b = new B();
B.___proto___ === A;
b.__proto__.__proto__ === A.prototype;
```

## 如何实现继承

```js
function A(name) {
  this.name = name;
}
function B(age) {
  this.age = age;
}
```

1. 借助构造函数
   ```js
   function B(name, age) {
     A.call(this, name);
     this.age = age;
   }
   const b1 = new B("lily", 18);
   const b2 = new B("ze", 20);
   ```
   - 缺点 ：和 Parent 的原型链没有形成任何关系，对 Parent 的原型扩展，扩展部分(属性、方法) Children 的实例不拥有
2. 借助原型链 prototype + new

   ```js
   const a = new A("zhangsan");
   B.prototype = a;
   const b1 = new B(18);
   const b2 = new B(20);
   ```

   - 缺点 ：Parent 构造器里面的属性没有完全私有化，Children 的实例 公用 Parent 构造器里面的属性,而且 Children 的实例的构造函数不是 Children 而是 Parent。
   - 解决第一个问题就是在 Children 里面填一句 Parent.call(this)。但是，这个方案 让 Parent 执行了两次
   - 解决第二个问题 Children.prototype.constructor = Children

3. 借助原型链 prototype + Object.create

   ```js
   const a = Object.create(A.prototype);
   B.prototype = a;
   const b1 = new B(18);
   const b2 = new B(20);
   ```

   - 缺点 ：父类构造器中的属性 子类实例不拥有，而且 Children 的实例的构造函数不是 Children 而是 Parent。

   - 解决第一个问题就是在 Children 里面填一句 Parent.call(this)
   - 解决第二个问题 Children.prototype.constructor = Children

4. 一三组合
   - class 继承原理就是对 3 的再优化
5. 比 ES6 的 class
   - 用原型链讲继承的时候，是没有静态方法的。如何实现？
   ```js
   A.staticFn = function() {
     console.log("A的静态方法");
   };
   ```
