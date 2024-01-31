// 二叉树 每一层放到一个数组 
// 按照 1,2,4,16 对数组进行截取

// 数组转 二叉树
function listToTree (arr) {
    let root = {val: arr[0], left: null, right: null};
    let queue = [root];
    let i = 1;
    while(i < arr.length){
        let node = queue.shift();
        if (node === null) continue;
        node.left = arr[i] !== undefined ? {val: arr[i], left: null, right: null} : null;
        node.right = arr[i+1] !== undefined ? {val: arr[i+1], left: null, right: null} : null;
        queue.push(node.left, node.right);
        i += 2;
    }
    return root;
}


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

//蛇形遍历
function zigzagLevelOrder(root) {
    if (!root) return [];
    let results = [];
    let direction = true;
    let currentLevel = [root];
    while (currentLevel.length) {
        let levelResult = [];
        let nextLevel = [];
        while (currentLevel.length) {
            let node = currentLevel.pop();
            levelResult.push(node.val);
            if (direction) {
                if (node.left) nextLevel.push(node.left);
                if (node.right) nextLevel.push(node.right);
            } else {
                if (node.right) nextLevel.push(node.right);
                if (node.left) nextLevel.push(node.left);
            }
        }
        direction = !direction;
        currentLevel = nextLevel;
        results.push(levelResult);
    }
    return results;
}

//二维迷宫
function hasPath(maze, start, destination) {
    let rows = maze.length;
    let cols = maze[0].length;
    let queue = [start];
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let visited = new Set();

    while (queue.length > 0) {
        let [x, y] = queue.shift();
        if (x === destination[0] && y === destination[1]) {
            return true;
        }
        for (let [dx, dy] of directions) {
            let nx = x, ny = y;
            while (nx+dx >= 0 && nx+dx < rows && ny+dy >= 0 && ny+dy < cols && maze[nx+dx][ny+dy] === 0) {
                nx += dx;
                ny += dy;
            }
            if (!visited.has(nx + '-' + ny)) {
                queue.push([nx, ny]);
                visited.add(nx + '-' + ny);
            }
        }
    }
    return false;
}

// 括号闭合
function isBracketsBalanced(str) {
    let stack = [];
    let map = {
        '(': ')',
        '[': ']',
        '{': '}',
        '【': '】'
    };

    for (let i = 0; i < str.length; i++) {
        if (map[str[i]]) {
            stack.push(str[i]);
        } else {
            let topElement = stack.pop();
            if (str[i] !== map[topElement]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(isBracketsBalanced("{}[]")); // true
console.log(isBracketsBalanced("([])")); // true
console.log(isBracketsBalanced("{}[]（【】）")); // true
console.log(isBracketsBalanced("{[}]")); // false