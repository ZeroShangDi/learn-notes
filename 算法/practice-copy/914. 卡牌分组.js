// https://leetcode.cn/problems/x-of-a-kind-in-a-deck-of-cards/

/**
 * @param {number[]} deck
 * @return {boolean}
 */
 var hasGroupsSizeX = function(deck) {
    // 1、统计数量
    // 2、辗转相除 -> 分析合适的x
    function gcd(num1, num2) {
        return num2 === 0 ? num1 : gcd(num2, num1 % num2)
    }
    let timeMap = new Map()
    deck.forEach(num => {
        timeMap.set(num, timeMap.has(num) ? timeMap.get(num) + 1 : 1)
    })
    let timeArr = [...timeMap.values()]
    let g = timeArr[0]
    timeArr.forEach(time => {
        g = gcd(g, time)
    })
    return g >= 2
};