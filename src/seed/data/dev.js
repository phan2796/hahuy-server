const Score = require('../../models/score')

const scores = [
  {
    name: 'Le Ha Phan',
    score: 100 
  },
  {
    name: 'Le Huy Phan',
    score: 10 
  },
]

const populateScores = done => {
  return Score.deleteMany({})
    .then(() => {
      return Promise.all(scores.map(score => new Score(score)))
    })
    .then(res => {
      return Promise.all(res.map(score => score.save()))
    })
}


module.exports = {
  scores,
  populateScores
}
