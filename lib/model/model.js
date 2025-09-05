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
var cell_1 = __importDefault(require("./cell"));
var group_1 = __importDefault(require("./group"));
var position_1 = __importDefault(require("../position"));
var qmit_1 = require("@ampretia/qmit");
var winston_1 = __importDefault(require("winston"));
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
     */
    Model.prototype.onUpdate = function (callback) {
        this.uiCallback = callback;
    };
    /**
     *
     * @param {*} callback
     */
    Model.prototype.onEvent = function (name, callback) {
        this.qemit.on(name, callback);
    };
    Model.prototype.eventQueue = function (type) {
        return this.qemit.queue(type);
    };
    Model.prototype.addEvent = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qemit.emit(evt.getType(), evt)];
                    case 1:
                        _a.sent();
                        this.uiCallback();
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.releaseEvents = function (type, count) {
        if (count === void 0) { count = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qemit.gate('COLLAPSE', count)];
                    case 1:
                        c = _a.sent();
                        winston_1.default.info("Release " + c + " events");
                        this.uiCallback();
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.runUniqueInGroup = function () {
        this.rowGroups.forEach(function (rg) { return rg.uniqueInGroup(); });
        this.columnGroups.forEach(function (cg) { return cg.uniqueInGroup(); });
        this.regionGroups.forEach(function (rg) { return rg.uniqueInGroup(); });
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
