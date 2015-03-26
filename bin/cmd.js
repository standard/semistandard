#!/usr/bin/env node

var minimist = require('minimist')
var standard = require('../')
var stdin = require('get-stdin')

var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    verbose: 'v'
  },
  boolean: [
    'help',
    'stdin',
    'verbose',
    'version'
  ]
})

// running `standard -` is equivalent to `standard --stdin`
if (argv._[0] === '-') {
  argv.stdin = true
  argv._.shift()
}

if (argv.help) {
  console.log(function () {
  /*
  semistandard - JavaScript Standard Style With Semicolons

  Usage:
      semistandard <flags> [FILES...]

      If FILES is omitted, then all JavaScript source files (*.js, *.jsx) in the current
      working directory are checked, recursively.

      Certain paths (node_modules/, .git/, coverage/, *.min.js, bundle.js) are
      automatically excluded.

  Flags:
      -v, --verbose   Show error codes. (so you can ignore specific rules)
          --stdin     Read file text from stdin.
          --version   Show current version.
      -h, --help      Show usage information.

  Readme:  https://github.com/flet/semistandard
  Report bugs:  https://github.com/flet/semistandard/issues

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (argv.stdin) {
  stdin(function (text) {
    standard.lintText(text, onResult)
  })
} else {
  var lintOpts = {}
  standard.lintFiles(argv._, lintOpts, onResult)
}

function onResult (err, result) {
  if (err) return error(err)
  if (result.errorCount === 0) process.exit(0)

  console.error(
    'Error: Use JavaScript Standard Style With Semicolons' +
    '(https://github.com/flet/semistandard)'
  )

  result.results.forEach(function (result) {
    result.messages.forEach(function (message) {
      console.error(
        '  %s:%d:%d: %s%s',
        result.filePath, message.line || 0, message.column || 0, message.message,
        argv.verbose ? ' (' + message.ruleId + ')' : ''
      )
    })
  })

  process.exit(1)
}

function error (err) {
  console.error('Unexpected Linter Output:\n')
  console.error(err.stack || err.message || err)
  console.error(
    '\nIf you think this is a bug in `semistandard`, open an issue: ' +
    'https://github.com/flet/semistandard'
  )
  process.exit(1)
}
