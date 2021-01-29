"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A specific region on the screen - for example the 3x3 grids in classic Sudoku
 */
var Region = /** @class */ (function () {
    /**
     *
     * @param {Cell} cell the model that provides the data for this region
     * @param {Positive} screenPosition top left hand corner of the screen psotiion for this.
     * @param {Terminal} term how to draw to the screen the specific cell
     */
    function Region(cell, screenPosition, term) {
        var _this = this;
        this.cell = cell;
        this.screenPosition = screenPosition;
        this.term = term;
        // add listener
        this.cell.onUpdate(function () {
            _this.draw();
        });
    }
    /**
     * @return {position} screen position offset
     */
    Region.prototype.getScreenPosition = function () {
        return this.screenPosition;
    };
    /**
     *
     */
    Region.prototype.draw = function () {
        this.term.saveCursor();
        var candidateSet = this.cell.getCandidates();
        for (var i = 1; i < 10; i++) {
            var row = Math.floor((i - 1) / 3);
            var column = i - 1 - row * 3;
            var sx = column * 2 + this.screenPosition.x;
            var sy = row + this.screenPosition.y;
            this.term.moveTo(sx, sy);
            var symbol = '~';
            if (candidateSet.includes(i)) {
                symbol = "" + i;
            }
            if (this.cell.isCollapsed()) {
                this.term.red(symbol);
            }
            else {
                if (this.active) {
                    //this.term.blue('|');
                    this.term.blue(symbol);
                    // ?this.term.blue(i%3===0 ? ' ':'|');
                }
                else {
                    this.term.white(symbol);
                    // this.term.blue(' ');
                }
            }
            if (this.active) {
                //this.term.blue('|');
                this.term.blue(i % 3 === 0 ? ' ' : '|');
            }
            else {
                this.term.blue(' ');
            }
        }
        this.term.restoreCursor();
    };
    return Region;
}());
exports.default = Region;
