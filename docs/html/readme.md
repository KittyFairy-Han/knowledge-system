<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-05 15:38:31
 * @LastEditors: your name
 * @LastEditTime: 2021-04-07 22:00:37
 * @Description: file content
-->

# html

## <!DOCTYPE html>

是用来声明文档类型的，告诉浏览器应该把这个文档当成什么类型进行解析

## meta

### <meta name="参数" content="具体的描述"> 

其中 name 属性共有以下几种重要的值。
- <meta name="keywords" content="PHP中文网">
用于告诉搜索引擎，你网页的关键字
- <meta name="description" content="php中文网提供大量免费、原创、高清的php视频教程">
用于告诉搜索引擎，你网站的主要内容
- <meta name="viewport" content="width=device-width, initial-scale=1">
用于设计移动端网页


### <meta http-equiv="参数" content="具体的描述">
- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
指定IE和Chrome使用最新版本渲染当前页面
- <meta http-equiv="cache-control" content="no-cache">
和缓存相关
- <meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
用于设定网页的到期时间，过期后网页必须到服务器上重新传输。

[参考](https://www.cnblogs.com/cangqinglang/p/10788281.html)

## link rel

rel 表示“关系 (relationship) ”,属性值表示<link>项的链接方式与包含它的文档之间的关系。

```html
<!-- css样式 -->
<link rel="stylesheet" href="main.css" />
<!--可以在收藏夹中显示出图标-->
<link rel="Bookmark" href="images/tab.png" />
<!--可以在地址栏中显示出图标-->
<link rel="icon" href="favicon.ico" />
<!--  -->
<link rel="preload" as="script" href="main.js" />
```
