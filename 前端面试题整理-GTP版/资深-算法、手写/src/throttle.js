
const throttle = (Func, delay) => {
    let flag = true;
    return (...args) => {
        if (flag) {
            flag = false;
            Func.apply(this, args);
            setTimeout(() => {
                flag = true;
            }, delay);
        }
    }
}