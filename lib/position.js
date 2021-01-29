"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(_a) {
        var x = _a.x, y = _a.y;
        this._x = x;
        this._y = y;
    }
    Position.new = function (_a) {
        var x = _a.x, y = _a.y;
        if (x < 0 || y < 0) {
            throw new Error("x=" + x + " y=" + y + "  No.");
        }
        return new Position({ x: x, y: y });
    };
    Object.defineProperty(Position.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    Position.prototype.toString = function () {
        return "{x:" + this._x + ",y:" + this._y + "}";
    };
    return Position;
}());
exports.default = Position;
