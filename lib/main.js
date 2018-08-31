'use strict';

const ModelFactory = require('./model');
const Console = require('./console/console.js');

const terminate = () => {
    process.exit();
};

let cnsl = new Console(terminate, ModelFactory);
cnsl.init();
