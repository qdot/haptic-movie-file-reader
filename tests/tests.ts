import { expect } from "chai";
import "mocha";
import * as Reader from "../src/";
import { KiirooCommand, VorzeCommand } from "../src/Commands";
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

const vorzeTest = `139,1,90,
141,0,90,
142,1,90,
144,0,90,
145,1,90,
`;

const kiirooMessageArray: KiirooCommand[] = [
  new KiirooCommand(201240, 3),
  new KiirooCommand(319370, 1),
  new KiirooCommand(478780, 4),
  new KiirooCommand(589740, 0),
  new KiirooCommand(610340, 4),
];

const vorzeMessageArray: VorzeCommand[] = [
  new VorzeCommand(139000, 1, 90),
  new VorzeCommand(141000, 0, 90),
  new VorzeCommand(142000, 1, 90),
  new VorzeCommand(144000, 0, 90),
  new VorzeCommand(145000, 1, 90),
];

describe("Message", () => {
  function simpleKiirooLoadTest(testStr: string) {
    const parser: HapticFileHandler | undefined = Reader.LoadString(testStr);
    if (parser === undefined) {
      throw new Error("cannot read string");
    }
    expect(parser.CommandLength).to.equal(5);
    expect(parser.Commands).to.deep.equal(kiirooMessageArray);
    expect(parser.GetValueNearestTime(210000)).to.deep.equal(new KiirooCommand(201240, 3));
  }

  it("Loads and reads a VRP file correctly",
     () => {
       simpleKiirooLoadTest(vrpTest);
     });

  it("Loads and reads a Kiiroo file correctly",
     () => {
       simpleKiirooLoadTest(kiirooTest);
     });

  it("Loads and reads a Feelme file correctly",
     () => {
       simpleKiirooLoadTest(feelmeTest);
     });

  it("Loads and reads a Vorze file correctly",
     () => {
       const p = Reader.LoadString(vorzeTest);
       if (p === undefined) {
         throw new Error("cannot read file");
       }
       const parser: HapticFileHandler = p;
       expect(parser.CommandLength).to.equal(5);
       expect(parser.Commands).to.deep.equal(vorzeMessageArray);
       expect(parser.GetValueNearestTime(141000)).to.deep.equal(new VorzeCommand(141000, 0, 90));
     });

  it("Returns undefined when a time is before the first entry",
     () => {
       const p = Reader.LoadString(feelmeTest);
       if (p === undefined) {
         throw new Error("cannot read file");
       }
       const parser: HapticFileHandler = p;
       expect(parser.CommandLength).to.equal(5);
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
       expect(parser.CommandLength).to.equal(5);
       expect(parser.GetValueNearestTime(620000)).to.deep.equal(new KiirooCommand(610340, 4));
     });
});
