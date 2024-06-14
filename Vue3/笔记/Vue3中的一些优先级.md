# setup 与 Options 中数据的优先级

setup的返回值为 setupState

取值顺序, 当不是以 $ 开始的时候
    => setupState
    => data
    => ctx 组件上下文
    => props

# setup 和 Options的create生命周期谁先执行？

setup先执行。

在setup函数执行时，组件函数实例已经实现了，所以在setup中处理created是没有意义的。

在处理完setup函数之后，通过finishComponentSetup函数兼容之前vue2选项的功能。