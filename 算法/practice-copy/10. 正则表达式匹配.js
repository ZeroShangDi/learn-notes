// https://leetcode.cn/problems/regular-expression-matching/

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function(s, p) {
    // dp[i][j] s中前i个字符是否是可以匹配字符串p中前j个字符
    // p中第j-1 * j-2
    // s当前 == p当前 dp[i-1][j-1]
    // s当前 p前一个 
        // 成功 * 0
        // dp[i][j-1] * 1
        // dp[i][j-2]
    // s当前 不匹配 p前两个 * 重复0次
    // 啥玩意?
    if (s == null || p == null) return false
    const slen = s.length, plen = p.length
    const dp = new Array(slen + 1)
    for(let i=0; i<dp.length; i++) {
        dp[i] = new Array(plen + 1).fill(false)
    }
    dp[0][0] = true
    for(let j=1; j<plen + 1; j++) {
        if (p[j - 1] == '*') {
            dp[0][j] = dp[0][j - 2]
        }
    }
    for(let i=1; i<slen + 1; i++) {
        for(let j=1; j<plen + 1; j++) {
            if (s[i -1] == p[j - 1] || p[j -1] == '.') {
                dp[i][j] = dp[i -1][j -1]
            } else if (p[j -1] == '*') {
                if (s[i - 1] == p[j - 2] || p[j - 2] == '.') {
                    dp[i][j] = dp[i][j-2] || dp[i][j-1] || dp[i-1][j]
                } else {
                    dp[i][j] = dp[i][j-2]
                }
            }
        }
    }
    return dp[slen][plen]
};