// https://leetcode.cn/problems/flip-string-to-monotone-increasing/

/**
 * @param {string} s
 * @return {number}
 */
 var minFlipsMonoIncr = function(s) {
    // 动态规划
    // dp[i][0] 前i个元素单调递增 且第i个值为0的最小次数
    let dp = Array.from({length: s.length + 1}).map(item => [0, 0])
    dp[0][0] = s.charAt(0) == '0' ? 0 : 1
    dp[0][1] = s.charAt(0) == '1' ? 0 : 1
    for(let i=1; i<s.length; i++) {
        dp[i][0] = dp[i-1][0] + (s.charAt(i) == '0' ? 0 : 1)
        dp[i][1] = Math.min(dp[i-1][0], dp[i-1][1]) + (s.charAt(i) == '1' ? 0 : 1)
    }
    return Math.min(dp[s.length-1][0], dp[s.length-1][1])
};