var path = require('path');
var replace = require('replace');

replace({
  regex: '"disallowSemicolons": true,',
  replacement: '',
  paths: [path.join(__dirname, 'node_modules', 'standard', 'rc', '.jscsrc')]
});

replace({
  regex: '"semi": \\[2, "never"\\],',
  replacement: '"semi": \[2, "always"\],',
  paths: [path.join(__dirname, 'node_modules', 'standard', 'rc', '.eslintrc')]
});
