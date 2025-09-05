'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    Group.prototype.getId = function () {
        return this.name;
    };
    /**
     *
     * @param {Cell} cell adds this cell to the set
     */
    Group.prototype.addCell = function (cell) {
        var _this = this;
        cell.addToGroup(this);
        this.cells.push(cell);
        this.model.onEvent('COLLAPSE', function (evt) {
            // A collapse event has occured; filter this to only the cells that
            // are part of this group.
            var groupIds = evt.cell.getGroupIds();
            if (groupIds.includes(_this.name)) {
                _this.collapse(evt.cell);
            }
        });
        // cell.onCollapse(this.collapse.bind(this));
    };
    Group.prototype.collapse = function (c) {
        var cv = c.getCollapseValue();
        // pass on restrict value to other cells
        this.cells.forEach(function (e) {
            e.restrict([cv]);
        });
    };
    Group.prototype.uniqueInGroup = function () {
        var _this = this;
        // for each valid number
        VALID.forEach(function (v) {
            var s = _this.cells.filter(function (c) {
                // does this cell have the value v as a possible?
                return c.getCandidates().includes(v);
            });
            // if this is more than 1, it's not unique
            if (s.length === 1) {
                s[0].permit([v]);
            }
        });
    };
    return Group;
}());
exports.default = Group;
