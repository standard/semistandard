var semistandard = require('../')
var test = require('tape')

test('api usage', function (t) {
  t.plan(6)
  semistandard.lintFiles([], { cwd: 'bin' }, function (err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 42, 'error count 42')

    t.equal(result.results[0].filePath, 'bin/cmd.js', 'error filepath correct')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'first mising semicolon message')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'second mising semicolon message')
  })
})
