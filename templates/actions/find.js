module.exports = function({ base }) {
  return `module.exports = async function($) {
  const { query = {}, fields = {}, sort = {}, skip = 0, limit = 0 } = $.params
  return await $.db('${base}').find(query, { fields, sort, skip, limit })
}`
}
