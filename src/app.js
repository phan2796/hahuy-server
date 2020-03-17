require('./config/config')
require('./config/mongoose')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const scoreRouter = require('./routes/socre')
// limit cors for 1 origin (client app uri)
const origins = process.env.ALLOW_ORIGIN
  ? process.env.ALLOW_ORIGIN.split(',')
  : ''
app.use(
  cors({
    // @see https://expressjs.com/en/resources/middleware/cors.html
    origin: Array.isArray(origins)
      ? function (origin, callback) {
        if (origins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
      : '' // empty allow all origin
  })
)

app.use('/score', scoreRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).send()
})

module.exports = app
