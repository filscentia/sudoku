'use strict';

const Model = require('./model');
const Console = require('./console/console.js');

const terminate = () => {
    process.exit();
};
let model = new Model();
model.setup();

let cnsl = new Console(terminate,model);
cnsl.init();
