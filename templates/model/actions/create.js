/* create */
module.exports = {
  filters: ['authenticate', 'login-required'],
  validate: {
    values: {
      name: {
        minlength: 3,
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    return await $.app.db('__name__').create(values)
  }
}
