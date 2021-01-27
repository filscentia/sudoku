'use strict';
const _ = require('lodash');
const Emittery = require('emittery');
const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * A single cell within the puzzle, can have values as defined in set VALID
 * Will emit 'COLLAPSED' events when the cardinality of candidate set is 1
 *
 */
class Cell  {

    /**
   * Creates the cell
   * @param {*} position
   */
    constructor(position) {
        this.position = _.cloneDeep(position);
        this.candidates = _.cloneDeep(VALID);
        this.emittery = new Emittery();

    }

    /** */
    onCollapse(callback){
        this.emittery.on('COLLAPSE',callback);
    }

    /**
     *
     */
    onUpdate(callback){
        this.emittery.on('UPDATE',callback);
    }

    /**
     *
     */
    _collapse(){
        this.emittery.emit('COLLAPSE',this);
    }

    /**
     *
     */
    _update(){
        this.emittery.emit('UPDATE',this);
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
        if (this.isCollapsed){
            return this.candidates[0];
        } else {
            throw new Error('Cell not collapsed');
        }
    }

    /** */
    permit(permissions){
        let restrictions = _.cloneDeep(VALID);
        _.pull(restrictions,...permissions);
        this.restrict(restrictions);
    }
    /**
     *
     * @param {int[]} restrictions an array of values that should be removed from the candidate set
     */
    restrict(restrictions){
        if (this.isCollapsed()){
            // if already collapsed, then just issue an update
            this._update();
        }else {
            // remove from the cadidates
            this.candidates = _.difference(this.candidates,restrictions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length===1){
                this._collapse();
            } else {
                this._update();
            }
        }

        // error case where it's <1?
    }
}

module.exports = Cell;
module.exports.VALID = VALID;
