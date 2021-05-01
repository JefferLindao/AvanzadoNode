'use strict'
const EventEmitter = require('events')
class PlatziverseAgeny extends EventEmitter {
  constructor (opts) {
    super()

    this._options = opts
    this._started = null
    this._timer = null
  }

  connect () {
    if (!this._started) {
      this._started = true

      this.emit('connected')
      const opts = this._options
      this._timer = setInterval(() => {
        this.emit('agent/message', 'this is a message')
      }, opts.interval)
    }
  }

  disconnec () {
    if (this._started) {
      clearInterval(this._timer)
      this._started = false
      this.emit('disconnnected')
    }
  }
}

module.exports = PlatziverseAgeny
