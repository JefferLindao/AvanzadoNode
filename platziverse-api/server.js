'use strict'

const debug = require('debug')('platziverse:api')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const port = process.env.PORT || 3000
const app = express()
const api = require('./api')
const server = http.createServer(app)

app.use('/api', api)

// Express Error handler

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handlerFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
if (!module.parent) {
  process.on('uncaughtException', handlerFatalError)
  process.on('unhandledRejection', handlerFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[plaziverse-api]')} server listening on port ${port}`)
  })
}

module.exports = server
