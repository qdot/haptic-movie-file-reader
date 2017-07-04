import { HapticCommand } from "./Commands";
import * as Handlers from "./Handlers";
import { HapticFileHandler } from "./HapticFileHandler";

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

export function LoadFile(aFile: any): Promise<HapticFileHandler> {
  const fr = new FileReader();
  let res, rej;
  const p = new Promise<HapticFileHandler>((aResolve, aReject) => {
    res = aResolve;
    rej = aReject;
  });
  fr.readAsText(aFile);
  fr.onload = function(e: FileReaderEvent) {
    const handler = LoadString(e.target.result);
    if (handler !== undefined) {
      res(handler);
    }
    rej();
  };
  return p;
}

export function LoadString(aBody: string): HapticFileHandler | undefined {
  const fileTypes = Object.keys(Handlers);
  const parsers: HapticFileHandler[] = [];
  fileTypes.map((handlerType) => {
    const h: HapticFileHandler = new Handlers[handlerType]();
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
