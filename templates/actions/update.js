module.exports = function({ base, fields }) {
  function validations() {
    const entries = Object.entries(fields)
    if (entries.length) {
      return `,
    values: {
    ${entries.map(([k, v]) => {
      const f = ['string', 'text'].includes(v)
        ? 'min: 2'
        : ''
      return `  ${k}: {
        ${f}
      }`
    }).join(',\n    ')}
    }`
    }
    return ''
  }
  return `module.exports = async function($) {
  await $.validate({
    query: {
      id: {
        is: 'id',
        required: true
      }
    }${validations()}
  })
  const { query = {}, values = {} } = $.params
  return await $.db('${base}').update(query, values)
}`
}
