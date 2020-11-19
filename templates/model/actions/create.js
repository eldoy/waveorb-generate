/* create */
module.exports = {
  filters: ['authenticate', 'login-required'],
  validate: {
    values: {
      site_id: {
        is: '$id',
        required: true
      },
      name: {
        minlength: 3,
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    values.account_id = $.account.id
    return await $.app.db('__name__').create(values)
  }
}
