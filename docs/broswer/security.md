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

🌰 例如，假设一个银行网站有一个URL，访问这个URL可以转账，攻击者可以构造一个链接，当用户点击这个链接时，就会发起转账操作。如果用户在这个时候已经登录了银行网站，那么这个操作就会成功。


### 防御措施

- token
- referer
- 隐藏令牌

## XSS 跨域脚本攻击

### 原理

- 不需要登录认证
- 向目标网站注入脚本即 script

### 防御措施
- 校验
- 转义
- csp ：CSP 是通过设置 HTTP 响应头 Content-Security-Policy 来实现的。设置 HttpOnly 标志： 这可以防止通过 JavaScript 访问 Cookie，从而降低了 XSS 攻击的风险。
- 设置 HttpOnly 标志： 这可以防止通过 JavaScript 访问 Cookie，从而降低了 XSS 攻击的风险。



## 考点

- 接口防刷？

