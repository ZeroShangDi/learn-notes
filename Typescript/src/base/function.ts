// @函数

// 函数类型
// 推断类型
// 可选默认
// 剩余参数
// 箭头函数
// this参数?

// 重载: 为同一个函数提供多个函数类型定义来进行函数重载
function load(x: string): string
function load(x: number): number
function load(x: any): any {
  return x
}
