simple-generator
===

# data generator library
```shell
npx simple-generate "{\"name\": \"#{random}#\"}"
or 
node ./node_modules/.bin/simple-generate "{\"name\": \"#{random}#\"}"
```
```text
{"name":"0.6474831139567763"}
```
- input
  - json string 
    - "{'name': '#{random}#'}"
  - string 
    -  "#{random:color}#"
    -  "#{random}#"


## typescript
```typescript
import { Generator, number, string, boolean, GenerateFieldType, NumberType } from 'simple-generate';

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
const data: GenerateFieldType<DataType> = {
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
```
```javascript
{
    name: { first: 'firstName: 313131 - rDCvgpbL !!', last: 'lastName: KDB' },
    age: 24424,
        age1: 42211,
        address: { city: '3', street: '066f-127b-4ec6-bbf8' },
    friends: [
        { name: 'name: opfBI .', best: true, address: '1681319622621 !!' },
        { name: 'name: pvoll .', best: false, address: '1681319622621 !!' },
        { name: 'name: VfJWI .', best: true, address: '1681319622621 !!' },
        { name: 'name: VdZYQ .', best: true, address: '1681319622621 !!' },
        { name: 'name: lEjmE .', best: true, address: '1681319622621 !!' },
        { name: 'name: eybRF .', best: false, address: '1681319622622 !!' },
        { name: 'name: yCgSG .', best: true, address: '1681319622622 !!' },
        { name: 'name: XKPER .', best: false, address: '1681319622622 !!' },
        { name: 'name: gDeiL .', best: true, address: '1681319622622 !!' },
        { name: 'name: HMszo .', best: true, address: '1681319622622 !!' }
    ]
}
random 42141
```

## add operator
```typescript
const generator = new Generator();
generator.setToken('uuid2', () => {
  return new class extends Pipe {
    generate(parameter?: string, prevData?: any): any {
      return RandomUtils.uuid();
    }
  }()
});
const data = generator.run<DataType>({
  street: '#{uuid2}#'
});
```
```javascript
{
    street: '2a29-167a-6e92-4118'
}
```

