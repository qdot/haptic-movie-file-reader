import { HapticFileHandler } from './HapticFileHandler';
import { ParseKiirooCommands } from './Utils';
import * as ini from 'ini';

export class VirtualRealPornHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    let vrpbody = ini.parse(aBody);
    let commands = vrpbody.Kiiroo.onyx;
    this._commands = ParseKiirooCommands(commands);
  }
}
