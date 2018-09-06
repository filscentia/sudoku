'use strict';

/**
 * A specific region on the screen - for example the 3x3 grids in classic Sudoku
 */
class Region {
    /**
     *
     * @param {Cell} cell the model that provides the data for this region
     * @param {Positive} screenPosition top left hand corner of the screen psotiion for this.
     * @param {Terminal} term how to draw to the screen the specific cell
     */
    constructor(cell,screenPosition,term) {
        this.cell = cell;
        this.screenPosition = screenPosition;
        this.term = term;
        // add listener

        this.cell.onUpdate((c)=>{
            this.draw();
        });
    }

    /**
     * @return {position} screen position offset
     */
    getScreenPosition(){
        return this.screenPosition;
    }
    /**
     *
     */
    draw() {
        this.term.saveCursor();

        let candidateSet = this.cell.getCandidates();
        for (let i = 1; i < 10; i++) {
            let row = Math.floor((i - 1) / 3);
            let column = i - 1 - row * 3;
            let sx = ((column*2)+this.screenPosition.x);
            let sy = ((row)+this.screenPosition.y);
            this.term.moveTo(sx,sy);

            let symbol='~';
            if (candidateSet.includes(i)){
                symbol=i;
            }
            if (this.cell.isCollapsed()){
                this.term.red(symbol);
            } else {
                if (this.active) {
                    //this.term.blue('|');
                    this.term.blue(symbol);
                    // ?this.term.blue(i%3===0 ? ' ':'|');
                } else {
                    this.term.white(symbol);
                    // this.term.blue(' ');
                }
            }
            if (this.active) {
                //this.term.blue('|');
                this.term.blue(i%3===0 ? ' ':'|');
            } else {

                this.term.blue(' ');
            }

        }


        this.term.restoreCursor();
    }
}
module.exports = Region;
