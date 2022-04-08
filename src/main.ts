'use strict';

import { Model } from './model';
import { Console } from './console';
import winston from 'winston';

winston.configure({
    level: 'debug',
    transports: [new winston.transports.File({ filename: 'log.txt', format: winston.format.simple() })],
});

winston.info('Sudoku starting....');
const terminate = () => {
    process.exit();
};

const model = new Model();
model.setup();

const cnsl = new Console(terminate, model);
cnsl.init();
