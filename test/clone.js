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

// var URLs = require('./semistandard-repos.json')
var URLS = [
  'https://github.com/Flet/cursorfun'
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
      var args = ['clone', '--depth', 1, url, path.join(TMP, name)]
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
