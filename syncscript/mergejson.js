var merge = require('merge')
var standardPackageJson = require('./standard/package.json')
var semiPackageJson = require('../package.json')

var mergeKeys = ['dependencies', 'devDependencies', 'standard', 'scripts']

var newPackageJson = merge(true, semiPackageJson)

mergeKeys.forEach(function (key) {
  newPackageJson[key] = merge(standardPackageJson[key], semiPackageJson[key])
})

console.log(JSON.stringify(newPackageJson, null, 2))
