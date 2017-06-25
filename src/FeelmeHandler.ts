import { HapticFileHandler } from './HapticFileHandler';
import { ParseKiirooCommands } from './Utils';

export class FeelmeHandler extends HapticFileHandler  {
  LoadString = (aBody : string) => {
    let feelme_body = JSON.parse(aBody);
    let commands = feelme_body.text;
    this._commands = ParseKiirooCommands(commands);
  }
}
