'use strict'

const fs = require('fs')

const test = require('ava')
const {
  differenceInMilliseconds,
  subMonths,
  subWeeks
} = require('date-fns')
const isAvailable = require('npm-name')

const namesake = require('./index.js')
const cache = require('./cache.js')

// namesake's output is non-deterministic by design
// these tests just try to ensure values are returned

test('when given no input, provides random related terms', async t => {
  const names = await namesake()
  t.true(Array.isArray(names))
})

test('provides terms related to the given input', async t => {
  const names = await namesake('car')
  t.true(Array.isArray(names))
  t.true(names.length > 10)
})

test('`options.limit` limits the number of returned values', async t => {
  const names = await namesake('car', { limit: 5 })
  t.true(Array.isArray(names))
  t.true(names.length === 5)
})

test('results are available npm package names', async t => {
  const names = await namesake('car')
  const availables = await Promise.all(names.map(isAvailable))

  availables.forEach((available, i) => {
    t.true(available, `${names[i]} is available`)
  })
})

test('cache: downloads when the file does not exist', async t => {
  const filepath = './test-file.html'
  t.false(fs.existsSync(filepath))
  await cache('https://example.com', filepath)
  t.true(fs.existsSync(filepath))
  fs.unlinkSync(filepath)
})

test('cache: downloads when file is > 1 month old', async t => {
  const filepath = './test-old.html'
  await cache('https://example.com', filepath)
  t.true(fs.existsSync(filepath))

  const mtime = subMonths(new Date(), 2)
  fs.utimesSync(filepath, mtime, mtime)
  const fileTime = new Date(fs.statSync(filepath).mtime)
  t.true(differenceInMilliseconds(fileTime, mtime) < 1000)

  await cache('https://example.com', filepath)
  const modified = new Date(fs.statSync(filepath).mtime)
  t.true(differenceInMilliseconds(modified, new Date()) < 1000)
  fs.unlinkSync(filepath)
})

test('cache: does not download when file is < 1 month old', async t => {
  const filepath = './test-current.html'
  await cache('https://example.com', filepath)
  t.true(fs.existsSync(filepath))

  const mtime = subWeeks(new Date(), 2)
  fs.utimesSync(filepath, mtime, mtime)
  const fileTime = new Date(fs.statSync(filepath).mtime)
  t.true(differenceInMilliseconds(fileTime, mtime) < 100)

  await cache('https://example.com', filepath)
  // modified time should not have changed
  const sameTime = new Date(fs.statSync(filepath).mtime)
  t.true(differenceInMilliseconds(fileTime, sameTime) < 100)
  fs.unlinkSync(filepath)
})
