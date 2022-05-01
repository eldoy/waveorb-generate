module.exports = function({ base, fields }) {
  function validations() {
    const entries = Object.entries(fields)
    if (entries.length) {
      return `await $.validate({
    values: {
    ${entries.map(([k, v]) => {
      const f = ['string', 'text'].includes(v)
        ? ',\n        min: 2'
        : ''
      return `  ${k}: {
        required: true${f}
      }`
    }).join(',\n    ')}
    }
  })`
    }
    return ''
  }

  return `module.exports = async function($) {
  ${validations()}
  const { values = {} } = $.params
  return await $.db('${base}').create(values)
}`
}
