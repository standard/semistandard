# JavaScript Semi-Standard Style
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

### One Semicolon for the Dark Lord on his dark throne

All the goodness of [feross/standard] with semicolons sprinkled on top.

## Install

```bash
npm install semistandard
```

## Rules

Importantly:

- **semicolons**
- Check [feross/standard] for the rest of the rules.

## Badge

Use this in one of your projects? Include one of these badges in your readme to
let people know that your code is using the standard style.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```markdown
[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)
```

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

```markdown
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
```

## Usage

The easiest way to use JavaScript Semi-Standard Style to check your code is to install it
globally as a Node command line program. To do so, simply run the following command in
your terminal (flag `-g` installs `semistandard` globally on your system, omit it if you want
to install in the current working directory):

```bash
npm install semistandard -g
```

After you've done that you should be able to use the `semistandard` program. The simplest use
case would be checking the style of all JavaScript files in the current working directory:

```
$ semistandard
Error: Use JavaScript Semi-Standard Style
  lib/torrent.js:950:11: Expected '===' and instead saw '=='.
```

### Editor plugins

- **Sublime users**: Try [SublimeLinter-contrib-semistandard](https://github.com/Flet/SublimeLinter-contrib-semistandard) for linting in your editor!
- **Atom users** - Install [Linter](https://atom.io/packages/linter) and [linter-js-standard](https://atom.io/packages/linter-js-standard) (don't you mind with the misleading name it supports both styles).


### What you might do if you're clever

1. Add it to `package.json`

  ```json
  {
    "name": "my-cool-package",
    "devDependencies": {
      "semistandard": "*"
    },
    "scripts": {
      "test": "semistandard && node my-normal-tests-littered-with-semicolons.js"
    }
  }
  ```

2. Check style automatically when you run `npm test`

  ```
  $ npm test
  Error: Code style check failed:
    lib/torrent.js:950:11: Expected '===' and instead saw '=='.
  ```

3. Never give style feedback on a pull request again! (unless it's about semicolons)


See [feross/standard] for more information.

[travis-image]: https://img.shields.io/travis/Flet/semistandard.svg?style=flat-square
[travis-url]: https://travis-ci.org/Flet/semistandard
[npm-image]: https://img.shields.io/npm/v/semistandard.svg?style=flat-square
[npm-url]: https://npmjs.org/package/semistandard
[downloads-image]: https://img.shields.io/npm/dm/semistandard.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/semistandard
[feross/standard]: https://github.com/feross/standard
