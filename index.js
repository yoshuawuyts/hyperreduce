const indexer = require('hypercore-index')

module.exports = hyperReduce

// Distributed reduce on top of hypercore
// (obj, obj, fn, fn) -> null
function hyperReduce (inputFeed, db, reducer, done) {
  const pending = []
  db.get('last', function (_, last) {
    indexer({
      feed: inputFeed,
      db: db
    }, function (data, next) {
      reducer(last, data, function (err, newLast) {
        if (err) return next(err)
        last = newLast
        while (pending.length) pending.shift()(null, last)
        db.put('last', newLast, next)
      })
    }, done)
  })

  return function (cb) {
    db.get('last', function (err, last) {
      if (err) {
        if (!err.notFound) return cb(err)
        pending.push(cb)
      } else {
        cb(null, last)
      }
    })
  }
}
