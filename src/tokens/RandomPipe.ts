import { Pipe } from 'tokens/Pipe';
import { RandomUtils } from 'utils/random/RandomUtils';

export class RandomPipe extends Pipe {
  generate(parameter?: string, preveData?: any): any {
    if (parameter && Array.isArray(preveData)) {
      return preveData[Math.floor(Math.random() * preveData.length)];
    } else if (parameter && parameter.includes('..')) {
      const data = parameter.split(',')[0];
      const length = parameter.split(',')[1] ?? 1;
      const range = data.split('..');
      const min = Number(range[0]);
      const max = Number(range[1]);
      let result = [];
      for (let i = 0; i < Number(length); i++) {
        result.push(Math.floor(RandomUtils.random(Math.min(min, max), Math.max(min, max))));
      }
      return Number(result.join(''));
    } else if (parameter && parameter.startsWith('string')) {
      const data = parameter.split(',')[0];
      const length = parameter.split(',')[1];
      return RandomUtils.getRandomString(Number(length ?? 5));
    } else if (parameter && parameter.startsWith('color')) {
      return RandomUtils.getRandomColor();
    } else {
      return Math.random();
    }
  }

}