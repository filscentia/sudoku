import { Model } from '../model';
import Position from '../position';

import TerminalKit from 'terminal-kit';
import _ from 'lodash';
import boxes from 'cli-boxes';
import Grid from './grid';
import List from './list';
import fs from 'fs';
/**
 *
 */
export default class ConsoleView {
    private terminateFn: any;
    private term: TerminalKit.Terminal;
    private model: Model;
    private gridOffset: Position;
    private grid: Grid;
    private list: List;
    log: any;

    /**
     *
     * @param {*} terminateFn
     * @param {*} model
     */
    constructor(terminateFn: any, model: Model) {
        this.terminateFn = terminateFn;
        this.term = TerminalKit.terminal;

        this.model = model;
        this.gridOffset = Position.new({ x: 5, y: 5 });
        this.grid = new Grid(this);
        this.list = new List(this.term, model);

        this.log = fs.openSync('log.txt', 'a');
    }

    _log(x: any) {
        fs.writeFileSync(this.log, `${x.toString()}\n`);
    }

    /**
     *
     */
    init() {
        this.term.grabInput(true);
        this.term.fullscreen(true);
        // Move the cursor at the upper-left corner
        this.term.moveTo(1, 1, 'Sudoku');
        this.term.hideCursor();

        interface KeyBinding {
            [key: string]: any;
        }
        this._log(`\n\nSudoko`);
        const keyActions: KeyBinding = {
            CTRL_C: () => {
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
                this.grid.getActiveRegion().cell.permit([1]);
            },
            '2': () => {
                this.grid.getActiveRegion().cell.permit([2]);
            },
            '3': () => {
                this.grid.getActiveRegion().cell.permit([3]);
            },
            '4': () => {
                this.grid.getActiveRegion().cell.permit([4]);
            },
            '5': () => {
                this.grid.getActiveRegion().cell.permit([5]);
            },
            '6': () => {
                this.grid.getActiveRegion().cell.permit([6]);
            },
            '7': () => {
                this.grid.getActiveRegion().cell.permit([7]);
            },
            '8': () => {
                this.grid.getActiveRegion().cell.permit([8]);
            },
            '9': () => {
                this.grid.getActiveRegion().cell.permit([9]);
            },
        };

        this.term.on('key', (name: any) => {
            if (keyActions[name]) {
                keyActions[name]();
            }
        });
        this.grid = new Grid(this);

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                const position = Position.new({ x, y });
                const region = this.grid.getRegion(position);
                region.draw();
            }
        }
        this.drawLines();
        this.list = new List(this.getTerminal(), this.model);
        this.list.draw();
        this.moveCursorToActive();
    }

    /**
     * @return {Model} datamodel
     */
    getModel() {
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
        this._log('Drawing lines');
        this.drawHLine(Position.new({ x: 10, y: 4 }), Position.new({ x: 83, y: 4 }));
        this.drawHLine(Position.new({ x: 10, y: 16 }), Position.new({ x: 83, y: 16 }));
        this.drawHLine(Position.new({ x: 10, y: 28 }), Position.new({ x: 83, y: 28 }));
        this.drawHLine(Position.new({ x: 10, y: 40 }), Position.new({ x: 83, y: 40 }));

        this.drawVLine(Position.new({ x: 33, y: 5 }), Position.new({ x: 33, y: 40 }));
        this.drawVLine(Position.new({ x: 59, y: 5 }), Position.new({ x: 59, y: 40 }));
        this.drawVLine(Position.new({ x: 33, y: 5 }), Position.new({ x: 33, y: 40 }));
    }

    /**
     *
     * @param {*} start
     * @param {*} end
     */
    drawHLine(start: Position, end: Position) {
        for (let x = start.x; x < end.x; x++) {
            this.term.moveTo(x, start.y, boxes.double.bottom);
        }
    }

    /**
     *
     * @param {*} start
     * @param {*} end
     */
    drawVLine(start: Position, end: Position) {
        for (let y = start.y; y < end.y; y++) {
            this.term.moveTo(start.x, y, boxes.double.right);
        }
    }

    /**
     *
     * @param {*} cellPosition
     */
    getScreenPosition(cellPosition: Position) {
        const x = cellPosition.x;
        const y = cellPosition.y;
        // console.log(this);
        const offset = {
            x: x * 4 + this.gridOffset.x,
            y: y * 4 + this.gridOffset.y,
        };
        offset.x = offset.x * 2;
        offset.x += Math.floor(x / 3) * 2; // extra space horizontal
        return offset;
    }

    /**
     *
     * @param {*} cell
     */
    moveCursorToActive() {
        const screenPosition = this.grid.getActiveRegion().getScreenPosition();
        this.term.moveTo(screenPosition.x, screenPosition.y);
    }
}
