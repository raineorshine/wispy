# wispy
[![npm version](https://img.shields.io/npm/v/wispy.svg)](https://npmjs.org/package/wispy)
<!--
[![Build Status](https://travis-ci.org/raineorshine/wispy.svg?branch=master)](https://travis-ci.org/raineorshine/wispy)
-->

Reversible alternative syntax for Javascript

*What is a reversible transpiler?*

Normally transpilers are one-way: A given Coffeescript renders Javascript deterministically, but the output Javascript cannot unambiguously be converted back into Coffeescript (much less the original Javascript). A reversible syntax is a deterministic syntactical transpiler. This allows editing in a new syntax while 

wispy:

```hs
server.get((req, res) =>   
  fs.readFile('myfile', 'utf-8', (err, text) =>   
    if (err)   
      console.log('There was an error reading the file.')
      res.status(500).send(err)
    else   
      console.log('The contents of your file are: \n' + text)
      res.status(200).send(text)))

Javascript:

```js
server.get((req, res) => {
  fs.readFile('myfile', 'utf-8', (err, text) => {
    if (err) {
      console.log('There was an error reading the file.')
      res.status(500).send(err)
    }
    else {
      console.log('The contents of your file are: \n' + text)
      res.status(200).send(text)
    }
  })
})
```

## Install

```sh
$ npm install --save -g wispy
```

## Usage

```js
const wispy = require('wispy')
```

## Philosophy

It is not difficult to find criticism in Javascript as a language. But as a platform it is both ubiquitous, versatile, and increasingly performant. Coding in a language like Coffeescript or PureScript that compiles to Javascript offers the benefit of a more expressive/elegant language while still being able to target the most widespread platform on the planet.

There are a few problems though.

1. When you use an alternative language, you limit the number of people who can contribute to your project. It's not a Javascript project anymore, even though it outputs Javascript. It's a Coffeescript project, PureScript project, etc.

2. You add a build step. This adds complexity and friction with developers' existing build systems.

3. No matter how nice a language/workflow you have with your new, special language, you can only utilize it on your project. Any open source projects or team projects that are in Javascript force you back to the medieval age.

A reversible transpiler eliminates all these problems. It takes Javascript as input so it can be used on any open source project. It outputs Javascript so there is 0 friction with other people's Javascript tooling. It moves the language enhancements to the individual developer and seamlessly integrates with existing code

## License

ISC © [Raine Revere](http://raine.tech)
