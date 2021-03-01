module.exports = {
  main: async function($) {
    const { query = {}, fields = {}, sort = {}, skip = 0, limit = 0 } = $.params
    return await $.app.db('__name__').find(query, { fields, sort, skip, limit })
  }
}
