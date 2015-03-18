#!/usr/bin/env node

var minimist = require('minimist')
var standard = require('../')

var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    verbose: 'v'
  },
  boolean: [
    'stdin',
    'verbose',
    'version'
  ],
  default: {
    stdin: !process.stdin.isTTY
  }
})

if (argv.help) {
  console.log(function () {
  /*
  Usage:
      semistandard <flags>

  Flags:
      -v, --verbose    Show error codes (so you can ignore specific rules)
          --stdin      Force processing input from stdin
      -h, --help       Display the help and usage details
          --version    Display the current version

  Report bugs:  https://github.com/Flet/semistandard/issues

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

standard({
  cwd: process.cwd(),
  files: argv._,
  format: argv.format,
  stdin: argv.stdin,
  verbose: argv.verbose
})
