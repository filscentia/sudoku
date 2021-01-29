"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List(term, model) {
        var _this = this;
        this.term = term;
        this.listX = 90;
        this.listY = 4;
        this.model = model;
        this.model.onEvent(function () {
            _this.draw();
        });
    }
    List.prototype.draw = function () {
        this.term.saveCursor();
        this.term.moveTo(this.listX, this.listY - 2);
        this.term.white('Events');
        // let i = this.listY;
        // const evts = this.model.getEventQueue();
        // evts.forEach((element) => {
        //     this.term.moveTo(this.listX, i);
        //     this.term.white(element.toString());
        //     i++;
        // });
        this.term.restoreCursor();
    };
    return List;
}());
exports.default = List;
module.exports = List;
