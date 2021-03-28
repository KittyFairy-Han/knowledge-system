<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-07 17:37:37
 * @LastEditors: your name
 * @LastEditTime: 2021-03-27 22:18:30
 * @Description: file content
-->

# ES6 新增

## es6 其他常用功能

- let const
- 块级作用域
- 字符串模版
- 扩展运算符
- 解构赋值
- 函数可以指定默认参数

## let const 与 var
> 查看作用域章节

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

## Proxy 元编程、Reflect

VUE3.0 使用 proxy 了。

Proxy 在语言层面修改某些操作的默认行为，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

需要注意的是， 在 IE 下， 这个特性**永远**都**不会**被支持， 包括 VUE 3.0 也是单独开发一套 API 来适应 IE11， 故而在需要支持 IE 的环境下禁止使用 Proxy。
```js
const data = {
    name: 'zs',
    age: 20
}
// target<=>data<=>vm.$data
// proxyData<=>receiver<=>vm
const proxyData = new Proxy(data,{
    get(target,key,receiver){
        // 原型的属性不处理
        const ownKeys = Reflect.ownKeys(target)
        if(ownKeys.includes(key)){
            // 不拦截
        }
        const result = Reflect.get(target,key,receiver)
        return result
    }
    set(target,key,val,receiver){
        // 不重复修改数据
        const oldValue = tarrget[key]
        if(oldValue===val){
            return true
        }
        const result = Reflect.get(target,key,val,receiver)
        // 拦截操作
        console.log('拦截 set',key,val)
        return result // 是否成功
    },
    deleteProperty(target,key){
        const result = Reflect.deleteProperty(target,key)
        console.log('拦截 deleteProperty',key,val)
        return result // 是否成功
    }
})
```
