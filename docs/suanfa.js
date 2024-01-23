// 广度 多叉树 每层和

function layerSum(root) {
    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let sum = 0;
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            sum += node.value;
            if (node.children) {
                queue.push(...node.children);
            }
        }

        result.push(sum);
    }

    return result;
}

// 列表环


// fetch 重试 retry
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error;
            }
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
    }
}

// 节流 防抖
function debounce(fn, delay) {
    const ctx = this;
    let timer;
    return function () {
        const args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay);
    };
}
function throttle(fn, delay, wait) {
    const ctx = this;
    let start;
    let timer;
    return function () {
        const args = arguments;
        if (!start) {
            start = getNow();
        }
        const now = getNow();
        if (now - start < wait) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(ctx, args);
            }, delay);
        } else {
            fn.apply(ctx, args);
            start = getNow();
        }
    };
}
function getNow() {
    return new Date().getTime();
}


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

// 金额 逗号
// 1234567890 => 1,234,567,890
//1. 正则
//2. 循环 3 个加一个逗号

// 发布订阅 -- 就用redux吧
function createStore(reducer, preloadedState) {
    let state = preloadedState;
    const listeners = [];
    function getState() {
      return state;
    }
    function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }
    function dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    }
    dispatch({ type: "@@redux/INIT" });
    return { dispatch, subscribe, getState };
  }

//   Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Arguments must be an array'));
      }
      let resolvedCounter = 0;
      let promiseNum = promises.length;
      let resolvedValues = new Array(promiseNum);
      for (let i = 0; i < promiseNum; i++) {
        Promise.resolve(promises[i]).then((value) => {
          resolvedCounter++;
          resolvedValues[i] = value;
          if (resolvedCounter === promiseNum) {
            return resolve(resolvedValues);
          }
        }, (reason) => {
          return reject(reason);
        });
      }
    });
  }

  // 回文
  function longestPalindrome(s) {
    if (s.length < 2) {
        return s;
    }

    let start = 0;
    let maxLength = 1;
    const dp = Array.from(new Array(s.length), () => new Array(s.length).fill(0));

    for (let i = 0; i < s.length; i++) {
        dp[i][i] = true;
    }

    for (let j = 1; j < s.length; j++) {
        for (let i = 0; i < j; i++) {
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            if (dp[i][j] && j - i + 1 > maxLength) {
                maxLength = j - i + 1;
                start = i;
            }
        }
    }

    return s.substring(start, start + maxLength);
}
// 二叉树 每一层放到一个数组 
// 按照 1,2,4,16 对数组进行截取