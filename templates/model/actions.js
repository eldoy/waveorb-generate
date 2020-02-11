const actions = {}

actions.__name__Create = {
  main: async function($) {
    return await $.app.db.create($.params.values)
  }
}

actions.__name__Update = {
  main: async function($) {
    return await $.app.db.update($.params.query, $.params.values)
  }
}

actions.__name__Get = {
  main: async function($) {
    return await $.app.db.get($.params.query)
  }
}

actions.__name__List = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

actions.__name__Count = {
  main: async function($) {
    return await $.app.db.find($.params.query)
  }
}

module.exports = actions
