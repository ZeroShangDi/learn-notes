
先创建vnode，然后通过render进行渲染挂载。
```
// createAppAPI 函数中

const app = {
    mount() {
        if (!isMounted) {
            // 根节点的虚拟Dom
            const vnode = createVNode()

            // 浏览器模式中执行render，这个是 createRenderer中生成的render
            render(vnode, rootContainer, isSVG)
        }
        
    }
}
```