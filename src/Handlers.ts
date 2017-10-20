// tslint:disable:max-classes-per-file
"use strict";

import * as ini from "multi-ini";
import { FunscriptCommand, HapticCommand, KiirooCommand, VorzeCommand } from "./Commands";
import { HapticFileHandler } from "./HapticFileHandler";

function ParseKiirooCommands(aCommands: string): HapticCommand[] {
  // We could very easily eval this and be on our way.
  // But really, do /you/ trust porn files? Really? Do you?
  // So string tokenization it is.

  // Dear FeelMe/WankzVR: Come on, putting a space at the front of the body just to
  // break my crappy parser? That's not very nice.
  // See https://github.com/metafetish/haptic-movie-file-reader/issues/23
  aCommands = aCommands.trim();

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
    this._commands = JSON.parse(aBody).actions.map((x) => new FunscriptCommand(x.at, x.pos));
  }
}

export class FeelmeHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    this._commands = ParseKiirooCommands(JSON.parse(aBody).text);
  }
}

export class FeelVRHandler extends HapticFileHandler  {
  public LoadString = (aBody: string) => {
    this._commands = ParseKiirooCommands(JSON.parse(aBody).subs.text);
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
    const parser = new ini.Parser();
    const vrpbody = parser.parse(aBody.split("\n"));
    const commands: string = vrpbody.Kiiroo.onyx;

    // VRP commands are almost but not quite like JS Kiiroo commands. So make
    // them look like kiiroo commands, then parse them.
    this._commands = ParseKiirooCommands("{" + commands.replace(/,/g, ":").replace(/;/g, ",") + "}");
  }
}

export class VorzeHandler extends HapticFileHandler {
  public LoadString = (aBody: string) => {
    const parseBody: string[] = aBody
      .replace(/\r?\n|\r/g, "")
      .split(",");
    if (parseBody.length % 3 !== 0) {
      parseBody.splice(-(parseBody.length % 3));
    }
    const commandsBody = parseBody.map((n) => {
      const val = parseInt(n, 10);
      if (val !== val) {
        throw new Error("Wrong format");
      }
      return val;
    });
    for (let i = 0; i < commandsBody.length; i += 3) {
      this._commands.push(new VorzeCommand(commandsBody[i] * 1000, commandsBody[i + 1], commandsBody[i + 2]));
    }
  }
}
