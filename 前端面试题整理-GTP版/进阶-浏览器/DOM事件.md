# 事件模型、事件流、事件委托

DOM（Document Object Model）事件模型是浏览器中处理用户交互（如点击、键盘输入等）的一种机制。它定义了事件如何在 DOM 树中传播、如何被捕获和处理。主要包括以下几个方面：

1. **事件传播（Event Propagation）**：
   - **捕获阶段（Capturing Phase）**：事件从文档的根节点向目标元素传播。
   - **目标阶段（Target Phase）**：事件在目标元素上被触发。
   - **冒泡阶段（Bubbling Phase）**：事件从目标元素向文档的根节点反向传播。

2. **事件监听（Event Listening）**：
   - **捕获（Capture）**：在捕获阶段拦截事件。
   - **冒泡（Bubble）**：在冒泡阶段拦截事件。

### 事件传播

1. **捕获阶段**：
   - 事件从最顶层的祖先元素（通常是 `document`）开始，一直传播到目标元素的父元素，逐层向下传播。
   
   ```plaintext
   document -> html -> body -> div -> target
   ```

2. **目标阶段**：
   - 事件到达目标元素并被触发。

   ```plaintext
   target
   ```

3. **冒泡阶段**：
   - 事件从目标元素开始，逐层向上传播到最顶层的祖先元素。
   
   ```plaintext
   target -> div -> body -> html -> document
   ```

### 事件监听

事件监听器可以在捕获阶段或冒泡阶段触发。通过 `addEventListener` 方法可以指定事件监听器的阶段。

- **捕获阶段监听**：
  
  ```javascript
  element.addEventListener('click', function(event) {
    console.log('Capturing');
  }, true);
  ```

- **冒泡阶段监听**：
  
  ```javascript
  element.addEventListener('click', function(event) {
    console.log('Bubbling');
  }, false);
  ```

### 示例

以下是一个简单的示例，演示事件在捕获和冒泡阶段的传播过程：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Event Model</title>
</head>
<body>
  <div id="parent">
    <button id="child">Click me</button>
  </div>

  <script>
    const parent = document.getElementById('parent');
    const child = document.getElementById('child');

    // 捕获阶段监听
    parent.addEventListener('click', function(event) {
      console.log('Parent Capture');
    }, true);

    // 冒泡阶段监听
    parent.addEventListener('click', function(event) {
      console.log('Parent Bubble');
    }, false);

    // 捕获阶段监听
    child.addEventListener('click', function(event) {
      console.log('Child Capture');
    }, true);

    // 冒泡阶段监听
    child.addEventListener('click', function(event) {
      console.log('Child Bubble');
    }, false);
  </script>
</body>
</html>
```

当你点击按钮时，控制台输出如下：

```
Parent Capture
Child Capture
Child Bubble
Parent Bubble
```

### 事件模型的应用

1. **事件委托（Event Delegation）**：
   - 使用事件冒泡机制，可以在父元素上监听子元素的事件，从而减少事件监听器的数量，提高性能。

   ```javascript
   document.getElementById('parent').addEventListener('click', function(event) {
     if (event.target && event.target.nodeName === 'BUTTON') {
       console.log('Button clicked');
     }
   });
   ```

2. **阻止事件传播**：
   - 使用 `event.stopPropagation()` 阻止事件在捕获和冒泡阶段的进一步传播。

   ```javascript
   child.addEventListener('click', function(event) {
     event.stopPropagation();
     console.log('Child clicked, propagation stopped');
   }, false);
   ```

3. **默认行为和阻止默认行为**：
   - 使用 `event.preventDefault()` 可以阻止事件的默认行为。

   ```javascript
   document.querySelector('a').addEventListener('click', function(event) {
     event.preventDefault();
     console.log('Link click prevented');
   });
   ```

### 总结

DOM 事件模型通过捕获和冒泡机制，允许事件在 DOM 树中传播。了解事件传播和事件监听的细节，可以帮助开发者更有效地处理用户交互，提高代码的性能和可维护性。