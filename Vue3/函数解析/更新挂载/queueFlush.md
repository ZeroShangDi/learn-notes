
启动批量任务的执行

```js
function queueFlush() {
  // 一个执行状态的判断
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    // Promise实例执行then方法
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
```