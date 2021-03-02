module.exports = function({ base }) {
  return `module.exports = {
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    }
  },
  main: async function($) {
    const { query = {} } = $.params
    return await $.app.db('${base}').delete(query)
  }
}`
}
