'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEvent = exports.CollapseEvent = exports.ModelEvent = void 0;
var ModelEvent = /** @class */ (function () {
    function ModelEvent(type) {
        this.type = type;
    }
    ModelEvent.prototype.toString = function () {
        return this.type;
    };
    return ModelEvent;
}());
exports.ModelEvent = ModelEvent;
var CollapseEvent = /** @class */ (function (_super) {
    __extends(CollapseEvent, _super);
    function CollapseEvent(cell) {
        var _this = _super.call(this, 'COLLAPSE') || this;
        _this.cell = cell;
        return _this;
    }
    CollapseEvent.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' ' + this.cell.toString();
    };
    return CollapseEvent;
}(ModelEvent));
exports.CollapseEvent = CollapseEvent;
var UpdateEvent = /** @class */ (function (_super) {
    __extends(UpdateEvent, _super);
    function UpdateEvent(cell) {
        var _this = _super.call(this, 'UPDATE') || this;
        _this.cell = cell;
        return _this;
    }
    UpdateEvent.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' ' + this.cell.toString();
    };
    return UpdateEvent;
}(ModelEvent));
exports.UpdateEvent = UpdateEvent;
