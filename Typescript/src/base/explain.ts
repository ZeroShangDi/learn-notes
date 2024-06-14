// @类型解释、类型检测、断言
// * 字符串、数值、布尔、对象、数组、undefined、null
// * 元组 Tuple、枚举 enum、any、void、Never
// * 交叉类型、联合类型、映射类型、字面量
// * 断言

// 基础类型
const a: string = ''

const b: number = 1.1 || 0xf00d || null || undefined // 支持二进制和八进制和十六进制字面量

const c: Boolean = true || null || undefined

const d: number[] = [2, 3] || null || undefined

const e: object = { type: 1 } || null || undefined

const f: undefined = undefined || null

const g: null = null || undefined

// 元组: 元组类型允许表示一个已知元素数量和类型的数组
const aa: [number, number, string] = [1, 2, '3']

// 枚举: enum类型是对JavaScript标准数据类型的一个补充, 使用枚举类型可以为一组数值赋予友好的名字。
enum BB {
  Red,
  Green,
  Blue = 66,
}
const bb: BB = BB.Blue
console.log(bb) // 66
const bbName: string = BB[3]
console.log(bbName) // 'Blue'

// Any: 表示任意类型
const cc: any[] = [1, '2', false]

// Void: 表示空类型
const dd: void = null || undefined
function ddFun(): void {}

// Never: never类型表示的是那些永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
// 即使 any也不可以赋值给never。
function error(msg: string): never {
  throw new Error(msg)
}

// 交叉类型: 将多个类型合并为一个类型
interface U {
  a: number
  b: string
}
interface T {
  a: number
  c: string
}
const ee: U & T = {
  a: 2,
  b: '',
  c: '',
}

// 联合类型: 允许一个变量可以是几种类型之一
function ff(val: number | string): void {
  if ((<string>val).length) {
    console.log(<string>val)
  }
}
console.log(ff(2))

// 映射类型: 也叫泛型，提供了一种方式，使得类型可以作为参数传递，适用于函数、接口
interface Person {
  name: string
  age: number
}
type myReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
type ReadonlyPerson = myReadonly<Person>

// 预定义的有条件类型
// ! Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
// ! Extract<T, U> -- 提取T中可以赋值给U的类型。
// ! NonNullable<T> -- 从T中剔除null和undefined。
// ! ReturnType<T> -- 获取函数返回值类型。
// ! InstanceType<T> -- 获取构造函数类型的实例类型。

// ? 用户自定义的类型保护
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

// 字面量类型
const num: 1 | 2 | 3 | 4 | 5 | 6 = 2

// 断言
const some: any = 'it is string'
const leng: number = (<string>some).length
const lent: number = (some as string).length
