"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var position_1 = __importDefault(require("../position"));
var terminal_kit_1 = __importDefault(require("terminal-kit"));
var cli_boxes_1 = __importDefault(require("cli-boxes"));
var grid_1 = __importDefault(require("./grid"));
var list_1 = __importDefault(require("./list"));
var fs_1 = __importDefault(require("fs"));
/**
 *
 */
var ConsoleView = /** @class */ (function () {
    /**
     *
     * @param {*} terminateFn
     * @param {*} model
     */
    function ConsoleView(terminateFn, model) {
        this.terminateFn = terminateFn;
        this.term = terminal_kit_1.default.terminal;
        this.model = model;
        this.gridOffset = position_1.default.new({ x: 5, y: 5 });
        this.grid = new grid_1.default(this);
        this.list = new list_1.default(this.term, model);
        this.log = fs_1.default.openSync('log.txt', 'a');
    }
    ConsoleView.prototype._log = function (x) {
        fs_1.default.writeFileSync(this.log, x.toString() + "\n");
    };
    /**
     *
     */
    ConsoleView.prototype.init = function () {
        var _this = this;
        this.term.grabInput(true);
        this.term.fullscreen(true);
        // Move the cursor at the upper-left corner
        this.term.moveTo(1, 1, 'Sudoku');
        this.term.hideCursor();
        this._log("\n\nSudoko");
        var keyActions = {
            CTRL_C: function () {
                _this.term.hideCursor();
                _this.terminate();
            },
            UP: function () {
                _this.grid.moveRegion('up');
                _this.moveCursorToActive();
            },
            DOWN: function () {
                _this.grid.moveRegion('down');
                _this.moveCursorToActive();
            },
            LEFT: function () {
                _this.grid.moveRegion('left');
                _this.moveCursorToActive();
            },
            RIGHT: function () {
                _this.grid.moveRegion('right');
                _this.moveCursorToActive();
            },
            '1': function () {
                _this.grid.getActiveRegion().cell.permit([1]);
            },
            '2': function () {
                _this.grid.getActiveRegion().cell.permit([2]);
            },
            '3': function () {
                _this.grid.getActiveRegion().cell.permit([3]);
            },
            '4': function () {
                _this.grid.getActiveRegion().cell.permit([4]);
            },
            '5': function () {
                _this.grid.getActiveRegion().cell.permit([5]);
            },
            '6': function () {
                _this.grid.getActiveRegion().cell.permit([6]);
            },
            '7': function () {
                _this.grid.getActiveRegion().cell.permit([7]);
            },
            '8': function () {
                _this.grid.getActiveRegion().cell.permit([8]);
            },
            '9': function () {
                _this.grid.getActiveRegion().cell.permit([9]);
            },
            c: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.model.releaseEvents('COLLAPSE');
                    return [2 /*return*/];
                });
            }); },
            u: function () {
                _this.model.runUniqueInGroup();
            },
        };
        this.term.on('key', function (name) {
            if (keyActions[name]) {
                keyActions[name]();
            }
        });
        this.grid = new grid_1.default(this);
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 9; y++) {
                var position = position_1.default.new({ x: x, y: y });
                var region = this.grid.getRegion(position);
                region.draw();
            }
        }
        this.drawLines();
        this.list = new list_1.default(this.getTerminal(), this.model);
        this.list.draw();
        this.moveCursorToActive();
    };
    /**
     * @return {Model} datamodel
     */
    ConsoleView.prototype.getModel = function () {
        return this.model;
    };
    ConsoleView.prototype.getTerminal = function () {
        return this.term;
    };
    /**
     *
     */
    ConsoleView.prototype.terminate = function () {
        var _this = this;
        this.term.clear();
        this.term.grabInput(false);
        setTimeout(function () {
            _this.terminateFn();
        }, 100);
    };
    /**
     *
     */
    ConsoleView.prototype.drawLines = function () {
        this._log('Drawing lines');
        this.drawHLine(position_1.default.new({ x: 10, y: 4 }), position_1.default.new({ x: 83, y: 4 }));
        this.drawHLine(position_1.default.new({ x: 10, y: 16 }), position_1.default.new({ x: 83, y: 16 }));
        this.drawHLine(position_1.default.new({ x: 10, y: 28 }), position_1.default.new({ x: 83, y: 28 }));
        this.drawHLine(position_1.default.new({ x: 10, y: 40 }), position_1.default.new({ x: 83, y: 40 }));
        this.drawVLine(position_1.default.new({ x: 33, y: 5 }), position_1.default.new({ x: 33, y: 40 }));
        this.drawVLine(position_1.default.new({ x: 59, y: 5 }), position_1.default.new({ x: 59, y: 40 }));
        this.drawVLine(position_1.default.new({ x: 33, y: 5 }), position_1.default.new({ x: 33, y: 40 }));
    };
    /**
     *
     * @param {*} start
     * @param {*} end
     */
    ConsoleView.prototype.drawHLine = function (start, end) {
        for (var x = start.x; x < end.x; x++) {
            this.term.moveTo(x, start.y, cli_boxes_1.default.double.bottom);
        }
    };
    /**
     *
     * @param {*} start
     * @param {*} end
     */
    ConsoleView.prototype.drawVLine = function (start, end) {
        for (var y = start.y; y < end.y; y++) {
            this.term.moveTo(start.x, y, cli_boxes_1.default.double.right);
        }
    };
    /**
     *
     * @param {*} cellPosition
     */
    ConsoleView.prototype.getScreenPosition = function (cellPosition) {
        var x = cellPosition.x;
        var y = cellPosition.y;
        // console.log(this);
        var offset = {
            x: x * 4 + this.gridOffset.x,
            y: y * 4 + this.gridOffset.y,
        };
        offset.x = offset.x * 2;
        offset.x += Math.floor(x / 3) * 2; // extra space horizontal
        return offset;
    };
    /**
     *
     * @param {*} cell
     */
    ConsoleView.prototype.moveCursorToActive = function () {
        var screenPosition = this.grid.getActiveRegion().getScreenPosition();
        this.term.moveTo(screenPosition.x, screenPosition.y);
    };
    return ConsoleView;
}());
exports.default = ConsoleView;
