"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handlers = require("./Handlers");
try {
    // assuming the require works, these will hoist into the library.
    var FileAPI = require('file-api'), File = FileAPI.File, FileList = FileAPI.FileList, FileReader = FileAPI.FileReader;
}
catch (e) {
    // If the import files, this could be because file-api isn't included.
}
function LoadFile(aFile) {
    var fr = new FileReader();
    var res;
    var rej;
    var p = new Promise(function (aResolve, aReject) {
        res = aResolve;
        rej = aReject;
    });
    fr.readAsText(aFile);
    fr.onload = function (e) {
        var handler = LoadString(e.target.result);
        if (handler !== undefined) {
            res(handler);
        }
        rej();
    };
    return p;
}
exports.LoadFile = LoadFile;
function LoadString(aBody) {
    var fileTypes = Object.keys(Handlers);
    var parsers = [];
    fileTypes.map(function (handlerType) {
        var h = new Handlers[handlerType]();
        try {
            h.LoadString(aBody);
            parsers.push(h);
        }
        catch (e) {
            // just ignore if there's an error.
            // TODO: Should probably at least typecheck error.
        }
    });
    if (parsers.length === 1) {
        return parsers[0];
    }
    // TODO: Return a better error when multiple parsers available somehow.
    return undefined;
}
exports.LoadString = LoadString;
//# sourceMappingURL=Utils.js.map