// @类、继承
class Greeter {
  // 公共 | 默认
  public greeting: string

  // 静态属性
  static origin = { x: 0, y: 0 }

  // 私有 :不能在类的外部被访问
  private id: string

  // 受保护的 :不能在外部访问但可以在派生类中访问
  protected _name: string

  // 只读的
  readonly describe: string

  // 构造函数
  constructor(message: string) {
    this.greeting = message
  }

  // 存取器
  get name(): string {
    return this._name
  }
  set name(newName: string) {
    // check code...
    this._name = newName
  }
}
let greeter = new Greeter('world')

// 继承
// inherit = 子类 = 派生类
// Greeter = 超类 = 基类
class inherit extends Greeter {
  log() {
    console.log('继承 Greeter')
  }
}

// 抽象类
// 一般作为派生类的基类存在, 抽象方法必须在派生类中实现?
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earch...')
  }
}
