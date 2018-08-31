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
     * @param {*} modelFactory
     */
    constructor(terminateFn, modelFactory) {
        this.terminateFn = terminateFn;
        this.term = TerminalKit.terminal;

        this.modelFactory = modelFactory;
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

        let keyActions = {
            CTRL_C: this.terminate
            // UP: () => {
            //     previous = _.cloneDeep(activeCell);
            //     term.up(1);
            // },
            // DOWN: () => {
            //     let previous = _.cloneDeep(activeCell);
            //     activeCell.y += 1;
            //     console.log(activeCell);
            //     moveCursorToCell(grid.getCell(activeCell));
            //     displayCell(grid.getCell(previous));
            // },
            // LEFT: () => {
            //     term.left(1);
            // },
            // RIGHT: () => {
            //     term.right(1);
            // }
        };

        this.term.on('key', function(name, matches, data) {
            //term.moveTo(1, 2, '\'key\' event:', name);

            if (keyActions[name]) {
                keyActions[name]();
            } else {
            }
        });
        this.grid = new Grid(this);
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                let position = { x, y };
                let region = this.grid.getRegion(position);
                region.draw(this.term);
            }
        }
    }

    /**
     *
     */
    terminate() {
        this.term.grabInput(false);
        setTimeout(function() {
            this.terminateFn();
        }, 100);
    }

    /**
     *
     */
    drawLines() {
        this.drawHLine({ x: 10, y: 4 }, { x: 79, y: 4 });
        this.drawHLine({ x: 10, y: 16 }, { x: 79, y: 4 });
        this.drawHLine({ x: 10, y: 28 }, { x: 79, y: 4 });
        this.drawHLine({ x: 10, y: 40 }, { x: 79, y: 4 });
    }

    /**
     *
     * @param {*} start
     * @param {*} end
     */
    drawHLine(start, end) {
        for (let x = start.x; x < end.x; x++) {
            this.term.moveTo(x, start.y, boxes.double.horizontal);
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
        offset.x += Math.floor(x / 3); // extra space horizontal
        // offset.x = offset.x;
        return offset;
    }

    /**
     *
     * @param {*} cell
     */
    moveCursorToCell(cell) {
        let screenPosition = this.getScreenPosition(cell.getPosition());
        this.term.moveTo(screenPosition.x * 2, screenPosition.y);
    }
}

module.exports = ConsoleView;
