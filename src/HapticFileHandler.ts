import { HapticCommand } from "./Commands";

export abstract class HapticFileHandler {
  public abstract LoadString: (aBody: string) => void;

  protected _commands: HapticCommand[] = [];
  private _lastIndexRetrieved: number = 0;
  private _lastTimeRetrieved: number = 0;

  public get CommandLength(): number {
    return this._commands.length;
  }

  public get Commands(): HapticCommand[] {
    return this._commands;
  }

  // TODO Lots of optimization choices here.
  public GetValueNearestTime(aTime: number): HapticCommand | undefined {
    // We figure we'll normally be handing out indexes sequentially, while a
    // movie is playing. So always start from our last record returned.
    let startIndex = this._lastIndexRetrieved;
    if (aTime < this._lastTimeRetrieved) {
      startIndex = 0;
    }
    let i = startIndex;
    for (; i < this._commands.length; ++i) {
      if (this._commands[i].Time > aTime) {
        break;
      }
    }
    // Lots of videos have long leadins with no haptics. Return undefined if we
    // don't have anything to send yet.
    if (i === 0) {
      return undefined;
    }
    this._lastIndexRetrieved = i - 1;
    this._lastTimeRetrieved = this._commands[i - 1].Time;
    return this._commands[i - 1];
  }
}
