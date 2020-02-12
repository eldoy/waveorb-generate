const actions = {}

actions.projectCreate = {
  validate: {
    values: {
      name: {
        minlength: 3
      }
    }
  },
  main: async function($) {
    return await $.app.db('project').create($.params.values)
  }
}

actions.projectUpdate = {
  validate: {
    values: {
      name: {
        minlength: 3
      }
    }
  },
  main: async function($) {
    return await $.app.db('project').update($.params.query, $.params.values)
  }
}

actions.projectGet = {
  main: async function($) {
    return await $.app.db('project').get($.params.query)
  }
}

actions.projectDelete = {
  main: async function($) {
    return await $.app.db('project').delete($.params.query)
  }
}

actions.projectList = {
  main: async function($) {
    return await $.app.db('project').find($.params.query)
  }
}

module.exports = actions
