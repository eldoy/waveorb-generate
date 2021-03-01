module.exports = function({ name }) {
  return `module.exports = {
  main: async function($) {
    const { query = {} } = $.params
    const count = await $.app.db('${name}').count(query)
    return { n: count }
  }
}`
}
