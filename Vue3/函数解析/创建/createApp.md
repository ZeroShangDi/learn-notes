
```js
export const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args)

    const { mount } = app

    app.mount = () => {}

    return app
})
```