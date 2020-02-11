const actions = {}

actions.projectCreate = {
  main: async function($) {
    return await $.app.db('project').create($.params.values)
  }
}

actions.projectUpdate = {
  main: async function($) {
    return await $.app.db('project').update($.params.query, $.params.values)
  }
}

actions.projectGet = {
  main: async function($) {
    return await $.app.db('project').get($.params.query)
  }
}

actions.projectList = {
  main: async function($) {
    return await $.app.db('project').find($.params.query)
  }
}

actions.projectCount = {
  main: async function($) {
    return await $.app.db('project').find($.params.query)
  }
}

module.exports = actions
