'use strict';

/**
 *
 */
class Region {
    /**
     *
     * @param {*} cell
     * @param {*} offsetPosition
     */
    constructor(cell, offsetPosition) {
        this.cell = cell;
        this.offset = offsetPosition;
        // add listener
    }

    /**
     *
     */
    draw(term) {
        // let candidaates = cell.getCandidiates();
        for (let i = 1; i < 10; i++) {
            let column = Math.floor((i - 1) / 3);
            let row = i - 1 - column * 3;
            term.moveTo(column * 2, row);
            if (this.active) {
                term.bgBlue();
            } else {
                term.bgDefaultColor();
            }
            term.white(i);
        }
    }
}
module.exports = Region;
