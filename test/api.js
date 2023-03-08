import { resolve } from 'node:path'
import test from 'tape'
import semistandard from '../index.js'

const filePath = resolve('./bin/cmd.js')

test('api: lintFiles', async (t) => {
  t.plan(5)
  const [result] = await semistandard.lintFiles([filePath])
  t.equal(typeof result, 'object', 'result is an object')

  t.equal(result.errorCount, 7, 'error count 7')

  t.equal(resolve(result.filePath), filePath, 'error filepath correct')
  t.equal(result.messages[0].message, 'Missing semicolon.', 'first missing semicolon message')
  t.equal(result.messages[1].message, 'Missing semicolon.', 'second missing semicolon message')
})

test('api: lintText', async (t) => {
  t.plan(4)
  const [result] = await semistandard.lintText('console.log("hi there")\n')

  t.equal(typeof result, 'object', 'result is an object')
  t.equal(result.errorCount, 2, 'error count 2')
  t.equal(result.messages[0].message, 'Strings must use singlequote.', 'singlequote message')
  t.equal(result.messages[1].message, 'Missing semicolon.', 'missing semicolon message')
})
