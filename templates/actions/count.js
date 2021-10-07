module.exports = function({ base }) {
  return `module.exports = async function($) {
  const { query = {} } = $.params
  const count = await $.app.db('${base}').count(query)
  return { n: count }
}`
}
