# semistandard Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 6.1.0 2015-16-16
* Fix react rules to work again.
* New Rules coming from eslint-config-standard:
* [accessor-pairs](http://eslint.org/docs/rules/accessor-pairs.html) - warns if setters are defined without getters.
* ["one-var": [2, { "initialized": "never" }]](http://eslint.org/docs/rules/one-var.html) - Split initialized 'var' declarations into multiple statements.

## 6.0.0 2015-06-03
### BREAKING CHANGE: New Rules
* [no-extra-semi](http://eslint.org/docs/rules/no-extra-semi) - This rule is aimed at eliminating extra unnecessary semicolons. While not technically an error, extra semicolons can be a source of confusion when reading code.

* [semi-spacing](http://eslint.org/docs/rules/semi-spacing) - Disallow a space before semicolons and force a space after them.

## 5.0.0 2015-05-29
* Updated to `standard` rules 2.0.0
BREAKING CHANGE: new rule [operator-linebreak](http://eslint.org/docs/rules/operator-linebreak.html) set to "after"

## 4.3.0 2015-05-29
* Updated to `standard-engine` 1.6.0
* alternate parsers are now supported. See README.md for details!

## 4.2.2 2015-05-25
* Since `standard-engine` now supports passing a formatter, we've switched back to using it for the CLI.

## 4.2.1 2015-05-25
* Bumped all dependencies to their latest minor versions in package.json
* This includes a fix in `standard-engine` which dramatically speeds up lint times!

## 4.2.0 2015-05-20
* Switch to using `eslint-config-semistandard`, which extends `eslint-config-standard`. This means that non-breaking changes in `standard` should automatically get reflected now!

* Thanks to new collaborator @ricardofbarros, `semistandard` now has a --format (-F) flag! It uses his `semistandard-format` module which is a fork of `standard-format`. Good Stuff!

## 4.1.4 2015-05-02
* Merged from `standard`: relax rule `no-alert`

## 4.1.3 - 2015-04-23
* Merged from `standard` rules: relax `no-lone-blocks` rule for [ES6 reasons](https://github.com/feross/standard/issues/121)

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
