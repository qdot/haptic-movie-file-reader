"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HapticFileHandler = (function () {
    function HapticFileHandler() {
        this._commands = [];
        this._lastIndexRetrieved = 0;
        this._lastTimeRetrieved = 0;
    }
    Object.defineProperty(HapticFileHandler.prototype, "CommandLength", {
        get: function () {
            return this._commands.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HapticFileHandler.prototype, "Commands", {
        get: function () {
            return this._commands;
        },
        enumerable: true,
        configurable: true
    });
    // TODO Lots of optimization choices here.
    HapticFileHandler.prototype.GetValueNearestTime = function (aTime) {
        // We figure we'll normally be handing out indexes sequentially, while a
        // movie is playing. So always start from our last record returned.
        var startIndex = this._lastIndexRetrieved;
        if (aTime < this._lastTimeRetrieved) {
            startIndex = 0;
        }
        var i = startIndex;
        for (; i < this._commands.length; ++i) {
            if (this._commands[i].Time > aTime) {
                break;
            }
        }
        // Lots of videos have long leadins with no haptics. Return undefined if we
        // don't have anything to send yet.
        if (i === 0) {
            return undefined;
        }
        this._lastIndexRetrieved = i - 1;
        this._lastTimeRetrieved = this._commands[i - 1].Time;
        return this._commands[i - 1];
    };
    return HapticFileHandler;
}());
exports.HapticFileHandler = HapticFileHandler;
//# sourceMappingURL=HapticFileHandler.js.map