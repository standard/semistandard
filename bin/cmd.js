#!/usr/bin/env node

import('standard-engine').then(function (semiStandardEngine) {
  import('../options.js').then(function (options) {
    semiStandardEngine.cli(options.default)
  })
})
