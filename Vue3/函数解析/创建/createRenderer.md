最大的一个函数。createAppAPI 为核心生成逻辑。

```
function createRenderer() {

    return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
    }
}
```