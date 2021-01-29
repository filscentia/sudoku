'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A single set containing a number of cells.
 * Group listens to collapse events
 */
var Group = /** @class */ (function () {
    /** */
    function Group(name, model) {
        this.cells = [];
        this.name = name;
        this.model = model;
    }
    Group.prototype.getCells = function () {
        return this.cells;
    };
    /**
     *
     * @param {Cell} cell adds this cell to the set
     */
    Group.prototype.addCell = function (cell) {
        cell.addToGroup(this);
        this.cells.push(cell);
        // add listener to the collapse events
        // cell.onCollapse(this.collapse.bind(this));
    };
    Group.prototype.collapse = function (c) {
        var cv = c.getCollapseValue();
        // pass on restrict value to other cells
        this.cells.forEach(function (e) {
            e.restrict([cv]);
        });
    };
    return Group;
}());
exports.default = Group;
