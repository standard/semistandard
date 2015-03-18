# JavaScript Semi-Standard Style
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/Flet/semistandard.svg?style=flat
[travis-url]: https://travis-ci.org/Flet/semistandard
[npm-image]: https://img.shields.io/npm/v/semistandard.svg?style=flat
[npm-url]: https://npmjs.org/package/semistandard
[downloads-image]: https://img.shields.io/npm/dm/semistandard.svg?style=flat
[downloads-url]: https://npmjs.org/package/semistandard

### One Semicolon for the Dark Lord on his dark throne

All the goodness of [feross/standard](https://github.com/feross/standard) with semicolons sprinkled on top.

## Install

```bash
npm install semistandard -g
```

## Rules
Importantly:
- **semicolons**
- Check [feross/standard][1] for the rest of the rules.

Sublime users: Try [SublimeLinter-contrib-semistandard](https://github.com/Flet/SublimeLinter-contrib-semistandard) for linting in your editor!

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

3. Never give style feedback on a pull request again! (unless its about semicolons)


See [feross/standard](https://github.com/feross/standard) for more information. In fact, you should probably just use the `standard` module instead.
