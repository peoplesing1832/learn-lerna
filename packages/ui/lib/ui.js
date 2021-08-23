'use strict';

const { add } = require('utils');

module.exports = ui;

function ui(...args) {
    console.log('调用 ui 函数', ...args);
    add(...args)
}
