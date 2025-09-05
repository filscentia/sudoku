"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List(term, model) {
        var _this = this;
        this.term = term;
        this.listX = 90;
        this.listY = 4;
        this.currentSize = 0;
        this.model = model;
        this.model.onUpdate(function () {
            _this.draw();
        });
    }
    List.prototype.draw = function () {
        var _this = this;
        this.term.saveCursor();
        this.term.moveTo(this.listX, this.listY - 2);
        this.term.white('Events');
        var i = this.listY;
        var evts = this.model.eventQueue('COLLAPSE');
        if (evts) {
            evts.forEach(function (element) {
                _this.term.moveTo(_this.listX, i);
                _this.term.white(element.toString());
                i++;
            });
        }
        for (var x = i; x < this.currentSize + this.listY; x++) {
            this.term.moveTo(this.listX, x);
            this.term.white('                           ');
        }
        this.currentSize = evts ? evts.length : 0;
        this.term.restoreCursor();
    };
    return List;
}());
exports.default = List;
module.exports = List;
