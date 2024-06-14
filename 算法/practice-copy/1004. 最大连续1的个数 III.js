// https://leetcode.cn/problems/max-consecutive-ones-iii/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var longestOnes = function(nums, k) {
    let i = 0, j = 0; // 双指针 维护窗口的左右端
    let maxLen = 0;   // 窗口最长纪录
    let zero = 0;     // 窗口中0的个数
    
    while (j < nums.length) { // 窗口右端越界了就结束
        if (nums[j] == 0) {   // 新纳入的是0，更新zero
            zero++;        // 待会要检测0有没有爆表
        } 
        while (zero > k) {   // 0爆表了，左端右移，丢弃元素，直到zero重新等于k
            if (nums[i] == 0) { // 如果丢弃是0，更新zero
                zero--;
            }
            i++; // 丢弃左端的元素，收缩窗口，为了重新满足条件
        }

        j++; // 此时窗口是可行解，扩张窗口，优化可行解

        if (j - i > maxLen) { // 如果破了最大纪录，更新它
            maxLen = j - i;
        }
    }

    return maxLen;
};