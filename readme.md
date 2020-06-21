# namesake &middot; [![Version](https://flat.badgen.net/npm/v/namesake)](https://www.npmjs.com/package/namesake) [![License](https://flat.badgen.net/npm/license/namesake)](https://www.npmjs.com/package/namesake)

> Find available & relevant npm package names for your project.

Supposedly:

> There are only three hard things in Computer Science:
> cache invalidation, naming things, off-by-one errors,
> and being original.
> - Phil Karlton et al.¹

¹ original quote is becoming lost to history / legend

`namesake` can do absolutely nothing to help you with cache invalidation and
off-by-one errors but it _can_ help you with naming things. Being original is
still up to you.

Check out the [command line frontend](https://github.com/citycide/namesake-cli)
if you want to use this easily from your terminal.

## installation

```console
npm i namesake
```

## usage

```js
const namesake = require('namesake')

namesake('worth').then(names => {
  // `names` is an Array of available package names
  // they're all guaranteed to be available on npm at time of use
  console.log(names)
})

/*
[ 'dollar-bill',
  'price-floor',
  'cheaper',
  'billion',
  'richest',
  'doable',
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
| `limit`   | `Number`  | 50¹     | Max number of results to return. |

If `keyword` is not provided, a random word will be chosen to which
all results will be related.

¹ The max number of words returned isn't guaranteed to be equal to `limit`, since
  the word list is pulled and then filtered based on npm name availability. The
  absolute maximum is 1000, which is imposed by the [API](http://www.datamuse.com/api/).
  `namesake` will always request more than your desired maximum to try to meet the
  provided limit after checking for availability.

> **Returns** `Promise<Array<String>>`

## see also

- [`namesake-cli`](https://github.com/citycide/namesake-cli) - the command line frontend to this module
- [Datamuse API](http://www.datamuse.com/api/) - powers the related word search capabilities
- [`english-words`](https://github.com/dwyl/english-words) - word list used here for random word selection

## contributing

Pull requests and any [issues](https://github.com/citycide/namesake/issues)
found are always welcome.

1. Fork the project, and preferably create a branch named something like `feat-make-better`
2. Modify the source files as needed
3. Make sure all tests continue to pass, and it never hurts to have more tests
4. Push & pull request! :tada:

## license

MIT © [Bo Lingen / citycide](https://github.com/citycide)
