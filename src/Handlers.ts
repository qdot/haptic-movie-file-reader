// tslint:disable:max-classes-per-file
"use strict";

import * as ini from "ini";
import { HapticCommand, KiirooCommand } from "./Commands";
import { HapticFileHandler } from "./HapticFileHandler";

function ParseKiirooCommands(aCommands: string): HapticCommand[] {
  // We could very easily eval this and be on our way.
  // But really, do /you/ trust porn files? Really? Do you?
  // So string tokenization it is.

  // First off, let's make sure this is stringified javascript object
  if (aCommands.indexOf("{") !== 0 || aCommands.indexOf("}") !== aCommands.length - 1) {
    throw new Error("invalid kiiroo file");
  }

  // Strip off { and }
  const commands = aCommands.slice(1, aCommands.length - 1).split(",");
  const retArray: HapticCommand[] = [];
  commands.forEach((x) => {
    const timepos = x.split(":");
    // Convert to milliseconds and round down
    const time = Math.floor(parseFloat(timepos[0]) * 1000);
    const pos = parseInt(timepos[1], 10);
    retArray.push(new KiirooCommand(time, pos));
  });
  return retArray;
}

export class FunscriptHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    throw new Error("not implemented");
  }
}

export class FeelmeHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    const feelmeBody = JSON.parse(aBody);
    const commands = feelmeBody.text;
    this._commands = ParseKiirooCommands(commands);
  }
}

export class KiirooHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    if (aBody.indexOf("var kiiroo_subtitles") !== 0) {
      throw new Error("Wrong format");
    }
    const commands = aBody.substr(aBody.indexOf("{")).split(";")[0];
    this._commands = ParseKiirooCommands(commands);
  }
}

export class VirtualRealPornHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    const vrpbody = ini.parse(aBody);
    const commands: string = vrpbody.Kiiroo.onyx;
    // VRP commands are almost but not quite like JS Kiiroo commands. So make
    // them look like kiiroo commands, then parse them.
    this._commands = ParseKiirooCommands("{" + commands.replace(",", ":").replace(";", ",") + "}");
  }
}

export class VorzeHandler extends HapticFileHandler {
  public LoadString = (aBody: string) => {
    throw new Error("not implemented");
  }
}
