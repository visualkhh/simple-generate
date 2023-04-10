import { Pipe } from './Pipe';
import { ScriptUtils } from '../utils/script/ScriptUtils';

export class DataPipe extends Pipe {
  generate(parameter?: string, preveData?: any): any {
    if (parameter) {
      return ScriptUtils.evalReturn(parameter, {});
    }
  }

}
