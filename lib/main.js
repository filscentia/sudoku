'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var console_1 = require("./console");
var winston_1 = __importDefault(require("winston"));
winston_1.default.configure({
    level: 'debug',
    transports: [new winston_1.default.transports.File({ filename: 'log.txt', format: winston_1.default.format.simple() })],
});
winston_1.default.info('Sudoku starting....');
var terminate = function () {
    process.exit();
};
var model = new model_1.Model();
model.setup();
var cnsl = new console_1.Console(terminate, model);
cnsl.init();
