# 在ES6，let 和 const 有什么区别

在 ES6（ECMAScript 2015）中，`let` 和 `const` 是用于声明变量的新关键字，相较于之前的 `var`，它们引入了一些新的特性和行为。下面是 `let` 和 `const` 的详细区别和各自的特性：

### `let` 关键字

1. **块级作用域**：
   - `let` 声明的变量拥有块级作用域（block scope），也就是说它们只在最近的花括号 `{}` 内有效。
   - 这解决了 `var` 关键字只有函数作用域（function scope）的问题。

   ```javascript
   if (true) {
     let x = 10;
     console.log(x); // 输出 10
   }
   console.log(x); // ReferenceError: x is not defined
   ```

2. **不存在变量提升**：
   - 虽然 `let` 声明的变量会被提升到作用域的顶部，但在变量声明之前不能访问它们。这被称为 "暂时性死区"（Temporal Dead Zone, TDZ）。
   
   ```javascript
   console.log(x); // ReferenceError: x is not defined
   let x = 10;
   ```

3. **不允许重复声明**：
   - 在同一作用域内，`let` 不允许重复声明同一个变量。
   
   ```javascript
   let x = 10;
   let x = 20; // SyntaxError: Identifier 'x' has already been declared
   ```

### `const` 关键字

1. **块级作用域**：
   - 与 `let` 类似，`const` 也拥有块级作用域。
   
   ```javascript
   if (true) {
     const y = 20;
     console.log(y); // 输出 20
   }
   console.log(y); // ReferenceError: y is not defined
   ```

2. **不存在变量提升**：
   - `const` 也存在 "暂时性死区"，在声明之前不能访问。
   
   ```javascript
   console.log(y); // ReferenceError: y is not defined
   const y = 20;
   ```

3. **声明时必须初始化**：
   - `const` 声明的变量必须在声明的同时进行初始化。
   
   ```javascript
   const z; // SyntaxError: Missing initializer in const declaration
   ```

4. **不可重新赋值**：
   - `const` 声明的变量是不可变的，即变量的引用不能重新赋值，但如果变量引用的是一个对象或数组，其内容是可以修改的。
   
   ```javascript
   const a = 30;
   a = 40; // TypeError: Assignment to constant variable.
   
   const obj = { key: 'value' };
   obj.key = 'newValue'; // 合法，修改对象属性
   console.log(obj.key); // 输出 'newValue'
   
   const arr = [1, 2, 3];
   arr.push(4); // 合法，修改数组内容
   console.log(arr); // 输出 [1, 2, 3, 4]
   ```

### 关键区别总结

- **作用域**：
  - `let` 和 `const` 都具有块级作用域，相对于 `var` 关键字的函数作用域，这使得它们在代码块内更加安全和可控。
  
- **变量提升**：
  - `let` 和 `const` 都存在 "暂时性死区"，在声明之前不能访问变量，而 `var` 声明的变量会被提升到作用域顶部，并初始化为 `undefined`。

- **重复声明**：
  - `let` 和 `const` 不允许在同一作用域内重复声明同一个变量，而 `var` 可以。

- **初始化和重新赋值**：
  - `let` 允许先声明后赋值，可以多次赋值。
  - `const` 必须在声明时初始化，且不能重新赋值，但可以修改对象或数组的内容。

### 使用建议

- **优先使用 `const`**：如果变量不会被重新赋值，优先使用 `const`。这不仅能确保变量不会意外被修改，还能提高代码的可读性和可维护性。
- **需要重新赋值时使用 `let`**：如果变量的值会变化，使用 `let` 代替 `var`，以确保其作用域在块级而不是函数级，避免作用域污染和潜在错误。

通过理解 `let` 和 `const` 的这些区别和特性，可以编写出更加健壮和可维护的 JavaScript 代码。

# 