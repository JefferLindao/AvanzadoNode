'use strict'
const agent = {
  id: 1,
  uuid: 'yyyy-yy-yy',
  name: 'fixture',
  username: 'platzi',
  hostname: 'test-host',
  pid: 0,
  connected: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

const agents = [
  agent,
  extend(agent, { id: 2, uuid: 'yyy-yyy-yy', connected: false, username: 'test' }),
  extend(agent, { id: 3, uuid: 'yyy-yyy-yx' }),
  extend(agent, { id: 3, uuid: 'yyy-yyy-yx', username: 'test' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  platzi: agents.filter(a => a.username === 'platzi'),
  byUuid: id => agents.filter(a => a.uuid === id).shift(),
  byId: id => agents.filter(a => a.id === id).shift()
}
