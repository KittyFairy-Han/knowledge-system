
# 模块化

## 为什么要用模块

网站逐渐发展成网页应用程序 webApp，从 0 到 1 效率太低而且代码太长不好管理，有了模块，我们就可以更方便地使用别人的代码（复用性），想要什么功能，就加载什么模块（逻辑分离、按需加载），也提高了维护性。

## 发展

| 顺序 | 规范名称 | 特点       | 实现的库   | 关键用法                 |
| ---- | -------- | ---------- | ---------- | ------------------------ |
| 1    | CommonJs | 不能异步   |            | exports、require         |
| 2    | AMD      | 实现了异步 | require.js | define、require          |
| 3    | ES6      | 整合了     | 原生语法   | export、import、import() |

# webpack 中的 CommonJs 和 Es6 模块化

弄懂 moudle.exports、require、export、import 关系和区别

## 一、moudle.exports、require

### 1.  使用

- step1  写一个模块

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

- step 2  使用这个模块

```js
// main.js

const lily = require("./lily.js");

console.log(lily.getFamily()); //{mom: "wang", dad: "li"}
```

### 2.  原理

> 为什么写个文件通过  moudle.exports  导出，就是一个模块呢？

> 为什么通过  require  就可以拿到这个模块呢？

- 因为  webpack  对文件进行了处理，关键逻辑：

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

- 当使用  require  的时候，会根据文件路径去保存模块的地方把对应的模块取出来

```js
require("./lily.js"); //
```


### 3.两种导出写法对比 
CommonJs  规范  module.exports={xxx} VS exports.xxx=xxx

- exports.xxx=xxx  的写法

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

- 其实  load  函数调用的时候其实不仅传了  moudle  还传了  module.exports

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

> 防止多种用法写懵了，就统一用  module.exports={xxx}  吧

## 二、ES6  标准语法  export  和  import

### 1.  使用

- 同样的内容，es6  写法

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

### 2.  原理

- es6  的语法都会通过  babel  转换为  es5

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

- 通过上面就可以看出，export xxx  最后其实还是转换成了  exports.xxx  的写法，需要注意的是  exports  有个\_\_esModule  的属性值是  true。

- import  最后实际也是转换成了  require  去获取模块，并且是获取到整个模块，然后使用模块里面的值的时候，是   当前模块.属性   这种方式，并没有直接获取需要的属性。

### 3. export default xxxx、import xxx from、import \* as xxx from

- export {x1,x2}  和  import {x1,x2} from  是成对使用的，转换前后上面已经列出来了

- export default xxx  和  import xxx from  是成对使用的，转换前后如下

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

- import  后面接的变量名和模块文件中  export default  后面接的变量名不必一致，看如何转换就知道为什么可以不一样了

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

- 可以看出来  export {xxx}  与  export default xxx  是不一样的，前者是  module.exports = {xxx}  后者是  module.exports.default=xxx ，所以  export default  和  export{xxx}  是可以共存的，并且  export default  只能有一个，多个的情况，后面的会覆盖前面的，使用的时候还是尽量不要混合两种用法。

- import xxx from，只要使用到  xxx  都是取模块.default  属性

- 要想直接拿到整个模块就用  import \* as xxx from，这种情况和  require()  拿到的结果是真正对应的

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

> 转换比较复杂，不做展示


## 三、CommonJS和ES6  混用
exports+require  和  export+import

- 因为  export、import  最后会转换成  exports+require，所以是可以混用的

- 基于上一个  import \*  的例子

```js
import * as lilyM1 from "./lily.js";

const lilyM2 = require("./lily.js");

console.log(lilyM1 === lilyM2); //true
```

## 四、两种规范，有什么区别？

### require()  循环加载

> 首先得知道模块之间有依赖的情况下是怎么加载的</br>

require  第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。以后需要用到这个模块的时候，就会到  exports  属性上面取值。即使再次执行  require  命令，也不会再次执行该模块，而是到缓存之中取值。

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

- 运行过程:

m1->a1->a2-> b1-> b2(发生循环加载了，不去重复执行  a  了) -> b3 (取  a  现有的状态，输出  false)-> b4-> b5(输出  “b  执行完”) -> a3(输出  true) -> a4-> a5(输出  “a  执行完”) -> m2( 取缓存中  a  的状态，输出  true) -> m3(不去重复执行  b  了) -> m4(取缓存中  b  的状态，输出  true)

### 1. import  在编译时加载，require  在运行时加载

- 之所以这么说，因为  import  要先转换为  require，转换为  require  就是处于编译阶段

- 真正运行在浏览器里面的是  require

### 2. import  命令的那一行代码不论写在哪里，都会提前到文件顶部

- CommonJS 写法<br/>
  根据  require()  循环加载的原理，执行  a.js  后，运行步骤：a1->a2->b1->b2->b3  输出"aaaa"

```js
// a.js
exports.a = "aaaa"; //a1
const bModule = require("./b.js"); //a2
// b.js
const aModule = require("./a.js"); //b1
exports.b = "bbbb"; //b2
console.log("aModule.a in b.js", aModule.a); //b3
```

- ES6 写法<br/>
  用  ES6  的写法，执行  a.js  后，a2->b1->b2->b3->a1  输出  undefined,这就是因为在  babel  转换的时候，import  会提到前面

```js
// a.js
export let a = "aaaa"; //a1
import { b } from "./b.js"; //a2
// b.js
import { a } from "./a.js"; //b1
export let b = "bbbb"; //b2
console.log("a in b.js", a); //b3
```

### 3. import 只读

在转换的时候，发现  import  进来的值重新赋值，或者对  import  做条件判断，babel  就会报错,对  require  的结果重新赋值或者做条件判断是可以的  ，但是以下这种情况需要注意。

```js
//a.js
exports.a = [];

//main.js
let a = require("./a.js"); //a指向a.js形成的模块
a = null; //a的指向发生改变，但是对本身a.js形成的模块没有影响
console.log(a); //null
consle.log(require("./a.js")); //[]
```

### 4.  

当输出的是非引用类型时，ES6  写法可以响应模块内部对值的改变，CommonJS  不行。（当输出值是引用类型时两者情况一样）

- 非引用类型，CommonJS

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

- 非引用类型，ES6

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

- 引用类型，CommonJS

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

- 引用类型，ES6

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

## 五、相同点

import 最后会转换成 require 所以 import 命令也是同步的，非异步加载，为了满足异步加载的需求使用 import()

## 六、额外说明
import 语法命令是完全静态的（不能使用判断语句、不能使用变量），不会产生独立的 chunk。require 函数虽然可以动态加载（用 if else 语句控制动态加载、或者直接用变量控制动态加载）, 但是 require 并不会产生一个独立 chunk。import、require 的代码模块会合并到 entry 产生的 chunk 中。具体说明如下：

#### 对 require 的解释

```js
// pages/demo/home/main.js
// 根据客户端传参 params.skin 就是主题关键字
require(`../../skin/${params.skin}/index.less`);
```

编译后的代码输出在一个 css 文件中。具体流程是：main.js 作为多页应用的一个入口，编译后形成一个 chunk,chunk 中包含了 main.js 引入的所有模块(所有以 import、require方式引入的模块)，样式代码编译后就在 这个 chunk(假设叫 entry-js-chunk) 中。然后，把 chunk 中的所有样式代码都抽离出来形成一个单独的 chunk(假设叫 css-chunk-from-js)。最后entry-js-chunk和css-chunk-from-js分别输入对应的js和css文件。

```css
.demo-home-root {
  background-color: #08ff70;
  border: 5px solid #90ee90;
}
.demo-home-root:hover {
  background-color: #e6941a;
}
/* ==========以上是绿色主题生成的代码======== */
/* ==========以下是蓝色主题生成的代码======== */
.demo-home-root {
  background-color: #1a68c2;
  border: 5px solid #87ceeb;
}
.demo-home-root:hover {
  background-color: #e3e61a;
}
```

最后两套样式都会合并到一个文件，弊端一，如果皮肤样式有很多套，并且根据需求每次只使用一套，请求文件的体积过大，且大部分属于没有用到的样式。弊端二，样式发生了覆盖，除了最后一份主题，其他的主题永远不会生效，并没有办法动态的加载某一套主题。

