<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-15 17:52:40
 * @LastEditors: your name
 * @LastEditTime: 2021-06-06 23:50:57
 * @Description: 安全方面
-->

# 前端安全

## CSRF 跨站请求伪造

### 原理

![CSRF](./static/CSRF.jpg)

### 防御措施

- token
- referer
- 隐藏令牌

## XSS 跨域脚本攻击

### 原理

- 不需要登录认证
- 向目标网站注入脚本即 script

### 防御措施

- 让插入的脚本不可执行

## 考点

- 接口防刷？
