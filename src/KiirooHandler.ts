import { HapticFileHandler } from './HapticFileHandler';
import { ParseKiirooCommands } from './Utils';

export class VirtualRealPornHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    let commands = aBody.substr(aBody.indexOf('{'));
    this._commands = ParseKiirooCommands(commands);
  }
}
