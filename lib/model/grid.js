'use strict';
const Cell = require('./cell');

const XSIZE = 9;
const YSIZE = 9;

/**
 *
 */
class Grid {
    /**
     *
     */
    constructor() {
        this.grid = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.grid[i] = new Array(9);
        }

        for (let x = 0; x < XSIZE; x++) {
            for (let y = 0; y < YSIZE; y++) {
                let position = { x, y };
                this.grid[x][y] = new Cell(position);
            }
        }
    }

    /**
     *
     * @param {*} position which cell
     * @return {Cell} at this position
     */
    getCell(position) {
        return this.grid[position.x][position.y];
    }
}

module.exports = Grid;
