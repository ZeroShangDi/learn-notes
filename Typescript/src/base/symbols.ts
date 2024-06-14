
/**
 * @param {number[]} nums
 * @return {number}
 * @Description 获取数字数组的中位数,偶数个返回靠前数字,空数组时返回0
*/
function getMiddle(nums: number[]): number {
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    const newNums = nums.sort((a, b) => a - b);
    const i = Math.floor(newNums.length / 2);
    if (newNums.length%2 === 0) {
        return newNums[i-1]
    } else {
        return newNums[i]
    }
}


console.log(getMiddle([2, 3, 4, 9]))

