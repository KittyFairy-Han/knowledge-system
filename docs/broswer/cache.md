<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-29 00:14:11
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 00:35:14
 * @Description: 缓存
-->
# 缓存
## 强缓存
### 是什么
在过期时间前，不会和服务器通信，直接拿浏览器中的副本
### 怎么做
响应头中包含信息
- Expires 值是绝对时间 : Thu,21 Jan 2017 23:39:02 GMT
- Cache-Control 值是相对时间单位是秒 : max-age=3600
后者优先级更高
## 协商缓存
### 是什么
和服务器通信,询问是否重新请求或者使用浏览器的缓存
### 怎么做
请求头和响应头携带相关字段，4个字段配合使用
- 服务器下发 Last-Modified : Thu,21 Jan 2017 23:39:02 GMT  
- 浏览器携带 If-Modified-Since : Thu,21 Jan 2017 23:39:02 GMT 
Last-Modified 和 If-Modified-Since 的值是一样的，就是服务器下发的那个觉得时间值。
- 服务器下发 Etag 
- 浏览器携带 If-None-Match 
Etag 和 If-None-Match 是同一个值，就是服务器下发的那个值。
