# Canvas所有API以及参数解释

HTML5 Canvas 提供了一系列用于绘制图形的API。这些API可以分为以下几类：

1. **基础设置**
2. **绘制形状**
3. **路径操作**
4. **文本操作**
5. **图像操作**
6. **状态和变换**
7. **像素操作**
8. **事件处理**

以下是各类API及其参数的详细解释：

### 基础设置

#### `getContext()`
- **`getContext(contextType)`**: 获取绘图上下文对象。常用的上下文类型是`"2d"`。

### 绘制形状

#### `fillRect()`
- **`fillRect(x, y, width, height)`**: 绘制一个填充的矩形。
  - `x`：矩形左上角的x坐标。
  - `y`：矩形左上角的y坐标。
  - `width`：矩形的宽度。
  - `height`：矩形的高度。

#### `strokeRect()`
- **`strokeRect(x, y, width, height)`**: 绘制一个矩形的边框。
  - `x`：矩形左上角的x坐标。
  - `y`：矩形左上角的y坐标。
  - `width`：矩形的宽度。
  - `height`：矩形的高度。

#### `clearRect()`
- **`clearRect(x, y, width, height)`**: 清除指定矩形区域内的内容，使其变透明。
  - `x`：矩形左上角的x坐标。
  - `y`：矩形左上角的y坐标。
  - `width`：矩形的宽度。
  - `height`：矩形的高度。

### 路径操作

#### `beginPath()`
- **`beginPath()`**: 开始一条新的路径。

#### `closePath()`
- **`closePath()`**: 闭合路径。

#### `moveTo()`
- **`moveTo(x, y)`**: 将绘图游标移动到指定位置。
  - `x`：目标位置的x坐标。
  - `y`：目标位置的y坐标。

#### `lineTo()`
- **`lineTo(x, y)`**: 从当前点绘制一条直线到指定位置。
  - `x`：终点的x坐标。
  - `y`：终点的y坐标。

#### `arc()`
- **`arc(x, y, radius, startAngle, endAngle, anticlockwise)`**: 绘制圆弧路径。
  - `x`：圆心的x坐标。
  - `y`：圆心的y坐标。
  - `radius`：圆的半径。
  - `startAngle`：弧的起始角度（以弧度表示）。
  - `endAngle`：弧的终止角度（以弧度表示）。
  - `anticlockwise`：可选，布尔值，表示是否逆时针绘制。

#### `arcTo()`
- **`arcTo(x1, y1, x2, y2, radius)`**: 创建两切线之间的弧/曲线。
  - `x1`：第一个切点的x坐标。
  - `y1`：第一个切点的y坐标。
  - `x2`：第二个切点的x坐标。
  - `y2`：第二个切点的y坐标。
  - `radius`：弧的半径。

#### `quadraticCurveTo()`
- **`quadraticCurveTo(cpx, cpy, x, y)`**: 绘制二次贝塞尔曲线。
  - `cpx`：控制点的x坐标。
  - `cpy`：控制点的y坐标。
  - `x`：终点的x坐标。
  - `y`：终点的y坐标。

#### `bezierCurveTo()`
- **`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`**: 绘制三次贝塞尔曲线。
  - `cp1x`：第一个控制点的x坐标。
  - `cp1y`：第一个控制点的y坐标。
  - `cp2x`：第二个控制点的x坐标。
  - `cp2y`：第二个控制点的y坐标。
  - `x`：终点的x坐标。
  - `y`：终点的y坐标。

#### `rect()`
- **`rect(x, y, width, height)`**: 创建一个矩形路径。
  - `x`：矩形左上角的x坐标。
  - `y`：矩形左上角的y坐标。
  - `width`：矩形的宽度。
  - `height`：矩形的高度。

#### `fill()`
- **`fill()`**: 填充当前路径。

#### `stroke()`
- **`stroke()`**: 绘制当前路径的边框。

### 文本操作

#### `fillText()`
- **`fillText(text, x, y, maxWidth)`**: 绘制填充文本。
  - `text`：要绘制的文本字符串。
  - `x`：文本起始点的x坐标。
  - `y`：文本基线的y坐标。
  - `maxWidth`：可选，文本的最大宽度。

#### `strokeText()`
- **`strokeText(text, x, y, maxWidth)`**: 绘制文本的边框。
  - `text`：要绘制的文本字符串。
  - `x`：文本起始点的x坐标。
  - `y`：文本基线的y坐标。
  - `maxWidth`：可选，文本的最大宽度。

#### `measureText()`
- **`measureText(text)`**: 测量文本的宽度。
  - `text`：要测量的文本字符串。

### 图像操作

#### `drawImage()`
- **`drawImage(image, dx, dy)`**: 在指定位置绘制图像。
  - `image`：要绘制的图像对象。
  - `dx`：图像左上角的x坐标。
  - `dy`：图像左上角的y坐标。

- **`drawImage(image, dx, dy, dWidth, dHeight)`**: 在指定位置绘制缩放后的图像。
  - `dWidth`：图像的宽度。
  - `dHeight`：图像的高度。

- **`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`**: 绘制图像的一部分并缩放。
  - `sx`：源图像的起始x坐标。
  - `sy`：源图像的起始y坐标。
  - `sWidth`：源图像的宽度。
  - `sHeight`：源图像的高度。

### 状态和变换

#### `save()`
- **`save()`**: 保存当前的绘图状态。

#### `restore()`
- **`restore()`**: 恢复到最近保存的绘图状态。

#### `rotate()`
- **`rotate(angle)`**: 旋转当前绘图。
  - `angle`：旋转角度，以弧度表示。

#### `scale()`
- **`scale(x, y)`**: 缩放当前绘图。
  - `x`：水平方向的缩放因子。
  - `y`：垂直方向的缩放因子。

#### `translate()`
- **`translate(x, y)`**: 平移当前绘图。
  - `x`：水平方向的平移距离。
  - `y`：垂直方向的平移距离。

#### `transform()`
- **`transform(a, b, c, d, e, f)`**: 进行矩阵变换。
  - `a, b, c, d, e, f`：变换矩阵的元素。

#### `setTransform()`
- **`setTransform(a, b, c, d, e, f)`**: 重置变换矩阵，并进行新的矩阵变换。

### 像素操作

#### `createImageData()`
- **`createImageData(width, height)`**: 创建空的ImageData对象。
  - `width`：图像数据的宽度。
  - `height`：图像数据的高度。

- **`createImageData(imagedata)`**: 克隆现有的ImageData对象。

#### `getImageData()`
- **`getImageData(sx, sy, sw, sh)`**: 获取指定区域的ImageData对象。
  - `sx`：起始x坐标。
  - `sy`：起始y坐标。
  - `sw`：区域的宽度。
  - `sh`：区域的高度。

#### `putImage

Data()`
- **`putImageData(imagedata, dx, dy)`**: 将ImageData对象放回画布上。
  - `imagedata`：要绘制的ImageData对象。
  - `dx`：目标x坐标。
  - `dy`：目标y坐标。

- **`putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)`**: 将部分ImageData对象放回画布上。

### 事件处理

虽然Canvas本身不直接提供事件处理API，但可以通过JavaScript在Canvas元素上监听各种事件（如`click`、`mousemove`等），并结合Canvas的绘图功能实现交互效果。

### 总结
Canvas API非常丰富，提供了从基本图形绘制到复杂变换和图像操作的多种功能。掌握这些API和参数，可以灵活地在网页上绘制和操作各种图形。