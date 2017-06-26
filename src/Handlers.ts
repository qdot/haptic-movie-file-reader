import { HapticFileHandler } from './HapticFileHandler';
import { HapticCommand, KiirooCommand } from './Commands';
import * as ini from 'ini';

function ParseKiirooCommands(aCommands : string) : Array<HapticCommand> {
  // We could very easily eval this and be on our way.
  // But really, do /you/ trust porn files? Really? Do you?
  // So string tokenization it is.

  // First off, let's make sure this is stringified javascript object
  if (aCommands.indexOf('{') !== 0 || aCommands.indexOf('}') !== aCommands.length - 1) {
    throw 'invalid kiiroo file';
  }

  // Strip off { and }
  let commands = aCommands.slice(1, aCommands.length - 1).split(',');
  let retArray : Array<HapticCommand> = [];
  commands.forEach((x) => {
    let timepos= x.split(":");
    // Convert to milliseconds and round down
    let time = Math.floor(parseFloat(timepos[0]) * 1000);
    let pos = parseInt(timepos[1]);
    retArray.push(new KiirooCommand(time, pos));
  });
  return retArray;
}

export class FunscriptHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    throw "not implemented";
  }
}

export class FeelmeHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    let feelme_body = JSON.parse(aBody);
    let commands = feelme_body.text;
    this._commands = ParseKiirooCommands(commands);
  }
}

export class KiirooHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    if (aBody.indexOf('var kiiroo_subtitles') != 0) {
      throw "Wrong format";
    }
    let commands = aBody.substr(aBody.indexOf ('{'));
    this._commands = ParseKiirooCommands(commands);
  }
}

export class VirtualRealPornHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    let vrpbody = ini.parse(aBody);
    let commands : string = vrpbody.Kiiroo.onyx;
    // VRP commands are almost but not quite like JS Kiiroo commands. So make
    // them look like kiiroo commands, then parse them.
    this._commands = ParseKiirooCommands('{' + commands.replace(',', ':').replace(';', ',') + '}');
  }
}

export class VorzeHandler extends HapticFileHandler {
  LoadString = (aBody : string) => {
    throw "not implemented";
  }
}
