'use strict'

const { request } = require('express')
const express = require('express')
const api = express.Router()

const { apiToken, endpoint } = require('./config')

api.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${endpoint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (error) {
    return next(error)
  }

  res.send(result)
})

api.get('/agent/:uuid', (req, res) => { })

api.get('/metrics/:uuid', (req, res) => { })

api.get('/metrics/:uuid/:type', (req, res) => { })

module.exports = api;
