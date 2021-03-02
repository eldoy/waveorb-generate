module.exports = function({ base }) {
  return `module.exports = {
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    },
    values: {
      name: {
        minlength: 2
      }
    }
  },
  main: async function($) {
    const { query = {}, values = {} } = $.params
    return await $.app.db('${base}').update(query, values)
  }
}`
}
