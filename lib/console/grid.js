'use strict';
const Region = require('./region');

const XSIZE = 9;
const YSIZE = 9;

/**
 * This is the conceptual visual display grid
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
                    this.cnsl.getModel().getCell(position),
                    this.cnsl.getScreenPosition(position),
                    this.cnsl.getTerminal()
                );
            }
        }

        this.activeRegion = { x: 0, y: 0 };
        this.grid[0][0].active=true;
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

    /**
     *
     * @param {*} direction
     */
    moveRegion(direction){
        if (direction==='right' && this.activeRegion.x<8){
            this.getActiveRegion().active=false;
            this.getActiveRegion().draw();
            this.activeRegion.x++;
            this.getActiveRegion().active=true;
            this.getActiveRegion().draw();
        }
        if (direction==='left' && this.activeRegion.x>0){
            this.getActiveRegion().active=false;
            this.getActiveRegion().draw();
            this.activeRegion.x--;
            this.getActiveRegion().active=true;
            this.getActiveRegion().draw();
        }
        if (direction==='up' && this.activeRegion.y>0){
            this.getActiveRegion().active=false;
            this.getActiveRegion().draw();
            this.activeRegion.y--;
            this.getActiveRegion().active=true;
            this.getActiveRegion().draw();
        }
        if (direction==='down' && this.activeRegion.y<8){
            this.getActiveRegion().active=false;
            this.getActiveRegion().draw();
            this.activeRegion.y++;
            this.getActiveRegion().active=true;
            this.getActiveRegion().draw();
        }
    }
}

module.exports = Grid;
