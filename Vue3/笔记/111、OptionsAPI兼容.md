// runtime-core/src/componentOptions.ts

## 处理顺序

```js
// 函数名: applyOptions

beforeCreate
injectOptions
methods
dataOptions
computedOptions
watchOptions
provideOptions
created
registerLifecycleHook // 其他生命周期钩子处理
render
inheritAttrs
components
directives
filters
```

## 概览

```js

// 获取合并后的选项、实例、上下文
const options = resolveMergedOptions(instance)
const publicThis = instance.proxy! as any
const ctx = instance.ctx

// 调用 beforeCreate 钩子
if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, LifecycleHooks.BEFORE_CREATE)
}

// 解构
const {
    data: dataOptions,
} = options

// 检查重复性...

// injectOptions
resolveInjections(injectOptions, ctx, checkDuplicateProperties)

// methods
ctx[key] = methodHandler.bind(publicThis)

// data 处理
if (dataOptions) {
    // ...判断data类型以及返回值类型
    // 是否函数、是否Promise、执行结果是否对象
    const data = dataOptions.call(publicThis, publicThis)
    instance.data = reactive(data)
}

// computed 处理
if (computedOptions) {
    for(const key of computedOptions) {
        // ...get/set
        const c = computed({ get, set })
        Object.defineProperty(ctx, key, {})
    }
}

// watch 处理
if (watchOptions) {
    for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key)
    }
}

// provideOptions 处理
if (provideOptions) {
    const provides = isFunction(provideOptions)
      ? provideOptions.call(publicThis)
      : provideOptions
    Reflect.ownKeys(provides).forEach(key => {
      provide(key, provides[key])
    })
}

// 生命周期处理...

// expose暴露属性处理

// 其他...
```

## 