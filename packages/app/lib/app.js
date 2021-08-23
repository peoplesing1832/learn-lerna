'use strict';

const { add } = require('utils');
const ui = require('ui');

module.exports = app;

function app() {
    add(1, 2, 3)
    ui(1, 2, 3)
}

app()