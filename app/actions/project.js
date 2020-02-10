const actions = {}

actions.createProject = {
  main: async function($) {
    return await $.app.db.create($.params.values)
  }
}

actions.updateProject = {
  main: async function($) {
    return await $.app.db.update($.params.query, $.params.values)
  }
}

actions.showProject = {
  main: async function($) {
    return await $.app.db.get($.params.query)
  }
}

actions.listProjects = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

actions.countProject = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

module.exports = actions
