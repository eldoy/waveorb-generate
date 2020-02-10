const actions = {}

actions.createTask = {
  main: async function($) {
    return await $.app.db.create($.params.values)
  }
}

actions.updateTask = {
  main: async function($) {
    return await $.app.db.update($.params.query, $.params.values)
  }
}

actions.showTask = {
  main: async function($) {
    return await $.app.db.get($.params.query)
  }
}

actions.listTasks = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

actions.countTask = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

module.exports = actions
