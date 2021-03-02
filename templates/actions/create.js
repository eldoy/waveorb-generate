module.exports = function({ base, fields }) {
  function validations() {
    const entries = Object.entries(fields)
    if (entries.length) {
      return `
  validate: {
    values: {
    ${entries.map(([k, v]) => {
      const f = ['string', 'text'].includes(v)
        ? ',\n        minlength: 2'
        : ''
      return `  ${k}: {
        required: true${f}
      }`
    }).join(',\n    ')}
    }
  },`
    }
    return ''
  }

  return `module.exports = {${validations()}
  main: async function($) {
    const { values = {} } = $.params
    return await $.app.db('${base}').create(values)
  }
}`
}
