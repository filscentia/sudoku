"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Emittery from 'emittery';
var VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var lodash_1 = __importDefault(require("lodash"));
var event_1 = require("./event");
/**
 * A single cell within the puzzle, can have values as defined in set VALID
 * Will emit 'COLLAPSED' events when the cardinality of candidate set is 1
 *
 */
var Cell = /** @class */ (function () {
    /**
     * Creates the cell
     * @param {*} position
     */
    function Cell(position, model) {
        this.position = lodash_1.default.cloneDeep(position);
        this.candidates = lodash_1.default.cloneDeep(VALID);
        this.groups = [];
        this.model = model;
    }
    Cell.prototype.getId = function () {
        return "CELL" + this.position.toString();
    };
    Cell.prototype.addToGroup = function (group) {
        this.groups.push(group);
    };
    Cell.prototype.getGroupIds = function () {
        return this.groups.map(function (g) {
            return g.getId();
        }); // ? just the ids, incase this is altered
    };
    /**
     *
     */
    Cell.prototype._collapse = function () {
        this.model.addEvent(new event_1.CollapseEvent(this));
    };
    /**
     *
     */
    Cell.prototype.onUpdate = function (callback) {
        this.uiCallback = callback;
    };
    /**
     *
     */
    Cell.prototype._update = function () {
        this.uiCallback(this);
    };
    /**
     * Direct access method
     */
    Cell.prototype.getDirectPosition = function () {
        return this.position;
    };
    /**
     * @return {int[]} set of candidates valid
     */
    Cell.prototype.getCandidates = function () {
        return lodash_1.default.clone(this.candidates);
    };
    /**
     * @return {boolean} if collapsed
     */
    Cell.prototype.isCollapsed = function () {
        return this.candidates.length === 1;
    };
    /**
     * @return {int} collopased value
     */
    Cell.prototype.getCollapseValue = function () {
        if (this.isCollapsed()) {
            return this.candidates[0];
        }
        else {
            throw new Error('Cell not collapsed');
        }
    };
    /** Sets the cell directly to the POSSIBLE values
     * if candidates = 3,5,6,7  permits  2, 5,6 =>5,6
     */
    Cell.prototype.permit = function (permissions) {
        if (!this.isCollapsed()) {
            this.candidates = lodash_1.default.intersection(this.candidates, permissions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length === 1) {
                this._collapse();
            }
            this._update();
        }
    };
    /**
     *
     * @param {int[]} restrictions an array of values that should be removed from the candidate set
     */
    Cell.prototype.restrict = function (restrictions) {
        if (!this.isCollapsed()) {
            // remove from the cadidates
            this.candidates = lodash_1.default.difference(this.candidates, restrictions);
            // if cardinality is 1 emit collapse event
            if (this.candidates.length === 1) {
                this._collapse();
            }
            this._update();
        }
        // error case where it's <1?
    };
    Cell.prototype.toString = function () {
        return this.position.toString();
    };
    return Cell;
}());
exports.default = Cell;
