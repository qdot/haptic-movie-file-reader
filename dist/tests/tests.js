"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var file_api_1 = require("file-api");
require("mocha");
var Reader = require("../src/");
var Commands_1 = require("../src/Commands");
// tslint:disable-next-line:max-line-length
var feelmeTest = '{"id": 1, "video": {"subtitles_count": 1, "description": "", "name": "1", "external_id": "1", "created": "2017-06-25T20:09:09.871560"}, "text": "{201.24:3,319.37:1,478.78:4,589.74:0,610.34:4}", "created": "2017-06-25T20:09:09.871560", "video_external_id": "1", "name": "Test Value", "type": "penetration", "description": "Testing File", "session_id": 1}';
// tslint:disable-next-line:max-line-length
var feelvrTest = '{"subs":{"type":"penetration","id": 1,"video":{"external_id":"1","name":"1","created":"2017-01-11T11:01:11.111111","subtitles_count":1,"description":null},"video_external_id":"1151","session_id":93006,"text":"{201.24:3,319.37:1,478.78:4,589.74:0,610.34:4}","name":"Testing file","description":"testing","created":"2017-01-11T11:01:11.111111"},"format":"MONO_360","file":"test.mp4","source":"https://testing.com/test.mp4","downloadComplete":true}';
var vrpTest = "[Player]\nh_offset=0\nvert_rot=15\nzoom=0\n\n[VideoInfo]\nname=Test Video\nversion=3\n\n[Lovense]\nhombre_trailer=-10.7/05-18.1/04-19.6/05-21.1/02-24/00\nhombre=-191.3/04-194.1/05-199.3/04-201.1/05-203.6/00\n\n[Kiiroo]\nonyx=201.24,3;319.37,1;478.78,4;589.74,0;610.34,4";
var kiirooTest = "var kiiroo_subtitles = {201.24:3,319.37:1,478.78:4,589.74:0,610.34:4};";
var vorzeTest = "139,1,90,\n141,0,90,\n142,1,90,\n144,0,90,\n145,1,90,\n";
var funscriptTest = "{\"range\": 100,\n\"actions\": [\n{\"pos\": 0, \"at\": 677777},\n{\"pos\": 10, \"at\": 679112},\n{\"pos\": 0, \"at\": 679579},\n{\"pos\": 0, \"at\": 681081},\n{\"pos\": 10, \"at\": 682916}\n]\n}";
var kiirooMessageArray = [
    new Commands_1.KiirooCommand(201240, 3),
    new Commands_1.KiirooCommand(319370, 1),
    new Commands_1.KiirooCommand(478780, 4),
    new Commands_1.KiirooCommand(589740, 0),
    new Commands_1.KiirooCommand(610340, 4),
];
var vorzeMessageArray = [
    new Commands_1.VorzeCommand(139000, 1, 90),
    new Commands_1.VorzeCommand(141000, 0, 90),
    new Commands_1.VorzeCommand(142000, 1, 90),
    new Commands_1.VorzeCommand(144000, 0, 90),
    new Commands_1.VorzeCommand(145000, 1, 90),
];
var funscriptMessageArray = [
    new Commands_1.FunscriptCommand(677777, 0),
    new Commands_1.FunscriptCommand(679112, 10),
    new Commands_1.FunscriptCommand(679579, 0),
    new Commands_1.FunscriptCommand(681081, 0),
    new Commands_1.FunscriptCommand(682916, 10),
];
describe("Message", function () {
    function simpleKiirooLoadTest(testStr) {
        var parser = Reader.LoadString(testStr);
        if (parser === undefined) {
            throw new Error("cannot read string");
        }
        chai_1.expect(parser.CommandLength).to.equal(5);
        chai_1.expect(parser.Commands).to.deep.equal(kiirooMessageArray);
        chai_1.expect(parser.GetValueNearestTime(210000)).to.deep.equal(new Commands_1.KiirooCommand(201240, 3));
    }
    it("Loads and reads a VRP file correctly", function () {
        simpleKiirooLoadTest(vrpTest);
    });
    it("Loads and reads a Kiiroo file correctly", function () {
        simpleKiirooLoadTest(kiirooTest);
    });
    it("Loads and reads a Feelme file correctly", function () {
        simpleKiirooLoadTest(feelmeTest);
    });
    it("Loads and reads a Feelvr file correctly", function () {
        simpleKiirooLoadTest(feelvrTest);
    });
    it("Loads and reads a Vorze file correctly", function () {
        var p = Reader.LoadString(vorzeTest);
        if (p === undefined) {
            throw new Error("cannot read string");
        }
        var parser = p;
        chai_1.expect(parser.CommandLength).to.equal(5);
        chai_1.expect(parser.Commands).to.deep.equal(vorzeMessageArray);
        chai_1.expect(parser.GetValueNearestTime(141000)).to.deep.equal(new Commands_1.VorzeCommand(141000, 0, 90));
    });
    it("Loads and reads a Funscript file correctly", function () {
        var p = Reader.LoadString(funscriptTest);
        if (p === undefined) {
            throw new Error("cannot read string");
        }
        var parser = p;
        chai_1.expect(parser.CommandLength).to.equal(5);
        chai_1.expect(parser.Commands).to.deep.equal(funscriptMessageArray);
        chai_1.expect(parser.GetValueNearestTime(679500)).to.deep.equal(new Commands_1.FunscriptCommand(679112, 10));
    });
    it("Returns a valid object when loading from a file", function () {
        Reader.LoadFile(new file_api_1.File("./funscript.json")).then(function (p) {
            if (p === undefined) {
                throw new Error("cannot read string");
            }
            var parser = p;
            chai_1.expect(parser.CommandLength).to.equal(5);
            chai_1.expect(parser.Commands).to.deep.equal(funscriptMessageArray);
            chai_1.expect(parser.GetValueNearestTime(679500)).to.deep.equal(new Commands_1.FunscriptCommand(679112, 10));
        });
    });
    it("Returns undefined when a time is before the first entry", function () {
        var p = Reader.LoadString(feelmeTest);
        if (p === undefined) {
            throw new Error("cannot read file");
        }
        var parser = p;
        chai_1.expect(parser.CommandLength).to.equal(5);
        // tslint:disable-next-line:no-unused-expression
        chai_1.expect(parser.GetValueNearestTime(1)).to.be.undefined;
    });
    it("Returns last viable event when passed a time greater than last time in array", function () {
        var p = Reader.LoadString(feelmeTest);
        if (p === undefined) {
            throw new Error("cannot read file");
        }
        var parser = p;
        chai_1.expect(parser.CommandLength).to.equal(5);
        chai_1.expect(parser.GetValueNearestTime(620000)).to.deep.equal(new Commands_1.KiirooCommand(610340, 4));
    });
});
//# sourceMappingURL=tests.js.map