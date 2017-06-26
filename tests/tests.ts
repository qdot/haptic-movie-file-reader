import { HapticFileHandler } from "../src/HapticFileHandler";
import { KiirooCommand } from "../src/Commands";
import * as Reader from "../src/";
import { expect } from "chai";
import 'mocha';

let feelme_test = '{"id": 1, "video": {"subtitles_count": 1, "description": "", "name": "1", "external_id": "1", "created": "2017-06-25T20:09:09.871560"}, "text": "{201.24:3,319.37:1,478.78:4,589.74:0,610.34:4}", "created": "2017-06-25T20:09:09.871560", "video_external_id": "1", "name": "Test Value", "type": "penetration", "description": "Testing File", "session_id": 1}'

let vrp_test = `[Player]
h_offset=0
vert_rot=15
zoom=0

[VideoInfo]
name=Test Video
version=3

[Lovense]
hombre_trailer=-10.7/05-18.1/04-19.6/05-21.1/02-24/00
hombre=-191.3/04-194.1/05-199.3/04-201.1/05-203.6/00

[Kiiroo]
onyx=201.24,3;319.37,1;478.78,4;589.74,0;610.34,4`

describe("Message", () => {
  it("Loads a Feelme file correctly",
     () => {
       let parser = Reader.LoadString(feelme_test);
       expect(parser).to.be.a('object');
     });

  it("Loads and reads a VRP file correctly",
     () => {
       let p = Reader.LoadString(vrp_test);
       if (p === undefined)
       {
         throw "cannot read file";
       }
       let parser : HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       expect(parser.GetValueNearestTime(210000)).to.deep.equal(new KiirooCommand(201240, 3));
     });

  it("Returns undefined when a time is before the first entry",
     () => {
       let p = Reader.LoadString(feelme_test);
       if (p === undefined)
       {
         throw "cannot read file";
       }
       let parser : HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       expect(parser.GetValueNearestTime(1)).to.be.undefined;
     });

  it("Returns last viable event when passed a valid time",
     () => {
       let p = Reader.LoadString(feelme_test);
       if (p === undefined)
       {
         throw "cannot read file";
       }
       let parser : HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       expect(parser.GetValueNearestTime(210000)).to.deep.equal(new KiirooCommand(201240, 3));
     });

  it("Returns last viable event when passed a time greater than last time in array",
     () => {
       let p = Reader.LoadString(feelme_test);
       if (p === undefined)
       {
         throw "cannot read file";
       }
       let parser : HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       expect(parser.GetValueNearestTime(620000)).to.deep.equal(new KiirooCommand(610340, 4));
     });
});

