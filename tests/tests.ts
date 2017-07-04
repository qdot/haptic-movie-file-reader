import { expect } from "chai";
import "mocha";
import * as Reader from "../src/";
import { KiirooCommand } from "../src/Commands";
import { HapticFileHandler } from "../src/HapticFileHandler";

// tslint:disable-next-line:max-line-length
const feelmeTest = '{"id": 1, "video": {"subtitles_count": 1, "description": "", "name": "1", "external_id": "1", "created": "2017-06-25T20:09:09.871560"}, "text": "{201.24:3,319.37:1,478.78:4,589.74:0,610.34:4}", "created": "2017-06-25T20:09:09.871560", "video_external_id": "1", "name": "Test Value", "type": "penetration", "description": "Testing File", "session_id": 1}';

const vrpTest = `[Player]
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
onyx=201.24,3;319.37,1;478.78,4;589.74,0;610.34,4`;

const kiirooTest = "var kiiroo_subtitles = {201.24:3,319.37:1,478.78:4,589.74:0,610.34:4};";

describe("Message", () => {
  function simpleLoadTest(testStr: string) {
    const p = Reader.LoadString(testStr);
    if (p === undefined) {
      throw new Error("cannot read file");
    }
    const parser: HapticFileHandler = p;
    expect(parser.CommandLength).to.be.greaterThan(0);
    expect(parser.GetValueNearestTime(210000)).to.deep.equal(new KiirooCommand(201240, 3));
  }

  it("Loads and reads a VRP file correctly",
     () => {
       simpleLoadTest(vrpTest);
     });

  it("Loads and reads a Kiiroo file correctly",
     () => {
       simpleLoadTest(kiirooTest);
     });

  it("Loads and reads a Feelme file correctly",
     () => {
       simpleLoadTest(feelmeTest);
     });

  it("Returns undefined when a time is before the first entry",
     () => {
       const p = Reader.LoadString(feelmeTest);
       if (p === undefined) {
         throw new Error("cannot read file");
       }
       const parser: HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       // tslint:disable-next-line:no-unused-expression
       expect(parser.GetValueNearestTime(1)).to.be.undefined;
     });

  it("Returns last viable event when passed a time greater than last time in array",
     () => {
       const p = Reader.LoadString(feelmeTest);
       if (p === undefined) {
         throw new Error("cannot read file");
       }
       const parser: HapticFileHandler = p;
       expect(parser.CommandLength).to.be.greaterThan(0);
       expect(parser.GetValueNearestTime(620000)).to.deep.equal(new KiirooCommand(610340, 4));
     });
});
