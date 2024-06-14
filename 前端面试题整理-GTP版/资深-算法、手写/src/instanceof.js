function myInstanceof(obj, constructor) {
    // 检查参数是否合法
    if (typeof constructor !== 'function') {
      throw new TypeError('Right-hand side of instanceof is not callable');
    }
  
    // 检查 obj 是否为对象
    if (obj === null || typeof obj !== 'object') {
      return false;
    }
  
    // 获取构造函数的原型对象
    let proto = Object.getPrototypeOf(obj);
  
    // 循环查找原型链，直到找到构造函数的原型对象或者到达原型链的末端
    while (proto !== null) {
      if (proto === constructor.prototype) {
        return true;
      }
      proto = Object.getPrototypeOf(proto);
    }
  
    return false; // 找不到构造函数的原型对象，返回 false
  }
  
  // 测试示例
  function Person(name) {
    this.name = name;
  }
  
  const person = new Person('Alice');
  console.log(myInstanceof(person, Person)); // true
  console.log(myInstanceof(person, Object)); // true，因为所有对象都是 Object 的实例
  console.log(myInstanceof(person, Array));  // false，因为 person 不是数组实例
  