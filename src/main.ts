'use strict';

import { Model } from './model';
import { Console } from './console';

const terminate = () => {
    process.exit();
};

const model = new Model();
model.setup();

const cnsl = new Console(terminate, model);
cnsl.init();
