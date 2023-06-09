import { Generator, number, string, boolean, GenerateFieldType, NumberType } from 'simple-generate';
import { GenerateObjectType } from 'src';

export type DataType = {
  name: {
    first: string,
    last: string
  },

  age: number,
  age1: number,
  address: {
    city: string,
    street: string
  },
  friends: { name: string, best: boolean, address: string }[]
}

const generator = new Generator();
const data: GenerateObjectType<DataType> = {
  name: {
    first: string`firstName: #{random:1..5;6}# - #{random:string;8}# !!`,
    last: 'lastName: #{random:string;3}#'
  },
  age: number`#{random:1..5;5}#`,
  age1: NumberType('#{random:1..5;5}#'),
  address: {
    city: '#{data:["1","2","3","4"]|random}#',
    street: '#{uuid}#'
  },
  friends: [
    ...new Array(10).fill(0).map(() => ({
      name: 'name: #{random:string}# .',
      best: boolean`#{random:boolean}#`,
      address: () => `${Date.now()} !!`
    }))
  ]
};
const rData = generator.run<DataType>(data);
console.log(rData);

const riData = generator.run<number>(NumberType('#{random:1..5;5}#'));
console.log('random', riData);

const arrayData = Array.from({ length: 5 }, (v, i) => ({ sid: '#{uuid}#', name: '#{random:string;4}#' }));
const arrayResult = generator.run<{name: string, sid: string}[]>(arrayData)
console.log('Array', arrayResult);

