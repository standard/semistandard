var path = require('path')
var semistandard = require('../')
var test = require('tape')
var filePath = path.resolve('./bin/cmd.js')

test('api usage', function (t) {
  t.plan(6)
  semistandard.lintFiles(['bin/cmd.js'], {}, function (err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 2, 'error count 2')

    t.equal(path.resolve(result.results[0].filePath), filePath, 'error filepath correct')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'first mising semicolon message')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'second mising semicolon message')
  })
})
