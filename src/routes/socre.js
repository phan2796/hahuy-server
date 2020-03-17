var express = require('express')
var router = express.Router()
const _ = require('lodash')
const Score = require('../models/score')


router.get('/', async (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .limit(10)
    .then(scores => {
      res.status(200).send({ scores })
    })
    .catch(e => {
      return res.status(400).send()
    })
})

router.post('/', function (req, res) {
  try {
    const score = new Score(req.body)
    score.save().then(() => {
      return res.status(200).json({ score })
    })
  } catch (error) {
    return res.status(400).send()
  }
})


module.exports = router
