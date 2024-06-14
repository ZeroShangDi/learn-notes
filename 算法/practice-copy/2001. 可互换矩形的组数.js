// https://leetcode.cn/problems/number-of-pairs-of-interchangeable-rectangles/

/**
 * @param {number[][]} rectangles
 * @return {number}
 */
 var interchangeableRectangles = function(rectangles) {
    let map = new Map();
    for(let el of rectangles) {
        let tmp = el[0] / el[1]
        if (!map.get(tmp)) {
            // ! 视频解析这里错了
            map.set(tmp, 1)
        } else {
            map.set(tmp, map.get(tmp) + 1)
        }
    }
    let ans = 0;
    for(let ele of map) {
        ans += (ele[1] * (ele[1] - 1)) / 2
    }
    return ans
};