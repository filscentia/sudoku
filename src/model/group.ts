'use strict';
import _ from 'lodash';
import { Model } from '.';
import Cell from './cell';
/**
 * A single set containing a number of cells.
 * Group listens to collapse events
 */
export default class Group {
    private name: string;
    private cells: Cell[];
    private model: Model;
    /** */
    constructor(name:string, model:Model) {
        this.cells = [];
        this.name = name;

        this.model = model;
    }

    getCells() {
        return this.cells;
    }

    /**
     *
     * @param {Cell} cell adds this cell to the set
     */
    addCell(cell:Cell) {
        cell.addToGroup(this);
        this.cells.push(cell);
        // add listener to the collapse events

        // cell.onCollapse(this.collapse.bind(this));
    }

    collapse(c:Cell) {
        const cv = c.getCollapseValue();
        // pass on restrict value to other cells
        this.cells.forEach((e) => {
            e.restrict([cv]);
        });
    }
}