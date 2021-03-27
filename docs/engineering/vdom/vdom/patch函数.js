/* patch(continaer,vnode) */
// 第一部分逻辑是 vnode -> 真实node（如下）
// 第二部分逻辑是 把真实node 插入父节点（省略）
function createElement(vnode) {
    let tag = vnode.tag
    let attrs = vnode.attrs || {}
    let children = vnode.children || []
    if (!tag) {
        return null
    }
    // 创建元素
    let elem = document.createElement(tag)
    // 设置元素属性
    for (const attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])

        }
    }
    // 递归创建子元素
    children.forEach(child => {
        elem.appendChild(createElement(child))
    })
    return elem

}
/* patch(vnode,newVnode)  */
// 核心是 diff 算法 ，下面只是个简易版本
function updateChildren(vnode, newVnode) {
    let children = vnode.children || []
    let newChildren = newVnode.children || []
    // 递归对比子元素 
    children.forEach((child, index) => {
        let newChild = newChildren[index]
        if (newChildren === null) {
            return
        }
        if (child.tag === newChild.tag) {
            updateChildren(child, newChild)
        } else {
            // 没有子元素比如文本元素 直接替换
            replaceNode(child, newChild)
        }
    })

}