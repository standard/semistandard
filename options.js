var path = require('path')
var pkg = require('./package.json')

module.exports = {
  // cmd, homepage, bugs all pulled from package.json
  cmd: 'semistandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: 'Semicolons For All!',
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  },
  formatter: require('semistandard-format'),
  formatterName: 'semistandard-format'
}
