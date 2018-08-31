'use strict';
const Region = require('./region');

const XSIZE = 9;
const YSIZE = 9;

/**
 * This is the cocneptual visual display grid
 */
class Grid {
    /**
     *
     */
    constructor(cnsl) {
        this.cnsl = cnsl;
        this.grid = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.grid[i] = new Array(9);
        }

        for (let x = 0; x < XSIZE; x++) {
            for (let y = 0; y < YSIZE; y++) {
                let position = { x, y };
                this.grid[x][y] = new Region(
                    this.cnsl.getScreenPosition(position),
                    {
                        x: 5,
                        y: 5
                    }
                );
            }
        }

        this.activeRegion = { x: 2, y: 1 };
    }

    /**
     *
     * @param {*} position which cell
     * @return {Cell} at this position
     */
    getRegion(position) {
        return this.grid[position.x][position.y];
    }

    /**
     * Gets active region
     */
    getActiveRegion() {
        return this.grid[this.activeRegion.x][this.activeRegion.y];
    }
}

module.exports = Grid;
