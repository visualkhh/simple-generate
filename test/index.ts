import { Generator, number, string, boolean } from 'simple-generator';

export type DataType = {
  name: {
    first: string,
    last: string

  },
  age: number,
  address: {
    city: string,
    street: string
  },
  friends: {name: string, best: boolean}[]
}

const data = new Generator().run<DataType>({
  name: {
    first: string`firstName: #{random:1..5;6}# - #{random:string;8}# !!`,
    last: 'lastName: #{random:string;3}#'
  },
  age: number`#{random:1..5,5}#`,
  address: {
    city: '#{data:["1","2","3","4"]|random}#',
    street: 'e'
  },
  friends: [
    ...new Array(10).fill(0).map(() => ({name: 'name: #{random:string}# .', best: boolean`#{random:boolean}#`}))

  ]
});
console.log(data);
