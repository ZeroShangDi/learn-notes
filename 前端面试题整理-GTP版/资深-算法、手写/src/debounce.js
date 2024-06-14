// 1.返回的是函数
// 2.使用apply绑定this并传参


const debounce = (Func, delay) => {
    const timer = null;
    return (...args) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            Func.apply(this, args);
        }, delay);
    }
}