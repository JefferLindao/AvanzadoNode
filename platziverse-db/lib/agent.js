'use strict'
function setupAgent(AgentModel) {
  function findById(id) {
    return AgentModel.findById(id)
  }

  return {
    findById
  }
}

module.exports = setupAgent
