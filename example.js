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
