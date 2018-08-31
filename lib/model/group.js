'use strict';
const _ = require('lodash');

/**
 * A single set containing a number of cells.
 * Group listens to collapse events
 */
class Group {
    /** */
    constructor(){
        this.cells=[];
    }

    /**
     *
     * @param {Cell} cell adds this cell to the set
     */
    addCell(cell){
        cell.onCollapse(this.collapse.bind(this));
        this.cells.push(cell);
        // add listener to the collapse events
    }

    collapse(c){
        let cv = c.getCollapseValue();
        // pass on restrict value to other cells
        this.cells.forEach((e)=>{
            e.restrict([cv]);
        });
    }


}

module.exports = Group;
