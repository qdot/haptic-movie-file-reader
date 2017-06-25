export abstract class HapticFileHandler {
  protected _commands : Array<object> = [];

  HapticFileHandler() {
  }

  GetValueAtTime(aTime: number) : object {
    return {};
  }

  GetGapToLastValue() : number {
    return 0;
  }

  LoadFile() {
  }

  abstract LoadString : (aBody: string)=>void;
}
