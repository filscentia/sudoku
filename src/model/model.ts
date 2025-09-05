import Cell from './cell';

import Group from './group';
import Position from '../position';
import { Qmit } from '@ampretia/qmit';
import { ModelEvent } from './event';
import winston from 'winston';

/**
 * Model factory
 */
export default class Model {
    private rowGroups: Group[];
    private columnGroups: Group[];
    private regionGroups: Group[];
    private directAccess;
    uiCallback: any;
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
     */
    onUpdate(callback: any) {
        this.uiCallback = callback;
    }

    /**
     *
     * @param {*} callback
     */
    onEvent(name: string, callback: (eventData: any) => void | Promise<void>) {
        this.qemit.on(name, callback);
    }

    public eventQueue(type: string): ModelEvent[] | undefined {
        return this.qemit.queue(type);
    }

    async addEvent(evt: ModelEvent) {
        await this.qemit.emit(evt.getType(), evt);
        this.uiCallback();
    }

    async releaseEvents(type: string, count = 0) {
        const c = await this.qemit.gate('COLLAPSE', count);
        winston.info(`Release ${c} events`);
        this.uiCallback();
    }

    runUniqueInGroup() {
        this.rowGroups.forEach((rg) => rg.uniqueInGroup());
        this.columnGroups.forEach((cg) => cg.uniqueInGroup());
        this.regionGroups.forEach((rg) => rg.uniqueInGroup());
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
