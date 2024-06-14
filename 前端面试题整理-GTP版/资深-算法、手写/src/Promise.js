function demoPromise() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve(true);
    } else {
      reject();
    }
  });
}
demoPromise().then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

/**
 * ※ 不熟练
*/
function myPromise(executor) {
  let status = "pending"; // pending fulfilled rejected
  let value = null;
  let error = null;
  let onRejectedCb = null;
  let onFulfilledCb = null;

  const resolve = function (val) {
    if (status === "pending") {
      status = "fulfilled";
      value = val;
      if (onFulfilledCb) {
        setTimeOut(() => {
          onFulfilledCb(value);
        }, 0);
      }
    }
  };

  const reject = function (err) {
    if (status === "pending") {
      status = "rejected";
      error = err;
      if (onRejectedCb) {
        setTimeOut(() => {
          onRejectedCb(error);
        }, 0);
      }
    }
  };

  this.then = function (onFulfilled, onRejected) {
    return new myPromise((resolve, reject) => {
      const handler = function (callback, value) {
        try {
          const result = callback(value);
          if (result instanceof myPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };
      if (status === "fulfilled") {
        handler(onFulfilled, value);
      } else if (status === "rejected") {
        handler(onRejected, error);
      } else {
      }
    });
  };

  executor(resolve, reject);
}
