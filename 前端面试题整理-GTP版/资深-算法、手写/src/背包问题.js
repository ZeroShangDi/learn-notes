function knapsack(weights, values, W) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    // 填充 dp 表格
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    console.log(dp);

    return dp[n][W];
}

// 测试
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const W = 5;
console.log(`Maximum value in Knapsack: ${knapsack(weights, values, W)}`);
