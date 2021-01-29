'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var console_1 = require("./console");
var terminate = function () {
    process.exit();
};
var model = new model_1.Model();
model.setup();
var cnsl = new console_1.Console(terminate, model);
cnsl.init();
