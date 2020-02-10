const actions = {}

actions.create__Name__ = {
  main: async function($) {
    return await $.app.db.create($.params.values)
  }
}

actions.update__Name__ = {
  main: async function($) {
    return await $.app.db.update($.params.values)
  }
}

actions.show__Name__ = {
  main: async function($) {
    return await $.app.db.get($.params.query)
  }
}

actions.list__Name__ = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

actions.count__Name__ = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

module.exports = actions
