// @装饰器 [类、方法、参数、属性] :生成函数的工厂函数

// 类
// ! 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。
function classDecor(constructor: Function) {}

// 方法、get访问
// ! 如果代码输出目标版本小于ES5，属性描述符将会是undefined
function methodsDecor(value: boolean) {
  return function (
    target: any, // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    propertyKey: string, // 成员的名字
    descriptor: PropertyDescriptor // 成员的属性描述符
  ) {
    descriptor.enumerable = value
  }
}

// 参数
function paramDecor(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {}

// 属性
function attrDecor(target: any, propertyKey: string) {
  return
}

// 类中不同声明上的装饰器将按以下规定的顺序应用：
// 1、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 2、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 3、参数装饰器应用到构造函数。
// 4、类装饰器应用到类。
