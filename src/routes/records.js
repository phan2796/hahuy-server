var express = require('express')
var router = express.Router()
const _ = require('lodash')
const Record = require('../models/record')


router.get('/', async (req, res) => {
  Record.find()
    .then(records => {
      res.status(200).send({ records })
    })
    .catch(e => {
      return res.status(400).send()
    })
})

router.post('/', function (req, res) {
  try {
    const record = new Record(req.body)
    record.save().then(() => {
      return res.status(200).json({ expense })
    })
  } catch (error) {
    return res.status(400).send()
  }
})


module.exports = router
