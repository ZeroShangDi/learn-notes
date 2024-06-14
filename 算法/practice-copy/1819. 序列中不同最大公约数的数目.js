// https://leetcode.cn/problems/number-of-different-subsequences-gcds/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var countDifferentSubsequenceGCDs = function(nums) {
    let gcd = (x, y) => !y ? x : gcd(y, x % y)
    let mx = Math.max(...nums)
    let c = new Array(mx + 1).fill(0)
    for(let num of nums) c[num]++;
    let ans = 0
    for(let i=1; i<=mx; i++) {
        let g = 0
        for(let j=1; j*i<=mx; j++) {
            if (!c[j*i]) continue;
            g = gcd(g, j)
            if (g === 1) break
        }
        ans += g === 1
    }
    return ans
};