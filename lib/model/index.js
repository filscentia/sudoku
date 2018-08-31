'use strict';

const Cell = require('./cell');
const Group = require('./group');
/**
 * Model factory
 */
class Model {

    /** */
    constructor(){
        this.rowGroups = [];
        this.columnGroups = [];
        this.regionGroups = [];
        this.directAccess = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.directAccess[i] = new Array(9);
        }
    }

    /**
     *
     * @param {Position} position direct access position
     * @return {Cell} at that position
     */
    getCell(position){
        return this.directAccess[position.x][position.y];
    }

    /**
     * Create cell
     */
    setup() {

        for (let y=0;y<9;y++){
            let group = new Group();
            this.rowGroups.push(group);
        }
        for (let x=0;x<9;x++){
            let group = new Group();
            this.columnGroups.push(group);
        }
        for (let r=0;r<9;r++){
            let group = new Group();
            this.regionGroups.push(group);
        }

        for (let x=0;x<9;x++){
            let rg=this.rowGroups[x];
            for (let y=0;y<9;y++){
                let cg=this.columnGroups[y];

                let c = new Cell({x,y});
                this.directAccess[x][y]=c;
                cg.addCell(c);
                rg.addCell(c);

                let i = Math.floor(x/3)+(Math.floor(y/3)*3);
                let regionGroup = this.regionGroups[i];
                regionGroup.addCell(c);
            }
        }
    }
}

module.exports = Model;
