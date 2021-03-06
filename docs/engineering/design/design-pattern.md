<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-07 18:17:41
 * @LastEditors: your name
 * @LastEditTime: 2021-04-07 19:36:46
 * @Description: 前端的设计模式
-->

# 设计模式

通俗一点说，设计模式是在某种场合下对某个问题的一种解决方案。如果再通俗一点说，设计模式就是给面向对象软件开发中的一些好的设计取个名字。

| 模式         | 为什么要有这个模式                                        | 经典案例                                |
| ------------ | --------------------------------------------------------- | --------------------------------------- |
| 状态模式     | 一个对象有不同状态，不同状态执行不同逻辑,总不能用 if else | Promise                                 |
| 观察者模式   | 一点触发多点接受                                                          | js 事件监听、promise.then、vue 生命周期 |
| 发布订阅模式 | 更解耦的1对多                                                          | vue watch                               |
| 代理模式     |                                                           | ES6 Proxy                               |
| 工厂模式     |                                                           | Jquery                                  |
| 单例模式     |                                                           | 购物车                                  |

## 中介模式和代理模式

### 代理模式

明星通过经纪人来代理与外界联系 1-1-N

### 中介模式

买房和卖房通过房产中介机构 N-1-N

## 观察者模式和发布订阅模式

### 观察者模式

观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。
小明是个卖报纸的，邻里街坊都要订阅他的报纸，所以他每天早上都给订阅的人发报纸。

### 发布订阅模式

订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。
小明不自己卖报纸了，他把报纸交给机构管理，每天他把报纸给机构，机构再分发给订阅报纸的那些人。其实还有很多和小明一样的人也会把文章交给机构处理。

### 两者关系

如果以结构来分辨模式，发布订阅模式相比观察者模式多了一个中间件订阅器，所以发布订阅模式是不同于观察者模式的；如果以意图来分辨模式，他们都是实现了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新，那么他们就是同一种模式，发布订阅模式是在观察者模式的基础上做的优化升级。
