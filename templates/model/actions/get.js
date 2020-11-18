/* get */
module.exports = {
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
    return await $.app.db('__name__').get(query)
  }
}
