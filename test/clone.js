#!/usr/bin/env node

/**
 * Clones several projects that are known to follow "JavaScript Standard Style" and runs
 * the `standard` style checker to verify that it passes without warnings. This helps
 * ensure we don't accidentally introduce new style rules that cause previously "good"
 * code to start failing with new warnings! (And if we do, then that needs to be a MAJOR
 * VERSION BUMP.)
 */

const cp = require('child_process')
const extend = require('xtend')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const series = require('run-series')
const test = require('tape')

const TMP = path.join(__dirname, '..', 'tmp')
const SEMISTANDARD = path.join(__dirname, '..', 'bin', 'cmd.js')

// var URLs = require('./semistandard-repos.json')
const URLS = [
  'https://github.com/Flet/cursorfun'
]

const MODULES = {}
URLS.forEach(function (url) {
  const spliturl = url.split('/')
  const name = spliturl[spliturl.length - 1]
  MODULES[name] = url + '.git'
})

test('clone repos from github', function (t) {
  rimraf.sync(TMP)
  mkdirp.sync(TMP)

  series(Object.keys(MODULES).map(function (name) {
    const url = MODULES[name]
    return function (cb) {
      const args = ['clone', '--depth', 1, url, path.join(TMP, name)]
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
      const cwd = path.join(TMP, name)
      spawn('node', [SEMISTANDARD], { cwd }, function (err) {
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
  const child = cp.spawn(command, args, extend({ stdio: 'inherit' }, opts))
  child.on('error', cb)
  child.on('close', function (code) {
    if (code !== 0) cb(new Error('non-zero exit code: ' + code))
    else cb(null)
  })
  return child
}
