/* update */
module.exports = {
  filters: ['authenticate', 'login-required'],
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    },
    values: {
      name: {
        minlength: 3,
        required: true
      }
    }
  },
  main: async function($) {
    const { query =  {}, values = {} } = $.params
    return await $.app.db('__name__').update(query, values)
  }
}
