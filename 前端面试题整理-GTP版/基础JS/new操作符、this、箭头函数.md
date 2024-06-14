# new函数都做了那些操作

在 JavaScript 中，使用 `new` 关键字调用构造函数会触发一系列操作，包括以下几个主要步骤：

1. **创建一个新对象：** 在使用 `new` 关键字调用构造函数时，JavaScript 引擎会创建一个新的空对象，作为构造函数的实例。

2. **设置新对象的原型：** 新创建的对象会被设置一个指向构造函数的原型对象（`prototype`）的链接，通过这个链接，新对象可以访问构造函数的原型对象上定义的方法和属性。

3. **将构造函数的作用域赋给新对象：** 在调用构造函数时，构造函数内部的 `this` 关键字会被设置为新对象。这样在构造函数内部就可以通过 `this` 来引用新对象。

4. **执行构造函数内部的代码：** 当 `new` 关键字调用构造函数时，会执行构造函数内部的代码，可以在构造函数内部进行属性初始化、方法定义等操作。

5. **返回新对象：** 如果构造函数内部没有显式返回其他对象，则 `new` 关键字调用构造函数会默认返回新创建的对象，这样就可以通过变量来引用这个新对象。

举个例子，假设有一个构造函数 `Person`：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 使用 new 关键字调用构造函数创建对象
const person1 = new Person('Alice', 30);
```

在这个例子中，使用 `new Person('Alice', 30)` 创建了一个新对象 `person1`，并且构造函数内部的 `this` 被设置为新对象，然后执行构造函数内部的代码，最后返回新对象 `person1`。经过这些步骤，就成功创建了一个 `Person` 类型的实例对象。

需要注意的是，`new` 关键字的使用和调用普通函数有很大的区别。`new` 关键字调用构造函数时，会自动创建一个新的对象并绑定到构造函数的 `this` 上，而普通函数的调用是在当前执行环境中执行，并不会创建新的对象。

# this指向都有哪些，以及改变this指向的方法以及注意事项

在 JavaScript 中，`this` 关键字的指向取决于函数的调用方式和上下文。下面列出了常见的 `this` 指向情况以及改变 `this` 指向的方法和注意事项：

### 1. `this` 的指向情况

- **全局环境：** 在全局环境中，`this` 指向全局对象（在浏览器环境中为 `window` 对象，在 Node.js 环境中为 `global` 对象）。

- **函数内部：** 在函数内部，`this` 的指向取决于函数的调用方式：
  - 在普通函数中，`this` 的指向取决于函数的调用方式。如果是直接调用，则 `this` 指向全局对象（非严格模式）或者 `undefined`（严格模式）；如果是作为对象的方法调用，则 `this` 指向调用该方法的对象。
  - 在箭头函数中，`this` 指向定义时的外层作用域的 `this` 值，而不是调用时的对象。

- **构造函数：** 在构造函数中，`this` 指向新创建的实例对象。

- **DOM 事件处理函数：** 在 DOM 事件处理函数中，`this` 指向触发事件的 DOM 元素。

### 2. 改变 `this` 指向的方法

- **使用 call() 和 apply() 方法：** 这两个方法可以显式指定函数内部的 `this` 指向的对象，区别在于传参方式不同。`call()` 方法接收参数列表，`apply()` 方法接收参数数组。
  ```javascript
  function greet() {
    console.log(`Hello, ${this.name}!`);
  }

  const person = { name: 'Alice' };

  greet.call(person); // 输出 'Hello, Alice!'
  greet.apply(person); // 输出 'Hello, Alice!'
  ```

- **使用 bind() 方法：** `bind()` 方法可以创建一个新的函数，并指定新函数内部的 `this` 指向的对象，但不立即执行。
  ```javascript
  function greet() {
    console.log(`Hello, ${this.name}!`);
  }

  const person = { name: 'Alice' };
  const greetPerson = greet.bind(person);

  greetPerson(); // 输出 'Hello, Alice!'
  ```

- **使用箭头函数：** 箭头函数没有自己的 `this`，它的 `this` 值是定义时的外层作用域的 `this` 值，因此可以用来改变函数内部的 `this` 指向。
  ```javascript
  const person = {
    name: 'Alice',
    greet: function () {
      const innerFunction = () => {
        console.log(`Hello, ${this.name}!`);
      };
      innerFunction();
    },
  };

  person.greet(); // 输出 'Hello, Alice!'
  ```

### 3. 注意事项

- **严格模式：** 在严格模式下，如果没有显式指定 `this` 指向的对象，则 `this` 的值为 `undefined`，而不是全局对象。

- **绑定的永久性：** 使用 `bind()` 方法绑定的 `this` 指向是永久性的，无法改变；而使用 `call()`、`apply()` 或者箭头函数可以动态改变 `this` 指向。

- **绑定原始函数：** 使用 `bind()` 方法会创建一个新的函数，因此在频繁调用的场景中，可能会产生性能上的影响。

- **避免滥用箭头函数：** 箭头函数适用于需要保持定义时上下文的情况，但不适合作为对象的方法，因为它会捕获外层作用域的 `this`，而不是调用时的对象。

总的来说，理解和熟练运用 `this` 的指向以及改变 `this` 指向的方法可以帮助开发者写出更加灵活和可维护的 JavaScript 代码。