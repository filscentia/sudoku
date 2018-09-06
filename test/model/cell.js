
'use strict';

const chai = require('chai');
const should = chai.should();
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
let sandbox;

const Cell = require('../../lib/model/cell.js');

describe('Cell',()=>{

    beforeEach('sandbox creation',()=>{
        sandbox = sinon.createSandbox();
    });

    afterEach('sandbox restore',()=>{
        sandbox.restore();
    });

    it('should create default',()=>{
        let position = {x:5,y:5};
        let c = new Cell(position);
        c.getCandidates().should.deep.equal(Cell.VALID);
    });

});
