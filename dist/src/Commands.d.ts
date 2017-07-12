export declare class HapticCommand {
    private _time;
    constructor(_time: number);
    readonly Time: number;
}
export declare class KiirooCommand extends HapticCommand {
    private _position;
    constructor(time: number, _position: number);
    readonly Position: number;
}
export declare class VorzeCommand extends HapticCommand {
    private _direction;
    private _speed;
    constructor(time: number, _direction: number, _speed: number);
    readonly Direction: number;
    readonly Speed: number;
}
export declare class LovenseMaxCommand extends HapticCommand {
    private _inflation;
    constructor(time: number, _inflation: number);
    readonly Inflation: number;
}
export declare class FunscriptCommand extends HapticCommand {
    private _position;
    constructor(time: number, _position: number);
    readonly Position: number;
}
