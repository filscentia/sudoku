'use strict';
import _ from 'lodash';
import { Model } from '.';
import Cell from './cell';
import { CollapseEvent } from './event';

const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * A single set containing a number of cells.
 * Group listens to collapse events
 */
export default class Group {
    private name: string;
    private cells: Cell[];
    private model: Model;
    /** */
    constructor(name: string, model: Model) {
        this.cells = [];
        this.name = name;

        this.model = model;
    }

    getCells() {
        return this.cells;
    }

    public getId(): string {
        return this.name;
    }

    /**
     *
     * @param {Cell} cell adds this cell to the set
     */
    addCell(cell: Cell) {
        cell.addToGroup(this);
        this.cells.push(cell);

        this.model.onEvent('COLLAPSE', (evt: CollapseEvent) => {
            // A collapse event has occured; filter this to only the cells that
            // are part of this group.
            const groupIds = evt.cell.getGroupIds();
            if (groupIds.includes(this.name)) {
                this.collapse(evt.cell);
            }
        });
        // cell.onCollapse(this.collapse.bind(this));
    }

    collapse(c: Cell) {
        const cv = c.getCollapseValue();
        // pass on restrict value to other cells
        this.cells.forEach((e) => {
            e.restrict([cv]);
        });
    }

    uniqueInGroup() {
        // for each valid number
        VALID.forEach((v) => {
            const s: Cell[] = this.cells.filter((c) => {
                // does this cell have the value v as a possible?
                return c.getCandidates().includes(v);
            });

            // if this is more than 1, it's not unique
            if (s.length === 1) {
                s[0].permit([v]);
            }
        });
    }
}
