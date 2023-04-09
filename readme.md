simple-generator
===

# data generator library
```typescript
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
```
```javascript
{
  name: { first: 'firstName: 413311 - VVHwOwKv !!', last: 'lastName: ULN' },
  age: 0,
  address: { city: '4', street: 'e' },
  friends: [
    { name: 'name: eVtKp .', best: true },
    { name: 'name: hVKum .', best: false },
    { name: 'name: TlJUw .', best: true },
    { name: 'name: JobUn .', best: false },
    { name: 'name: qTOLU .', best: false },
    { name: 'name: uVOvA .', best: false },
    { name: 'name: UdqSn .', best: false },
    { name: 'name: wVNzn .', best: true },
    { name: 'name: EzzDd .', best: true },
    { name: 'name: IYNcc .', best: true }
  ]
}
```

# add operator
```typescript
const generator = new Generator();
generator.setToken('uuid', () => {
  return new class extends Pipe {
    generate(parameter?: string, prevData?: any): any {
      return RandomUtils.uuid();
    }
  }()
});
const data = generator.run<DataType>({
  street: '#{uuid}#'
});
```

```javascript
{
    street: '2a29-167a-6e92-4118'
}

```
