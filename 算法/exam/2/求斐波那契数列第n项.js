/**
 * 斐波那契数列: F(n) = F(n - 1) + F(n - 2), n > 1
 * 
 * 题目: 求斐波那契数列第n项, 取余 1000000007
*/

/**
 * @name 递归
 * @description 时间: O()
 * @description 空间: O()
 * @throws 超时, 假死, 堆栈超出, 重复计算
*/
var fib = function(n) {
    if (n === 0 || n === 1) return n
    return (fib(n - 1) + fib(n - 2)) % 1000000007
}

/**
 * @name 尾递归
 * @description 时间: O()
 * @description 空间: O()
 * @throws 斐波那契递归结构非尾递归结构
*/
var fib = function(n) {
    // let dfs = function(n, n1, n2) {
    //     if (n < 2) return n
    // }
    const dfs = function(n, n1, n2) {
        if (n === 0) return n1;
        if (n === 1) return n2;
        return dfs(n - 1, n2, n1 + n2);
    }
    return dfs(n, 0, 1);
}

/**
 * @name 动态规划（优）
 * @description 时间: O()
 * @description 空间: O()
*/
var fib = function(n) {
    if (n < 2) return n;
    const fibs = [0, 1];
    for(let i=2; i<=n; i++) {
        fibs[i] = fibs[i - 1] + fibs[i - 2];
    }
    return fibs[n];
}

/**
 * @name 迭代or指针or滑动窗口
 * @description 时间: O(n)
 * @description 空间: O(1)
*/
var fib = function(n) {
    if (n === 0 || n === 1) return n
    let a = 0, b = 1, c = 0
    for(let i=1; i<n; i++) {
        c = a + b
        a = b
        b = c
    }
    return c % 1000000007
}

/**
 * @name 数学公式
 * @description 公式: [（1＋√5）/2]^n /√5 － [（1－√5）/2]^n /√5 
 * @description 时间: O(1)
 * @description 空间: O(1)
 * @implements  npm install bignumber.js --save
*/
var fib = function(n) {
    const BigNumber = require('bignumber.js')
    const SQRT_FIVE = new BigNumber(5).sqrt()
    const x = new BigNumber(1).plus(SQRT_FIVE).div(2).pow(n).div(SQRT_FIVE)
    const y = new BigNumber(1).minus(SQRT_FIVE).div(2).pow(n).div(SQRT_FIVE)
    return x.minus(y).mod(1000000007).integerValue().toString()
}

/**
 * @name 优化项总结
 * 关于特判, 这样写更优雅
 * if (n < 2) return n
 * 关于迭代, 存储前两次的值很有意义
*/

// test
console.log(fib(72)) // 8390086