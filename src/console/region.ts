'use strict';

/**
 * A specific region on the screen - for example the 3x3 grids in classic Sudoku
 */
export default class Region {
    cell: any;
    screenPosition: any;
    term: any;
    active: any;
    /**
     *
     * @param {Cell} cell the model that provides the data for this region
     * @param {Positive} screenPosition top left hand corner of the screen psotiion for this.
     * @param {Terminal} term how to draw to the screen the specific cell
     */
    constructor(cell: any, screenPosition: any, term: any) {
        this.cell = cell;
        this.screenPosition = screenPosition;
        this.term = term;
        // add listener

        this.cell.onUpdate(() => {
            this.draw();
        });
    }

    /**
     * @return {position} screen position offset
     */
    getScreenPosition() {
        return this.screenPosition;
    }
    /**
     *
     */
    draw() {
        this.term.saveCursor();

        const candidateSet = this.cell.getCandidates();
        for (let i = 1; i < 10; i++) {
            const row = Math.floor((i - 1) / 3);
            const column = i - 1 - row * 3;
            const sx = column * 2 + this.screenPosition.x;
            const sy = row + this.screenPosition.y;
            this.term.moveTo(sx, sy);

            let symbol = '~';
            if (candidateSet.includes(i)) {
                symbol = `${i}`;
            }
            if (this.cell.isCollapsed()) {
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
                this.term.blue(i % 3 === 0 ? ' ' : '|');
            } else {
                this.term.blue(' ');
            }
        }

        this.term.restoreCursor();
    }
}

