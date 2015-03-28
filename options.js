var path = require('path')
module.exports = {
  // cmd, homepage, bugs all pulled from package.json
  tagline: 'Semicolons For All!',
  eslintConfig: {
      configFile: path.join(__dirname, 'eslintrc.json')
  }
}
