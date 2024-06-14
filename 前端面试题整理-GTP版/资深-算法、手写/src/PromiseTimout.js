// 带超时功能
class TimeoutPromise {
    constructor(executor, timeout) {
        this.promise = new Promise(executor)

        this.timeout = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('超时'))
            }, timeout)
        })

        return Promise.race([this.promise, this.timeout])
    }
}

// new TimeoutPromise((reslove, reject) => {
//     setTimeout(() => {
//         reslove(1)
//     }, 1001)
// }, 1000).then((res)=> {
//     console.log(res)
// }, (err)=> {
//     console.log(err)
// })

// 带取消功能
class CancelPromise{
    constructor(executor) {
        this.cancelStatus = false
        this.handler = null

        const Executor = this.Executor = (reslove, reject) => {
            new Promise(executor).then((res) => {
                if (this.cancelStatus) {
                    this.handler = () => reslove(res)
                    return
                }
                reslove(res)
            }).catch(err => {
                if (this.cancelStatus) {
                    this.handler = () => reject(err)
                    return
                }
                reject(err)
            }) 
        }
        this.promise = new Promise(Executor)
    }

    cancel() {
        this.cancelStatus = true
    }

    recovery(isReload) {
        this.cancelStatus = false
        if (isReload) {
            this.promise = new Promise(this.Executor)
            return
        }
        if (this.handler) this.handler()
    }
}

const cancel = new CancelPromise((reslove, reject) => {
    setTimeout(() => {
        reslove(1)
    }, 1001)
})
cancel.cancel() // 取消
cancel.recovery() // 恢复
cancel.promise.then(res => {
    console.log(res)
})