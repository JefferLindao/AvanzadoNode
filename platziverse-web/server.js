'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const { pipe } = require('./util')
const chalk = require('chalk')
const PlatziverseAgent = require('platziverse-agent')

const port = process.env.PORT || 8081

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))

//socket oi / websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

function handlerFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handlerFatalError)
process.on('unhandledRejection', handlerFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server listening on port: ${port}`)
  agent.connect()
})
