// tslint:disable:max-classes-per-file
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HapticCommand = /** @class */ (function () {
    function HapticCommand(_time) {
        this._time = _time;
    }
    Object.defineProperty(HapticCommand.prototype, "Time", {
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    return HapticCommand;
}());
exports.HapticCommand = HapticCommand;
var KiirooCommand = /** @class */ (function (_super) {
    __extends(KiirooCommand, _super);
    function KiirooCommand(time, _position) {
        var _this = _super.call(this, time) || this;
        _this._position = _position;
        return _this;
    }
    Object.defineProperty(KiirooCommand.prototype, "Position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    return KiirooCommand;
}(HapticCommand));
exports.KiirooCommand = KiirooCommand;
var VorzeCommand = /** @class */ (function (_super) {
    __extends(VorzeCommand, _super);
    function VorzeCommand(time, _direction, _speed) {
        var _this = _super.call(this, time) || this;
        _this._direction = _direction;
        _this._speed = _speed;
        return _this;
    }
    Object.defineProperty(VorzeCommand.prototype, "Direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VorzeCommand.prototype, "Speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    return VorzeCommand;
}(HapticCommand));
exports.VorzeCommand = VorzeCommand;
var LovenseMaxCommand = /** @class */ (function (_super) {
    __extends(LovenseMaxCommand, _super);
    function LovenseMaxCommand(time, _inflation) {
        var _this = _super.call(this, time) || this;
        _this._inflation = _inflation;
        return _this;
    }
    Object.defineProperty(LovenseMaxCommand.prototype, "Inflation", {
        get: function () {
            return this._inflation;
        },
        enumerable: true,
        configurable: true
    });
    return LovenseMaxCommand;
}(HapticCommand));
exports.LovenseMaxCommand = LovenseMaxCommand;
var FunscriptCommand = /** @class */ (function (_super) {
    __extends(FunscriptCommand, _super);
    function FunscriptCommand(time, _position) {
        var _this = _super.call(this, time) || this;
        _this._position = _position;
        return _this;
    }
    Object.defineProperty(FunscriptCommand.prototype, "Position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    return FunscriptCommand;
}(HapticCommand));
exports.FunscriptCommand = FunscriptCommand;
//# sourceMappingURL=Commands.js.map