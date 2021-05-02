'use strict'

const http = require('http')
const express = require('express')
const chalk = require('chalk')
const port = process.env.PORT || 3000
const app = express()
const api = require('./api')
const server = http.createServer(app)

app.use('/api', api)

server.listen(port, () => {
  console.log(`${chalk.green('[plaziverse-api]')} server listening on port ${port}`)
})
