# semistandard Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 4.1.2 - 2015-04-16
* Fixed programmatic usage so it actually works.

## 4.1.1 - 2015-04-15
* Update `standard-engine` version to fix crash on absolute filesystem path

## 4.1.0 - 2015-04-14

### Merged latest from standard 3.6.0:
* Rule turned off: `no-script-url`
* All warning rules changed to error
* Changed `space-before-function-parentheses` to `space-before-function-paren`
* new react rules added
  - `"react/jsx-boolean-value": 2`
  - `"react/jsx-quotes": [2, "single", "avoid-escape"]`
  - `"react/jsx-no-undef": 2`
  - `"react/jsx-sort-props": 0`
  - `"react/no-unknown-property": 2`

### Updates from `standard-engine`
* Ignore linting for all files in `.gitignore`.
* Removed `/git/**` exclusion as its redundant.
* Output errors to stdout instead of stderr.
