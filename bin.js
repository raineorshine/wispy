#! /usr/bin/env node

const com = require('commander')
const stdin = require('get-stdin-promise')
const pkg = require('./package.json')
const wispy = require('./')

const extendedHelp = `

    ${pkg.description}

    Usage:
    $ myfile.js < wispy`

com
  .version(pkg.version)
  .usage(extendedHelp)
  .parse(process.argv)

stdin.then(input => {
  console.log(wispy.parse(input).text)
})
