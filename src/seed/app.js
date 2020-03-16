require('../config/config')
require('../config/mongoose')

const {
  populateRecords,
} = require('./data/dev')

const yargs = require('yargs')

const argv = yargs
  .options({
    c: {
      alias: 'collections',
      describe: 'Collections to seed',
      array: true,
      default: 'all'
    }
  })
  .help()
  .alias('help', 'h').argv

let seedCollections = argv.c

let collections = [
  {
    collection: 'records',
    population: populateRecords
  }
]

// not all collections
if (seedCollections.findIndex(sc => sc === 'all') < 0) {
  collections = collections.filter(
    c => seedCollections.findIndex(sc => sc === c.collection) >= 0
  )
}

Promise.all(collections.map(c => c.population())).then(res => {
  collections
    .map(c => c.collection)
    .map((collection, index) => {
      console.log(`Imported ${res[index].length} ${collection}.`)
    })
  process.exit(0)
})
