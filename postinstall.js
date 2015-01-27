var path = require('path');
var replace = require('replace');

replace({
  regex: '"asi": true',
  replacement: '"asi": false',
  paths: [path.join(__dirname, 'node_modules', 'standard', 'lib', '.jshintrc')]
});

replace({
  regex: '"disallowSemicolons": true,',
  replacement: '',
  paths: [path.join(__dirname, 'node_modules', 'standard', 'lib', '.jscsrc')]
});
