const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlModel = require('./models')
const routes = require('./routes/index')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

sqlModel.sequelize.sync()
  .then(app.prepare())
  .then(() => {
    const server = express()

    server.use(cors())

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))

    server.use('/api/v1', routes)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // error handler
    server.use((err, req, res, next) => {
      if (dev) {
        return res.status(err.status || 500).json({ message: err.message })
      }
      return res.status(500)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
