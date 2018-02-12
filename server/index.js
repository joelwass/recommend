const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sqlModel = require('./models')

const routes = require('./routes/index')
const app = express()

const port = process.env.PORT || '3000'

app.use(cors())

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).json({ message: err.message })
})

sqlModel.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Express server listening on port ' + port)
  })
})
