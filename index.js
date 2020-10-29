/*! semistandard. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
// programmatic usage
const Linter = require('standard-engine').linter

const opts = require('./options.js')

module.exports = new Linter(opts)
