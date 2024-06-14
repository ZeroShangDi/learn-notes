/**
 * 
 * 
*/


// 错误版
// const myNew = (Func, ...args) => {
//     const ob = new Object.create({});
//     ob.prototype = Func.prototype;
//     Func.apply(ob, args);
//     return ob;
// }

const myNew = (Func, ...args) => {
    const ob = new Object.create({});
    ob._proto = Func.prototype;
    const res = Func.apply(ob, args);
    return typeof res === 'object' ? res : ob;
}