// https://leetcode.cn/problems/delete-and-earn/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var deleteAndEarn = function(nums) {
    let maxVal = 0
    for(const val of nums) {
        maxVal = Math.max(maxVal, val)
    }
    const sum = new Array(maxVal + 1).fill(0)
    for(const val of nums) {
        sum[val] += val
    }
    return rob(sum)
};

var rob = nums => {
    const size = nums.length
    let first = nums[0], 
        sencond = Math.max(nums[0], nums[1])
    for(let i=2; i<size; i++) {
        let temp = sencond
        sencond = Math.max(first + nums[i], sencond)
        first = temp
    }
    return sencond
}