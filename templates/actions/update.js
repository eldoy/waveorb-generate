module.exports = function({ base, fields }) {
  function validations() {
    const entries = Object.entries(fields)
    if (entries.length) {
      return `,
    values: {
    ${entries.map(([k, v]) => {
      const f = ['string', 'text'].includes(v)
        ? 'minlength: 2'
        : ''
      return `  ${k}: {
        ${f}
      }`
    }).join(',\n    ')}
    }`
    }
    return ''
  }
  return `module.exports = {
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    }${validations()}
  },
  main: async function($) {
    const { query = {}, values = {} } = $.params
    return await $.app.db('${base}').update(query, values)
  }
}`
}
