// const throttle = (fun, delay) => {
//     return function (...args) {
//         setTimeout(() => {
//             fun()
//         }, delay)
//     }
// }
let timer = null
const throttle = (callBack, timeOut) => {
    return function () {
        if (timer !== null) clearTimeout(timer)
        timer = setTimeout(() => {
            callBack()
            timer = null
        }, timeOut)
    }
}
export default throttle
