
// import Emittery from 'emittery';
const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

import _ from 'lodash';
import { Model } from '.';
import Group from './group';
import { Position } from './position';


/**
 * A single cell within the puzzle, can have values as defined in set VALID
 * Will emit 'COLLAPSED' events when the cardinality of candidate set is 1
 *
 */
export default class Cell {

    private position:Position;
    private candidates:number[];
    private groups: Group[];
    private model:Model;
    /**
     * Creates the cell
     * @param {*} position
     */
    constructor(position: Position, model:Model) {
        this.position = _.cloneDeep(position);
        this.candidates = _.cloneDeep(VALID);

        this.groups = [];
        this.model = model;
    }

    addToGroup(group:Group) {
        this.groups.push(group);
    }

    /** */
    onCollapse(callback:any) {
        this.model.getEmittery().on('COLLAPSE', callback);
    }

    /**
     *
     */
    onUpdate(callback:any) {
        this.model.getEmittery().on('UPDATE', callback);
    }

    /**
     *
     */
    _collapse() {
        this.model.getEmittery().emit('COLLAPSE', this);
    }

    /**
     *
     */
    _update() {
        this.model.getEmittery().emit('UPDATE', this);
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

    /** Sets the cell directly to the POSSIBLE values */
    permit(permissions:number[]) {
        const restrictions = _.cloneDeep(VALID);
        _.pull(restrictions, ...permissions);
        this.restrict(restrictions);
    }
    /**
     *
     * @param {int[]} restrictions an array of values that should be removed from the candidate set
     */
    restrict(restrictions:number[]) {
        if (this.isCollapsed()) {
            // if already collapsed, then just issue an update
            this._update();
        } else {
            // remove from the cadidates
            this.candidates = _.difference(this.candidates, restrictions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length === 1) {
                this._collapse();
            } else {
                this._update();
            }
        }

        // error case where it's <1?
    }
}
