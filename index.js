'use strict'

const { readFileSync } = require('fs')

const got = require('got')
const muse = require('datamuse')
const isAvailable = require('npm-name')
const slugify = require('slugify')

const getCachedFile = require('./cache')

const { floor, random, round } = Math

const wordListUrl =
  'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt'

const randomElement = array =>
  array[floor(random() * array.length)]

const getRandomWord = () =>
  getCachedFile(wordListUrl, './word-list.txt')
    .then(file => readFileSync(file, 'utf8').split('\n'))
    .then(randomElement)

const ensureWord = word =>
  word && typeof word === 'string'
    ? Promise.resolve(word)
    : getRandomWord().then(ensureWord)

const getWordList = (starter, max = 500) =>
  ensureWord(starter)
    .then(word => muse.words({ ml: word, max }))
    .then(data =>
      data && data.length
        ? data.map(o => slugify(o.word).toLowerCase())
        : getWordList()
    )

const getAvailableNames = (keyword, max) =>
  getWordList(keyword, max).then(words =>
    Promise.all(words.map(isAvailable)).then(availables =>
      words.filter((word, i) => availables[i])
    )
  )

const shuffle = array => {
  const clone = array.slice()
  let { length } = array

  let i
  while (length) {
    i = floor(random() * length--)
    ;[clone[i], clone[length]] = [clone[length], clone[i]]
  }

  return clone
}

module.exports = (keyword, { limit = 50 } = {}) => {
  // the actual number of words requested is higher
  // than the max set by the user, so that once
  // unavailable names are filtered out the user
  // will receive a number closer to their set limit

  const max = Math.min(1000, limit + 250)

  return getAvailableNames(keyword, max).then(names => {
    const shuffled = shuffle(names)
    return limit ? shuffled.slice(0, limit) : shuffled
  })
}
