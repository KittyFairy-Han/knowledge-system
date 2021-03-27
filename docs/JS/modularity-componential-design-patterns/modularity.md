# 模块化

## 发展

1. 函数封装
2. 对象封装
3. 立即执行函数
4. commonJs 规范(node、webpack)

- 一个文件就是一个模块，拥有单独的作用域。普通方式定义的变量、函数、对象都属于该模块内；
- 通过 require 来加载模块，通过 exports 和 modul.exports 来暴露模块中的内容；
- 同步加载模块，当所有模块加载完毕才执行下一步
  > 不适合浏览器端，因为 node 的性能较好取决于磁盘，而前端浏览器还受制于网络。所以出现了 AMD CMD.
- 动态导入
- 值是拷贝的

5. AMD(require.js、webpack)

- 依赖前置，对于那些“条件依赖”就会显得浪费。
- 只有一个 API define(<模块名称>, [依赖数组], 回调函数)
- 异步加载模块，

6. CMD(sea.js)

- 依赖就近，用到的时候再加载（会做缓存），防止浪费。
- define(function (require, exports, module) {})
- 异步加载模块

6. ES6 规范(原生 js、webpack)

- import 导入 export 导出
- 异步加载模块
- 静态导入
- 值是引用的

7. webpack 打包 commonJs 和 es6 一起使用 构成前端模块化
   > 前端打包工具，使得 nodejs 模块化(基于 commonJs)可以被使用,nodejs 积极支持 ES6 语法，浏览器部分支持 ES6，所以 babel 作用在于此

## commonJs ES6 模块化

commonJs 输出值的拷贝，运行时加载(动态)。同步。
Es6 输出值的引用，编译时加载(静态)，只读。为了满足一些特殊需求，提供了动态加载函数 import()。异步。

## commonJs 模块化使用

```js
//example.js
module.exports = {
  say: "hi",
};

//main.js
let word = require("./example").say; // hello
console.log(word); //hello
word = "hi";
console.log(require("./example").say); // hello
```

## ES6 模块化编译环境

- webpack-demo
- rollup-demo

## ES6 模块化使用

```js
// example1.js
export const a = 1
export default a = 1
// example2.js
const a = 1
const b = 2
export *
// main.js
import {a} from 'some-js-file'
import anyName1 from 'some-js-file'
anyName1 //1
import * as anyName2 form 'some-js-file'
anyName.a//1
anyName.b//2
```

注意：

- export default 一个模块只能使用一次
- export import 是静态引入 不可以用表达式
- import 存在作用域提升
- as 使用

# moudle.exports、require、export、import

##  一、moudle.exports、require

### 1.  使用

- step1  写一个模块

```js
// lily.js

let personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

let getFamily = function() {
  return personInfo.family;
};

module.exports = {
  personInfo,

  getFamily,
};
```

- step 2  使用这个模块

```js
// main.js

const lily = require("./lily.js");

console.log(lily.getFamily()); //{mom: "wang", dad: "li"}
```

### 2.  原理

> 为什么写个文件通过  moudle.exports  导出，就是一个模块呢？

> 为什么通过  require  就可以拿到这个模块呢？

-  因为  webpack  对文件进行了处理，关键逻辑：

```js
// 准备一个模块的数据结构

var module = {
  id: "lily",

  exports: {},
};

// 把文件转换为模块的关键函数

function load(module) {
  // 读取文件的代码 =================

  /* let personInfo = {

    name: "lily",

    family: {

      mom: "wang",

      dad: "li",

    },

  }

  function getFamily() {

    return Object.values(person.family)

  }

  module.exports = {

    personInfo,

    getFamily,

  } */

  // 读取文件结束 ====================

  // moudle是load函数传过来的参数，我们在文件中写 moudle.exports = {xxx},{xxx}会作为load函数的返回值

  // 所以如果要导出的部分必须得通过 moudle.exports , 这是个约定的写法

  // 源码里面的逻辑不仅仅是读取代码，文件先转换为闭包，然后作用于绑定等等，比较复杂，这里就不上源码了

  return module.exports;
}

// 执行转换

var exported = load(module);

// 保存到模块统一处理的地方

save(module, exported);
```

-  当使用  require  的时候，会根据文件路径去保存模块的地方把对应的模块取出来

```js
require("./lily.js"); //
```

![require结果]('./images/1.png')

### 3. CommonJs  规范  module.exports={xxx} VS exports.xxx=xxx

- exports.xxx=xxx  的写法

```js
// lily.js

let personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

let getFamily = function() {
  return personInfo.family;
};

exports.personInfo = personInfo; // 这样写也行： module.exports.person = person
exports.getFamily = getFamily; // 这样写也行：module.exports.getPerson = getPerson
```

-  其实  load  函数调用的时候其实不仅传了  moudle  还传了  module.exports

```js
var module = {
  id: "hello",

  exports: {},
};

function load(module, exports) {
  // 读取文件的代码 ====================

  // ...

  // 这种写法不行: exports = {person:person,getPerson:getPerson},

  // 因为传进来的exports是指向moudle.exports的，如果直接对exports赋值，那它和moudle的exports是没有任何关系了，而最后return的始终是module.exports，所以不能给exports直接赋值

  // 读取文件结束 ========================

  return module.exports;
}

var exported = load(module, module.exports);

save(module, exported);
```

-  防止多种用法写懵了，就统一用  module.exports={xxx}  吧

##  二、ES6  标准语法  export  和  import

### 1.  使用

-  同样的内容，es6  写法

```js
// lily.js

let personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

let getFamily = function() {
  return personInfo.family;
};

export { personInfo, getFamily };

//main.js

import { personInfo, getFamily } from "./lily.js";

console.log(personInfo);
```

### 2.  原理

- es6  的语法都会通过  babel  转换为  es5

```js
// lily.js 转换后

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.getFamily = exports.personInfo = void 0;

var personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

exports.personInfo = personInfo;

var getFamily = function getFamily() {
  return personInfo.family;
};

exports.getFamily = getFamily;

// main.js 转换后
("use strict");

var _lily = require("./lily.js");

console.log(_lily.personInfo);
```

-  通过上面就可以看出，export xxx  最后其实还是转换成了  exports.xxx  的写法，需要注意的是  exports  有个\_\_esModule  的属性值是  true。

- import  最后实际也是转换成了  require  去获取模块，并且是获取到整个模块，然后使用模块里面的值的时候，是   当前模块.属性   这种方式，并没有直接获取需要的属性。

### 3. export default xxxx、import xxx from、import \* as xxx from

- export {x1,x2}  和  import {x1,x2} from  是成对使用的，转换前后上面已经列出来了

- export default xxx  和  import xxx from  是成对使用的，转换前后如下

```js
//lily.js

let personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

export default personInfo;

//main.js

import person from "./lily.js";

console.log(person);
```

- import  后面接的变量名和模块文件中  export default  后面接的变量名不必一致，看如何转换就知道为什么可以不一样了

```js
//lily.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = void 0;

var personInfo = {
  name: "lily",

  family: {
    mom: "wang",

    dad: "li",
  },
};

var _default = personInfo;

// export default 导出的对象是挂在 exports的default属性下面的，并不是整个exports

exports.default = _default;

//main.js
("use strict");

var _lily = _interopRequireDefault(require("./lily.js"));

// 如果是es6模块则直接返回这个对象，如果不是则返回一个新的对象，这个新的对象default属性就是指向这个对象

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

console.log(_lily.default);
```

-  可以看出来  export {xxx}  与  export default xxx  是不一样的，前者是  module.exports = {xxx}  后者是  module.exports.default=xxx ，所以  export default  和  export{xxx}  是可以共存的，并且  export default  只能有一个，多个的情况，后面的会覆盖前面的，使用的时候还是尽量不要混合两种用法。

- import xxx from，只要使用到  xxx  都是取模块.default  属性

-  要想直接拿到整个模块就用  import \* as xxx from，这种情况和  require()  拿到的结果是真正对应的

```js
// lily.js

let name = "lily";

let age = "18";

let info = "info";

export { name, age };

export default info;

// main.js

import * as lilyModule from "./lily.js";

console.log(lilyModule);
```

-  转换比较复杂，不做展示，输出的结果：

![image]('./images/2.png')

##  三、exports+require  和  export+import  混用

-  因为  export、import  最后会转换成  exports+require，所以是可以混用的

-  基于上一个  import \*  的例子

```js
import * as lilyM1 from "./lily.js";

const lilyM2 = require("./lily.js");

console.log(lilyM1 === lilyM2); //true
```

##  四、两种规范，有什么区别？

###  首先得知道模块之间有依赖的情况下是怎么加载的， require()  循环加载

- require  第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。以后需要用到这个模块的时候，就会到  exports  属性上面取值。即使再次执行  require  命令，也不会再次执行该模块，而是到缓存之中取值。

- a.js

```js
//a.js

exports.a = false; //a1
const bModule = require("./b.js"); //a2
console.log(bModule.b); //a3
exports.a = true; //a4
console.log("a 执行完"); //a5
//b.js

exports.b = false; //b1
const aModule = require("./a.js"); //b2
console.log(aModule.a); //b3
exports.b = true; //b4
console.log("b 执行完"); //b5
//main.js

aModule = require("./a.js"); //m1
console.log(aModule.a); //m2
bModule = require("./b.js"); //m3
console.log(bModule.b); //m4
```

-  运行过程

- 1. m1

- 2. a1

- 3. a2

- 4. b1

- 5. b2  发生循环加载了，不去重复执行  a  了

- 6. b3  取  a  现有的状态，输出  false

- 7. b4

- 8. b5  输出  “b  执行完”

- 9. a3  输出  true

- 10. a4

- 11. a5  输出  “a  执行完”

- 12. m2  取缓存中  a  的状态，输出  true

- 13. m3  不去重复执行  b  了

- 14. m4  取缓存中  b  的状态，输出  true

###  区别  1 import  在编译时加载，require  在运行时加载

-  之所以这么说，因为  import  要先转换为  require，转换为  require  就是处于编译阶段

-  在转换的时候，发现  import  进来的值重新赋值，或者对  import  做条件判断，babel  就会报错

>  这里有个疑问，import  转成  require  之后是不是立即  load  并且  save  了这个模块？

-  真正运行在浏览器里面的是  require

-  对  require  的结果重新赋值或者做条件判断是可以的  ，但是以下这种情况需要注意

```js
//a.js

exports.a = [];

//main.js

let a = require("./a.js"); //a指向a.js形成的模块
a = null; //a的指向发生改变，但是对本身a.js形成的模块没有影响
console.log(a); //null
consle.log(require("./a.js")); //[]
```

###  区别  2 import  命令的那一行代码不论写在哪里，都会提前到文件顶部

```js

// a.js

exports.a = "aaaa"; //a1

const bModule = require("./b.js"); //a2

 

// b.js

const aModule = require("./a.js"); //b1

exports b="bbbb"//b2

console.log("aModule.a in b.js", aModule.a); //b3

 

```

-  根据  require()  循环加载的原理，执行  a.js  后，运行步骤：a1->a2->b1->b2  输出"aaaa"

-  如果用  ES6  的写法，执行  a.js  后，a2->b1->b2->a1  输出  undefined

-  这就是因为在  babel  转换的时候，import  会提到前面

```js
// a.js

export let a = "aaaa"; //a1
import { b } from "./b.js"; //a2
// b.js

import { a } from "./a.js"; //b1
export let b = "bbbb"; //b2
console.log("a in b.js", a); //b3
```

-  转换后的  a.js

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.a = void 0;

//虽然我们写的是先export后import但是转换的时候会把inport那行写解析

var _b = require("./b.js");

var a = "aaaa";

exports.a = a;
```

###  区别  3  当输出的是非引用类型时，ES6  写法可以响应模块内部对值的改变，CommonJS  不行。（当输出值是引用类型时两者情况一样）

-  非引用类型，CommonJS

```js
// a.js

let a = 0;

exports.a = a;

setTimeout(() => {
  a++; //这个时候的 a 和导出的 a 没有关系了，所以保存到模块里面的始终是当初那个 0
});

//main.js

aModule = require("./a.js");

console.log(aModule.a); //0
setTimeout(() => {
  console.log(aModule.a); //0
}, 1000);
```

-  非引用类型，ES6

```js
// a.js

let a = 0;

export { a };

setTimeout(() => {
  a++;
});

/* 

Object.defineProperty(exports, "__esModule", {

  value: true

});

exports.a = void 0;

var a = 0;

exports.a = a;

setTimeout(function () {

  exports.a = a = a + 1; //重新赋值的时候 永远带着 exports. 所以保存模块里面的那个值也变了

})

*/

//main.js

import * as aModule from "./a.js";

console.log(aModule.a); //0
setTimeout(() => {
  console.log(aModule.a); //1
}, 100);
```

-  引用类型，CommonJS

```js
// a.js

let a = [];

exports.a = a;

setTimeout(() => {
  a.push(1);
});

//main.js

aModule = require("./a.js");

console.log(aModule.a); //[]
setTimeout(() => {
  console.log(aModule.a); //[1]
}, 1000);
```

-  引用类型，ES6

```js

// a.js

let a=[]

export a

setTimeout(() => {

  a.push(1);

});

//main.js

import * as aModule from './a.js'

console.log(aModule.a) //[]

setTimeout(()=>{

  console.log(aModule.a) //[1]

},1000)

```
