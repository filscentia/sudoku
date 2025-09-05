// import Emittery from 'emittery';
const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

import _ from 'lodash';
import { Model } from '.';
import Group from './group';
import Position from '../position';
import { CollapseEvent, UpdateEvent } from './event';
import winston from 'winston';
/**
 * A single cell within the puzzle, can have values as defined in set VALID
 * Will emit 'COLLAPSED' events when the cardinality of candidate set is 1
 *
 */
export default class Cell {
    private position: Position;
    private candidates: number[];
    private groups: Group[];
    private model: Model;
    uiCallback: any;
    /**
     * Creates the cell
     * @param {*} position
     */
    constructor(position: Position, model: Model) {
        this.position = _.cloneDeep(position);
        this.candidates = _.cloneDeep(VALID);

        this.groups = [];
        this.model = model;
    }

    public getId(): string {
        return `CELL${this.position.toString()}`;
    }

    public addToGroup(group: Group) {
        this.groups.push(group);
    }

    public getGroupIds(): string[] {
        return this.groups.map((g) => {
            return g.getId();
        }); // ? just the ids, incase this is altered
    }

    /**
     *
     */
    _collapse() {
        this.model.addEvent(new CollapseEvent(this));
    }

    /**
     *
     */
    onUpdate(callback: any) {
        this.uiCallback = callback;
    }

    /**
     *
     */
    _update() {
        this.uiCallback(this);
    }

    /**
     * Direct access method
     */
    getDirectPosition() {
        return this.position;
    }

    /**
     * @return {int[]} set of candidates valid
     */
    getCandidates() {
        return _.clone(this.candidates);
    }

    /**
     * @return {boolean} if collapsed
     */
    isCollapsed() {
        return this.candidates.length === 1;
    }

    /**
     * @return {int} collopased value
     */
    getCollapseValue() {
        if (this.isCollapsed()) {
            return this.candidates[0];
        } else {
            throw new Error('Cell not collapsed');
        }
    }

    /** Sets the cell directly to the POSSIBLE values
     * if candidates = 3,5,6,7  permits  2, 5,6 =>5,6
     */
    permit(permissions: number[]) {
        if (!this.isCollapsed()) {
            this.candidates = _.intersection(this.candidates, permissions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length === 1) {
                this._collapse();
            }
            this._update();
        }
    }
    /**
     *
     * @param {int[]} restrictions an array of values that should be removed from the candidate set
     */
    restrict(restrictions: number[]) {
        if (!this.isCollapsed()) {
            // remove from the cadidates
            this.candidates = _.difference(this.candidates, restrictions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length === 1) {
                this._collapse();
            }
            this._update();
        }

        // error case where it's <1?
    }

    public toString(): string {
        return this.position.toString();
    }
}
