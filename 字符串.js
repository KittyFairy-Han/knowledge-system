// 随机字符串
const randomString = (function () {
    const generatedStrings = new Set();
    function randomString(length) {
        const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += str.charAt(Math.floor(Math.random() * str.length));
        }
        if (generatedStrings.has(result)) {
            return randomString(length);
        }
        return result;
    }
    return randomString
})()

// 模版引擎
function template(tpl, data) {
    template.replace(/{{(.*?)}}/g, (match, key) => {
        // match 是 {{key}}， key 是 (.*?)
        return data[key.trim()];
    })
}

// 金额 逗号
// 1234567890 => 1,234,567,890
//1. 正则
//2. 循环 3 个加一个逗号

//版本号
let versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];
// 其实直接sort就可以
versions.sort((a, b) => {
    let aParts = a.split('.').map(Number);
    let bParts = b.split('.').map(Number);
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        let aPart = aParts[i] || 0;
        let bPart = bParts[i] || 0;
        if (aPart !== bPart) {
            return aPart - bPart;
        }
    }
    return 0;
});

//叠词
function countRepeatedWords(str) {
    let count = 0;
    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] === str[i + 1]) {
            count++;
            while (str[i] === str[i + 1]) {
                i++;
            }
        }
    }
    return count;
}