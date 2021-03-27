
// 工厂函数 
let JQuery = function (selector) {
    return new JQuery.fn.init(selector);
}
// 构造函数
let init = JQuery.fn.init = function (selector) {
    let dom = Array.prototype.slice.call(document.querySelectorAll(selector))
    const len = dom.length || 0
    for (let i = 0; i < len; i++) {
        this[i] = dom[i];

    }
    this.length = len
    this.selector = selector
}
// 原型
JQuery.fn = JQuery.prototype = {
    constructor: JQuery,
    css: function (key, value) {
        alert(`${key}=${value},这是一个模拟的css函数`)
    },
    html: function (value) {
        return `${value},这是一个模拟的html函数返回值`
    }
}
// 构造函数的原型赋值为对外暴露的 JQuery.fn
// 之后扩展插件就 JQuery.fn.pluginName = [一个方法]
// 而不是 init.prototype.pluginName = [一个方法]
// 因为 init 构造函数不对外暴露
// 对外保留的时 JQuery 这个工厂函数
init.prototype = JQuery.fn