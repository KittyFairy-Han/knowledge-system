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
具体来说，转换过程是将目标 DOM 节点绘制到 canvas 画布，然后 canvas 画布以图片形式导出。可简单标记为绘制阶段和导出阶段两个步骤：

绘制阶段：选择希望绘制的 DOM 节点，根据nodeType调用 canvas 对象的对应 API，将目标 DOM 节点绘制到 canvas 画布（例如对于<img>的绘制使用 drawImage 方法)。

导出阶段：通过 canvas 的 toDataURL 或 getImageData 等对外接口，最终实现画布内容的导出。
递归遍历目标节点及其子节点，收集节点的样式信息；
计算节点本身的层级关系，根据一定优先级策略将节点逐一绘制到 canvas 画布中；
重复这一过程，最终实现目标节点内容的全部绘制。

②将html作为svg的外联元素，利用svg的原生api，将svg导出为图片
dom\css->canvas
svg
node吊起浏览器方法
# 相关js库踩坑
html2canvas等方案一的库使用时应该注意
- 跨域问题
可以在 <canvas> 中使用其他来源的图片，但是这会污染画布,在"被污染"的画布中调用以下方法将会抛出安全错误：

在 <canvas> 的上下文上调用getImageData()
在 <canvas> 上调用 toBlob()
在 <canvas> 上调用  toDataURL().
img的crossorigin 属性，结合合适的 CORS 响应头，就可以实现在画布中使用跨域 <img> 元素的图像，
- 使用支持的css
- 资源完整性问题
资源加载完毕后再html2canvas。
``` js
const preloadImg = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve();
        }
        img.src = src;
    });
}
const preloadList = [
    './pic-1.png',
    './pic-2.png',
    './pic-3.png',
];

Promise.all(preloadList.map(src => preloadImg(src))).then(async () => {
    convertToImage(container).then(canvas => {
        // ...
    })
});
```