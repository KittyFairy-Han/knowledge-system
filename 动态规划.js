


















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







