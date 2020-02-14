const actions = {}

actions.create__Name__ = {
  validate: {
    values: {
      name: {
        minlength: 3
      }
    }
  },
  main: async function($) {
    return await $.app.db('__name__').create($.params.values)
  }
}

actions.update__Name__ = {
  validate: {
    values: {
      name: {
        minlength: 3
      }
    }
  },
  main: async function($) {
    return await $.app.db('__name__').update($.params.query, $.params.values)
  }
}

actions.get__Name__ = {
  main: async function($) {
    return await $.app.db('__name__').get($.params.query)
  }
}

actions.delete__Name__ = {
  main: async function($) {
    return await $.app.db('__name__').delete($.params.query)
  }
}

actions.list__Name__ = {
  main: async function($) {
    return await $.app.db('__name__').find($.params.query)
  }
}

module.exports = actions
