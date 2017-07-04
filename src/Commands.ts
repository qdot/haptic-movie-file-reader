// tslint:disable:max-classes-per-file
"use strict";

export class HapticCommand {
  constructor(private _time: number) {
  }

  public get Time() {
    return this._time;
  }
}

export class KiirooCommand extends HapticCommand {
  constructor(time: number,
              private _position: number) {
    super(time);
  }

  public get Position() {
    return this._position;
  }
}

export class VorzeCommand extends HapticCommand {
  constructor(time: number,
              private _direction: number,
              private _speed: number) {
    super(time);
  }

  public get Direction() {
    return this._direction;
  }

  public get Speed() {
    return this._speed;
  }
}

export class LovenseMaxCommand extends HapticCommand {
  constructor(time: number,
              private _inflation: number) {
    super(time);
  }

  public get Inflation() {
    return this._inflation;
  }
}

export class LaunchCommand extends HapticCommand {
  constructor(time: number,
              private _speed: number,
              private _position: number) {
    super(time);
  }

  public get Speed() {
    return this._speed;
  }

  public get Position() {
    return this._position;
  }
}
