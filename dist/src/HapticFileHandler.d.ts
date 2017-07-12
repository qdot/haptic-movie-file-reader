import { HapticCommand } from "./Commands";
export declare abstract class HapticFileHandler {
    abstract LoadString: (aBody: string) => void;
    protected _commands: HapticCommand[];
    private _lastIndexRetrieved;
    private _lastTimeRetrieved;
    readonly CommandLength: number;
    readonly Commands: HapticCommand[];
    GetValueNearestTime(aTime: number): HapticCommand | undefined;
}
