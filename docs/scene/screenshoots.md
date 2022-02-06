<!--
 * @Author: 鱼小柔
 * @Date: 2022-01-23 11:29:45
 * @LastEditors: your name
 * @LastEditTime: 2022-02-06 19:50:59
 * @Description: 前端截屏
-->

## 原理方案

js 截屏方案主要基于三个核心原理：

### DOM->canvas->image

将目标 DOM 节点绘制到 canvas 画布，然后利用 canvas 相关的 API 以图片形式导出。  
可简单标记为绘制阶段和导出阶段两个步骤：

① 绘制阶段：选择希望绘制的 DOM 节点，根据 DOM 的 nodeType 属性调用 canvas 对象的对应 API，将目标 DOM 节点绘制到 canvas 画布（例如对于 img 标签的绘制使用 drawImage 方法)。

② 导出阶段：通过 canvas 的 toDataURL 或 getImageData 等对外接口，最终实现画布内容的导出。

### DOM->svg->image

将 html 作为 svg 的外联元素，利用 svg 的 API 导出为图片

### node 唤起浏览器方法

## 相关 js 库使用

### html2canvas

DOM->canvas->image 这种方案的绘制阶段是比较麻烦的，尤其当页面比较复杂时。所以 html2canvas 应运而生，也被广泛应用，html2canvas 可以完成把 DOM 重新绘制到 canvas 的流程，最后返回 canvas 到业务层。但 html2canvas 在实际使用时，会有很多细节需要注意，否则会高频踩坑。

#### html2canvas 流程概括：

① 递归遍历目标节点及其子节点，收集节点的样式信息；  
② 计算节点本身的层级关系，根据一定优先级策略将节点逐一绘制到 canvas 画布中；  
③ 重复这一过程，最终实现目标节点内容的全部绘制。

#### html2canvas 基本使用：

html2canvas 接收两个参数，第一个参数代表需要绘制部分的顶层 dom 节点，第二个参数是配置项 [options](http://html2canvas.hertzen.com/configuration)。  
html2canvas 返回 canvas 元素

```js
const options = {};
html2canvas("body", options);
```

#### 使用 html2canvas 时的 checklist

- 只适用于静态 DOM  
  当 DOM 节点有动画时，调用 html2canvas 绘制时只会绘制该节点的第一帧状态。比如某个 DOM 会执行 opacity 从 0->1 的 animation，那么 html2canvas 只会把该 DOM 的 opacity 为 0 的状态绘制到画布上。
  > 在实际的应用场景中，保存截图之前都会有一个静态的预览页面。所以这个问题出现的机率并不大，这里更多是作为提醒。
- 资源加载完毕后再调用 html2canvas。  
  尤其应该注意图片资源的加载，有多张图片时，img.onload 与 Promise.all 结合使用：

```js
const preloadImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve();
    };
  });
};
const preloadList = ["./pic-1.png", "./pic-2.png", "./pic-3.png"];

await Promise.all(preloadList.map((src) => preloadImg(src)));
// 调用html2canvas
```

- 存在跨域图片时，html2canvas 需要把配置项 useCORS = true  
  img 的 crossorigin 属性，结合合适的 CORS 响应头，就可以实现在画布中使用跨域 img 元素的图像。html2canvas 基于这个[原理](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)，
  在源码中对于 useCORS 配置项置为 true 的处理，实质上是将目标节点中的 img 的 crossOrigin 的属性应用 “anonymous”的值 ，从而允许载入符合 CORS 规范的图片资源。

- 使用支持的 css  
  按照官方文档使用[支持的 css 属性和值](http://html2canvas.hertzen.com/features)，当使用了不支持的属性或值时，html2canvas 无法解析会让属性不生效或使用默认值。这样最后 canvas 绘制出来的效果与原生 DOM 不一样，比如样式不生效或者会发生图片的变形拉伸等。
  举例：

```css
img.example {
  object-fit: contain;
}
/* 由于不支持object-fit属性，图片会按照100%100%拉伸填充显示 */
```

- 尽量使用精准单位
  也就是说，尽量使用 px，少用 rem、%等相对单位。  
  当使用%、rem 等相对单位计算出小数时，由于舍位进位等原因，会使像素发生拉伸，所以看起来会变模糊。

```html
<!-- ... -->
<div class="par">
  <p class="chi"></p>
</div>
<!-- ... -->
```

```css
div.par {
  width: 45px;
}
div.chi {
  width: 10%;
  /* （比如使用%计算出来的像素是4.5，实际到设备上显示是5个像素，这样就会发生原图像素的拉伸。） */
}
```

- 尽量用 img 标签展示图像  
  将 background-image 改成 img 的形式，图片清晰度显著提升。
  > 但是其中原理没有摸透，希望各位大佬有知道的评论留言。
