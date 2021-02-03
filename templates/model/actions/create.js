/* create */
module.exports = {
  validate: {
    values: {
      name: {
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    return await $.app.db('__name__').create(values)
  }
}
