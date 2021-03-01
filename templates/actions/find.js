module.exports = function({ name }) {
  return `module.exports = {
  main: async function($) {
    const { query = {}, fields = {}, sort = {}, skip = 0, limit = 0 } = $.params
    return await $.app.db('${name}').find(query, { fields, sort, skip, limit })
  }
}`
}
