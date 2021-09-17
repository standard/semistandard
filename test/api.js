import { resolve } from 'node:path'
import test from 'tape'
import semistandard from '../index.js'

const filePath = resolve('./bin/cmd.js')

test('api usage', function (t) {
  t.plan(6)
  semistandard.lintFiles(['bin/cmd.js'], {}, function (err, result) {
    t.error(err, 'no error while linting')
    t.equal(typeof result, 'object', 'result is an object')
    t.equal(result.errorCount, 7, 'error count 7')

    t.equal(resolve(result.results[0].filePath), filePath, 'error filepath correct')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'first missing semicolon message')
    t.equal(result.results[0].messages[0].message, 'Missing semicolon.', 'second missing semicolon message')
  })
})
