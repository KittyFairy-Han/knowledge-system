# tailwind

## 常见考点

### 比写 css 文件的形式好在哪里

- 书写提效，因为预设了很多原子类名
- 体积优化，以功能点出发预设的原子类名比以区块出发设置类名，复用频率更高
  > 预设的类名很多，只有用到的才参与打包
- 响应式设计，简易了媒体查询

### 原子类名，单一职责，如何结合
- tailwind.config.js 中启用 apply
```js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      // 表示 apply 指令可以与 responsive（响应式）、hover（悬停）和 focus（聚焦）这三种变体一起使用。
      // 如果不需要一起使用，不配置也行，只需要下面那个步骤
      apply: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}
```
- 自定义 css 文件中使用 @apply
md:text-lg 是响应式的实用程序类，  
hover:bg-blue-500 是悬停状态的实用程序类，  
focus:ring-2 是聚焦状态的实用程序类。这些实用程序类都被应用到了   
your-custom-class 这个自定义 CSS 类中。
```css
.your-custom-class {
  @apply md:text-sm md:font-normal lg:text-lg lg:font-bold hover:bg-blue-500 focus:ring-2;
}
```
- 然后，你可以在你的 HTML 中使用这个自定义的类名，如 <div class="your-custom-class">。



### 响应式怎么做
- 布局需要改变用媒体查询
- 布局不改变等比缩放用 vw（rem 以前用的多，% 是最烂的）
- 再结合 flex grid 布局：比如一个一屏的页面，设计稿是一个固定的长度，设计稿高度960px，有个元素垂直居中，如果按照设计稿尺寸去写，用vw，换了一个短屏的手机，元素就靠下了，所以非长页面的情况除了以上两种，还得结合 flex grid 布局。

