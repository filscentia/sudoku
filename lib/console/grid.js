'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var region_1 = __importDefault(require("./region"));
var XSIZE = 9;
var YSIZE = 9;
/**
 * This is the conceptual visual display grid
 */
var Grid = /** @class */ (function () {
    /**
     *
     */
    function Grid(cnsl) {
        this.cnsl = cnsl;
        this.grid = new Array(9);
        for (var i = 0; i < 9; i++) {
            this.grid[i] = new Array(9);
        }
        for (var x = 0; x < XSIZE; x++) {
            for (var y = 0; y < YSIZE; y++) {
                var position = { x: x, y: y };
                this.grid[x][y] = new region_1.default(this.cnsl.getModel().getCell(position), this.cnsl.getScreenPosition(position), this.cnsl.getTerminal());
            }
        }
        this.activeRegion = { x: 0, y: 0 };
        this.grid[0][0].active = true;
    }
    /**
     *
     * @param {*} position which cell
     * @return {Cell} at this position
     */
    Grid.prototype.getRegion = function (position) {
        return this.grid[position.x][position.y];
    };
    /**
     * Gets active region
     */
    Grid.prototype.getActiveRegion = function () {
        return this.grid[this.activeRegion.x][this.activeRegion.y];
    };
    /**
     *
     * @param {*} direction
     */
    Grid.prototype.moveRegion = function (direction) {
        if (direction === 'right' && this.activeRegion.x < 8) {
            this.getActiveRegion().active = false;
            this.getActiveRegion().draw();
            this.activeRegion.x++;
            this.getActiveRegion().active = true;
            this.getActiveRegion().draw();
        }
        if (direction === 'left' && this.activeRegion.x > 0) {
            this.getActiveRegion().active = false;
            this.getActiveRegion().draw();
            this.activeRegion.x--;
            this.getActiveRegion().active = true;
            this.getActiveRegion().draw();
        }
        if (direction === 'up' && this.activeRegion.y > 0) {
            this.getActiveRegion().active = false;
            this.getActiveRegion().draw();
            this.activeRegion.y--;
            this.getActiveRegion().active = true;
            this.getActiveRegion().draw();
        }
        if (direction === 'down' && this.activeRegion.y < 8) {
            this.getActiveRegion().active = false;
            this.getActiveRegion().draw();
            this.activeRegion.y++;
            this.getActiveRegion().active = true;
            this.getActiveRegion().draw();
        }
    };
    return Grid;
}());
exports.default = Grid;
