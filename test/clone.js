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
  'https://github.com/blinkmobile/cast-property-types.js',
  'https://github.com/blinkmobile/html-class-data.js',
  'https://github.com/blinkmobile/jqpromise.js',
  'https://github.com/blinkmobile/varied-definition.js',
  'https://github.com/docusign/DocuSign-Node-Client',
  'https://github.com/eHealthAfrica/kazana-bootstrap',
  'https://github.com/eHealthAfrica/kazana-config',
  'https://github.com/eHealthAfrica/kazana-example',
  'https://github.com/eHealthAfrica/kazana-integration-test',
  'https://github.com/eHealthAfrica/kazana-raw-data',
  'https://github.com/Flet/acetate',
  'https://github.com/Flet/cursorfun',
  'https://github.com/Flet/scenevr',
  'https://github.com/icyflame/cli-strlen',
  'https://github.com/icyflame/convert-angle',
  'https://github.com/icyflame/generator-nm-semistandard',
  'https://github.com/icyflame/get-hosts-cli',
  'https://github.com/icyflame/get-numbers',
  'https://github.com/icyflame/gh-gist-owner',
  'https://github.com/icyflame/gh-repos-creation-cal',
  'https://github.com/icyflame/gh-username-available',
  'https://github.com/icyflame/is-hexdigest',
  'https://github.com/icyflame/remove-min-max',
  'https://github.com/icyflame/terminal-wallet',
  'https://github.com/JGAntunes/ampersand-infinite-scroll',
  'https://github.com/JGAntunes/ampersand-pagination-mixin',
  'https://github.com/jokeyrhyme/appcache-fetcher.js',
  'https://github.com/larsthorup/amaze',
  'https://github.com/larsthorup/neo4j-sandbox',
  'https://github.com/muzzley/good-bunyan',
  'https://github.com/openimagerynetwork/oin-meta-generator',
  'https://github.com/patrickarlt/acetate-asset-revisions',
  'https://github.com/QubitProducts/react-test-tree',
  'https://github.com/scenevr/summary',
  'https://github.com/shama/webpack-stream',
  'https://github.com/spudly/error-subclass',
  'https://github.com/spudly/error-wrapper',
  'https://github.com/tomusdrw/grunt-sync',
  'https://github.com/wercker/docs'
  // 'https://github.com/alexjesp/global-replacer',
  // 'https://github.com/alexjesp/global-replacer',
  // 'https://github.com/blinkmobile/geolocation',
  // 'https://github.com/bnolan/universe',
  // 'https://github.com/brandonhorst/node-osa',
  // 'https://github.com/cliftonc/seguir-express-middleware',
  // 'https://github.com/developmentseed/collecticons'
  // 'https://github.com/developmentseed/project-seed',
  // 'https://github.com/eHealthAfrica/kazana',
  // 'https://github.com/eHealthAfrica/kazana-account',
  // 'https://github.com/Esri/esri-leaflet-geocoder',
  // 'https://github.com/hotosm/oam-catalog',
  // 'https://github.com/jflasher/firefly',
  // 'https://github.com/lakshyaranganath/qCube',
  // 'https://github.com/marek-ganko/battlehack-berlin-2015',
  // 'https://github.com/mekanika/query',
  // 'https://github.com/mekanika/skematic',
  // 'https://github.com/nearform/cloudwatchlogs-stream',
  // 'https://github.com/nearform/cloudwatchlogs-stream',
  // 'https://github.com/nearform/seneca-salesforce-store',
  // 'https://github.com/ricardofbarros/battleship-game',
  // 'https://github.com/scenevr/domsync',
  // 'https://github.com/scenevr/scenequery',
  // 'https://github.com/scenevr/server',
  // 'https://github.com/scenevr/slow',
  // 'https://github.com/tes/parxer'
]

var MODULES = {}
URLS.forEach(function (url) {
  var name = url
  MODULES[name] = url + '.git'
})

test('clone repos from github', function (t) {
  t.plan(1)
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
  })
})

test('lint repos', function (t) {
  t.plan(URLS.length)
  series(Object.keys(MODULES).map(function (name) {
    return function (cb) {
      var cwd = path.join(TMP, name)
      spawn(SEMISTANDARD, [], { cwd: cwd }, function (err) {
        t.error(err, name)
        cb(null)
      })
    }
  }))
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
