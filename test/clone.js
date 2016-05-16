#!/usr/bin/env node

/**
 * Clones several projects that are known to follow "JavaScript Standard Style" and runs
 * the `standard` style checker to verify that it passes without warnings. This helps
 * ensure we don't accidentally introduce new style rules that cause previously "good"
 * code to start failing with new warnings! (And if we do, then that needs to be a MAJOR
 * VERSION BUMP.)
 */

var cp = require('child_process')
var extend = require('xtend')
var mkdirp = require('mkdirp')
var path = require('path')
var rimraf = require('rimraf')
var series = require('run-series')
var test = require('tape')

var TMP = path.join(__dirname, '..', 'tmp')
var SEMISTANDARD = path.join(__dirname, '..', 'bin', 'cmd.js')

var URLS = [
  'https://github.com/AlexeyGorokhov/delegate-normalizer',
  'https://github.com/AlexeyGorokhov/directory-files',
  'https://github.com/AlexeyGorokhov/jwt-identity',
  'https://github.com/AlexeyGorokhov/server-error-handler',
  'https://github.com/AlexeyGorokhov/stylesheet-injector',
  'https://github.com/AlexeyGorokhov/templator',
  'https://github.com/AlexeyGorokhov/ui-lang-detector',
  'https://github.com/Esri/Leaflet.shapeMarkers',
  'https://github.com/Esri/esri-leaflet-heatmap-feature-layer',
  'https://github.com/Flet/acetate',
  'https://github.com/Flet/cursorfun',
  'https://github.com/Flet/scenevr',
  'https://github.com/Hypercubed/wc.js',
  'https://github.com/JGAntunes/ampersand-infinite-scroll',
  'https://github.com/JGAntunes/ampersand-pagination-mixin',
  'https://github.com/Jam3/gl-shader-output',
  'https://github.com/JamieMason/shrinkpack',
  'https://github.com/MyPureCloud/ember-webrtc-devices',
  'https://github.com/MyPureCloud/ember-webrtc-troubleshoot',
  'https://github.com/RobLoach/jquery-once',
  'https://github.com/RobLoach/metalsmith-feedparser',
  'https://github.com/RobLoach/nconf-toml',
  'https://github.com/Roilan/mailchimpify',
  'https://github.com/Sagacify/logger',
  'https://github.com/SoullessWaffle/dotifier',
  'https://github.com/Woorank/social-url',
  'https://github.com/Woorank/structured-logging',
  'https://github.com/anarh/demo-scss-npm-module',
  'https://github.com/anarh/node-sass-import',
  'https://github.com/anarh/node-sass-import-example',
  'https://github.com/bb-ffbb/bbffbb-scraper',
  'https://github.com/bithound/cli.bithound.io',
  'https://github.com/blakeembrey/pluralize',
  'https://github.com/blinkmobile/varied-definition.js',
  'https://github.com/bnolan/kollection',
  'https://github.com/chrisinajar/american-sounding-names',
  'https://github.com/chrisinajar/anchor-pushstate',
  'https://github.com/chrisinajar/any-storage',
  'https://github.com/chrisinajar/collect-methods',
  'https://github.com/chrisinajar/config-request',
  'https://github.com/chrisinajar/has-chrome-storage',
  'https://github.com/chrisinajar/invoke-handler',
  'https://github.com/chrisinajar/json-stylesheets',
  'https://github.com/chrisinajar/main-loop-app',
  'https://github.com/chrisinajar/not-mercury',
  'https://github.com/chrisinajar/orderbook-calculation',
  'https://github.com/chrisinajar/weakmap-animation',
  'https://github.com/developmentseed/project-seed',
  'https://github.com/edenspiekermann/a11y-toggle',
  'https://github.com/esri/arcgis-to-geojson',
  'https://github.com/ethers/bitcoin-proof',
  'https://github.com/gabmontes/tiny-promisify',
  'https://github.com/geowarin/electron-hot-loader',
  'https://github.com/hotosm/oam-browser-filters',
  'https://github.com/hotosm/oam-catalog',
  'https://github.com/hudson-taylor/http-transport',
  'https://github.com/hudson-taylor/tcp-transport',
  'https://github.com/hudson-taylor/utils',
  'https://github.com/icyflame/convert-angle',
  'https://github.com/icyflame/cstimer-txt-to-json',
  'https://github.com/icyflame/generator-nm-semistandard',
  'https://github.com/icyflame/get-hosts-cli',
  'https://github.com/icyflame/get-numbers',
  'https://github.com/icyflame/math-sort',
  'https://github.com/icyflame/remove-min-max',
  'https://github.com/javiercejudo/is-sorted',
  'https://github.com/jonschlinkert/window-size',
  'https://github.com/jstransformers/inputformat-to-jstransformer',
  'https://github.com/kesla/node-snappy',
  'https://github.com/kesla/tapava',
  'https://github.com/larsthorup/amaze',
  'https://github.com/larsthorup/neo4j-sandbox',
  'https://github.com/larsthorup/node-request-har-capture',
  'https://github.com/larsthorup/node-sheet-reader',
  'https://github.com/larsthorup/sinon-har-server',
  'https://github.com/lovell/highwayhash',
  'https://github.com/lovell/petra',
  'https://github.com/lw7360/asciiartfarts',
  'https://github.com/marvinroger/node-binary-file',
  'https://github.com/mattdesl/scrape-scripts',
  'https://github.com/mattdesl/touch-position',
  'https://github.com/micnews/apple-news',
  'https://github.com/micnews/array-merge-equal',
  'https://github.com/micnews/article-json-to-apple-news',
  'https://github.com/micnews/dom-to-vdom',
  'https://github.com/micnews/embedly-url',
  'https://github.com/micnews/execute-scripts',
  'https://github.com/micnews/html-to-amp',
  'https://github.com/micnews/levelgraph-query',
  'https://github.com/micnews/save-selection',
  'https://github.com/micnews/walk-apple-news-format',
  'https://github.com/muzzley/zmq-pool',
  'https://github.com/nebez/gulp-semistandard',
  'https://github.com/numo-labs/aws-lambda-canary',
  'https://github.com/patrickarlt/acetate',
  'https://github.com/patrickarlt/acetate-asset-revisions',
  'https://github.com/patrickarlt/leaflet-virtual-grid',
  'https://github.com/patrickarlt/tiny-binary-search',
  'https://github.com/pwmckenna/node-travis-encrypt',
  'https://github.com/rstacruz/dom101',
  'https://github.com/scenevr/summary',
  'https://github.com/scijs/integrate-adaptive-simpson',
  'https://github.com/scijs/minimize-golden-section-1d',
  'https://github.com/scijs/ndarray-blas-level1',
  'https://github.com/scijs/ndarray-blas-level2',
  'https://github.com/scijs/ndarray-givens-qr',
  'https://github.com/shama/gaze',
  'https://github.com/shyiko/node-minimal-viable-pool',
  'https://github.com/sotojuan/anicollage',
  'https://github.com/sotojuan/anicollage-cli',
  'https://github.com/sotojuan/bitcly',
  'https://github.com/sotojuan/nani',
  'https://github.com/sotojuan/nani-cli',
  'https://github.com/sotojuan/sec-to-min',
  'https://github.com/sotojuan/tapes',
  'https://github.com/sotojuan/trashss',
  'https://github.com/sotojuan/wwwtxt',
  'https://github.com/sotojuan/zwwwtxt',
  'https://github.com/spudly/error-subclass',
  'https://github.com/spudly/error-wrapper',
  'https://github.com/thebergamo/k7',
  'https://github.com/thebergamo/k7-mongoose',
  'https://github.com/thebergamo/k7-sequelize',
  'https://github.com/voxpelli/node-installed-check',
  'https://github.com/wKovacs64/hibp',
  'https://github.com/wKovacs64/pwned',
  'https://github.com/warbrett/node-cronofy',
  'https://github.com/wbinnssmith/arraybuffer-equal',
  'https://github.com/wbinnssmith/promise-try',
  'https://github.com/wbinnssmith/smear'
]

var MODULES = {}
URLS.forEach(function (url) {
  var spliturl = url.split('/')
  var name = spliturl[spliturl.length - 1]
  MODULES[name] = url + '.git'
})

test('clone repos from github', function (t) {
  rimraf.sync(TMP)
  mkdirp.sync(TMP)

  series(Object.keys(MODULES).map(function (name) {
    var url = MODULES[name]
    return function (cb) {
      var args = [ 'clone', '--depth', 1, url, path.join(TMP, name) ]
      // TODO: Start `git` in a way that works on Windows – PR welcome!
      spawn('git', args, {}, cb)
    }
  }), function (err) {
    if (err) throw err
    t.pass('cloned repos')
    t.end()
  })
})

test('lint repos', function (t) {
  series(Object.keys(MODULES).map(function (name) {
    return function (cb) {
      var cwd = path.join(TMP, name)
      spawn(SEMISTANDARD, [], { cwd: cwd }, function (err) {
        t.error(err, name)
        cb(null)
      })
    }
  }), function (err) {
    if (err) throw err
    t.end()
  })
})

function spawn (command, args, opts, cb) {
  var child = cp.spawn(command, args, extend({ stdio: 'inherit' }, opts))
  child.on('error', cb)
  child.on('close', function (code) {
    if (code !== 0) cb(new Error('non-zero exit code: ' + code))
    else cb(null)
  })
  return child
}
