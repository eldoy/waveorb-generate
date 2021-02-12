/* create */
module.exports = {
  validate: {
    values: {
      name: {
        minlength: 2,
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    return await $.app.db('__name__').create(values)
  }
}
