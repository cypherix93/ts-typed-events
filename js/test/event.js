"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var event_1 = require("../src/event");
describe("Event", function () {
    it("should exist", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            chai_1.expect(event_1.Event).to.exist;
            return [2 /*return*/];
        });
    }); });
    it("should construct", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            chai_1.expect(new event_1.Event()).to.be.an.instanceOf(event_1.Event);
            return [2 /*return*/];
        });
    }); });
    it("should add listeners", function () { return __awaiter(_this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = new event_1.Event();
            chai_1.expect(event.on(function () { return true; })).to.not.throw;
            return [2 /*return*/];
        });
    }); });
    it("should emit to listeners", function () { return __awaiter(_this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = new event_1.Event();
            event.on(function (arg) {
                chai_1.expect(arg).is.true;
            });
            chai_1.expect(event.emit(true)).is.true;
            return [2 /*return*/];
        });
    }); });
    it("should return false with listeners", function () { return __awaiter(_this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = new event_1.Event();
            chai_1.expect(event.emit(undefined)).is.false;
            return [2 /*return*/];
        });
    }); });
    it("should emit the correct type", function () { return __awaiter(_this, void 0, void 0, function () {
        var stringValue, event;
        return __generator(this, function (_a) {
            stringValue = "Some string to test with";
            event = new event_1.Event();
            event.on(function (arg) {
                chai_1.expect(arg).is.equal(stringValue);
                chai_1.expect(arg).to.be.a("string");
            });
            chai_1.expect(event.emit(stringValue)).is.true;
            return [2 /*return*/];
        });
    }); });
    it("should should emit multiple times with on", function () { return __awaiter(_this, void 0, void 0, function () {
        var i, event, TIMES, emits;
        return __generator(this, function (_a) {
            i = 0;
            event = new event_1.Event();
            TIMES = 20;
            emits = 0;
            event.on(function (arg) {
                emits++;
                chai_1.expect(arg).is.equal(i);
                chai_1.expect(arg).to.be.a("number");
            });
            for (i = 0; i < TIMES; i++) {
                chai_1.expect(event.emit(i)).is.true;
            }
            chai_1.expect(emits).to.equal(TIMES);
            return [2 /*return*/];
        });
    }); });
    it("should should only emit once via once", function () { return __awaiter(_this, void 0, void 0, function () {
        var i, event, TIMES, emits, returned;
        return __generator(this, function (_a) {
            i = 0;
            event = new event_1.Event();
            TIMES = 20;
            emits = 0;
            event.once(function (arg) {
                emits++;
                chai_1.expect(arg).is.equal(i);
                chai_1.expect(arg).to.be.a("number");
            });
            for (i = 0; i < TIMES; i++) {
                returned = event.emit(i);
                if (i === 0) {
                    chai_1.expect(returned).is.true;
                }
                else {
                    // the listener should be removed, and thus it should return false for no listeners
                    chai_1.expect(returned).is.false;
                }
            }
            chai_1.expect(emits).to.equal(1);
            return [2 /*return*/];
        });
    }); });
    it("should should only returns a promise with once", function () { return __awaiter(_this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = new event_1.Event();
            chai_1.expect(event.once()).to.be.an.instanceOf(Promise);
            return [2 /*return*/];
        });
    }); });
    it("should with with async syntax", function () { return __awaiter(_this, void 0, void 0, function () {
        var event, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event = new event_1.Event();
                    setImmediate(function () {
                        event.emit(null);
                    }, 10);
                    _a = chai_1.expect;
                    return [4 /*yield*/, event.once()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.equal(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to remove a listener", function () { return __awaiter(_this, void 0, void 0, function () {
        var NUM, event, callback;
        return __generator(this, function (_a) {
            NUM = 1337;
            event = new event_1.Event();
            callback = function (arg) {
                chai_1.expect(NUM).equals(NUM);
            };
            event.on(callback);
            chai_1.expect(event.emit(NUM)).is.true;
            chai_1.expect(event.off(callback)).is.true;
            // now there should be no one to emit to
            chai_1.expect(event.emit(NUM)).is.false;
            return [2 /*return*/];
        });
    }); });
    it("should tell when no listener is removed", function () { return __awaiter(_this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = new event_1.Event();
            chai_1.expect(event.off(function () { return true; })).to.be.false;
            return [2 /*return*/];
        });
    }); });
    it("should remove all listeners", function () { return __awaiter(_this, void 0, void 0, function () {
        var LISTENERS, event, i;
        return __generator(this, function (_a) {
            LISTENERS = 8;
            event = new event_1.Event();
            for (i = 0; i < LISTENERS; i++) {
                event.on(function () { return true; });
            }
            chai_1.expect(event.offAll()).to.equal(LISTENERS);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=event.js.map