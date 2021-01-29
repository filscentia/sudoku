"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cell_1 = __importDefault(require("./cell"));
var group_1 = __importDefault(require("./group"));
var position_1 = __importDefault(require("../position"));
var qmit_1 = require("@ampretia/qmit");
/**
 * Model factory
 */
var Model = /** @class */ (function () {
    /** */
    function Model() {
        this.rowGroups = [];
        this.columnGroups = [];
        this.regionGroups = [];
        this.directAccess = new Array(9);
        for (var i = 0; i < 9; i++) {
            this.directAccess[i] = new Array(9);
        }
        this.qemit = new qmit_1.Qmit();
    }
    /**
     *
     * @param {Position} position direct access position
     * @return {Cell} at that position
     */
    Model.prototype.getCell = function (position) {
        return this.directAccess[position.x][position.y];
    };
    /**
     *
     * @param {*} callback
     */
    Model.prototype.onEvent = function (callback) {
        this.qemit.on('EVENT', callback);
    };
    Model.prototype.getEventQueue = function () {
        return this.qemit;
    };
    Model.prototype.addEvent = function (evt) {
        this.qemit.emit('EVENT', evt);
    };
    /**
     * Create cell
     */
    Model.prototype.setup = function () {
        for (var y = 0; y < 9; y++) {
            var group = new group_1.default("R" + y, this);
            this.rowGroups.push(group);
        }
        for (var x = 0; x < 9; x++) {
            var group = new group_1.default("C" + x, this);
            this.columnGroups.push(group);
        }
        for (var r = 0; r < 9; r++) {
            var group = new group_1.default("S" + r, this);
            this.regionGroups.push(group);
        }
        for (var x = 0; x < 9; x++) {
            var rg = this.rowGroups[x];
            for (var y = 0; y < 9; y++) {
                var cg = this.columnGroups[y];
                var c = new cell_1.default(position_1.default.new({ x: x, y: y }), this);
                this.directAccess[x][y] = c;
                cg.addCell(c);
                rg.addCell(c);
                var i = Math.floor(x / 3) + Math.floor(y / 3) * 3;
                var regionGroup = this.regionGroups[i];
                regionGroup.addCell(c);
            }
        }
    };
    return Model;
}());
exports.default = Model;
