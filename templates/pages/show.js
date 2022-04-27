module.exports = function({ base, fields, Name }) {
  const entries = Object.entries(fields)

  function list() {
    if (entries.length) {
      return `\n      <dl>
      ${entries.map(([k, v]) => {
        return `  <dt>${k}</dt><dd>\${esc(item.${k})}</dd>`
      }).join('\n      ')}
      </dl>`
    }
    return ''
  }

  return `module.exports = async function($) {
  $.page.title = 'Show ${base}'

  async function renderShow() {
    const item = await api('/${base}/get', { query: { id } })
    html('#show', /* html */\`
      <h1>${Name}</h1>${list()}
      <p>
        <a href="\${$.link('${base}/list')}">Back to list</a>
      </p>
    \`)
  }

  return /* html */\`
    <div id="show"></div>
    <script>
      var id = params('${base}_id')
      \${renderShow}
      renderShow()
    </script>
  \`
}`
}
