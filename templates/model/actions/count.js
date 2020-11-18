/* count */
module.exports = {
  main: async function($) {
    const { query = {} } = $.params
    const count = await $.app.db('__name__').count(query)
    return { n: count }
  }
}
