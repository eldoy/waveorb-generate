module.exports = function({ base, Name }) {
  return `module.exports = async function($) {
  $.page.title = 'Show ${base}'

  async function renderShow() {
    const item = await api({ action: '${base}/get', query: { id }})
    html('#show', /* html */\`
      <h1>${Name}: \${esc(item.name)}</h1>
      <a href="\${$.link('${base}/list')}">Back to list</a>
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
