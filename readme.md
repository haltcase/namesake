# namesake &middot; [![Version](https://img.shields.io/npm/v/namesake.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/namesake) [![License](https://img.shields.io/npm/l/namesake.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/namesake) [![Travis CI](https://img.shields.io/travis/citycide/namesake.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/citycide/namesake) [![LightScript](https://img.shields.io/badge/written%20in-lightscript-00a99d.svg)](http://www.lightscript.org)

> Find available & relevant npm package names for your project.

Supposedly:

> There are only three hard things in Computer Science:
> cache invalidation, naming things, off-by-one errors,
> and being original.
> - Phil Karlton et al.¹

¹ original quote is becoming lost to history / legend

`namesake` can do absolutely nothing to help you with
cache invalidation and off-by-one errors but it _can_
help you with naming things. Being original is still
up to you.

Check out the [cli version](https://github.com/citycide/namesake-cli)
if you want to use this easily at the command line.

## installation

```console
npm i namesake
```

## usage

```js
const namesake = require('namesake')

namesake('car').then(names => {
  // `names` is an Array of available package names
  // they're all guaranteed to be available on npm at time of use
  console.log(names)
})

/*
  [ 'accident',
  'automaker',
  'vehicles',
  'cadillac',
  'escalade',
  'motorcar',
  ... ]
*/
```

## api

### namesake
```js
namesake([keyword], [options = {}])
```

> **Arguments**

- `{String} [keyword]`: optional keyword to find related terms
- `{Object} [options = {}]`

| key       | type      | default | description                      |
| :-------: | :-------: | :-----: | -------------------------------- |
| `limit`   | `Number`  | 100¹    | Max number of results to return. |

If `keyword` is not provided, a random word will be chosen to which
all results will be related.

¹ This default is imposed by the [API](http://www.datamuse.com/api/), which allows values up to 1000.

> **Returns** `Promise<Array<String>>`

## see also

- [`namesake-cli`](https://github.com/citycide/namesake-cli) - the command line frontend to this module
- [LightScript](http://www.lightscript.org) - the compile-to-JS language this tool is written in, leveraging [Babel](https://babeljs.io)
- [Datamuse API](http://www.datamuse.com/api/) - powers the related word search capabilities
- [Set Get Go API](http://www.setgetgo.com/randomword/) - the random word API used in this module

## contributing

Pull requests and any [issues](https://github.com/citycide/namesake/issues)
found are always welcome.

1. Fork the project, and preferably create a branch named something like `feat-make-better`
2. Modify as needed, `src/index.lsc` being the source file
3. Make sure all tests continue to pass, and it never hurts to have more tests
4. Push & pull request! :tada:

## license

MIT © [Bo Lingen / citycide](https://github.com/citycide)
