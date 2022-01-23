<!--
 * @Author: 鱼小柔
 * @Date: 2022-01-23 11:29:45
 * @LastEditors: your name
 * @LastEditTime: 2022-01-23 17:04:18
 * @Description: 前端截屏
-->
# 原理方案
js截屏方案主要基于三个核心原理：
①将html重新绘制到到canvas，利用canvas的dataToUrl方法，将canvas导出为图片。
②将html作为svg的外联元素，利用svg的原生api，将svg导出为图片
dom\css->canvas
svg
node吊起浏览器方法
# 相关js库踩坑
html2canvas
