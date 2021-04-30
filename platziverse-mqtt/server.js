'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}
const server = new mosca.Server(settings)

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`CLient Disconnected: ${client.id}`)
})

server.on(`published`, (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
})

server.on('ready', () => {
  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
})

server.on('error', handlerFatalError)

function handlerFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handlerFatalError)
process.on('unhandledRejection', handlerFatalError)
