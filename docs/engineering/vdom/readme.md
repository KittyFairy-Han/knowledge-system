<!--
 * @Author: 鱼小柔
 * @Date: 2020-11-15 17:25:34
 * @LastEditors: your name
 * @LastEditTime: 2021-03-29 20:23:04
 * @Description:vdom
-->

# vdom

## 如何理解 vdom

- 本质：用 JS 数据结构模拟真实的 DOM 结构
- 主要作用：DOM 变化的对比放在 JS 层来做，对比的核心算法：diff 算法
- 目的（优点）： DOM 操作时昂贵的，操作 JS 提高重绘性能

## diff 算法

树 diff 的时间复杂度是 O(N3)，遍历过程：

- 遍历 tree1、tree2
- 排序
  1000 个节点，计算需要计算 1 亿次，算法不可用<br/>
  优化后时间复杂度 on，比较的原则做了调整：
- 只比较同一层级
- tag 不同，直接删掉重建，不在深度比较
- tag 和 key 都相同，则认为是相同节点，不再深度比较
