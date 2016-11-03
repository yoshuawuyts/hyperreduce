# hyperreduce [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Distributed reduce on top of hypercore.

## Usage
```js
const hypercore = require('hypercore')
const memdb = require('memdb')

const reduce = require('./')
const core = hypercore(memdb())
const inp = core.createFeed()

const head = reduce(inp, memdb({ valueEncoding: 'json' }), reducer)
head(function (err, last) {
  if (err) throw err
  console.log('head:', last || 'no data')
})

function reducer (last, data, next) {
  last = last || 0
  console.log('last:', last)
  next(null, last + data.length)
}

inp.append('hello planet')
inp.append('hello planet')
inp.append('hello planet')
```

## Why
We believe ops doesn't need to be complicated. If `hypercore` is distributed
streams, `hyperfilter` is a distributed reducer for streams. We needed this to
to turn our feed of server errors into a single meaningful value.

## API
### getLasthyperReduce(inputFeed, db, reducer(last, data, next), done?)
Create a new reduce function that reads data from an input `hypercore` feed to
and applies the `reducer` function.

### getLast(cb(err, last))
Get the last value from `hyperreduce`.

## Installation
```sh
$ npm install hyperreduce
```

## See Also
- https://github.com/mafintosh/hypercore
- https://github.com/mafintosh/hyperpipe
- https://github.com/mafintosh/hypername
- https://github.com/mafintosh/hyperfilter
- https://github.com/yoshuawuyts/hypertail

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/hyperreduce.svg?style=flat-square
[3]: https://npmjs.org/package/hyperreduce
[4]: https://img.shields.io/travis/yoshuawuyts/hyperreduce/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/hyperreduce
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/hyperreduce/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/hyperreduce
[8]: http://img.shields.io/npm/dm/hyperreduce.svg?style=flat-square
[9]: https://npmjs.org/package/hyperreduce
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
