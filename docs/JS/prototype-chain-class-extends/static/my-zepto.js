
function Z(dom, selector) {
    const len = dom.length || 0
    for (let i = 0; i < len; i++) {
        this[i] = dom[i];

    }
    this.length = len
    this.selector = selector
}

let zepto = {
    init : function (selector) {
        let dom = Array.prototype.slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    },
    Z : function (dom, selector) {
        return new Z(dom, selector)
    }
}



let $ = function (selector) {
    return zepto.init(selector) //其实返回的时 Z 的一个实例
}

$.fn = {
    constructor: Z,
    css: function (key, value) {
        alert(`${key}=${value},这是一个模拟的css函数`)
    },
    html: function (value) {
        return `${value},这是一个模拟的html函数返回值`
    }
}
Z.prototype = $.fn // Z 的原型赋值为 $.fn,这样 Z 的实例上就有了css html 方法
// 暴露给外界的函数

