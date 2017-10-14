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
var ini = require("multi-ini");
var Commands_1 = require("./Commands");
var HapticFileHandler_1 = require("./HapticFileHandler");
function ParseKiirooCommands(aCommands) {
    // We could very easily eval this and be on our way.
    // But really, do /you/ trust porn files? Really? Do you?
    // So string tokenization it is.
    // First off, let's make sure this is stringified javascript object
    if (aCommands.indexOf("{") !== 0 || aCommands.indexOf("}") !== aCommands.length - 1) {
        throw new Error("invalid kiiroo file");
    }
    // Strip off { and }
    var commands = aCommands.slice(1, aCommands.length - 1).split(",");
    var retArray = [];
    commands.forEach(function (x) {
        var timepos = x.split(":");
        // Convert to milliseconds and round down
        var time = Math.floor(parseFloat(timepos[0]) * 1000);
        var pos = parseInt(timepos[1], 10);
        retArray.push(new Commands_1.KiirooCommand(time, pos));
    });
    return retArray;
}
var FunscriptHandler = /** @class */ (function (_super) {
    __extends(FunscriptHandler, _super);
    function FunscriptHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            _this._commands = JSON.parse(aBody).actions.map(function (x) { return new Commands_1.FunscriptCommand(x.at, x.pos); });
        };
        return _this;
    }
    return FunscriptHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.FunscriptHandler = FunscriptHandler;
var FeelmeHandler = /** @class */ (function (_super) {
    __extends(FeelmeHandler, _super);
    function FeelmeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            _this._commands = ParseKiirooCommands(JSON.parse(aBody).text);
        };
        return _this;
    }
    return FeelmeHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.FeelmeHandler = FeelmeHandler;
var FeelVRHandler = /** @class */ (function (_super) {
    __extends(FeelVRHandler, _super);
    function FeelVRHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            _this._commands = ParseKiirooCommands(JSON.parse(aBody).subs.text);
        };
        return _this;
    }
    return FeelVRHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.FeelVRHandler = FeelVRHandler;
var KiirooHandler = /** @class */ (function (_super) {
    __extends(KiirooHandler, _super);
    function KiirooHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            if (aBody.indexOf("var kiiroo_subtitles") !== 0) {
                throw new Error("Wrong format");
            }
            var commands = aBody.substr(aBody.indexOf("{")).split(";")[0];
            _this._commands = ParseKiirooCommands(commands);
        };
        return _this;
    }
    return KiirooHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.KiirooHandler = KiirooHandler;
var VirtualRealPornHandler = /** @class */ (function (_super) {
    __extends(VirtualRealPornHandler, _super);
    function VirtualRealPornHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            var parser = new ini.Parser();
            var vrpbody = parser.parse(aBody.split("\n"));
            var commands = vrpbody.Kiiroo.onyx;
            // VRP commands are almost but not quite like JS Kiiroo commands. So make
            // them look like kiiroo commands, then parse them.
            _this._commands = ParseKiirooCommands("{" + commands.replace(/,/g, ":").replace(/;/g, ",") + "}");
        };
        return _this;
    }
    return VirtualRealPornHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.VirtualRealPornHandler = VirtualRealPornHandler;
var VorzeHandler = /** @class */ (function (_super) {
    __extends(VorzeHandler, _super);
    function VorzeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadString = function (aBody) {
            var parseBody = aBody
                .replace(/\r?\n|\r/g, "")
                .split(",");
            if (parseBody.length % 3 !== 0) {
                parseBody.splice(-(parseBody.length % 3));
            }
            var commandsBody = parseBody.map(function (n) {
                var val = parseInt(n, 10);
                if (val !== val) {
                    throw new Error("Wrong format");
                }
                return val;
            });
            for (var i = 0; i < commandsBody.length; i += 3) {
                _this._commands.push(new Commands_1.VorzeCommand(commandsBody[i] * 1000, commandsBody[i + 1], commandsBody[i + 2]));
            }
        };
        return _this;
    }
    return VorzeHandler;
}(HapticFileHandler_1.HapticFileHandler));
exports.VorzeHandler = VorzeHandler;
//# sourceMappingURL=Handlers.js.map