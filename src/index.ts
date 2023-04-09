import { Pipe, PipeMeta } from 'tokens/Pipe';
import { NumberPipe } from 'tokens/NumberPipe';
import { DataPipe } from 'tokens/DataPipe';
import { LengthPipe } from 'tokens/LengthPipe';
import { RandomPipe } from 'tokens/RandomPipe';

export type FieldType = 'number' | 'string' | 'boolean';
export type AllString<T> = {
  [P in keyof T]: T[P] extends object ? AllString<T[P]> : string
}
export type Token = { fullToken: string, token: string, index: number, input: string };

export class Generator {
  private tokens = new Map<string, () => Pipe>([
    ['number', () => new NumberPipe()],
    ['random', () => new RandomPipe()],
    ['length', () => new LengthPipe()],
    ['data', () => new DataPipe()]
  ]);

  setToken(name: string, token: () => Pipe) {
    this.tokens.set(name, token);
  }

  run<R = any>(data: AllString<R>): R {
    const rData = JSON.parse(JSON.stringify(data));

    for (const [key, value] of Object.entries(rData)) {
      if (typeof value === 'object') {
        const dummy1 = this.run(value as AllString<R>);
        rData[key] = dummy1;
      } else if (typeof value === 'string') {
        let defaultType: FieldType = 'string';
        const groups = Generator.exporesionGrouops(value);
        const tokenDatas: any[] = [];
        for (let i = 0; i < groups.length; i++) {
          let tokenData: any;
          const token: Token = {
            fullToken: groups[i][0],
            token: groups[i][1],
            index: groups[i].index,
            input: groups[i].input
          }
          if (token.fullToken.startsWith('!') && token.fullToken.endsWith('!')) {
            defaultType = token.token as FieldType;
            continue;
          }

          const pipes = token.token.split('|').map((p) => {
            const pipeSet: PipeMeta = {
              full: p,
              name: p.split(':')[0],
              parameter: p.split(':')[1]
            }
            return {pipeMeta: pipeSet, pipe: this.tokens.get(pipeSet.name)?.()};
          }).filter((p): p is { pipeMeta: PipeMeta, pipe: Pipe } => !!p.pipe);
          pipes?.forEach((p) => {
            tokenData = p.pipe.run(p.pipeMeta, tokenData);
          });
          tokenDatas.push(tokenData);
        }

        // bind replace
        tokenDatas.reverse();
        groups.reverse();
        let rvalue = value;
        groups.forEach((g, i) => {
          const head = rvalue.substring(0, g.index);
          const body = tokenDatas[i] as string ?? '';
          const tail = rvalue.substring(g.index + g[0].length);
          rvalue = head + body + tail;
        })

        // type casting
        if (defaultType === 'number') {
          rData[key] = Number(rvalue);
        } else if (defaultType === 'boolean') {
          rData[key] = rvalue === 'true';
        } else if (defaultType === 'string') {
          rData[key] = rvalue;
        } else {
          rData[key] = rvalue;
        }
      }
    }

    return rData as R;
  }

  public static exporesionGrouops(data: string | null) {
    const reg = /(?:[#!]\{(?:(([#!]\{)??[^#!]?[^{]*?)\}[#!]))/g;
    return Generator.regexExec(reg, data ?? '');
  }

  public static regexExec(regex: RegExp, text: string) {
    let varExec = regex.exec(text)
    const usingVars = [];
    while (varExec) {
      usingVars.push(varExec)
      varExec = regex.exec(varExec.input)
    }
    return usingVars;
  }
}

export const number = (literals: TemplateStringsArray, ...placeholders: string[]) => {
  return type('number', literals, ...placeholders);
}
export const string = (literals: TemplateStringsArray, ...placeholders: string[]) => {
  return type('string', literals, ...placeholders);
}
export const boolean = (literals: TemplateStringsArray, ...placeholders: string[]) => {
  return type('boolean', literals, ...placeholders);
}

export const type = (type: FieldType, literals: TemplateStringsArray, ...placeholders: string[]) => {
  let result = `!{${type}}!`;

  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i];
  }
  result += literals[literals.length - 1];
  return result;
}
