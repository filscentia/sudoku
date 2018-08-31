'use strict';
const _ = require('lodash');

const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Cell {
    constructor(position) {
        this.position = _.cloneDeep(position);
        this.candidiates = _.cloneDeep(VALID);
    }

    getDirectPosition() {
        return this.position;
    }

    getCandidiates() {
        return _.clone(this.candidates);
    }

    setValue(value) {
        this.candidates = [value];
    }

    isCollapse() {
        return this.candidates.length === 1;
    }
}

module.exports = Cell;
module.exports.VALID = VALID;
