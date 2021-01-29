'use strict';

import Cell from './cell';

export class ModelEvent {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    toString() {
        return this.type;
    }
}

export class CollapseEvent extends ModelEvent {
    cell: Cell;

    public constructor(cell: Cell) {
        super('COLLAPSE');
        this.cell = cell;
    }

    toString() {
        return super.toString() + ' ' + this.cell.toString();
    }
}

export class UpdateEvent extends ModelEvent {
    cell: Cell;

    public constructor(cell: Cell) {
        super('UPDATE');
        this.cell = cell;
    }

    toString() {
        return super.toString() + ' ' + this.cell.toString();
    }
}
