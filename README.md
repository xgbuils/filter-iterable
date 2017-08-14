# filter-iterable

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`filter-iterable` exports a class that builds iterables that provide filter method.

## Install

``` bash
$ npm install filter-iterable --save
```

## Usage
``` javascript
const FilterIterable = require('filter-iterable')

const iterable = new FilterIterable(new Set([4, 2, 7, 8, 4, 7])) // (4 2 7 8 4 7)
    .filter(e => e % 2 === 0) // (4 2 8 4)
    .filter(e => e !== 8) // (4 2 4)

// converting to array:
[...iterable] // [4 2 4]

// traversing values:
for (const val of iterable) {
    // ...
}

// creating an iterator that traverses the values
let iterator = iterable[Symbol.iterator]()
iterator.next() // {value: 4, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 4, done: false}
iterator.next() // {value: undefined, done: true}

// Infinite iterable
const naturals = {
    [Symbol.iterator]: function* () {
        let i = 1
        while(true) { yield i++ }
    }
} // (1 2 3 4...)

new FilterIterable(naturals) // (1 2 3 4 5 6 7 8 9...)
    .filter(e => e % 2 === 0) // (2 4 6 8 10...)
```

## Support
- Node.js >=6
- ES2015 transpilers

## License
MIT

  [1]: https://travis-ci.org/xgbuils/filter-iterable.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/filter-iterable
  [3]: https://badge.fury.io/js/filter-iterable.svg
  [4]: https://badge.fury.io/js/filter-iterable
  [5]: https://coveralls.io/repos/github/xgbuils/filter-iterable/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/filter-iterable?branch=master
  [7]: https://david-dm.org/xgbuils/filter-iterable.svg
  [8]: https://david-dm.org/xgbuils/filter-iterable
