var merge = require('merge')
var standardPackageJson = require('../package.json')
var semiPackageJson = require('./semistandard-package.json')

var mergeKeys = ['dependencies', 'devDependencies', 'standard']
var concatArrays = ['keywords']

var newPackageJson = merge(true, semiPackageJson)

mergeKeys.forEach(function (key) {
  newPackageJson[key] = merge(standardPackageJson[key], semiPackageJson[key])
})

concatArrays.forEach(function (key) {
  newPackageJson[key] = standardPackageJson[key].concat(semiPackageJson[key])
})

console.log(JSON.stringify(newPackageJson, null, 2));