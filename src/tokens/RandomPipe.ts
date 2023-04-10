import { Pipe } from './Pipe';
import { RandomUtils } from '../utils/random/RandomUtils';

export class RandomPipe extends Pipe {
  generate(parameterFull?: string, preveData?: any): any {
    const parameter = parameterFull?.split(';')[0];
    const parameterOption = parameterFull?.split(';')[1];
    if (Array.isArray(preveData)) {
      const length = Number(parameter ?? '1');
      const result = [];
      for (let i = 0; i < Number(length); i++) {
        result.push(preveData[Math.floor(Math.random() * preveData.length)]);
      }
      return result.join('');
    } else if (parameter && parameter.includes('..')) {
      const length = parameterOption ?? 1;
      const range = parameter.split('..');
      const min = Number(range[0]);
      const max = Number(range[1]);
      const result = [];
      for (let i = 0; i < Number(length); i++) {
        result.push(Math.floor(RandomUtils.random(Math.min(min, max), Math.max(min, max))));
      }
      return Number(result.join(''));
    } else if (parameter && parameter.startsWith('string')) {
      const length = parameterOption ?? 5;
      return RandomUtils.getRandomString(Number(length));
    } else if (parameter && parameter.startsWith('color')) {
      return RandomUtils.getRandomColor();
    } else if (parameter && parameter.startsWith('boolean')) {
      return RandomUtils.getRandomBoolean();
    } else {
      return Math.random();
    }
  }

}
