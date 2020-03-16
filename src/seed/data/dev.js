const Record = require('../../models/record')

const records = [
  {
    name: 'Le Ha Phan',
    score: 100 
  },
  {
    name: 'Le Huy Phan',
    score: 10 
  },
]

const populateRecords = done => {
  return Record.deleteMany({})
    .then(() => {
      return Promise.all(records.map(record => new Record(record)))
    })
    .then(res => {
      return Promise.all(res.map(record => record.save()))
    })
}


module.exports = {
  records,
  populateRecords
}
