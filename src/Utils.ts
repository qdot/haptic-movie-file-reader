import { HapticFileHandler } from './HapticFileHandler';
import { HapticCommand } from './Commands';
import * as Handlers from './Handlers';

export function LoadFile() : HapticFileHandler | undefined {
  return undefined;
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
