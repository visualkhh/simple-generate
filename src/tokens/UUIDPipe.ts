import { Pipe } from 'tokens/Pipe';
import { RandomUtils } from '../utils/random/RandomUtils';

export class UUIDPipe extends Pipe {
  generate(parameter?: string, preveData?: any): any {
    return RandomUtils.uuid();
  }
}
