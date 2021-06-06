<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 11:19:45
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 17:11:10
 * @Description: file content
-->

# 前端存储

## session、 cookie、 webstorage、 indexDB 对比

|              | session             | cookie                             | webstorage                                          | indexDB        |
| ------------ | ------------------- | ---------------------------------- | --------------------------------------------------- | -------------- |
| 保存位置     | server              | broswer                            | broswer                                             | broswer        |
| 安全性       | 好                  | 差                                 | 差                                                  |                |
| 生命周期     | maxInactiveInternal | maxAge (默认为关闭浏览器之前)      | sessionStorage：关闭窗口、locastorage：手动清除之前 | 手动清除前     |
| 大小         | 尽量精简            | <4k                                | >=5m                                                | 无限           |
| 作用(为什么) | 减少下次请求步骤    | 减少下次请求步骤(请求时每次都携带) | 前端自己存数据、减少下次请求步骤(不参与请求)        | 同左           |
| 存储形式     |                     | 文本                               | 键值对                                              | 键值对、二进制 |
| 使用(怎么做) | 服务端代码          | document.cookie                    | 同步、不能搜索                                      | 异步、可以搜索 |

## indexDB 
[【参考资料】](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
## webstorage

window.localStorage./window.sessionStorage.方法
```js
getItem();
setItem();
removeItem();
key();
clear();
```
