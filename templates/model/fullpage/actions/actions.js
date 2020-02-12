const actions = {}

actions.__name__Create = {
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

actions.__name__Update = {
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

actions.__name__Get = {
  main: async function($) {
    return await $.app.db('__name__').get($.params.query)
  }
}

actions.__name__Delete = {
  main: async function($) {
    return await $.app.db('__name__').delete($.params.query)
  }
}

actions.__name__List = {
  main: async function($) {
    return await $.app.db('__name__').find($.params.query)
  }
}

module.exports = actions
