# semistandard Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 11.0.0 2017-04-20

Updated to match the latest `standard v10.0.2` rules and the newest `standard-engine` features.

Check `standard` changelog that covers all the updates:
https://github.com/feross/standard/blob/master/CHANGELOG.md


In summary:

- **using deprecated Node.js APIs is now considered an error**. It's finally time to update those dusty old APIs!

### New features

- Update ESLint from 3.15.x to 3.19.x.
- Node.js API: Add `standard.lintTextSync` method

### New rules

*(Estimated % of affected standard users, based on test suite in parens)*

- Disallow using deprecated Node.js APIs ([node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)) [#693](https://github.com/feross/standard/issues/693) (13%)
  - Ensures that code always runs without warnings on the latest versions of Node.js
  - Ensures that safe Buffer methods (`Buffer.from()`, `Buffer.alloc()`) are used instead of `Buffer()`
- Enforce callbacks always called with Node.js-style error first ([standard/no-callback-literal](https://github.com/xjamundx/eslint-plugin-standard#rules-explanations)) [#623](https://github.com/feross/standard/issues/623) (3%)
  - Functions named `callback` or `cb` must be invoked with `null`, `undefined`, or an `Error` as the first argument
  - Disallows using a string instead of an `Error` object
  - Disallows confusing callbacks that do not follow the standard Node.js pattern
- Disallow any imports that come after non-import statements ([import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)) [#806](https://github.com/feross/standard/issues/806) (1%)
- Disallow unnecessary return await ([no-return-await](http://eslint.org/docs/rules/no-return-await)) [#695](https://github.com/feross/standard/issues/695) (0%)
- Disallow comma-dangle in functions ([comma-dangle](http://eslint.org/docs/rules/comma-dangle)) [#787](https://github.com/feross/standard/issues/787) (0%)
- Disallow repeated exports of names or defaults ([import/export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md)) [#806](https://github.com/feross/standard/issues/806) (0%)
- Disallow import of modules using absolute paths ([import/no-absolute-path](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md)) [#806](https://github.com/feross/standard/issues/806) (0%)
- Disallow Webpack loader syntax in imports ([import/no-webpack-loader-syntax](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)) [#806](https://github.com/feross/standard/issues/806) (0%)
- Disallow comparing against -0 ([no-compare-neg-zero](http://eslint.org/docs/rules/no-compare-neg-zero)) [#812](https://github.com/feross/standard/issues/812) (0%)

### Changed rules
- Relax rule: allow using `...rest` to omit properties from an object ([no-unused-vars](http://eslint.org/docs/rules/no-unused-vars)) [#800](https://github.com/feross/standard/issues/800)
  - This is a common and useful pattern in React/JSX apps!
- Relax rule: allow Flow `import type` statements ([import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)) [#599](https://github.com/feross/standard/issues/599)
  - These are no longer considered to be "duplicate imports"
- Relax rule: Treat `process.exit()` the same as `throw` in code path analysis ([node/process-exit-as-throw](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md)) [#699](https://github.com/feross/standard/issues/699)
  - Makes certain other rules work better and give fewer false positives
- Relax rule: allow Unnecessary Labels ([no-extra-label](http://eslint.org/docs/rules/no-extra-label))
  - Redundant, since "no-labels" is already enabled, which is more restrictive

(from standard 10.0.2):
- Relax rule: Disallow import of modules using absolute paths ([import/no-absolute-path](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md)) [#861](https://github.com/feross/standard/issues/861)
  - This rule was responsible for up to 25% of the running time of `standard`, so we are disabling it until its performance improves.





## 10.0.0 2017-03-06

Updated to match the latest `standard` rules and the newest `standard-engine` features.

@feross did a great writeup on the `standard` changelog that covers all the updates:
https://github.com/feross/standard/blob/master/CHANGELOG.md

In summary:
### New features

- Update ESLint from 3.10.x to 3.15.x
- 3 additional rules are now fixable with `standard --fix`

### New rules

*(Estimated % of affected standard users, based on test suite in parens)*

- Disallow mixing different operators without parens ([no-mixed-operators](http://eslint.org/docs/rules/no-mixed-operators)) [#566](https://github.com/feross/standard/issues/566) (5%)
- Enforce 1 newline at end of file (previously 1 or 2 were ok) ([no-multiple-empty-lines](http://eslint.org/docs/rules/no-multiple-empty-lines)) [#733](https://github.com/feross/standard/issues/733) (3%)
- Disallow Unused Expressions ([no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions)) [#690](https://github.com/feross/standard/issues/690) (3%)
  - Note: this affects users of the Chai test framework. [Read about the changes you need to make](https://github.com/feross/standard/issues/690#issuecomment-278533482).
- Disallow redundant return statements ([no-useless-return](http://eslint.org/docs/rules/no-useless-return)) [#694](https://github.com/feross/standard/issues/694) (1%)
- Disallow Incorrect Early Use ([no-use-before-define](http://eslint.org/docs/rules/no-use-before-define)) [#636](https://github.com/feross/standard/issues/636) (0%)
- Enforce that Promise rejections are passed an Error object as a reason ([prefer-promise-reject-errors](http://eslint.org/docs/rules/prefer-promise-reject-errors)) [#777](https://github.com/feross/standard/issues/777) (0%)
- Enforce comparing `typeof` expressions against string literals ([valid-typeof](http://eslint.org/docs/rules/valid-typeof)) [#629](https://github.com/feross/standard/issues/629) (0%)
- Enforce spacing around * in generator functions ([generator-star-spacing](http://eslint.org/docs/rules/generator-star-spacing)) [#724](https://github.com/feross/standard/issues/724) (0%)
- Disallow Unnecessary Labels ([no-extra-label](http://eslint.org/docs/rules/no-extra-label)) [#736](https://github.com/feross/standard/issues/736) (0%)
- Disallow spacing between template tags and their literals ([template-tag-spacing](http://eslint.org/docs/rules/template-tag-spacing)) [#755](https://github.com/feross/standard/issues/775) (0%)
- Disallow padding within switch statements and classes ([padded-blocks](http://eslint.org/docs/rules/padded-blocks)) [#610](https://github.com/feross/standard/issues/610) (0%)
- Enforce that Symbols are passed a description ([symbol-description](http://eslint.org/docs/rules/symbol-description)) [#630](https://github.com/feross/standard/issues/630) (0%)

### Changed rules

- Relax rule: allow TypeScript Triple-Slash Directives (spaced-comment) [#660](https://github.com/feross/standard/issues/660)
- Relax rule: allow Flow Comments (spaced-comment) [#661](https://github.com/feross/standard/issues/661)


## 9.0.0 2016-09-03

Updated to match the latest `standard` rules and the newest `standard-engine` features.

@feross did a great writeup on the `standard` changelog that covers all the updates:
https://github.com/feross/standard/blob/master/CHANGELOG.md

In summary:

### New features

- Upgrade to ESLint v3 (http://eslint.org/docs/user-guide/migrating-to-3.0.0)
  - **BREAKING:** Drop support for node < 4 (this was a decision made by the ESLint team)
- Expose ESLint's `--fix` command line flag [standard-engine/#107](https://github.com/Flet/standard-engine/issues/107)
  - Lightweight, no additional dependencies, fixes dozens of rules automatically
  - **Note:** for `semistandard`, we left the existing `--format` flag in place, which uses `semistandard-format`, but I highly recommend using `--fix` instead!


### New rules

*(Estimated % of affected standard users, based on test suite in parens)*

- Enforce placing object properties on separate lines ([object-property-newline](http://eslint.org/docs/rules/object-property-newline)) [#524](https://github.com/feross/standard/issues/524) (2%)
- Require block comments to be balanced ([spaced-comment "balanced"](http://eslint.org/docs/rules/spaced-comment)) [#572](https://github.com/feross/standard/issues/572) (2%)
- Disallow constant expressions in conditions ([no-constant-condition](http://eslint.org/docs/rules/no-constant-condition)) [#563](https://github.com/feross/standard/issues/563) (1%)
- Disallow renaming import, export, and destructured assignments to the same name ([no-useless-rename](http://eslint.org/docs/rules/no-useless-rename)) [#537](https://github.com/feross/standard/issues/537) (0%)
- Disallow spacing between rest and spread operators and their expressions ([rest-spread-spacing](http://eslint.org/docs/rules/rest-spread-spacing)) [#567](https://github.com/feross/standard/issues/567) (0%)
- Disallow the Unicode Byte Order Mark (BOM) ([unicode-bom](http://eslint.org/docs/rules/unicode-bom)) [#538](https://github.com/feross/standard/issues/538) (0%)
- Disallow assignment to native objects/global variables ([no-global-assign](http://eslint.org/docs/rules/no-global-assign)) [#596](https://github.com/feross/standard/issues/596) (0%)
- Disallow negating the left operand of relational operators ([no-unsafe-negation](http://eslint.org/docs/rules/no-unsafe-negation)) [#595](https://github.com/feross/standard/issues/595) (0%)
- Disallow template literal placeholder syntax in regular strings ([no-template-curly-in-string](http://eslint.org/docs/rules/no-template-curly-in-string)) [#594](https://github.com/feross/standard/issues/594) (0%)
- Disallow tabs in file ([no-tabs](http://eslint.org/docs/rules/no-tabs)) [#593](https://github.com/feross/standard/issues/593) (0%)

### Changed rules

- Relax rule: Allow template literal strings (backtick strings) to avoid escaping  [#421](https://github.com/feross/standard/issues/421)
- Relax rule: Do not enforce spacing around * in generator functions (https://github.com/feross/standard/issues/564#issuecomment-234699126)
  - This is a temporary workaround for `babel` users who use async generator functions.


## 8.0.0 2016-05-12

Updated to match the latest `standard` rules and use the latest version of `semistandard-format`.

### New Rules
- Require camelCase ([camelcase](http://eslint.org/docs/rules/camelcase))
- Disallow unnecessary escape usage ([no-useless-escape](http://eslint.org/docs/rules/no-useless-escape))
- Disallow duplicate imports ([no-duplicate-imports](http://eslint.org/docs/rules/no-duplicate-imports))
- Disallow unmodified conditions of loops ([no-unmodified-loop-condition](http://eslint.org/docs/2.0.0/rules/no-unmodified-loop-condition))
- Disallow whitespace before properties ([no-whitespace-before-property](http://eslint.org/docs/2.0.0/rules/no-whitespace-before-property))
- Disallow control flow statements in `finally` blocks ([no-unsafe-finally](http://eslint.org/docs/rules/no-unsafe-finally))
- Disallow unnecessary computed property keys on objects ([no-useless-computed-key](http://eslint.org/docs/rules/no-useless-computed-key))
- Validate spacing before closing bracket in JSX ([react/jsx-space-before-closing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md))

## 6.1.1 2016-06-17
* Bump standard-engine to 1.8.1, which fixes an NPE. (thanks again @wombleton)

## 6.1.0 2015-06-16
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
