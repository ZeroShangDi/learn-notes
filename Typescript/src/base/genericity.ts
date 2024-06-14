// @泛型

// 当传入类型为动态时
function aaa(val: any): any {
  return val
}

function bbb<T>(val: T): T {
  return val
}

// ?
// let ccc: <T>(val: T) => T = b

const val = bbb<number>(2)
