import test from 'ava'
import namesake from '.'
import isAvailable from 'npm-name'

// namesake's output is non-deterministic by design
// these tests just try to ensure values are returned

test('when given no input, provides random related terms', async t => {
  let names = await namesake()
  t.true(Array.isArray(names))
})

test('provides terms related to the given input', async t => {
  let names = await namesake('car')
  t.true(Array.isArray(names))
  t.true(names.length > 30)
})

test('`options.limit` limits the number of returned values', async t => {
  let names = await namesake('car', { limit: 5 })
  t.true(Array.isArray(names))
  t.true(names.length === 5)
})

test('results are available npm package names', async t => {
  let names = await namesake('car')
  let availables = await Promise.all(names.map(isAvailable))

  availables.forEach((available, i) => {
    t.true(available, `${names[i]} is available`)
  })
})
