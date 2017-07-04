import { File, FileReader } from "file-api";
import { HapticCommand } from "./Commands";
import * as Handlers from "./Handlers";
import { HapticFileHandler } from "./HapticFileHandler";

interface IFileReaderEventTarget extends EventTarget {
    result: string;
}

interface IFileReaderEvent extends Event {
    target: IFileReaderEventTarget;
    getMessage(): string;
}

export function LoadFile(aFile: any): Promise<HapticFileHandler> {
  const fr = new FileReader();
  let res;
  let rej;
  const p = new Promise<HapticFileHandler>((aResolve, aReject) => {
    res = aResolve;
    rej = aReject;
  });
  fr.readAsText(aFile);
  fr.onload = function(e: IFileReaderEvent) {
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
