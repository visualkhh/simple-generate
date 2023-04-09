simple-generator
===

# data generator library
```typescript

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
```
```json
{
  "name": {
    "first": "안녕 121113 LYoIU  하세요",
    "last": "b"
  },
  "age": "44143",
  "address": {
    "city": "d",
    "street": "e",
    "number": "f"
  },
  "firends": [
    {
      "name": "name: uTUbo 입니다."
    }
  ]
}

```
