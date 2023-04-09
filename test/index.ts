import { Generator } from 'simple-generator';

const g = new Generator();
const data = {
  name: {
    first: 'first',
    last: 'last'

  },
  age: 12,
  address: {
    city: 'city',
    street: 'street',
    number: 12
  },
  firends: [{name: 'a'}]
}

const gg = g.dummy<typeof data>({
  name: {
    first: '안녕 ${random:1..5,6}$ ${random:string:8}$  하세요',
    last: 'b'
  },
  age: '${random:1..5,5}$',
  address: {
    city: 'd',
    street: 'e',
    number: 'f'
  },
  firends: [
    {name: 'name: ${random:string}$ 입니다.'}
  ]
});
console.log(JSON.stringify(gg));
// {number|length:4|sort:asc}
// const a = new NumberToken('asd');


//
// type TT<T> = {
//   [P in keyof T]: T[P] extends object ? TT<T[P]> : string
// }
//
// type TTT = TT<typeof data>
//
// const aa: TTT = {
//   name: {
//     first: 'a',
//     last: 'b'
//   },
//   age: 'c',
//   address: {
//     city: 'd',
//     street: 'e',
//     number: 'f'
//   }
//
// }


// var a2 ='zzz'
// var say = "a bird in hand > two in the bush";
// var html = htmlEscape `<div> I would ${a2} just like to say : ${say}</div>`;
// console.log('-->', html)
// // a sample tag function
// function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
//   console.log('------>', literals, placeholders);
//   let result = "";
//
//   // interleave the literals with the placeholders
//   for (let i = 0; i < placeholders.length; i++) {
//     result += literals[i];
//     result += placeholders[i]
//       .replace(/&/g, '&amp;')
//       .replace(/"/g, '&quot;')
//       .replace(/'/g, '&#39;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;');
//   }
//
//   // add the last literal
//   result += literals[literals.length - 1];
//   return result;
// }
// `
//
// new HttpFetcher().get({target: 'https://dummyjson.com/products/1'}).then(async it => {
//   console.log(await it.json());
// })
// new HttpJsonFetcher().get<{id: number, title: string}>({target: 'https://dummyjson.com/products/1'}).then(async it => {
//   console.log(it.title);
// })

