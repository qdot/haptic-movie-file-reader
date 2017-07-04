import { HapticFileHandler } from './HapticFileHandler';
import { HapticCommand } from './Commands';
import * as Handlers from './Handlers';

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}

export function LoadFile(aFile: any) : Promise<HapticFileHandler> {
  let fr = new FileReader();
  let res, rej;
  let p = new Promise((aResolve, aReject) => {
    res = aResolve;
    rej = aReject;
  });
  fr.readAsText(aFile);
  fr.onload = function (e : FileReaderEvent) {
    let handler = LoadString(e.target.result);
    if (handler !== undefined) {
      res(handler);
    }
    rej();
  };
  return p;
}

export function LoadString(aBody : string) : HapticFileHandler | undefined {
  let fileTypes = Object.keys(Handlers);
  let parsers : Array<HapticFileHandler> = [];
  fileTypes.map((handlerType) => {
    let h : HapticFileHandler = new Handlers[handlerType]();
    try {
      h.LoadString(aBody);
      parsers.push(h);
    } catch (e) {
    }
  });
  if (parsers.length === 1) {
    return parsers[0];
  }
  // TODO: Return a better error when multiple parsers available somehow.
  return undefined;
}
