module.exports = function({ base }) {
  return `module.exports = async function($) {
  await $.validate({
    query: {
      id: {
        is: '$id',
        required: true
      }
    }
  })
  const { query = {} } = $.params
  return await $.app.db('${base}').delete(query)
}`
}
