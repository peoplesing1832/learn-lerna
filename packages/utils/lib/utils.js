'use strict';

module.exports = { add };

function add(...args) {
    console.log('使用 utils 库的的 add 方法')
    let sum = 0
    for (let i = 0; i < args.length; i += 1) {
        sum += args[i]
    }
    return sum
}
