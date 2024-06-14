
patch 的作用，将传入的vnode转换为真实Dom并添加到参数的容器中。

由于首次patch时，传入的第一个参数为空，因此首次patch走的是挂载过程，而不是更新过程。

```js
// runtime-core/src/renderer.ts
function patch() {
    
}
```