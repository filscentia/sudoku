import Cell from './cell';

import Group from './group';
import Position from '../position';
import { Qmit } from '@ampretia/qmit';
import { ModelEvent } from './event';

/**
 * Model factory
 */
export default class Model {
    private rowGroups: Group[];
    private columnGroups: Group[];
    private regionGroups: Group[];
    private directAccess;

    private qemit: Qmit<ModelEvent>;

    /** */
    constructor() {
        this.rowGroups = [];
        this.columnGroups = [];
        this.regionGroups = [];
        this.directAccess = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.directAccess[i] = new Array(9);
        }

        this.qemit = new Qmit<ModelEvent>();
    }

    /**
     *
     * @param {Position} position direct access position
     * @return {Cell} at that position
     */
    getCell(position: Position) {
        return this.directAccess[position.x][position.y];
    }

    /**
     *
     * @param {*} callback
     */
    onEvent(callback: any) {
        this.qemit.on('EVENT', callback);
    }

    getEventQueue() {
        return this.qemit;
    }

    addEvent(evt: ModelEvent) {
        this.qemit.emit('EVENT', evt);
    }

    /**
     * Create cell
     */
    setup() {
        for (let y = 0; y < 9; y++) {
            const group = new Group(`R${y}`, this);
            this.rowGroups.push(group);
        }
        for (let x = 0; x < 9; x++) {
            const group = new Group(`C${x}`, this);
            this.columnGroups.push(group);
        }
        for (let r = 0; r < 9; r++) {
            const group = new Group(`S${r}`, this);
            this.regionGroups.push(group);
        }

        for (let x = 0; x < 9; x++) {
            const rg = this.rowGroups[x];
            for (let y = 0; y < 9; y++) {
                const cg = this.columnGroups[y];

                const c = new Cell(Position.new({ x, y }), this);
                this.directAccess[x][y] = c;
                cg.addCell(c);
                rg.addCell(c);

                const i = Math.floor(x / 3) + Math.floor(y / 3) * 3;
                const regionGroup = this.regionGroups[i];
                regionGroup.addCell(c);
            }
        }
    }
}
