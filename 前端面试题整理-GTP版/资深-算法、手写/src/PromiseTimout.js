// 带超时功能
class TimeoutPromise {
  constructor(executor, timeout) {
    this.promise = new Promise(executor);

    this.timeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("超时"));
      }, timeout);
    });

    return Promise.race([this.promise, this.timeout]);
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
class CancelPromise {
  constructor(executor) {
    this.cancelStatus = false;
    this.handler = null;
    this.Executor = (reslove, reject) => {
      new Promise(executor)
        .then((res) => {
          if (this.cancelStatus) {
            this.handler = () => reslove(res);
          } else {
            reslove(res);
          }
        })
        .catch((err) => {
          if (this.cancelStatus) {
            this.handler = () => reject(err);
          } else {
            reject(err);
          }
        });
    };
    this.promise = new Promise(this.Executor);
  }

  cancel() {
    this.cancelStatus = true;
  }

  reload() {
    this.handler = null;
    this.cancelStatus = false;
    this.promise = new Promise(this.Executor);
  }

  recovery() {
    this.cancelStatus = false;
    if (this.handler) {
      this.handler();
      this.handler = null;
    }
  }
}

// const cancel = new CancelPromise((reslove, reject) => {
//     setTimeout(() => {
//         reslove(1)
//     }, 1001)
// })
// cancel.cancel() // 取消
// cancel.recovery() // 恢复
// cancel.promise.then(res => {
//     console.log(res)
// })

// 按顺序收集异步结果
class ThenPromise {
  constructor() {
    this.results = [];
    this.PromiseTask = Promise.resolve();
  }

  push(taskCallback) {
    this.PromiseTask = this.PromiseTask.then(() => {
      return new Promise((reslove, reject) => {
        taskCallback((res) => {
            this.results.push(res);
            reslove();
        }, reject);
      });
    });
  }
}

let i = 0;
const featch = (page, callback) => {
    const time = Math.random() * 1000;
    setTimeout(() => callback(page, time), time);
}
const thenPromise = new ThenPromise();
for(let j=0; j<10; j++) {
    // 按顺序输出
    thenPromise.push((reslove, reject) => {
        featch(i++, (page, time) => {
            reslove(page);
            console.log('按顺序输出: ', page, time);
        });
    });
    
    // 直接调用，按时间长短输出，无序
    // featch(i++, (page, time) => {
    //     console.log('直接调用: ', page, time);
    // });
}