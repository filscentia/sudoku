
import Cell from './cell';
import Emittery from 'emittery';
import Group from './group';
import { Position } from './position';

/**
 * Model factory
 */
export default class Model {

    private rowGroups: Group[];
    private columnGroups: Group[];;
    private regionGroups: Group[];;
    private directAccess;
    private eventQueue: Event[];
    private emittery:Emittery;

    /** */
    constructor() {
        this.rowGroups = [];
        this.columnGroups = [];
        this.regionGroups = [];
        this.directAccess = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.directAccess[i] = new Array(9);
        }
        this.eventQueue = [];
        this.emittery = new Emittery();
    }

    getEmittery() {
        return this.emittery;
    }

    /**
     *
     * @param {Position} position direct access position
     * @return {Cell} at that position
     */
    getCell(position:Position) {
        return this.directAccess[position.x][position.y];
    }

    /**
     *
     * @param {*} callback
     */
    onEvent(callback: any) {
        this.emittery.on('EVENT', callback);
    }

    getEventQueue() {
        return this.eventQueue;
    }

    addEvent(evt: Event) {
        this.eventQueue.push(evt);
        this.emittery.emit('EVENT', this);
    }

    /**
     * Create cell
     */
    setup() {
        for (let y = 0; y < 9; y++) {
            const group = new Group(`R${y}`,this);
            this.rowGroups.push(group);
        }
        for (let x = 0; x < 9; x++) {
            const group = new Group(`C${x}`,this);
            this.columnGroups.push(group);
        }
        for (let r = 0; r < 9; r++) {
            const group = new Group(`S${r}`,this);
            this.regionGroups.push(group);
        }

        for (let x = 0; x < 9; x++) {
            const rg = this.rowGroups[x];
            for (let y = 0; y < 9; y++) {
                const cg = this.columnGroups[y];

                const c = new Cell({ x, y }, this);
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
