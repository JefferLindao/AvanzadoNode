'use strict'

const test = require('ava')
const request = require('supertest')
const server = require('../server')

test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'shoult not return an error')
      const body = res.body
      t.deepEqual(body, {}, 'response body be the expected')
      t.end()
    })
})
