module.exports = function(name) {
  return `module.exports = {
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
    return await $.app.db('${name}').create(values)
  }
}`
}
