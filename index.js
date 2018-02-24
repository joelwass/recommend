const path = require('path')
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const withSass = require('@zeit/next-sass')
const sqlModel = require('./server/models')
const routes = require('./server/routes')

const conf = withSass({
  sassLoaderOptions: {
    includePaths: [path.resolve('./client/styles')]
  }
})

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  conf,
  dir: './client'
})
const handle = app.getRequestHandler();

(async () => {
  try {
    await sqlModel.sequelize.sync()
    await app.prepare()
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
        return res.status(err.status || 500).json({ message: err.message, stack: err.stack })
      }
      return res.status(500)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
})()
