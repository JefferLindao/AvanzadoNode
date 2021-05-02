'use strict'
const debug = require('debug')
const os = require('os')
const util = require('util')
const mqtt = require('mqtt')
const defaults = require('defaults')
const EventEmitter = require('events')
const { parsePayload } = require('./util')
const uuid = require('uuid')

const options = {
  name: 'untitled',
  username: 'platzi',
  interval: 5000,
  mqtt: {
    host: 'mqtt://localhost'
  }
}
class PlatziverseAgeny extends EventEmitter {
  constructor(opts) {
    super()

    this._options = defaults(opts, options)
    this._started = null
    this._timer = null
    this._client = null
    this._metrics = new Map()
  }
  addMetric(type, fn) {
    this._metrics.set(type, fn)
  }

  removeMetric(type) {
    this._metrics.delete(type)
  }

  connect() {
    if (!this._started) {
      const opts = this._options
      this._client = mqtt.connect(opts.mqtt.host)
      this._started = true

      this.client.subscribe('agent/message')
      this.client.subscribe('agent/connected')
      this.client.subscribe('agent/disconnected')

      this._client.on('connect', () => {
        this._agentId = uuid.v4()
        this.emit('connected', this._agentId)

        this._timer = setInterval(async () => {
          if (this._metrics.size > 0) {
            let message = {
              agent: {
                uuid: this._agentId,
                username: opts.username,
                name: opts.name,
                hostname: os.hostname() || 'localhost',
                pid: process.pid
              },
              metric: [],
              timestamp: new Date().getTime()
            }
          }
          for (const [metric, fin] of this._metrics) {
            if (fn.length == 1) {
              fn = util.promisify(fn)
            }
            message.metric.push({
              type: metric,
              value: await Promise.resolve(fn())
            })
          }

          debug('Sending', message)

          this._client.publish('agent/message', JSON.stringify(message))
          this.emit('message', message)
        }, opts.interval)
      })

      this._client.on('message', (topic, payload) => {
        payload = parsePayload(payload)
        let broadcast = false
        switch (topic) {
          case 'agent/connected':
          case 'agent/disconnected':
          case 'agent/message':
            broadcast = payload && payload.agent && payload.agent.uuid !== this._agentId
            break
        }
        if (broadcast) {
          this.emit(topic, payload)
        }
      })

      this._client.on('error', () => this.disconnec())
    }
  }

  disconnec() {
    if (this._started) {
      clearInterval(this._timer)
      this._started = false
      this.emit('disconnnected', this._agentId)
      this._client.end()
    }
  }
}

module.exports = PlatziverseAgeny
