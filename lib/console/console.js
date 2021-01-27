// Require the lib, get a working terminal

'use strict';

const TerminalKit = require('terminal-kit');
const _ = require('lodash');
const boxes = require('cli-boxes');
const Grid = require('./grid');

/**
 *
 */
class ConsoleView {
    /**
     *
     * @param {*} terminateFn
     * @param {*} model
     */
    constructor(terminateFn, model) {
        this.terminateFn = terminateFn;
        this.term = TerminalKit.terminal;

        this.model = model;
        this.gridOffset = { x: 5, y: 5 };
    }

    /**
     *
     */
    init() {
        this.term.grabInput();
        this.term.fullscreen(true);
        // Move the cursor at the upper-left corner
        this.term.moveTo(1, 1, 'Sudoku');
        this.term.hideCursor();

        let keyActions = {
            CTRL_C: () =>{
                this.term.hideCursor();
                this.terminate();
            },
            UP: () => {
                this.grid.moveRegion('up');
                this.moveCursorToActive();
            },
            DOWN: () => {
                this.grid.moveRegion('down');
                this.moveCursorToActive();
            },
            LEFT: () => {
                this.grid.moveRegion('left');
                this.moveCursorToActive();
            },
            RIGHT: () => {
                this.grid.moveRegion('right');
                this.moveCursorToActive();
            },
            '1': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([1]);
            },
            '2': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([2]);
            },
            '3': () => {
            // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([3]);
            },
            '4': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([4]);
            },
            '5': () => {
            // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([5]);
            },
            '6': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([6]);
            },
            '7': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([7]);
            },
            '8': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([8]);
            },
            '9': () => {
                // this.term.red(5,1,'ONE');
                this.grid.getActiveRegion().cell.permit([9]);
            }
        };

        this.term.on('key', (name, matches, data) => {
            if (keyActions[name]) {
                keyActions[name]();
            }
        });
        this.grid = new Grid(this);

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                let position = { x, y };
                let region = this.grid.getRegion(position);
                region.draw();
            }
        }
        this.drawLines();
        this.moveCursorToActive();
    }

    /**
     * @return {Model} datamodel
     */
    getModel(){
        return this.model;
    }

    getTerminal() {
        return this.term;
    }

    /**
     *
     */
    terminate() {
        this.term.clear();
        this.term.grabInput(false);
        setTimeout(() => {
            this.terminateFn();
        }, 100);
    }

    /**
     *
     */
    drawLines() {
        this.drawHLine({ x: 10, y: 4 }, { x: 83, y: 4 });
        this.drawHLine({ x: 10, y: 16 }, { x: 83, y: 16 });
        this.drawHLine({ x: 10, y: 28 }, { x: 83, y: 28 });
        this.drawHLine({ x: 10, y: 40 }, { x: 83, y: 40 });

        this.drawVLine({ x: 33, y: 5 }, { x: 33, y: 40 });
        this.drawVLine({ x: 59, y: 5 }, { x: 59, y: 40 });
        this.drawVLine({ x: 33, y: 5 }, { x: 33, y: 40 });
    }

    /**
     *
     * @param {*} start
     * @param {*} end
     */
    drawHLine(start, end) {
        for (let x = start.x; x < end.x; x++) {
            this.term.moveTo(x, start.y, boxes.double.bottom);
        }
    }

    /**
     *
     * @param {*} start
     * @param {*} end
     */
    drawVLine(start, end) {
        for (let y = start.y; y < end.y; y++) {
            this.term.moveTo(start.x, y, boxes.double.right);
        }
    }

    /**
     *
     * @param {*} cellPosition
     */
    getScreenPosition(cellPosition) {
        let x = cellPosition.x;
        let y = cellPosition.y;
        // console.log(this);
        let offset = {
            x: x * 4 + this.gridOffset.x,
            y: y * 4 + this.gridOffset.y
        };
        offset.x = offset.x*2;
        offset.x += Math.floor(x / 3)*2; // extra space horizontal
        return offset;
    }

    /**
     *
     * @param {*} cell
     */
    moveCursorToActive() {
        let screenPosition = this.grid.getActiveRegion().getScreenPosition();
        this.term.moveTo(screenPosition.x, screenPosition.y);
    }
}

module.exports = ConsoleView;
