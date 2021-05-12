'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')

const port = process.env.PORT || 8081

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

//socket oi / websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  socket.on('agent/message', payload => {
    console.log(payload)
  })

  setInterval(() => {
    socket.emit('agent/message', { agent: 'xxx-yyy' })
  }, 2000)
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
})