// @别名
type Point = {
  x: number,
  y: number,
}

// @接口
interface Value {
  a: string
  b?: string // 可选
  readonly c: string // 只读
  [propName: string]: any // 字符串索引签名
  SearchFunc: {
    (source: string, subString: string): boolean
  } // 函数类型
  GenericFunc: {
    <T>(arg: T): T
  } // <T> 是泛型类型参数，可以是任意类型。(arg: T): T 是方法签名，表示这个方法接受一个类型为 T 的参数并返回相同类型的值。
  StringArray: {
    [index: number]: string
  } // 数组类型
  ClockConstructor: {
    new (hour: number, minute: number)
  } // 实例类型
}

// TODO 类静态部分与实例部分的区别

// 接口继承类: 它会继承类的成员但不包括其实现
