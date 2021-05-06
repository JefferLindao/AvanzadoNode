'use strict'

const jtw = require('jsonwebtoken')

function sign(payload, secret, callback) {
  jtw.sign(payload, secret, callback)
}

function verify(token, secret, callback) {
  jtw.verify(token, secret, callback)
}

module.exports = {
  sign,
  verify
}
