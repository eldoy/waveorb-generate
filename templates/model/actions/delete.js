/* delete */
module.exports = {
  filters: ['authenticate', 'login-required'],
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
    return await $.app.db('__name__').delete(query)
  }
}
