"use strict"

const { existsSync, statSync, writeFileSync } = require("fs")
const { join } = require("path")

const got = require("got")

const oneMonth = 2.628e9

const getFileAge = filepath =>
  Date.now() - new Date(statSync(filepath).mtime).getTime()

module.exports = (url, filename) => {
  const filepath = join(process.cwd(), filename)

  if (existsSync(filepath)) {
    const age = getFileAge(filepath)
    if (age < oneMonth) {
      return Promise.resolve(filepath)
    }
  }

  return got(url)
    .then(res => writeFileSync(filepath, res.body.trim()) || filepath)
    .catch(e => console.error(e) || process.exit(1))
}
