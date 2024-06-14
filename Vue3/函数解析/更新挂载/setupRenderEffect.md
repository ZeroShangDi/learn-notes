对patch产生了调用，在调用之前会获取渲染函数也就是当前组件的vnode，在首次执行渲染时其实已经建立了依赖关系

```js
function setupRenderEffect() {
    // 创建一个响应式的副作用函数
    const effect = new ReactiveEffect(
        componentUpdateFn,
        () => queueJob(instance.update),
        instance.scope,
    )

    // 前面queuJob添加的就是：effect.run.bind(effect)
    const update = effect.run.bind(effect)
}
```